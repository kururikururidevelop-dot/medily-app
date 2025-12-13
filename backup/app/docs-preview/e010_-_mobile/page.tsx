import Icon from '../../../components/Icon';
import React from 'react';

export default function Page(){
  return (
    <>
      <div className="relative flex h-full min-h-screen w-full flex-col max-w-md mx-auto bg-background-light dark:bg-background-dark shadow-xl overflow-hidden">
      {/*  Header  */}
      <header className="sticky top-0 z-10 flex items-center bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm p-4 pb-2 justify-between border-b border-border-light dark:border-border-dark">
      <div className="flex flex-col">
      <span className="text-xs font-bold text-primary tracking-wider uppercase mb-0.5">Medily</span>
      <h2 className="text-text-main-light dark:text-text-main-dark text-2xl font-bold leading-tight tracking-[-0.015em]">自分の質問</h2>
      </div>
      <div className="flex items-center justify-end gap-2">
      <button className="flex items-center justify-center rounded-full size-10 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-text-main-light dark:text-text-main-dark hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
      <Icon name="search" />
      </button>
      <button className="flex items-center justify-center rounded-full size-10 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-text-main-light dark:text-text-main-dark hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
      <Icon name="settings" />
      </button>
      </div>
      </header>
      {/*  Filter Chips (Horizontal Scroll)  */}
      <div className="sticky top-[73px] z-10 bg-background-light dark:bg-background-dark py-3 border-b border-border-light dark:border-border-dark">
      <div className="flex gap-2 px-4 overflow-x-auto hide-scrollbar snap-x">
      {/*  Active Filter  */}
      <button className="flex h-9 shrink-0 snap-start items-center justify-center gap-x-2 rounded-full bg-primary text-primary-content px-4 transition-transform active:scale-95">
      <Icon name="check_circle" />
      <span className="text-sm font-bold leading-normal">すべて</span>
      </button>
      {/*  Inactive Filters  */}
      <button className="flex h-9 shrink-0 snap-start items-center justify-center gap-x-2 rounded-full bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-text-main-light dark:text-text-main-dark px-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors active:scale-95">
      <Icon name="forum" className="text-text-sub-light dark:text-text-sub-dark" />
      <span className="text-sm font-medium leading-normal">質問中</span>
      </button>
      <button className="flex h-9 shrink-0 snap-start items-center justify-center gap-x-2 rounded-full bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-text-main-light dark:text-text-main-dark px-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors active:scale-95">
      <Icon name="chat_bubble" className="text-text-sub-light dark:text-text-sub-dark" />
      <span className="text-sm font-medium leading-normal">回答あり</span>
      </button>
      <button className="flex h-9 shrink-0 snap-start items-center justify-center gap-x-2 rounded-full bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-text-main-light dark:text-text-main-dark px-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors active:scale-95">
      <Icon name="task_alt" className="text-text-sub-light dark:text-text-sub-dark" />
      <span className="text-sm font-medium leading-normal">解決済み</span>
      </button>
      </div>
      </div>
      {/*  Scrollable Content Area  */}
      <main className="flex-1 overflow-y-auto pb-24 px-4 pt-4 space-y-4">
      {/*  List Item 1: Answered (Highlight)  */}
      <article className="bg-surface-light dark:bg-surface-dark rounded-xl p-4 shadow-sm border border-border-light dark:border-border-dark active:scale-[0.99] transition-transform cursor-pointer group">
      <div className="flex items-start justify-between gap-3 mb-2">
      <div className="flex items-center gap-2">
      <div className="flex items-center justify-center size-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
      <Icon name="child_care" />
      </div>
      <span className="text-xs font-semibold text-text-sub-light dark:text-text-sub-dark bg-background-light dark:bg-background-dark px-2 py-1 rounded-md">小児科</span>
      </div>
      <span className="inline-flex items-center gap-1 rounded-full bg-primary/20 dark:bg-primary/30 px-2.5 py-0.5 text-xs font-bold text-primary-content dark:text-primary">
      <span className="size-1.5 rounded-full bg-primary animate-pulse"></span>
                              回答あり
                          </span>
      </div>
      <h3 className="text-base font-bold text-text-main-light dark:text-text-main-dark leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          子供の発熱が3日続いています。座薬を使っても熱が下がりきらず心配です。
                      </h3>
      <div className="flex items-center justify-between text-xs text-text-sub-light dark:text-text-sub-dark mt-3 pt-3 border-t border-border-light dark:border-border-dark border-dashed">
      <div className="flex items-center gap-3">
      <span className="flex items-center gap-1">
      <Icon name="calendar_today" />
                                  2023/10/24
                              </span>
      <span className="flex items-center gap-1 text-primary font-medium">
      <Icon name="forum" />
                                  回答 2件
                              </span>
      </div>
      <Icon name="chevron_right" className="text-gray-300 dark:text-gray-600" />
      </div>
      </article>
      {/*  List Item 2: Active Question  */}
      <article className="bg-surface-light dark:bg-surface-dark rounded-xl p-4 shadow-sm border border-border-light dark:border-border-dark active:scale-[0.99] transition-transform cursor-pointer group">
      <div className="flex items-start justify-between gap-3 mb-2">
      <div className="flex items-center gap-2">
      <div className="flex items-center justify-center size-8 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400">
      <Icon name="neurology" />
      </div>
      <span className="text-xs font-semibold text-text-sub-light dark:text-text-sub-dark bg-background-light dark:bg-background-dark px-2 py-1 rounded-md">脳神経外科</span>
      </div>
      <span className="inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-800 px-2.5 py-0.5 text-xs font-medium text-text-sub-light dark:text-text-sub-dark">
                              質問中
                          </span>
      </div>
      <h3 className="text-base font-bold text-text-main-light dark:text-text-main-dark leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          最近、偏頭痛がひどいのですが、何科を受診すべきでしょうか？市販薬も効きません。
                      </h3>
      <div className="flex items-center justify-between text-xs text-text-sub-light dark:text-text-sub-dark mt-3 pt-3 border-t border-border-light dark:border-border-dark border-dashed">
      <div className="flex items-center gap-3">
      <span className="flex items-center gap-1">
      <Icon name="calendar_today" />
                                  2023/10/24
                              </span>
      <span className="flex items-center gap-1">
      <Icon name="hourglass_empty" />
                                  回答募集中
                              </span>
      </div>
      <Icon name="chevron_right" className="text-gray-300 dark:text-gray-600" />
      </div>
      </article>
      {/*  List Item 3: Resolved  */}
      <article className="bg-surface-light dark:bg-surface-dark rounded-xl p-4 shadow-sm border border-border-light dark:border-border-dark active:scale-[0.99] transition-transform cursor-pointer group opacity-80 hover:opacity-100">
      <div className="flex items-start justify-between gap-3 mb-2">
      <div className="flex items-center gap-2">
      <div className="flex items-center justify-center size-8 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
      <Icon name="medical_services" />
      </div>
      <span className="text-xs font-semibold text-text-sub-light dark:text-text-sub-dark bg-background-light dark:bg-background-dark px-2 py-1 rounded-md">内科</span>
      </div>
      <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 dark:bg-gray-700 px-2.5 py-0.5 text-xs font-medium text-gray-500 dark:text-gray-400">
      <Icon name="check" />
                              解決済み
                          </span>
      </div>
      <h3 className="text-base font-bold text-text-main-light dark:text-text-main-dark leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          インフルエンザワクチンの接種時期について、10月中が良いと聞きましたが本当ですか？
                      </h3>
      <div className="flex items-center justify-between text-xs text-text-sub-light dark:text-text-sub-dark mt-3 pt-3 border-t border-border-light dark:border-border-dark border-dashed">
      <div className="flex items-center gap-3">
      <span className="flex items-center gap-1">
      <Icon name="calendar_today" />
                                  2023/10/15
                              </span>
      </div>
      <Icon name="chevron_right" className="text-gray-300 dark:text-gray-600" />
      </div>
      </article>
      {/*  List Item 4: Resolved  */}
      <article className="bg-surface-light dark:bg-surface-dark rounded-xl p-4 shadow-sm border border-border-light dark:border-border-dark active:scale-[0.99] transition-transform cursor-pointer group opacity-80 hover:opacity-100">
      <div className="flex items-start justify-between gap-3 mb-2">
      <div className="flex items-center gap-2">
      <div className="flex items-center justify-center size-8 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
      <Icon name="dermatology" />
      </div>
      <span className="text-xs font-semibold text-text-sub-light dark:text-text-sub-dark bg-background-light dark:bg-background-dark px-2 py-1 rounded-md">皮膚科</span>
      </div>
      <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 dark:bg-gray-700 px-2.5 py-0.5 text-xs font-medium text-gray-500 dark:text-gray-400">
      <Icon name="check" />
                              解決済み
                          </span>
      </div>
      <h3 className="text-base font-bold text-text-main-light dark:text-text-main-dark leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          腕に赤い発疹が出て痒みが止まりません。
                      </h3>
      <div className="flex items-center justify-between text-xs text-text-sub-light dark:text-text-sub-dark mt-3 pt-3 border-t border-border-light dark:border-border-dark border-dashed">
      <div className="flex items-center gap-3">
      <span className="flex items-center gap-1">
      <Icon name="calendar_today" />
                                  2023/09/28
                              </span>
      </div>
      <Icon name="chevron_right" className="text-gray-300 dark:text-gray-600" />
      </div>
      </article>
      {/*  Load More  */}
      <div className="pt-2 flex justify-center">
      <button className="text-sm font-medium text-text-sub-light dark:text-text-sub-dark hover:text-primary transition-colors flex items-center gap-1">
                          もっと見る
                          <Icon name="chevron_right" />
      </button>
      </div>
      </main>
      {/*  Floating Action Button (New Question)  */}
      <button className="absolute bottom-24 right-4 z-20 size-14 rounded-full bg-primary text-primary-content shadow-lg flex items-center justify-center hover:bg-green-400 transition-colors active:scale-90">
      <Icon name="add" />
      </button>
      {/*  Bottom Navigation  */}
      <nav className="sticky bottom-0 z-30 w-full bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark bottom-nav-safe-area">
      <div className="flex items-center justify-around h-16">
      {/*  Home  */}
      <button className="flex flex-col items-center justify-center w-full h-full gap-1 text-text-sub-light dark:text-text-sub-dark hover:bg-gray-50 dark:hover:bg-gray-800/50">
      <Icon name="home" />
      <span className="text-[10px] font-medium">ホーム</span>
      </button>
      {/*  Questions (Active)  */}
      <button className="flex flex-col items-center justify-center w-full h-full gap-1 text-primary dark:text-primary relative">
      <span className="absolute top-2 bg-primary/10 rounded-full w-12 h-8 -z-10"></span>
      <Icon name="help" className="fill-current" />
      <span className="text-[10px] font-bold">質問</span>
      </button>
      {/*  Answers  */}
      <button className="flex flex-col items-center justify-center w-full h-full gap-1 text-text-sub-light dark:text-text-sub-dark hover:bg-gray-50 dark:hover:bg-gray-800/50">
      <Icon name="medication_liquid" />
      <span className="text-[10px] font-medium">回答</span>
      </button>
      {/*  My Page  */}
      <button className="flex flex-col items-center justify-center w-full h-full gap-1 text-text-sub-light dark:text-text-sub-dark hover:bg-gray-50 dark:hover:bg-gray-800/50">
      <Icon name="person" />
      <span className="text-[10px] font-medium">マイページ</span>
      </button>
      </div>
      </nav>
      </div>
    </>
  );
}
