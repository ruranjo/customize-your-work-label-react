import React, { useState } from 'react';

// Define las propiedades del componente
interface ColorPickerProps {
  title: string;
  colors: string[];
  onColorSelect: (color: string) => void;
  icon?: JSX.Element; // Prop opcional para el ícono
}

const ColorPicker: React.FC<ColorPickerProps> = ({ title, colors, onColorSelect, icon }) => {
  // Estado para el color seleccionado
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  // Maneja la selección de un color
  const handleColorSelect = (color: string) => {
    setSelectedColor(color); // Actualiza el estado con el color seleccionado
    onColorSelect(color); // Llama a la función pasada desde el padre
  };

  return (
    <div className="color-picker p-6 mb-4 border border-gray-300 rounded-lg shadow-lg bg-white">
      <div className="flex items-center mb-4">
        {icon && <span className="mr-2">{icon}</span>} {/* Muestra el ícono si se proporciona */}
        <h3 className="text-xl font-semibold text-gray-700">{title}</h3>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {colors.map((color) => (
          <div
            key={color}
            className={`w-10 h-10 cursor-pointer rounded border border-gray-200 p-2 transition duration-200 ${
              selectedColor === color ? 'ring-2 ring-blue-500' : ''
            }`} // Añade una clase condicional para destacar el color seleccionado
            style={{ backgroundColor: color }}
            onClick={() => handleColorSelect(color)} // Llama a la función manejadora
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;




