import React from 'react';
import Icon from './Icon';

export default function ContributionCategory({ items = [{ name: '内科', pct: 45 }, { name: '小児科', pct: 30 }, { name: '皮膚科', pct: 15 }] }: { items?: { name: string; pct: number }[] }) {

  const getMedalColor = (idx: number) => {
    switch (idx) {
      case 0: return 'text-yellow-500';
      case 1: return 'text-gray-400';
      case 2: return 'text-amber-700';
      default: return 'text-transparent';
    }
  };

  const getBarColor = (idx: number) => {
    switch (idx) {
      case 0: return 'bg-yellow-400';
      case 1: return 'bg-gray-400';
      case 2: return 'bg-amber-600';
      default: return 'bg-primary/50';
    }
  };

  return (
    <div className="space-y-5">
      {items.map((it, idx) => (
        <div key={idx} className="relative">
          <div className="flex justify-between items-center text-sm mb-1.5">
            <div className="flex items-center gap-2">
              {idx < 3 ? (
                <Icon name="emoji_events" size={16} className={getMedalColor(idx)} />
              ) : (
                <span className="w-4 h-4 block"></span>
              )}
              <span className={`font-bold ${idx === 0 ? 'text-gray-900' : 'text-gray-600'}`}>{it.name}</span>
            </div>
            <span className="font-bold text-gray-700">{it.pct}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden shadow-inner">
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-out ${getBarColor(idx)}`}
              style={{ width: `${it.pct}%` }}
            />
          </div>
        </div>
      ))}

      <div className="pt-2 text-center">
        <button className="text-xs text-primary font-semibold hover:underline flex items-center justify-center gap-1 w-full opacity-80 hover:opacity-100">
          <span>View All Categories</span>
          <Icon name="arrow_forward" size={12} />
        </button>
      </div>
    </div>
  )
}
