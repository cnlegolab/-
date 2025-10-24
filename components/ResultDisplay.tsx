
import React from 'react';

interface ResultDisplayProps {
  result: number | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  if (result === null) {
    return null;
  }

  return (
    <div className="mt-8 text-center bg-slate-900/50 p-6 rounded-lg border border-slate-700">
      <p className="text-slate-400 text-lg">계산된 둘레는</p>
      <p className="text-4xl font-bold text-cyan-400 mt-2">
        {result.toLocaleString(undefined, { maximumFractionDigits: 4 })}
      </p>
    </div>
  );
};

export default ResultDisplay;
