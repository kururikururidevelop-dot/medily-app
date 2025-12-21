import React, { useMemo, useState, useEffect } from 'react';
import Icon from './Icon';

type Props = {
  answerCount?: number;
  thankerCount?: number;
};
// ... (rest of file)

// Mock data generator
const getMockThankers = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    color: ['bg-blue-100 text-blue-600', 'bg-red-100 text-red-600', 'bg-green-100 text-green-600', 'bg-yellow-100 text-yellow-600', 'bg-purple-100 text-purple-600', 'bg-pink-100 text-pink-600'][i % 6]
  }));
};

export default function ContributionGraphic({ answerCount = 0, thankerCount = 0 }: Props) {
  // Logic: Cycle of 3. 
  // Rank 1: 1 ans(1/3), 2 ans(2/3), 3 ans(Full/RankUp).
  // Rank 2: 4 ans(1/3 - Start with 1 lit), 5 ans(2/3), 6 ans(Full)...
  const ANSWERS_PER_RANK = 3;
  const MAX_RANK = 6;

  const currentRank = Math.max(1, Math.min(MAX_RANK, Math.floor((answerCount - 1) / ANSWERS_PER_RANK) + 1));

  // Steps in current rank logic:
  // If count is 0, step is 0.
  // If count > 0, ((count - 1) % 3) + 1.
  const currentStep = answerCount === 0 ? 0 : ((answerCount - 1) % ANSWERS_PER_RANK) + 1;

  // ... (rest of file)

  {/* Pop Rank Title */ }
  <div className="mt-4 text-center">
    <h4 className={`text-2xl font-black tracking-wider drop-shadow-sm font-pop ${currentRank === 6
      ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-pulse scale-110"
      : "text-gray-800"
      }`}>
      {currentRank === 1 && <span className="text-blue-500">デビュー！</span>}
      {currentRank === 2 && <span className="text-emerald-500">いい感じ！</span>}
      {currentRank === 3 && <span className="text-teal-500">すてき！</span>}
      {currentRank === 4 && <span className="text-pink-500">さすが！</span>}
      {currentRank === 5 && <span className="text-amber-500">神対応！</span>}
      {currentRank === 6 && "最高！"}
    </h4>
  </div>

  // Flower Icon per Stage
  const getFlowerIcon = (rank: number) => {
    switch (rank) {
      case 1: return { name: 'water_drop', size: 40, color: 'text-blue-400' };
      case 2: return { name: 'grass', size: 50, color: 'text-emerald-400' };
      case 3: return { name: 'eco', size: 60, color: 'text-teal-500' };
      case 4: return { name: 'local_florist', size: 70, color: 'text-pink-400' };
      case 5: return { name: 'emoji_nature', size: 75, color: 'text-amber-500' };
      case 6: return { name: 'volunteer_activism', size: 75, color: 'text-rose-500' };
      default: return { name: 'local_florist', size: 70, color: 'text-pink-400' };
    }
  };

  const flower = getFlowerIcon(currentRank);

  // Gauge Segment Logic
  const radius = 80;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  // 3 segments with small gaps
  const gapAngle = 20; // degrees gap
  const totalGapAngle = gapAngle * 3;
  const segmentAngle = (360 - totalGapAngle) / 3;
  const segmentLength = (segmentAngle / 360) * circumference;
  const gapLength = (gapAngle / 360) * circumference;
  const dashArray = `${segmentLength} ${circumference}`; // Draw 1 segment then gap for rest

  // Thankers Logic
  const allThankers = useMemo(() => getMockThankers(thankerCount), [thankerCount]);
  const visibleThankers = allThankers.slice(0, 6);
  const remainingCount = Math.max(0, allThankers.length - 6);

  // Bubbles Logic (Max 10)
  const [bubbles, setBubbles] = useState<{ id: number; delay: number; duration: number; marginLeft: number; bottom: number; }[]>([]);

  useEffect(() => {
    const bubbleCount = Math.min(12, thankerCount);
    const newBubbles = Array.from({ length: bubbleCount }, (_, i) => ({
      id: i,
      // Randomize timing only
      delay: Math.random() * 4, // 0s to 4s delay for more variance
      duration: 3 + Math.random() * 1, // Slight duration variance 3s-4s
      // Strict positioning (Centered spread: -90px, 0px, 90px)
      marginLeft: (i % 3 - 1) * 90,
      bottom: 20, // Fixed bottom start
    }));
    setBubbles(newBubbles);
  }, [thankerCount]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center pb-4 relative overflow-hidden">
      <style>{`
        @keyframes float-pop {
          0% { opacity: 0; transform: translateY(0); }
          20% { opacity: 1; transform: translateY(-10px); }
          80% { opacity: 1; transform: translateY(-30px); }
          100% { opacity: 0; transform: translateY(-40px); }
        }
      `}</style>

      {/* Main Graphic Container */}
      <div className="relative w-64 h-64 flex items-center justify-center mb-2">

        {/* Background Track SVG */}
        <svg className="absolute inset-0 w-full h-full rotate-[150deg]" viewBox="0 0 100 100">
          {[0, 1, 2].map((i) => (
            <circle
              key={i}
              cx="50" cy="50" r="44"
              fill="transparent"
              stroke="#e5e7eb" // Gray-200 for inactive
              strokeWidth="8"
              strokeDasharray="75 200"
              strokeLinecap="round"
              transform={`rotate(${i * 120} 50 50)`}
            />
          ))}
        </svg>

        {/* Active Track SVG */}
        <svg className="absolute inset-0 w-full h-full rotate-[150deg]" viewBox="0 0 100 100">
          {[0, 1, 2].map((i) => {
            const isActive = i < currentStep;
            return (
              <circle
                key={i}
                cx="50" cy="50" r="44"
                fill="transparent"
                stroke="#13ec5b" // primary
                strokeWidth="8"
                strokeDasharray="75 200"
                strokeLinecap="round"
                transform={`rotate(${i * 120} 50 50)`}
                className={`transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}
              />
            );
          })}
        </svg>

        {/* Center Flower */}
        <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-green-50 to-green-100 flex items-center justify-center border border-green-500/20 shadow-inner relative z-10">
          <Icon name={flower.name} size={88} className={`${flower.color} drop-shadow-sm transition-all duration-500`} />

          {/* No Next Label */}
          {currentRank >= MAX_RANK && (
            <div className="absolute bottom-6">
              <span className="text-xs text-yellow-600 font-bold">MAX</span>
            </div>
          )}
        </div>

        {/* Heart Badge */}
        <div className="absolute top-[10%] right-[15%] bg-white rounded-full p-3 shadow-md border border-black/5 flex items-center justify-center z-20 animate-pulse">
          <span
            className="material-symbols-outlined text-red-400 text-[40px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
            aria-hidden="true"
          >
            favorite
          </span>
        </div>
      </div>

      {/* Dynamic Bubbles (Moved out of rotated container to fix floating issues and positioning) */}
      <div className="absolute bottom-20 left-0 right-0 h-40 w-full flex justify-center z-20 pointer-events-none overflow-visible max-w-xs mx-auto">
        {bubbles.map((b) => (
          <div
            key={b.id}
            className="absolute origin-bottom"
            style={{
              left: '50%',
              marginLeft: `${b.marginLeft}px`,
              bottom: `${b.bottom}px`,
              transform: 'translateX(-50%)' // Center anchor, removed scale
            }}
          >
            <div
              className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-2xl rounded-bl-none shadow-sm border border-green-500/20 text-[11px] font-bold text-gray-800 whitespace-nowrap"
              style={{
                animation: `float-pop ${b.duration}s ease-in-out infinite`,
                animationDelay: `${b.delay}s`
              }}
            >
              ありがとう！
            </div>
          </div>
        ))}
      </div>

      {/* Stacked Thankers */}
      <div className="flex items-center justify-center -space-x-3 mt-4 relative z-10 w-full px-8">
        {visibleThankers.map((u, i) => (
          <div
            key={u.id}
            className={`w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold shadow-sm ${u.color} shrink-0`}
            title={u.name}
          >
            {u.name.slice(0, 1)}
          </div>
        ))}
        {remainingCount > 0 && (
          <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 shrink-0 shadow-sm relative">
            +{remainingCount}
          </div>
        )}
      </div>

      {/* Current Level Text (Optional - kept for context or remove if purely matching design? 
          Reference design doesn't show this text explicitly in the snippet, 
          but usually helpful. I'll keep it subtle.) 
      */}
      {/* Pop Rank Title */}
      <div className="mt-4 text-center">
        <h4 className={`text-3xl font-bold drop-shadow-sm font-pop ${currentRank === 6
          ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-pulse scale-110"
          : "text-gray-800"
          }`}>
          {currentRank === 1 && <span className="text-blue-500">デビュー！</span>}
          {currentRank === 2 && <span className="text-emerald-500">いい感じ！</span>}
          {currentRank === 3 && <span className="text-teal-500">すてき！</span>}
          {currentRank === 4 && <span className="text-pink-500">さすが！</span>}
          {currentRank === 5 && <span className="text-amber-500">神対応！</span>}
          {currentRank === 6 && "最高！"}
        </h4>
      </div>

    </div>
  );
}
