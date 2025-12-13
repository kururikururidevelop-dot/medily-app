import Icon from '../../../components/Icon';
import React from 'react';

export default function Page(){
  return (
    <>
      <header className="sticky top-0 z-50 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-between px-4 h-16 w-full max-w-desktop mx-auto">
      <div className="flex items-center gap-2">
      <div className="flex items-center justify-center size-8 rounded-lg bg-primary text-black">
      <Icon name="medical_services" className="text-[20px]" size={20} />
      </div>
      <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white hidden sm:block">Medily</span>
      </div>
      <div className="flex items-center gap-3">
      <button className="relative p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
      <Icon name="notifications" />
      <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-background-light dark:border-background-dark"></span>
      </button>
      <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
      <Icon name="settings" />
      </button>
      </div>
      </div>
      </header>
      <main className="w-full max-w-desktop mx-auto px-4 pt-4 flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white px-1">マイページ</h1>
      <section className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800/50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-primary/10 to-transparent"></div>
      <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-6">
      <div className="relative flex-shrink-0">
      <div className="size-24 rounded-full border-4 border-surface-light dark:border-surface-dark shadow-md bg-cover bg-center" data-alt="User profile avatar showing a smiling person" style={{ backgroundImage: '' }}  ><img src="/res_D1CB9CD35F7B.png" alt="" className="absolute inset-0 w-full h-full object-cover" /></div>
      <button className="absolute bottom-0 right-0 size-8 bg-surface-light dark:bg-gray-700 rounded-full shadow border border-gray-200 dark:border-gray-600 flex items-center justify-center text-primary hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
      <Icon name="photo_camera" className="text-[16px]" size={16} />
      </button>
      </div>
      <div className="flex-1 text-center sm:text-left pt-2 space-y-3">
      <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">山田 太郎</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400">@taro_yamada</p>
      </div>
      <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
      <Icon name="location_on" className="text-[14px]" size={14} />
                                  東京都
                              </span>
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
      <Icon name="person" className="text-[14px]" size={14} />
                                  30代男性
                              </span>
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-medium bg-primary/10 text-green-700 dark:text-green-300 border border-primary/20">
      <Icon name="verified" className="text-[14px] icon-filled" size={14} />
                                  プレミアム
                              </span>
      </div>
      </div>
      </div>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800/50 flex flex-col justify-between">
      <div className="flex justify-between items-start mb-2">
      <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
      <Icon name="military_tech" className="text-yellow-500 icon-filled" />
                              回答ランク
                          </h3>
      <a className="text-xs font-medium text-primary hover:text-primary-dark transition-colors" href="#">詳細</a>
      </div>
      <div className="flex items-center gap-6 mt-2">
      <div className="relative size-20 flex-shrink-0">
      <svg className="size-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
      <path className="text-gray-100 dark:text-gray-800" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3"></path>
      <path className="text-primary drop-shadow-[0_0_4px_rgba(19,236,91,0.4)]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="75, 100" strokeLinecap="round" strokeWidth="3"></path>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Rank</span>
      <span className="text-lg font-black text-gray-900 dark:text-white leading-none">A</span>
      </div>
      </div>
      <div className="flex flex-col gap-1">
      <div className="text-xs text-gray-500 dark:text-gray-400">次のランクまで</div>
      <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5 w-24 mb-1">
      <div className="bg-primary h-1.5 rounded-full" style={{ width: '75%' }}></div>
      </div>
      <p className="text-xs font-medium text-gray-700 dark:text-gray-300">あと <span className="text-primary font-bold">120</span> pt</p>
      </div>
      </div>
      </div>
      <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800/50 flex flex-col justify-center">
      <div className="flex items-center gap-3 mb-4">
      <div className="p-2 bg-pink-50 dark:bg-pink-900/20 rounded-lg text-pink-500">
      <Icon name="favorite" className="icon-filled" />
      </div>
      <div>
      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">獲得サンキュー数</p>
      <p className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">3,842</p>
      </div>
      </div>
      <a className="flex items-center justify-between w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group border border-gray-100 dark:border-gray-700" href="#">
      <div className="flex items-center gap-2">
      <Icon name="chat" className="text-gray-400 dark:text-gray-500 text-sm" />
      <span className="text-sm font-bold text-gray-700 dark:text-gray-200">回答一覧を見る</span>
      </div>
      <Icon name="chevron_right" className="text-gray-400 text-sm group-hover:translate-x-0.5 transition-transform" />
      </a>
      </div>
      </section>
      <section>
      <h3 className="px-1 mb-2 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">メニュー</h3>
      <div className="flex flex-col bg-surface-light dark:bg-surface-dark rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800/50">
      <button className="flex items-center gap-4 p-4 w-full text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
      <div className="flex items-center justify-center size-9 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shrink-0">
      <Icon name="edit" className="text-[20px]" size={20} />
      </div>
      <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">プロフィール編集</p>
      </div>
      <Icon name="chevron_right" className="text-gray-400 dark:text-gray-500 group-hover:text-primary transition-colors" />
      </button>
      <div className="h-px w-full bg-gray-100 dark:bg-gray-800 ml-16"></div>
      <button className="flex items-center gap-4 p-4 w-full text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
      <div className="flex items-center justify-center size-9 rounded-full bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 shrink-0">
      <Icon name="notifications_active" className="text-[20px]" size={20} />
      </div>
      <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">通知設定</p>
      </div>
      <Icon name="chevron_right" className="text-gray-400 dark:text-gray-500 group-hover:text-primary transition-colors" />
      </button>
      <div className="h-px w-full bg-gray-100 dark:bg-gray-800 ml-16"></div>
      <button className="flex items-center gap-4 p-4 w-full text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
      <div className="flex items-center justify-center size-9 rounded-full bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 shrink-0">
      <Icon name="help" className="text-[20px]" size={20} />
      </div>
      <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">質問一覧</p>
      </div>
      <div className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-[10px] font-bold px-2 py-0.5 rounded-full mr-2">12件</div>
      <Icon name="chevron_right" className="text-gray-400 dark:text-gray-500 group-hover:text-primary transition-colors" />
      </button>
      <div className="h-px w-full bg-gray-100 dark:bg-gray-800 ml-16"></div>
      <button className="flex items-center gap-4 p-4 w-full text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
      <div className="flex items-center justify-center size-9 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 shrink-0">
      <Icon name="chat" className="text-[20px]" size={20} />
      </div>
      <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">回答一覧</p>
      </div>
      <div className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-[10px] font-bold px-2 py-0.5 rounded-full mr-2">5件</div>
      <Icon name="chevron_right" className="text-gray-400 dark:text-gray-500 group-hover:text-primary transition-colors" />
      </button>
      <div className="h-px w-full bg-gray-100 dark:bg-gray-800 ml-16"></div>
      <button className="flex items-center gap-4 p-4 w-full text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
      <div className="flex items-center justify-center size-9 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 shrink-0">
      <Icon name="settings_applications" className="text-[20px]" size={20} />
      </div>
      <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">設定画面</p>
      </div>
      <Icon name="chevron_right" className="text-gray-400 dark:text-gray-500 group-hover:text-primary transition-colors" />
      </button>
      </div>
      </section>
      <div className="pt-2 pb-8">
      <button className="w-full py-3.5 px-4 rounded-xl border border-red-200 dark:border-red-900/50 bg-surface-light dark:bg-surface-dark text-red-600 dark:text-red-400 font-bold text-sm shadow-sm hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center justify-center gap-2">
      <Icon name="logout" />
                      ログアウト
                  </button>
      <p className="text-center text-xs text-gray-400 mt-4">バージョン 1.0.2</p>
      </div>
      </main>
      <nav className="fixed bottom-0 left-0 w-full bg-surface-light dark:bg-surface-dark border-t border-gray-200 dark:border-gray-800 pb-safe z-40">
      <div className="flex justify-around items-center h-16 w-full max-w-desktop mx-auto px-2">
      <a className="flex flex-col items-center justify-center w-full h-full text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 gap-1" href="#">
      <Icon name="home" className="text-[24px]" size={24} />
      <span className="text-[10px] font-medium">ホーム</span>
      </a>
      <a className="flex flex-col items-center justify-center w-full h-full text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 gap-1" href="#">
      <Icon name="search" className="text-[24px]" size={24} />
      <span className="text-[10px] font-medium">さがす</span>
      </a>
      <div className="relative -top-5">
      <button className="flex items-center justify-center size-14 rounded-full bg-primary shadow-lg shadow-primary/40 text-black transform transition-transform hover:scale-105 active:scale-95">
      <Icon name="add" className="text-[28px] font-bold" size={28} />
      </button>
      </div>
      <a className="flex flex-col items-center justify-center w-full h-full text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 gap-1" href="#">
      <Icon name="chat_bubble_outline" className="text-[24px]" size={24} />
      <span className="text-[10px] font-medium">相談</span>
      </a>
      <a className="flex flex-col items-center justify-center w-full h-full text-primary dark:text-primary gap-1" href="#">
      <Icon name="person" className="text-[24px] icon-filled" size={24} />
      <span className="text-[10px] font-medium">マイページ</span>
      </a>
      </div>
      </nav>
      <style dangerouslySetInnerHTML={{ __html: `
              .pb-safe {
                  padding-bottom: env(safe-area-inset-bottom, 20px);
              }
          ` }} />
    </>
  );
}
