import React from 'react';

type Props = {
  series?: number[];
  height?: number;
};

export default function ContributionGraphic({ series = [40,60,35,85,55,70], height = 120 }: Props) {
  return (
    <div className="w-full h-full flex items-end gap-3">
      {series.map((v, i) => (
        <div key={i} className="flex-1 flex flex-col items-center">
          <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-t-sm h-full flex items-end overflow-hidden border-b border-gray-100 dark:border-gray-700">
            <div className="w-full bg-primary transition-all duration-300 relative rounded-t-sm" style={{ height: `${v}%` }} />
          </div>
          <span className="text-[10px] text-gray-400 mt-2">{['5月','6月','7月','8月','9月','10月'][i]}</span>
        </div>
      ))}
    </div>
  );
}
