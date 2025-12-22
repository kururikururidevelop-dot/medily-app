
export const ANSWERS_PER_RANK = 3;
export const MAX_RANK = 6;

export interface FlowerIcon {
    char: string;
    animation: string;
    size: string;
    bg?: string;
    border?: string;
    stroke?: string;
}

export const calculateRank = (answerCount: number): number => {
    return Math.max(1, Math.min(MAX_RANK, Math.floor((answerCount - 1) / ANSWERS_PER_RANK) + 1));
};

export const calculateStep = (answerCount: number, currentRank: number): number => {
    // If Max Rank, keep all lit (3).
    return currentRank === MAX_RANK ? ANSWERS_PER_RANK : (answerCount === 0 ? 0 : ((answerCount - 1) % ANSWERS_PER_RANK) + 1);
};

export const getFlowerIcon = (rank: number): FlowerIcon => {
    switch (rank) {
        case 1: return { char: '🌱', animation: 'animate-sway', size: 'text-[80px]', bg: 'from-blue-50 to-blue-100', border: 'border-blue-500/20', stroke: '#3b82f6' };
        case 2: return { char: '🌿', animation: 'animate-sway', size: 'text-[80px]', bg: 'from-emerald-50 to-emerald-100', border: 'border-emerald-500/20', stroke: '#10b981' };
        case 3: return { char: '🤝', animation: 'animate-vertical-bounce', size: 'text-[80px]', bg: 'from-teal-50 to-teal-100', border: 'border-teal-500/20', stroke: '#14b8a6' };
        case 4: return { char: '🌸', animation: 'animate-spin-slow', size: 'text-[80px]', bg: 'from-pink-50 to-pink-100', border: 'border-pink-500/20', stroke: '#ec4899' };
        case 5: return { char: '✨', animation: 'animate-ping-slow', size: 'text-[80px]', bg: 'from-amber-50 to-amber-100', border: 'border-amber-500/20', stroke: '#f59e0b' };
        case 6: return { char: '👑', animation: 'animate-bounce', size: 'text-[100px]', bg: 'from-purple-50 to-pink-50', border: 'border-purple-500/20', stroke: '#a855f7' };
        default: return { char: '🌸', animation: 'animate-spin-slow', size: 'text-[80px]', bg: 'from-pink-50 to-pink-100', border: 'border-pink-500/20', stroke: '#ec4899' };
    }
};

export const getRankTitle = (rank: number) => {
    switch (rank) {
        case 1: return { text: "デビュー！", color: "text-blue-500" };
        case 2: return { text: "いい感じ！", color: "text-emerald-500" };
        case 3: return { text: "すてき！", color: "text-teal-500" };
        case 4: return { text: "さすが！", color: "text-pink-500" };
        case 5: return { text: "神対応！", color: "text-amber-500" };
        case 6: return { text: "最高！", color: "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-pulse scale-110" };
        default: return { text: "", color: "" };
    }
};
