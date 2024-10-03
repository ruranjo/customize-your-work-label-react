import React, { useState, useRef } from 'react';
import { FaUserCircle } from 'react-icons/fa'; // Icono de avatar predeterminado
import { toPng } from 'html-to-image';

export interface ImageUploaderProps {
  colorBg: string;
  colorText: string;
  mainText: string;
}

const ImageUploader = ({ colorBg = 'green', colorText = 'black', mainText }: ImageUploaderProps) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const imageContainerRef = useRef<HTMLDivElement | null>(null); // Referencia para el contenedor de la imagen

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const width = img.width;
          const height = img.height;

          // Verificar si la imagen es menor a 200x200
          if (width < 200 || height < 200) {
            setError('La imagen debe ser mayor a 200x200 px');
            setImageSrc(null);
            return;
          }

          // Fijar las dimensiones deseadas
          const desiredWidth = 400;
          const desiredHeight = 400;

          // Calcular la relación de aspecto
          const aspectRatio = width / height;
          let newWidth = desiredWidth;
          let newHeight = desiredHeight;

          if (aspectRatio > 1) {
            newHeight = desiredHeight / aspectRatio;
          } else {
            newWidth = desiredWidth * aspectRatio;
          }

          // Crear un canvas para redimensionar la imagen
          const canvas = document.createElement('canvas');
          canvas.width = newWidth;
          canvas.height = newHeight;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, newWidth, newHeight);
            const resizedImage = canvas.toDataURL('image/jpeg');
            setImageSrc(resizedImage);
          }
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    if (imageContainerRef.current) {
      toPng(imageContainerRef.current, { cacheBust: true })
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = 'downloaded-image.png'; // Nombre del archivo a descargar
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch((error) => {
          console.error('Oops, something went wrong!', error);
        });
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 border border-gray-300 rounded-md">
      <div ref={imageContainerRef} className="relative" style={{ width: '400px', height: '400px' }}>
        {/* Si no hay imagen, muestra el icono de avatar por defecto */}
        {!imageSrc && (
          <FaUserCircle
            className="text-gray-400"
            style={{ width: '400px', height: '400px' }} // Mantén el tamaño de 400x400
          />
        )}

        {imageSrc && (
          <>
            {/* Imagen redimensionada */}
            <img
              src={imageSrc}
              alt="Uploaded"
              className="rounded-full"
              style={{
                width: '100%', // Se ajusta al 100% del contenedor
                height: '100%', // Se ajusta al 100% del contenedor
                objectFit: 'cover', // Cubre el contenedor sin deformar
              }}
            />
            {/* SVG para el texto */}
            <svg viewBox="8 4 80 75" className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <path id="arcPath" d="M 10, 50 A 40,45 0 0,0 70, 72" />
              </defs>
              <defs>
                <linearGradient id="fadeGradient" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor={colorBg} stopOpacity="0" />
                  <stop offset="30%" stopColor={colorBg} stopOpacity="1" />
                  <stop offset="100%" stopColor={colorBg} stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M 11, 45 A 40,46 0 0,0 65, 73"
                fill="none"
                stroke="url(#fadeGradient)"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <text fill={colorText} fontSize="8" fontWeight="bold">
                <textPath href="#arcPath" startOffset="0%" textAnchor="start">
                  #{mainText}
                </textPath>
              </text>
            </svg>
          </>
        )}
      </div>

      <label className="w-full mt-4 p-3 text-center bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600">
        Select Image
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </label>

      {imageSrc && (
        <button
          onClick={handleDownload}
          className="mt-4 p-3 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Download Image
        </button>
      )}

      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  );
};

export default ImageUploader;
