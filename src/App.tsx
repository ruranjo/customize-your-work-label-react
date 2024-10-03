import { useState } from 'react';
import './App.css';
import ImageUploader from './components/Sections/ImageContainer/ImageUploader';
import ColorPicker from './components/ColorPicker'; // Importa el nuevo componente
import { FaPaintBrush, FaFont } from 'react-icons/fa'; // Ejemplo de iconos
import InputSelect from './components/TextInput';

function App() {
  // Estado para manejar el color seleccionado
  const [selectedBgColor, setSelectedBgColor] = useState<string>('green');
  const [selectedTextColor, setSelectedTextColor] = useState<string>('white');
  const [selectedText, setSelectedText] = useState<string>('OPENTOWORK');
    
  // Lista de opciones predefinidas
  const predefinedOptions = [
    { label: '#OPENTOWORK', value: 'OPENTOWORK' },
    { label: '#DESESPERATE', value: 'DESESPERATE' },
    { label: '#LOOKINGFORJOB', value: 'LOOKINGFORJOB' },
    { label: '#FREELANCER', value: 'FREELANCER' },
    { label: '#KEEPINGSMILE', value: 'KEEPINGSMILE' },  // Nueva opción
    { label: '#MOTIVATED', value: 'MOTIVATED' },        // Nueva opción
    { label: '#READYTOWORK', value: 'READYTOWORK' },    // Nueva opción
    { label: '#FEMINISM', value: 'FEMINISM' },          // Nueva opción
    { label: '#SIGUESOÑANDO', value: 'SIGUESOÑANDO' },        // Nueva opción
    { label: '#AVAILABLE', value: 'AVAILABLE' },        // Nueva opción
  ];
  // Lista de colores predeterminados
  const colors: string[] = ['black','red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'teal', 'brown', 'gray', 'white'];

  // Función para manejar el cambio de color
  const handleBackgroundColorSelect = (color: string) => {
    setSelectedBgColor(color);
  };

  const handleTextColorSelect = (color: string) => {
    setSelectedTextColor(color);
  };

  const handleTextSelect = (value: string) => {
    setSelectedText(value);
  };

  return (
    <>
      <div className="flex min-h-screen">
        {/* Contenido principal */}
        <div className="flex-grow flex-col flex items-center justify-center">
          <div className="text-4xl font-extrabold text-white text-center my-6 bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-lg shadow-lg">
           Personaliza Tu Etiqueta de Trabajo
          </div>
          <ImageUploader colorBg={selectedBgColor} colorText={selectedTextColor} mainText={selectedText} />
        </div>

        {/* Sidebar derecha */}
        <div className="w-72 bg-gray-100 border-l-4 border-blue-600 p-6 fixed right-0 top-0 h-full">
          <InputSelect options={predefinedOptions} onSelect={handleTextSelect} />
          <ColorPicker 
            title="Color de fondo" 
            colors={colors} 
            onColorSelect={handleBackgroundColorSelect} 
            icon={<FaPaintBrush />} // Icono para color de fondo
          />
          <ColorPicker 
            title="Color de letra" 
            colors={colors} 
            onColorSelect={handleTextColorSelect} 
            icon={<FaFont />} // Icono para color de texto
          />
        </div>
      </div>
    </>
  );
}

export default App;
