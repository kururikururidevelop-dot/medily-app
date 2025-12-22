import React, { useState, useEffect } from 'react';
import Avatar from './Avatar';
import { calculateRank, calculateStep, getFlowerIcon, getRankTitle, MAX_RANK } from '@/lib/rankUtils';
import { UserProfile } from '@/lib/services/userService';

type Props = {
  answerCount?: number;
  thankers?: UserProfile[];
};

export default function ContributionGraphic({ answerCount = 0, thankers = [] }: Props) {
  const thankerCount = thankers.length;
  const currentRank = calculateRank(answerCount);
  const currentStep = calculateStep(answerCount, currentRank);
  const title = getRankTitle(currentRank);
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
  const visibleThankers = thankers.slice(0, 6);
  const remainingCount = Math.max(0, thankerCount - 6);

  // Bubbles Logic (Max 12)
  const [bubbles, setBubbles] = useState<{ id: number; delay: number; duration: number; marginLeft: number; bottom: number; name: string }[]>([]);

  // Stable dependency for useEffect
  const thankerIds = thankers.map(t => t.id || 'unknown').join(',');

  useEffect(() => {
    const bubbleCount = Math.min(12, thankerCount);
    const newBubbles = Array.from({ length: bubbleCount }, (_, i) => ({
      id: i,
      name: thankers[i]?.displayName || 'ユーザー',
      // Randomize timing only
      delay: Math.random() * 4, // 0s to 4s delay for more variance
      duration: 3 + Math.random() * 1, // Slight duration variance 3s-4s
      // Strict positioning (Centered spread: -90px, 0px, 90px)
      marginLeft: (i % 3 - 1) * 90,
      bottom: 20, // Fixed bottom start
    }));
    setBubbles(newBubbles);
  }, [thankerCount, thankerIds]); // Removed thankers array from deps (using thankerIds and count)

  return (
    <div className="w-full h-full flex flex-col items-center justify-center pb-4 relative overflow-hidden">
      <style>{`
        @keyframes float-pop {
          0% { opacity: 0; transform: translateY(0); }
          20% { opacity: 1; transform: translateY(-10px); }
          80% { opacity: 1; transform: translateY(-30px); }
          100% { opacity: 0; transform: translateY(-40px); }
        }
        @keyframes sway {
          0%, 100% { transform: rotate(-10deg); }
          50% { transform: rotate(10deg); }
        }
        @keyframes vertical-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-sway { animation: sway 3s ease-in-out infinite; }
        .animate-vertical-bounce { animation: vertical-bounce 1.5s ease-in-out infinite; }
        .animate-spin-slow { animation: spin 8s linear infinite; }
        .animate-ping-slow { animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite; }
      `}</style>

      {/* Main Graphic Container */}
      <div className="relative w-64 h-64 flex items-center justify-center mb-2">

        {/* Background Track SVG */}
        <svg className="absolute inset-0 w-full h-full rotate-[150deg]" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="rainbow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff0000" />
              <stop offset="20%" stopColor="#ffff00" />
              <stop offset="40%" stopColor="#00ff00" />
              <stop offset="60%" stopColor="#00ffff" />
              <stop offset="80%" stopColor="#0000ff" />
              <stop offset="100%" stopColor="#ff00ff" />
              <animateTransform attributeName="gradientTransform" type="rotate" from="0 .5 .5" to="360 .5 .5" dur="3s" repeatCount="indefinite" />
            </linearGradient>
          </defs>
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
            // Apply Rainbow Gradient if Rank 6, otherwise Theme Color
            const strokeColor = currentRank === 6 ? "url(#rainbow-gradient)" : flower.stroke;

            return (
              <circle
                key={i}
                cx="50" cy="50" r="44"
                fill="transparent"
                stroke={strokeColor}
                strokeWidth="8"
                strokeDasharray="75 200"
                strokeLinecap="round"
                transform={`rotate(${i * 120} 50 50)`}
                className={`transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}
              />
            );
          })}
        </svg>

        {/* Center Flower (Emoji Render) */}
        <div className={`w-40 h-40 rounded-full bg-gradient-to-tr ${flower.bg} flex items-center justify-center border ${flower.border} shadow-inner relative z-10 transition-colors duration-500`}>
          <span className={`${flower.size} drop-shadow-sm select-none ${flower.animation}`} style={{ lineHeight: 1 }}>
            {flower.char}
          </span>

          {/* No Next Label if Max */}
          {currentRank >= MAX_RANK && (
            <div className="absolute bottom-6">
              <span className="text-xs text-yellow-600 font-bold hidden">MAX</span>
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
              className={`bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-2xl rounded-bl-none shadow-sm border ${flower.border} text-[11px] font-bold text-gray-800 whitespace-nowrap`}
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
          <div key={u.id || i} className="relative z-10 hover:z-20 transition-all hover:scale-110">
            <Avatar
              src={u.pictureUrl || u.avatar}
              alt={u.displayName}
              size="md"
              className="border-2 border-white shadow-sm"
            />
          </div>
        ))}
        {remainingCount > 0 && (
          <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 shrink-0 shadow-sm relative z-0">
            +{remainingCount}
          </div>
        )}
      </div>

      {/* Pop Rank Title */}
      <div className="mt-4 text-center">
        <h4 className={`text-3xl font-bold drop-shadow-sm font-pop ${title.color}`}>
          {title.text}
        </h4>
      </div>
    </div>
  );
}
