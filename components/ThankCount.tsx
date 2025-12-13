import React from 'react';

export default function ThankCount({ count = 1284 }: { count?: number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="size-12 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-500">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 21s-6-4.35-9-7.5C-1.5 8 4 3 8 5c1.5.75 2.5 2 4 2s2.5-1.25 4-2c4-2 9 3 5 8.5C18 16.65 12 21 12 21z" fill="currentColor" />
        </svg>
      </div>
      <div>
        <p className="text-xs text-gray-500 dark:text-gray-400">獲得サンキュー</p>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-[#0d1b12] dark:text-white tracking-tight">{count.toLocaleString()}</span>
          <span className="text-[10px] text-gray-400">Total</span>
        </div>
      </div>
    </div>
  );
}
