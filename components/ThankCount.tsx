import React from 'react';
import Icon from './Icon';

export default function ThankCount({ count = 1284 }: { count?: number }) {
  // Rank Logic
  const getRank = (c: number) => {
    if (c >= 3000) return { name: 'Legend', color: 'text-purple-600', bg: 'bg-purple-100', next: null };
    if (c >= 1000) return { name: 'Gold', color: 'text-yellow-600', bg: 'bg-yellow-100', next: 3000 };
    if (c >= 500) return { name: 'Silver', color: 'text-gray-500', bg: 'bg-gray-100', next: 1000 };
    if (c >= 100) return { name: 'Bronze', color: 'text-amber-700', bg: 'bg-amber-100', next: 500 };
    return { name: 'Beginner', color: 'text-emerald-600', bg: 'bg-emerald-100', next: 100 };
  };

  const rank = getRank(count);
  const progress = rank.next ? ((count - (rank.next === 500 ? 100 : rank.next === 1000 ? 500 : rank.next === 3000 ? 1000 : 0)) / (rank.next - (rank.next === 500 ? 100 : rank.next === 1000 ? 500 : rank.next === 3000 ? 1000 : 0))) * 100 : 100;

  // Simplified progress calc for demo
  const nextTarget = rank.next || count;
  const prevTarget = rank.name === 'Gold' ? 1000 : rank.name === 'Silver' ? 500 : rank.name === 'Bronze' ? 100 : 0;
  const progressPct = rank.next ? Math.min(100, Math.max(0, ((count - prevTarget) / (nextTarget - prevTarget)) * 100)) : 100;

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex items-center gap-4">
        <div className={`size-14 rounded-full ${rank.bg} flex items-center justify-center ${rank.color} shadow-sm border-2 border-white ring-1 ring-gray-100`}>
          <Icon name="favorite" size={28} />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${rank.bg} ${rank.color}`}>
              {rank.name} Rank
            </span>
            <span className="text-xs text-gray-400">Total Thanks</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black text-gray-800 tracking-tight">{count.toLocaleString()}</span>
            <span className="text-sm text-gray-500">thanks</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      {rank.next && (
        <div className="w-full space-y-1.5">
          <div className="flex justify-between text-[10px] text-gray-400 font-medium">
            <span>Level Progress</span>
            <span>Next: {rank.next.toLocaleString()}</span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-out ${rank.name === 'Gold' ? 'bg-yellow-400' : 'bg-primary'}`}
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
