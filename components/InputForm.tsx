
import React from 'react';
import { Shape } from '../types';

interface InputFormProps {
  shape: Shape;
  inputs: Record<string, string>;
  onInputChange: (inputs: Record<string, string>) => void;
}

const InputField: React.FC<{ label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, placeholder: string }> = ({ label, value, onChange, placeholder }) => (
  <div>
    <label className="block text-sm font-medium text-slate-300 mb-1">{label}</label>
    <input
      type="number"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      min="0"
      className="w-full bg-slate-700/50 border-2 border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
    />
  </div>
);

const InputForm: React.FC<InputFormProps> = ({ shape, inputs, onInputChange }) => {
  const handleInput = (key: string, value: string) => {
    onInputChange({ ...inputs, [key]: value });
  };

  const renderInputs = () => {
    switch (shape) {
      case Shape.Rectangle:
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField label="가로" value={inputs.width || ''} onChange={(e) => handleInput('width', e.target.value)} placeholder="예: 10"/>
            <InputField label="세로" value={inputs.height || ''} onChange={(e) => handleInput('height', e.target.value)} placeholder="예: 5"/>
          </div>
        );
      case Shape.Square:
        return (
          <InputField label="한 변의 길이" value={inputs.side || ''} onChange={(e) => handleInput('side', e.target.value)} placeholder="예: 7"/>
        );
      case Shape.Circle:
        return (
          <InputField label="반지름" value={inputs.radius || ''} onChange={(e) => handleInput('radius', e.target.value)} placeholder="예: 4"/>
        );
      case Shape.Triangle:
        return (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <InputField label="변 1" value={inputs.sideA || ''} onChange={(e) => handleInput('sideA', e.target.value)} placeholder="예: 3"/>
            <InputField label="변 2" value={inputs.sideB || ''} onChange={(e) => handleInput('sideB', e.target.value)} placeholder="예: 4"/>
            <InputField label="변 3" value={inputs.sideC || ''} onChange={(e) => handleInput('sideC', e.target.value)} placeholder="예: 5"/>
          </div>
        );
      default:
        return null;
    }
  };

  return <div className="space-y-4">{renderInputs()}</div>;
};

export default InputForm;
