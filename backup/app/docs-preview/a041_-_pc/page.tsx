import Icon from '../../../components/Icon';
import React from 'react';

export default function Page(){
  return (
    <>
      {/*  Sticky Header  */}
      <header className="sticky top-0 z-50 bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-sm border-b border-border-light dark:border-border-dark shadow-sm">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2">
      <div className="flex items-center justify-center size-8 rounded-lg bg-primary/20 text-primary-dark dark:text-primary">
      <Icon name="local_hospital" className="text-[24px]" size={24} />
      </div>
      <h1 className="font-display font-bold text-xl tracking-tight text-text-main-light dark:text-text-main-dark">Medily</h1>
      </div>
      {/*  Mobile Menu Icon (Placeholder)  */}
      <button className="p-2 text-text-main-light dark:text-text-main-dark hover:bg-black/5 dark:hover:bg-white/5 rounded-full">
      <Icon name="menu" />
      </button>
      </div>
      </header>
      <main className="flex-1 w-full max-w-lg md:max-w-4xl mx-auto flex flex-col pb-24">
      {/*  Page Title & Intro  */}
      <section className="px-4 pt-6 pb-2 text-center md:text-left">
      <h2 className="text-2xl font-bold text-text-main-light dark:text-text-main-dark mb-2">公開質問一覧</h2>
      <p className="text-sm text-text-sub-light dark:text-text-sub-dark">未回答の質問が一覧で表示されています。<br className="md:hidden"/>専門知識で回答をお待ちしています。</p>
      </section>
      {/*  Filter Section  */}
      <section className="px-4 py-4 sticky top-16 z-40 bg-background-light dark:bg-background-dark md:static md:bg-transparent">
      <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-xl shadow-card border border-border-light dark:border-border-dark">
      <div className="flex flex-col md:flex-row gap-3">
      {/*  Region Select  */}
      <div className="relative flex-1 group">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-sub-light dark:text-text-sub-dark pointer-events-none">
      <Icon name="location_on" className="text-[20px]" size={20} />
      </span>
      <select className="w-full appearance-none pl-10 pr-8 py-3 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 text-text-main-light dark:text-text-main-dark cursor-pointer hover:border-primary transition-colors">
      <option value="">全ての地域</option>
      <option value="tokyo">東京都</option>
      <option value="osaka">大阪府</option>
      <option value="fukuoka">福岡県</option>
      </select>
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-sub-light dark:text-text-sub-dark pointer-events-none">
    <Icon name="chevron_right" className="text-[20px]" size={20} />
      </span>
      </div>
      {/*  Category Select  */}
      <div className="relative flex-1 group">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-sub-light dark:text-text-sub-dark pointer-events-none">
      <Icon name="category" className="text-[20px]" size={20} />
      </span>
      <select className="w-full appearance-none pl-10 pr-8 py-3 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 text-text-main-light dark:text-text-main-dark cursor-pointer hover:border-primary transition-colors">
      <option value="">全ての診療科・カテゴリ</option>
      <option value="pediatrics">小児科</option>
      <option value="internal">内科</option>
      <option value="dermatology">皮膚科</option>
      <option value="ent">耳鼻咽喉科</option>
      </select>
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-sub-light dark:text-text-sub-dark pointer-events-none">
    <Icon name="chevron_right" className="text-[20px]" size={20} />
      </span>
      </div>
      </div>
      </div>
      </section>
      {/*  Results Counter  */}
      <div className="px-6 py-2 flex justify-between items-center text-sm text-text-sub-light dark:text-text-sub-dark font-medium">
      <span>未回答の質問</span>
      <span><strong className="text-text-main-light dark:text-text-main-dark">24</strong> 件</span>
      </div>
      {/*  Question List  */}
      <section className="px-4 space-y-4 pb-8">
      {/*  Item 1  */}
      <article className="group bg-surface-light dark:bg-surface-dark rounded-xl p-5 shadow-soft border border-border-light dark:border-border-dark hover:border-primary/50 transition-all duration-200">
      <div className="flex justify-between items-start mb-3">
      <div className="flex items-center gap-2 flex-wrap">
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary-dark dark:text-primary border border-primary/20">
                                  小児科
                              </span>
      <span className="flex items-center text-xs text-text-sub-light dark:text-text-sub-dark">
      <Icon name="schedule" className="text-[14px] mr-1" size={14} /> 2023/10/24
                              </span>
      </div>
      </div>
      <h3 className="text-base md:text-lg font-bold text-text-main-light dark:text-text-main-dark leading-snug mb-3 group-hover:text-primary-dark dark:group-hover:text-primary transition-colors">
                          3日ほど前から子供が38度以上の熱を出しており、咳も止まりません。すぐに小児科に行くべきでしょうか？
                      </h3>
      <div className="flex items-center gap-2 mb-4 text-xs text-text-sub-light dark:text-text-sub-dark bg-background-light dark:bg-background-dark w-fit px-3 py-1.5 rounded-lg">
      <Icon name="person" className="text-[16px]" size={16} />
                          10歳未満 男性 • 保護者からの質問
                      </div>
      <div className="flex justify-end pt-2 border-t border-border-light dark:border-border-dark mt-2">
      <a role="button" href="#oauth" className="flex items-center justify-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary-dark text-surface-dark font-bold text-sm rounded-lg transition-colors shadow-sm w-full md:w-auto active:scale-95 transform duration-100">
      <Icon name="edit_square" className="text-[18px]" size={18} />
                              回答する
                          </a>
      </div>
      </article>
      {/*  Item 2  */}
      <article className="group bg-surface-light dark:bg-surface-dark rounded-xl p-5 shadow-soft border border-border-light dark:border-border-dark hover:border-primary/50 transition-all duration-200">
      <div className="flex justify-between items-start mb-3">
      <div className="flex items-center gap-2 flex-wrap">
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border border-orange-200 dark:border-orange-800">
                                  皮膚科
                              </span>
      <span className="flex items-center text-xs text-text-sub-light dark:text-text-sub-dark">
      <Icon name="schedule" className="text-[14px] mr-1" size={14} /> 2023/10/24
                              </span>
      </div>
      </div>
      <h3 className="text-base md:text-lg font-bold text-text-main-light dark:text-text-main-dark leading-snug mb-3 group-hover:text-primary-dark dark:group-hover:text-primary transition-colors">
                          腕に赤い発疹が出て痒みがあります。市販薬で様子を見ても良いでしょうか？写真を添付できないのが残念ですが、腫れはありません。
                      </h3>
      <div className="flex items-center gap-2 mb-4 text-xs text-text-sub-light dark:text-text-sub-dark bg-background-light dark:bg-background-dark w-fit px-3 py-1.5 rounded-lg">
      <Icon name="person" className="text-[16px]" size={16} />
                          30代 女性 • 本人
                      </div>
      <div className="flex justify-end pt-2 border-t border-border-light dark:border-border-dark mt-2">
      <a href="#oauth" className="flex items-center justify-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary-dark text-surface-dark font-bold text-sm rounded-lg transition-colors shadow-sm w-full md:w-auto active:scale-95 transform duration-100">
      <Icon name="edit_square" className="text-[18px]" size={18} />
                              回答する
                          </a>
      </div>
      </article>
      {/*  Item 3  */}
      <article className="group bg-surface-light dark:bg-surface-dark rounded-xl p-5 shadow-soft border border-border-light dark:border-border-dark hover:border-primary/50 transition-all duration-200">
      <div className="flex justify-between items-start mb-3">
      <div className="flex items-center gap-2 flex-wrap">
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                                  内科
                              </span>
      <span className="flex items-center text-xs text-text-sub-light dark:text-text-sub-dark">
      <Icon name="schedule" className="text-[14px] mr-1" size={14} /> 2023/10/23
                              </span>
      </div>
      </div>
      <h3 className="text-base md:text-lg font-bold text-text-main-light dark:text-text-main-dark leading-snug mb-3 group-hover:text-primary-dark dark:group-hover:text-primary transition-colors">
                          食後に胃がキリキリと痛みます。特に油っぽいものを食べた後に顕著です。市販の胃薬を飲んでも改善しません。
                      </h3>
      <div className="flex items-center gap-2 mb-4 text-xs text-text-sub-light dark:text-text-sub-dark bg-background-light dark:bg-background-dark w-fit px-3 py-1.5 rounded-lg">
      <Icon name="person" className="text-[16px]" size={16} />
                          40代 男性 • 本人
                      </div>
      <div className="flex justify-end pt-2 border-t border-border-light dark:border-border-dark mt-2">
      <a href="#oauth" className="flex items-center justify-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary-dark text-surface-dark font-bold text-sm rounded-lg transition-colors shadow-sm w-full md:w-auto active:scale-95 transform duration-100">
      <Icon name="edit_square" className="text-[18px]" size={18} />
                              回答する
                          </a>
      </div>
      </article>
      {/*  Item 4  */}
      <article className="group bg-surface-light dark:bg-surface-dark rounded-xl p-5 shadow-soft border border-border-light dark:border-border-dark hover:border-primary/50 transition-all duration-200">
      <div className="flex justify-between items-start mb-3">
      <div className="flex items-center gap-2 flex-wrap">
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border border-purple-200 dark:border-purple-800">
                                  婦人科
                              </span>
      <span className="flex items-center text-xs text-text-sub-light dark:text-text-sub-dark">
      <Icon name="schedule" className="text-[14px] mr-1" size={14} /> 2023/10/23
                              </span>
      </div>
      </div>
      <h3 className="text-base md:text-lg font-bold text-text-main-light dark:text-text-main-dark leading-snug mb-3 group-hover:text-primary-dark dark:group-hover:text-primary transition-colors">
                          生理痛がひどく、日常生活に支障が出ています。ピルの服用を検討していますが、副作用が心配です。
                      </h3>
      <div className="flex items-center gap-2 mb-4 text-xs text-text-sub-light dark:text-text-sub-dark bg-background-light dark:bg-background-dark w-fit px-3 py-1.5 rounded-lg">
      <Icon name="person" className="text-[16px]" size={16} />
                          20代 女性 • 本人
                      </div>
      <div className="flex justify-end pt-2 border-t border-border-light dark:border-border-dark mt-2">
      <a href="#oauth" className="flex items-center justify-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary-dark text-surface-dark font-bold text-sm rounded-lg transition-colors shadow-sm w-full md:w-auto active:scale-95 transform duration-100">
      <Icon name="edit_square" className="text-[18px]" size={18} />
                              回答する
                          </a>
      </div>
      </article>
      {/*  Loading Spinner / Pagination  */}
      <div className="flex justify-center py-6">
      <button className="text-primary-dark dark:text-primary text-sm font-semibold flex items-center gap-2 hover:underline">
                          もっと見る
                          <Icon name="chevron_right" />
      </button>
      </div>
      {/*  Login Prompt Banner (Inline at bottom of feed)  */}
      <div className="mt-4 bg-surface-light dark:bg-surface-dark border-2 border-primary/20 rounded-xl p-6 text-center shadow-sm">
      <div className="inline-flex items-center justify-center size-12 bg-primary/10 rounded-full mb-3 text-primary-dark dark:text-primary">
      <Icon name="lock" className="text-[28px]" size={28} />
      </div>
      <h3 className="text-lg font-bold text-text-main-light dark:text-text-main-dark mb-2">回答するには登録が必要です</h3>
      <p className="text-sm text-text-sub-light dark:text-text-sub-dark mb-4">
                          医療従事者の方のみ回答いただけます。<br/>LINEアカウントで簡単に登録・ログインできます。
                      </p>
      <a href="#oauth" className="w-full bg-[#06C755] hover:bg-[#05b34c] text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm">
      {/*  LINE logo replacement with material icon for chat bubble as placeholder, but styled green  */}
      <Icon name="chat_bubble" className="fill-current" />
                          LINEでログイン・登録
                      </a>
      </div>
      </section>
      </main>
      {/*  Bottom Navigation Footer (Mobile Style)  */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark pb-safe">
      <nav className="flex justify-around items-center h-16 max-w-lg mx-auto md:max-w-4xl">
      <a className="flex flex-col items-center justify-center w-full h-full text-text-sub-light dark:text-text-sub-dark hover:text-primary-dark dark:hover:text-primary transition-colors" href="#">
      <Icon name="home" className="text-[24px]" size={24} />
      <span className="text-[10px] font-medium mt-1">ホーム</span>
      </a>
      <a className="flex flex-col items-center justify-center w-full h-full text-primary-dark dark:text-primary font-bold" href="#">
      <Icon name="forum" className="filled-icon text-[24px]" size={24} />
      <span className="text-[10px] font-medium mt-1">質問一覧</span>
      </a>
      <a className="flex flex-col items-center justify-center w-full h-full text-text-sub-light dark:text-text-sub-dark hover:text-primary-dark dark:hover:text-primary transition-colors" href="#">
      <Icon name="notifications" className="text-[24px]" size={24} />
      <span className="text-[10px] font-medium mt-1">通知</span>
      </a>
      <a className="flex flex-col items-center justify-center w-full h-full text-text-sub-light dark:text-text-sub-dark hover:text-primary-dark dark:hover:text-primary transition-colors" href="#">
      <Icon name="person" className="text-[24px]" size={24} />
      <span className="text-[10px] font-medium mt-1">マイページ</span>
      </a>
      </nav>
      </footer>
      {/*  Safe area spacing for mobile bottom nav  */}
      <div className="h-16"></div>
    </>
  );
}
