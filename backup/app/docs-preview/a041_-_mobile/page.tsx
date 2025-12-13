import Icon from '../../../components/Icon';
import React from 'react';

export default function Page(){
  return (
    <>
      <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden pb-[80px]">
      {/*  Header  */}
      <header className="sticky top-0 z-50 flex items-center bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm p-4 pb-2 justify-between border-b border-gray-100 dark:border-gray-800">
      <div className="flex items-center gap-2">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
      <Icon name="local_hospital" className="text-[24px]" size={24} />
      </div>
      <h2 className="text-neutral-900 dark:text-white text-xl font-bold leading-tight tracking-[-0.015em]">Medily</h2>
      </div>
      <div className="flex items-center justify-end">
      <button className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
      <Icon name="notifications" className="text-neutral-900 dark:text-white" />
      </button>
      </div>
      </header>
      {/*  Page Title  */}
      <div className="px-4 pt-6 pb-2">
      <h1 className="text-neutral-900 dark:text-white tracking-tight text-[28px] font-bold leading-tight text-left">公開質問一覧</h1>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-1">未回答の質問に答えて、患者さんの不安を解消しましょう。</p>
      </div>
      {/*  Filter Chips  */}
      <div className="sticky top-[65px] z-40 bg-background-light dark:bg-background-dark pt-2 pb-4">
      <div className="flex gap-3 px-4 overflow-x-auto no-scrollbar">
      <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 pl-4 pr-3 shadow-sm hover:border-primary transition-colors">
      <p className="text-neutral-700 dark:text-neutral-200 text-sm font-medium leading-normal">地域</p>
      <Icon name="chevron_right" className="text-neutral-500 dark:text-neutral-400 text-[20px]" size={20} />
      </button>
      <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 pl-4 pr-3 shadow-sm hover:border-primary transition-colors">
      <p className="text-neutral-700 dark:text-neutral-200 text-sm font-medium leading-normal">カテゴリ</p>
      <Icon name="chevron_right" className="text-neutral-500 dark:text-neutral-400 text-[20px]" size={20} />
      </button>
      <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 pl-4 pr-3 shadow-sm hover:border-primary transition-colors">
      <p className="text-neutral-700 dark:text-neutral-200 text-sm font-medium leading-normal">並び順</p>
      <Icon name="chevron_right" className="text-neutral-500 dark:text-neutral-400 text-[20px]" size={20} />
      </button>
      </div>
      </div>
      {/*  Question List  */}
      <main className="flex flex-col gap-4 px-4 pb-4">
      {/*  Card 1  */}
      <div className="flex flex-col gap-3 rounded-xl bg-white dark:bg-[#1a2e22] p-4 shadow-sm border border-gray-100 dark:border-gray-800">
      <div className="flex justify-between items-start gap-3">
      <div className="flex gap-3 items-start flex-1">
      <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-[48px] w-[48px] shrink-0 bg-gray-200 dark:bg-gray-700" data-alt="Abstract soft green gradient avatar placeholder" style={{ backgroundImage: '' }}  ><img src="/res_3EC5E83D0E62.png" alt="" className="absolute inset-0 w-full h-full object-cover" /></div>
      <div className="flex flex-col">
      <div className="flex items-center gap-2 mb-1">
      <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">小児科</span>
      <span className="text-xs text-neutral-400 dark:text-neutral-500">10分前</span>
      </div>
      <h3 className="text-neutral-900 dark:text-white text-base font-bold leading-snug line-clamp-2">子供が38度の熱を出していて、座薬を使うべきか悩んでいます...</h3>
      </div>
      </div>
      </div>
      <div className="flex items-center justify-between mt-1 pt-3 border-t border-gray-100 dark:border-gray-700/50">
      <div className="flex items-center gap-1 text-neutral-500 dark:text-neutral-400 text-xs">
      <Icon name="location_on" className="text-[16px]" size={16} />
      <span>東京都 世田谷区</span>
      </div>
      <button className="flex cursor-pointer items-center justify-center rounded-lg h-9 px-5 bg-primary hover:bg-primary/90 text-[#0d1b12] text-sm font-bold leading-normal transition-colors shadow-sm shadow-primary/20">
      <span className="truncate">回答する</span>
      </button>
      </div>
      </div>
      {/*  Card 2  */}
      <div className="flex flex-col gap-3 rounded-xl bg-white dark:bg-[#1a2e22] p-4 shadow-sm border border-gray-100 dark:border-gray-800">
      <div className="flex justify-between items-start gap-3">
      <div className="flex gap-3 items-start flex-1">
      <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-[48px] w-[48px] shrink-0 bg-gray-200 dark:bg-gray-700" data-alt="Abstract soft blue gradient avatar placeholder" style={{ backgroundImage: '' }}  ><img src="/res_3620D3A4061B.png" alt="" className="absolute inset-0 w-full h-full object-cover" /></div>
      <div className="flex flex-col">
      <div className="flex items-center gap-2 mb-1">
      <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">皮膚科</span>
      <span className="text-xs text-neutral-400 dark:text-neutral-500">1時間前</span>
      </div>
      <h3 className="text-neutral-900 dark:text-white text-base font-bold leading-snug line-clamp-2">渋谷周辺で評判の良い皮膚科を探しています。アトピー性皮膚炎で...</h3>
      </div>
      </div>
      </div>
      <div className="flex items-center justify-between mt-1 pt-3 border-t border-gray-100 dark:border-gray-700/50">
      <div className="flex items-center gap-1 text-neutral-500 dark:text-neutral-400 text-xs">
      <Icon name="location_on" className="text-[16px]" size={16} />
      <span>東京都 渋谷区</span>
      </div>
      <button className="flex cursor-pointer items-center justify-center rounded-lg h-9 px-5 bg-primary hover:bg-primary/90 text-[#0d1b12] text-sm font-bold leading-normal transition-colors shadow-sm shadow-primary/20">
      <span className="truncate">回答する</span>
      </button>
      </div>
      </div>
      {/*  Card 3  */}
      <div className="flex flex-col gap-3 rounded-xl bg-white dark:bg-[#1a2e22] p-4 shadow-sm border border-gray-100 dark:border-gray-800">
      <div className="flex justify-between items-start gap-3">
      <div className="flex gap-3 items-start flex-1">
      <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-[48px] w-[48px] shrink-0 bg-gray-200 dark:bg-gray-700" data-alt="Abstract soft yellow gradient avatar placeholder" style={{ backgroundImage: '' }}  ><img src="/res_87E81BEF1922.png" alt="" className="absolute inset-0 w-full h-full object-cover" /></div>
      <div className="flex flex-col">
      <div className="flex items-center gap-2 mb-1">
      <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">内科</span>
      <span className="text-xs text-neutral-400 dark:text-neutral-500">3時間前</span>
      </div>
      <h3 className="text-neutral-900 dark:text-white text-base font-bold leading-snug line-clamp-2">インフルエンザの予防接種について質問です。妊娠中でも...</h3>
      </div>
      </div>
      </div>
      <div className="flex items-center justify-between mt-1 pt-3 border-t border-gray-100 dark:border-gray-700/50">
      <div className="flex items-center gap-1 text-neutral-500 dark:text-neutral-400 text-xs">
      <Icon name="location_on" className="text-[16px]" size={16} />
      <span>大阪府 大阪市</span>
      </div>
      <button className="flex cursor-pointer items-center justify-center rounded-lg h-9 px-5 bg-primary hover:bg-primary/90 text-[#0d1b12] text-sm font-bold leading-normal transition-colors shadow-sm shadow-primary/20">
      <span className="truncate">回答する</span>
      </button>
      </div>
      </div>
      {/*  Card 4  */}
      <div className="flex flex-col gap-3 rounded-xl bg-white dark:bg-[#1a2e22] p-4 shadow-sm border border-gray-100 dark:border-gray-800">
      <div className="flex justify-between items-start gap-3">
      <div className="flex gap-3 items-start flex-1">
      <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-[48px] w-[48px] shrink-0 bg-gray-200 dark:bg-gray-700" data-alt="Abstract soft pink gradient avatar placeholder" style={{ backgroundImage: '' }}  ><img src="/res_7ABA8D74A043.png" alt="" className="absolute inset-0 w-full h-full object-cover" /></div>
      <div className="flex flex-col">
      <div className="flex items-center gap-2 mb-1">
      <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">整形外科</span>
      <span className="text-xs text-neutral-400 dark:text-neutral-500">5時間前</span>
      </div>
      <h3 className="text-neutral-900 dark:text-white text-base font-bold leading-snug line-clamp-2">ランニング中に膝に痛みを感じるようになりました。サポーターは...</h3>
      </div>
      </div>
      </div>
      <div className="flex items-center justify-between mt-1 pt-3 border-t border-gray-100 dark:border-gray-700/50">
      <div className="flex items-center gap-1 text-neutral-500 dark:text-neutral-400 text-xs">
      <Icon name="location_on" className="text-[16px]" size={16} />
      <span>全国</span>
      </div>
      <button className="flex cursor-pointer items-center justify-center rounded-lg h-9 px-5 bg-primary hover:bg-primary/90 text-[#0d1b12] text-sm font-bold leading-normal transition-colors shadow-sm shadow-primary/20">
      <span className="truncate">回答する</span>
      </button>
      </div>
      </div>
      {/*  Load More Button  */}
      <div className="pt-2 pb-6 flex flex-col items-center gap-3">
      <button className="w-full py-3 text-primary font-bold text-sm bg-white dark:bg-gray-800 border border-primary/30 rounded-lg hover:bg-primary/5 transition-colors">
                          もっと見る
                      </button>
      <div className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-800 py-2 px-4 rounded-full">
      <Icon name="chat_bubble_outline" className="text-green-600 dark:text-primary text-[18px]" size={18} />
      <p className="text-xs font-medium text-neutral-600 dark:text-neutral-300">回答するにはLINEで登録が必要です</p>
      </div>
      </div>
      </main>
      {/*  Bottom Navigation  */}
      <nav className="fixed bottom-0 left-0 w-full bg-white dark:bg-[#0d1b12] border-t border-gray-100 dark:border-gray-800 pb-safe z-50">
      <div className="flex justify-between items-center px-6 h-16">
      <button className="flex flex-col items-center justify-center gap-1 w-14 text-neutral-400 dark:text-neutral-500 hover:text-primary transition-colors">
      <Icon name="home" className="text-[24px]" size={24} />
      <span className="text-[10px] font-medium">ホーム</span>
      </button>
      <button className="flex flex-col items-center justify-center gap-1 w-14 text-primary hover:text-primary transition-colors">
      <Icon name="forum" className="text-[24px] fill-current" size={24} />
      <span className="text-[10px] font-medium">質問一覧</span>
      </button>
      {/*  Center Action Button (Optional for emphasis, but sticking to standard nav for this request)  */}
      {/*  
                      <div className="relative -top-5">
                          <button className="flex items-center justify-center size-14 rounded-full bg-primary shadow-lg shadow-primary/30 text-[#0d1b12]">
                              <Icon name="add" className="text-[28px]" size={28} />
                          </button>
                      </div> 
                       */}
      <button className="flex flex-col items-center justify-center gap-1 w-14 text-neutral-400 dark:text-neutral-500 hover:text-primary transition-colors">
      <Icon name="edit_note" className="text-[24px]" size={24} />
      <span className="text-[10px] font-medium">回答</span>
      </button>
      <button className="flex flex-col items-center justify-center gap-1 w-14 text-neutral-400 dark:text-neutral-500 hover:text-primary transition-colors">
      <Icon name="person" className="text-[24px]" size={24} />
      <span className="text-[10px] font-medium">マイページ</span>
      </button>
      </div>
      {/*  iOS Home Indicator Placeholder  */}
      <div className="h-1 w-full bg-transparent"></div>
      </nav>
      </div>
    </>
  );
}
