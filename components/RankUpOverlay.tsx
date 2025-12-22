'use client';

import React, { useEffect, useState } from 'react';
import { getFlowerIcon, getRankTitle } from '@/lib/rankUtils';

interface RankUpOverlayProps {
    oldRank: number;
    newRank: number;
    onClose: () => void;
}

export default function RankUpOverlay({ oldRank, newRank, onClose }: RankUpOverlayProps) {
    const [phase, setPhase] = useState<'intro' | 'glow' | 'flash' | 'reveal' | 'finished'>('intro');

    const oldFlower = getFlowerIcon(oldRank);
    const newFlower = getFlowerIcon(newRank);
    const newTitle = getRankTitle(newRank);

    useEffect(() => {
        // Sequence
        // 0s: Intro (Show Old)
        // 1s: Glow increases
        const t1 = setTimeout(() => setPhase('glow'), 800);
        // 3s: Flash (White out)
        const t2 = setTimeout(() => setPhase('flash'), 2500);
        // 3.5s: Reveal (Show New)
        const t3 = setTimeout(() => setPhase('reveal'), 3200);
        // 5s: Controls appear
        const t4 = setTimeout(() => setPhase('finished'), 4500);

        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm select-none">
            <style>{`
        @keyframes sun-glow {
          0% { box-shadow: 0 0 0px 0px rgba(255, 255, 200, 0); }
          50% { box-shadow: 0 0 50px 20px rgba(255, 255, 200, 0.5); }
          100% { box-shadow: 0 0 100px 50px rgba(255, 255, 255, 1); }
        }
        .animate-sun-glow { animation: sun-glow 2s ease-in forwards; }
        @keyframes burst {
            0% { transform: scale(0); opacity: 0; }
            50% { transform: scale(1.2); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
        }
        .animate-burst { animation: burst 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
      `}</style>

            {/* Icons Area */}
            <div className="relative w-64 h-64 flex items-center justify-center">
                {/* OLD ICON */}
                {(phase === 'intro' || phase === 'glow' || phase === 'flash') && (
                    <div className={`relative w-40 h-40 rounded-full flex items-center justify-center bg-white/10 ${phase === 'glow' ? 'animate-sun-glow bg-white' : ''}`}>
                        <span className="text-[100px] select-none">{oldFlower.char}</span>
                    </div>
                )}

                {/* NEW ICON (REVEAL) */}
                {(phase === 'reveal' || phase === 'finished') && (
                    <div className="animate-burst z-50 flex items-center justify-center">
                        <div className={`w-48 h-48 rounded-full bg-gradient-to-tr ${newFlower.bg} flex items-center justify-center border-4 ${newFlower.border} shadow-[0_0_50px_rgba(255,255,255,0.6)]`}>
                            <span className={`${newFlower.size} select-none ${newFlower.animation}`}>{newFlower.char}</span>
                        </div>
                    </div>
                )}
            </div>

            {/* FLASH OVERLAY (Full Screen) */}
            <div className={`fixed inset-0 bg-white transition-opacity duration-300 pointer-events-none ${phase === 'flash' ? 'opacity-100' : 'opacity-0'}`} style={{ zIndex: 70 }} />

            {/* Text Area (Separate from Icon Container) */}
            {(phase === 'reveal' || phase === 'finished') && (
                <div className="text-center space-y-4 mt-8 z-50 animate-burst">
                    <h2
                        className="text-4xl md:text-6xl font-black tracking-widest drop-shadow-lg text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 animate-pulse pb-2 whitespace-nowrap"
                        style={{ WebkitTextFillColor: 'transparent' }}
                    >
                        ランクアップ！
                    </h2>
                    <p className={`text-3xl md:text-5xl font-pop font-bold ${newTitle.color} drop-shadow-lg whitespace-nowrap`}>{newTitle.text}</p>
                </div>
            )}

            {/* Close Button */}
            {phase === 'finished' && (
                <div className="mt-12 animate-fade-in z-50">
                    <button
                        onClick={onClose}
                        className="bg-white text-gray-900 px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:bg-gray-100 hover:scale-105 transition-all"
                    >
                        閉じる
                    </button>
                </div>
            )}
        </div>
    );
}
