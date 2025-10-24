
import React, { useState, useMemo, useCallback } from 'react';
import { Shape } from './types';
import ShapeSelector from './components/ShapeSelector';
import InputForm from './components/InputForm';
import ResultDisplay from './components/ResultDisplay';

const App: React.FC = () => {
  const [selectedShape, setSelectedShape] = useState<Shape>(Shape.Rectangle);
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  const handleShapeChange = useCallback((shape: Shape) => {
    setSelectedShape(shape);
    setInputs({});
    setResult(null);
    setError('');
  }, []);

  const handleInputChange = useCallback((newInputs: Record<string, string>) => {
    setInputs(newInputs);
    setResult(null);
    setError('');
  }, []);

  const calculatePerimeter = useCallback(() => {
    setError('');
    // FIX: Cast val to string for parseFloat as Object.values might return unknown[]
    const values = Object.values(inputs).map(val => parseFloat(val as string));
    
    if (values.some(isNaN) || values.length === 0) {
      setError('모든 입력란에 유효한 숫자를 입력해주세요.');
      return;
    }
     if (values.some(val => val <= 0)) {
      setError('모든 값은 0보다 커야 합니다.');
      return;
    }

    let perimeter = 0;
    switch (selectedShape) {
      case Shape.Rectangle:
        if (values.length < 2) return;
        perimeter = 2 * (values[0] + values[1]);
        break;
      case Shape.Square:
        if (values.length < 1) return;
        perimeter = 4 * values[0];
        break;
      case Shape.Circle:
        if (values.length < 1) return;
        perimeter = 2 * Math.PI * values[0];
        break;
      case Shape.Triangle:
        if (values.length < 3) return;
        const [a, b, c] = values;
        if (a + b <= c || a + c <= b || b + c <= a) {
          setError('입력된 변의 길이로는 삼각형을 만들 수 없습니다.');
          return;
        }
        perimeter = a + b + c;
        break;
    }
    setResult(perimeter);
  }, [inputs, selectedShape]);
  
  const isButtonDisabled = useMemo(() => {
    const requiredInputs = {
      [Shape.Rectangle]: 2,
      [Shape.Square]: 1,
      [Shape.Circle]: 1,
      [Shape.Triangle]: 3,
    };
    // FIX: Cast v to string for parseFloat as Object.values might return unknown[]
    const validInputs = Object.values(inputs).filter(v => v && !isNaN(parseFloat(v as string)) && parseFloat(v as string) > 0).length;
    return validInputs < requiredInputs[selectedShape];
  }, [inputs, selectedShape]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 to-slate-800 font-sans">
      <div className="w-full max-w-md mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-cyan-400">도형 둘레 계산기</h1>
          <p className="text-slate-400 mt-2">원하는 도형을 선택하고 둘레를 계산해보세요.</p>
        </header>

        <main className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl shadow-black/20 p-6 md:p-8 border border-slate-700">
          <ShapeSelector selectedShape={selectedShape} onShapeChange={handleShapeChange} />
          
          <div className="mt-8">
            <InputForm shape={selectedShape} inputs={inputs} onInputChange={handleInputChange} />
          </div>

          <div className="mt-6">
            <button
              onClick={calculatePerimeter}
              disabled={isButtonDisabled}
              className="w-full bg-cyan-500 text-slate-900 font-bold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out hover:bg-cyan-400 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:text-slate-400 focus:outline-none focus:ring-4 focus:ring-cyan-500/50"
            >
              계산하기
            </button>
          </div>
          
          {error && <p className="mt-4 text-center text-red-400 bg-red-900/30 p-3 rounded-lg">{error}</p>}
          
          <ResultDisplay result={result} />
        </main>

        <footer className="text-center mt-8 text-slate-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Perimeter Calculator. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
