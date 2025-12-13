import Icon from '../../../components/Icon';
import React from 'react';

export default function Page(){
  return (
    <>
      {/*  Top Navigation Bar  */}
      <header className="sticky top-0 z-40 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-800/50 px-4 h-14 flex items-center justify-between transition-colors duration-300">
      <div className="flex items-center gap-2">
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary">
      <Icon name="medical_services" className="text-[20px]" size={20} />
      </div>
      <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Medily</h2>
      </div>
      <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300">
      <Icon name="settings" />
      </button>
      </header>
      {/*  Main Content  */}
      <main className="flex-1 w-full max-w-md mx-auto pb-24 px-4 pt-6">
      {/*  Page Title  */}
      <h1 className="text-3xl font-bold mb-8 px-1 text-gray-900 dark:text-white tracking-tight">通知設定</h1>
      {/*  Settings Group 1: Push Notifications  */}
      <div className="flex flex-col gap-4 mb-8">
      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 px-1 uppercase tracking-wider">アプリ内通知</h3>
      {/*  Item 1: Question Notifications  */}
      <div className="group flex flex-row items-center justify-between p-4 rounded-xl bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-800 shadow-sm hover:border-primary/50 transition-all duration-200">
      <div className="flex flex-col gap-0.5 pr-4">
      <p className="text-base font-bold text-gray-900 dark:text-white leading-tight">質問通知設定</p>
      <p className="text-sm font-normal text-gray-500 dark:text-gray-400 leading-normal">質問に関する更新を受け取る</p>
      </div>
      <label className="relative flex items-center cursor-pointer">
      <input checked className="sr-only peer" type="checkbox"/>
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
      </label>
      </div>
      {/*  Item 2: Answer Notifications  */}
      <div className="group flex flex-row items-center justify-between p-4 rounded-xl bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-800 shadow-sm hover:border-primary/50 transition-all duration-200">
      <div className="flex flex-col gap-0.5 pr-4">
      <p className="text-base font-bold text-gray-900 dark:text-white leading-tight">回答通知設定</p>
      <p className="text-sm font-normal text-gray-500 dark:text-gray-400 leading-normal">回答がついた時に通知する</p>
      </div>
      <label className="relative flex items-center cursor-pointer">
      <input checked className="sr-only peer" type="checkbox"/>
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
      </label>
      </div>
      {/*  Item 3: Re-Question Notifications  */}
      <div className="group flex flex-row items-center justify-between p-4 rounded-xl bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-800 shadow-sm hover:border-primary/50 transition-all duration-200">
      <div className="flex flex-col gap-0.5 pr-4">
      <p className="text-base font-bold text-gray-900 dark:text-white leading-tight">再質問通知設定</p>
      <p className="text-sm font-normal text-gray-500 dark:text-gray-400 leading-normal">再質問があった時に通知する</p>
      </div>
      <label className="relative flex items-center cursor-pointer">
      <input className="sr-only peer" type="checkbox"/>
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
      </label>
      </div>
      </div>
      {/*  Settings Group 2: External Integrations  */}
      <div className="flex flex-col gap-4 mb-8">
      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 px-1 uppercase tracking-wider">連携設定</h3>
      {/*  Item 4: LINE Integration  */}
      <div className="group flex flex-row items-center justify-between p-4 rounded-xl bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-800 shadow-sm hover:border-primary/50 transition-all duration-200">
      <div className="flex items-center gap-3 pr-4">
      {/*  LINE Logo (Simulated)  */}
      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#06C755] text-white shrink-0">
      <Icon name="chat_bubble" className="text-[24px]" size={24} />
      </div>
      <div className="flex flex-col gap-0.5">
      <p className="text-base font-bold text-gray-900 dark:text-white leading-tight">LINE通知許可</p>
      <p className="text-sm font-normal text-gray-500 dark:text-gray-400 leading-normal">重要な通知をLINEでも受け取れます</p>
      </div>
      </div>
      <div className="flex items-center h-6">
      <input className="w-6 h-6 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 transition-colors cursor-pointer" type="checkbox"/>
      </div>
      </div>
      </div>
      {/*  Action Buttons  */}
      <div className="flex flex-col gap-3 mt-8">
      <button className="w-full flex items-center justify-center h-12 rounded-xl bg-primary hover:bg-green-400 text-gray-900 text-base font-bold transition-all shadow-lg shadow-primary/20 active:scale-[0.98]">
                      設定保存
                  </button>
      <button className="w-full flex items-center justify-center h-12 rounded-xl bg-transparent border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white text-base font-bold transition-all active:scale-[0.98]">
                      キャンセル
                  </button>
      </div>
      </main>
      {/*  Bottom Navigation  */}
      <nav className="fixed bottom-0 w-full z-50 bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 pb-safe">
      <div className="flex justify-between items-center max-w-md mx-auto px-6 h-16">
      <button className="flex flex-col items-center justify-center gap-1 w-16 text-gray-400 hover:text-primary transition-colors">
      <Icon name="home" className="text-[24px]" size={24} />
      <span className="text-[10px] font-medium">ホーム</span>
      </button>
      <button className="flex flex-col items-center justify-center gap-1 w-16 text-gray-400 hover:text-primary transition-colors">
      <Icon name="help" className="text-[24px]" size={24} />
      <span className="text-[10px] font-medium">質問</span>
      </button>
      <button className="flex flex-col items-center justify-center gap-1 w-16 text-gray-400 hover:text-primary transition-colors">
      <Icon name="forum" className="text-[24px]" size={24} />
      <span className="text-[10px] font-medium">回答</span>
      </button>
      <button className="flex flex-col items-center justify-center gap-1 w-16 text-primary">
      <Icon name="person" className="text-[24px] fill-current" size={24} />
      <span className="text-[10px] font-medium">マイページ</span>
      </button>
      </div>
      {/*  Safe area spacing for iOS home indicator  */}
      <div className="h-1 w-full"></div>
      </nav>
      {/*  iOS Safe Area Padding Hack for Bottom Nav (if running in browser not catching pb-safe)  */}
      <style dangerouslySetInnerHTML={{ __html: `
              @supports (padding-bottom: env(safe-area-inset-bottom)) {
                  .pb-safe {
                      padding-bottom: env(safe-area-inset-bottom);
                  }
              }
          ` }} />
    </>
  );
}
