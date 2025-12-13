import Icon from '../../../components/Icon';
import React from 'react';

export default function Page(){
  return (
    <>
      <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden pb-[90px]"> {/*  Padding bottom for Nav Bar  */}
      {/*  TopAppBar  */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-border-light dark:border-border-dark">
      <div className="flex items-center gap-2">
      <div className="flex items-center justify-center size-8 rounded-lg bg-primary/20 text-primary">
      <Icon name="local_hospital" className="text-[24px]" size={24} />
      </div>
      <h1 className="text-xl font-bold tracking-tight text-text-main-light dark:text-text-main-dark">Medily</h1>
      </div>
      <div className="flex items-center gap-3">
      <button className="relative flex items-center justify-center size-10 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-text-main-light dark:text-text-main-dark">
      <Icon name="notifications" className="text-[24px]" size={24} />
      <span className="absolute top-2 right-2 size-2 rounded-full bg-red-500 border border-background-light dark:border-background-dark"></span>
      </button>
      <button className="flex items-center justify-center size-10 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-text-main-light dark:text-text-main-dark">
      <Icon name="settings" className="text-[24px]" size={24} />
      </button>
      </div>
      </header>
      {/*  Greeting Section  */}
      <section className="px-4 pt-6 pb-2">
      <p className="text-sm font-medium text-text-sub-light dark:text-text-sub-dark mb-1">2023年10月24日 (火)</p>
      <h2 className="text-2xl font-bold leading-tight text-text-main-light dark:text-text-main-dark">
                      こんにちは、<br/>田中さん 👋
                  </h2>
      </section>
      {/*  Primary Action Button  */}
      <section className="px-4 py-4">
      <button className="group relative w-full overflow-hidden rounded-2xl bg-primary hover:bg-primary-dark transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-primary/40 p-1">
      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="flex h-14 items-center justify-center gap-3 px-6">
      <Icon name="add_circle" className="text-[#0d1b12] text-[28px]" size={28} />
      <span className="text-lg font-bold text-[#0d1b12] tracking-wide">質問を投稿する</span>
      </div>
      </button>
      </section>
      {/*  Stats / Dashboard Links  */}
      <section className="px-4 py-2">
      <div className="grid grid-cols-2 gap-3">
      {/*  My Questions Stats  */}
      <a className="flex flex-col gap-3 rounded-2xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark p-5 shadow-sm hover:shadow-md transition-shadow group" href="#">
      <div className="flex items-center justify-between">
      <div className="flex items-center justify-center size-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
      <Icon name="help" />
      </div>
      <Icon name="arrow_forward_ios" className="text-text-sub-light dark:text-text-sub-dark group-hover:text-primary transition-colors text-sm" />
      </div>
      <div>
      <p className="text-sm font-medium text-text-sub-light dark:text-text-sub-dark">自分の質問</p>
      <div className="flex items-baseline gap-2 mt-1">
      <span className="text-3xl font-bold text-text-main-light dark:text-text-main-dark tracking-tight">3</span>
      <span className="text-sm font-bold text-primary">+1件</span>
      </div>
      </div>
      </a>
      {/*  My Answers Stats  */}
      <a className="flex flex-col gap-3 rounded-2xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark p-5 shadow-sm hover:shadow-md transition-shadow group" href="#">
      <div className="flex items-center justify-between">
      <div className="flex items-center justify-center size-10 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
      <Icon name="forum" />
      </div>
      <Icon name="arrow_forward_ios" className="text-text-sub-light dark:text-text-sub-dark group-hover:text-primary transition-colors text-sm" />
      </div>
      <div>
      <p className="text-sm font-medium text-text-sub-light dark:text-text-sub-dark">自分の回答</p>
      <div className="flex items-baseline gap-2 mt-1">
      <span className="text-3xl font-bold text-text-main-light dark:text-text-main-dark tracking-tight">12</span>
      <span className="text-sm font-bold text-primary">+2件</span>
      </div>
      </div>
      </a>
      </div>
      </section>
      {/*  Recent Activity List  */}
      <section className="px-4 py-4 mt-2">
      <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-bold text-text-main-light dark:text-text-main-dark">最近のアクティビティ</h3>
      <a className="text-sm font-bold text-primary hover:text-primary-dark transition-colors flex items-center gap-1" href="#">
                          すべて見る
                          <Icon name="arrow_forward" className="text-[16px]" size={16} />
      </a>
      </div>
      <div className="flex flex-col gap-3">
      {/*  Card 1: Answered  */}
      <div className="flex flex-col gap-3 rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark p-4 shadow-sm active:scale-[0.99] transition-transform cursor-pointer">
      <div className="flex justify-between items-start gap-3">
      <h4 className="font-bold text-text-main-light dark:text-text-main-dark leading-snug line-clamp-2">
                                  3日前から続く頭痛について相談です。市販薬を飲んでも改善しません。
                              </h4>
      <span className="shrink-0 inline-flex items-center rounded-md bg-primary/20 px-2 py-1 text-xs font-bold text-primary-dark dark:text-primary ring-1 ring-inset ring-primary/30">
                                  回答あり
                              </span>
      </div>
      <div className="flex items-center justify-between text-xs text-text-sub-light dark:text-text-sub-dark mt-1">
      <div className="flex items-center gap-2">
      <span className="flex items-center gap-1">
      <Icon name="calendar_today" className="text-[14px]" size={14} />
                                      2023/10/22
                                  </span>
      <span className="flex items-center gap-1">
      <Icon name="chat_bubble" className="text-[14px]" size={14} />
                                      2
                                  </span>
      </div>
      <span className="font-medium text-text-main-light dark:text-text-main-dark">内科</span>
      </div>
      </div>
      {/*  Card 2: Matching  */}
      <div className="flex flex-col gap-3 rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark p-4 shadow-sm active:scale-[0.99] transition-transform cursor-pointer">
      <div className="flex justify-between items-start gap-3">
      <h4 className="font-bold text-text-main-light dark:text-text-main-dark leading-snug line-clamp-2">
                                  渋谷区周辺で、アトピー治療に評判の良い皮膚科を探しています。
                              </h4>
      <span className="shrink-0 inline-flex items-center rounded-md bg-blue-50 dark:bg-blue-900/20 px-2 py-1 text-xs font-bold text-blue-700 dark:text-blue-300 ring-1 ring-inset ring-blue-700/10 dark:ring-blue-400/20">
                                  マッチング中
                              </span>
      </div>
      <div className="flex items-center justify-between text-xs text-text-sub-light dark:text-text-sub-dark mt-1">
      <div className="flex items-center gap-2">
      <span className="flex items-center gap-1">
      <Icon name="calendar_today" className="text-[14px]" size={14} />
                                      2023/10/24
                                  </span>
      <span className="flex items-center gap-1">
      <Icon name="chat_bubble" className="text-[14px]" size={14} />
                                      0
                                  </span>
      </div>
      <span className="font-medium text-text-main-light dark:text-text-main-dark">皮膚科</span>
      </div>
      </div>
      {/*  Card 3: Resolved (Closed)  */}
      <div className="flex flex-col gap-3 rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark p-4 shadow-sm active:scale-[0.99] transition-transform cursor-pointer opacity-70">
      <div className="flex justify-between items-start gap-3">
      <h4 className="font-bold text-text-main-light dark:text-text-main-dark leading-snug line-clamp-2">
                                  インフルエンザ予防接種の時期について
                              </h4>
      <span className="shrink-0 inline-flex items-center rounded-md bg-gray-100 dark:bg-gray-800 px-2 py-1 text-xs font-bold text-gray-600 dark:text-gray-400 ring-1 ring-inset ring-gray-500/10 dark:ring-gray-400/20">
                                  解決済み
                              </span>
      </div>
      <div className="flex items-center justify-between text-xs text-text-sub-light dark:text-text-sub-dark mt-1">
      <div className="flex items-center gap-2">
      <span className="flex items-center gap-1">
      <Icon name="calendar_today" className="text-[14px]" size={14} />
                                      2023/10/10
                                  </span>
      </div>
      <span className="font-medium text-text-main-light dark:text-text-main-dark">一般</span>
      </div>
      </div>
      </div>
      </section>
      </div>
      {/*  Bottom Navigation Bar  */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark pb-safe">
      <div className="flex items-center justify-around h-[80px] pb-4">
      {/*  Home (Active)  */}
      <button className="flex flex-col items-center justify-center w-full h-full gap-1 text-primary">
      <Icon name="home" className="filled text-[26px]" size={26} />
      <span className="text-[10px] font-bold">ホーム</span>
      </button>
      {/*  Questions  */}
      <button className="flex flex-col items-center justify-center w-full h-full gap-1 text-text-sub-light dark:text-text-sub-dark hover:text-text-main-light dark:hover:text-text-main-dark transition-colors">
      <Icon name="chat_bubble_outline" className="text-[26px]" size={26} />
      <span className="text-[10px] font-medium">質問</span>
      </button>
      {/*  Answers  */}
      <button className="flex flex-col items-center justify-center w-full h-full gap-1 text-text-sub-light dark:text-text-sub-dark hover:text-text-main-light dark:hover:text-text-main-dark transition-colors">
      <Icon name="check_circle_outline" className="text-[26px]" size={26} />
      <span className="text-[10px] font-medium">回答</span>
      </button>
      {/*  My Page  */}
      <button className="flex flex-col items-center justify-center w-full h-full gap-1 text-text-sub-light dark:text-text-sub-dark hover:text-text-main-light dark:hover:text-text-main-dark transition-colors">
      <Icon name="person_outline" className="text-[26px]" size={26} />
      <span className="text-[10px] font-medium">マイページ</span>
      </button>
      </div>
      </nav>
      {/*  Safe area padding fix for iOS bottom bar  */}
      <style dangerouslySetInnerHTML={{ __html: `
              .pb-safe {
                  padding-bottom: env(safe-area-inset-bottom, 20px);
              }
          ` }} />
    </>
  );
}
