import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';

interface InputSelectProps {
  options: { label: string; value: string }[];
  onSelect: (value: string) => void;
}

const InputSelect: React.FC<InputSelectProps> = ({ options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState<{ label: string; value: string } | null>(null);

  const handleChange = (newValue: any) => {
    setSelectedOption(newValue);
    onSelect(newValue?.value || '');
  };

  return (
    <div className='p-4'>
    <CreatableSelect
      value={selectedOption}
      onChange={handleChange}
      options={options}
      placeholder="Select or create a text..."
      className="w-full"
      isClearable
    />
    </div>
  );
};

export default InputSelect;