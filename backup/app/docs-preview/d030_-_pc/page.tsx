import Icon from '../../../components/Icon';
import React from 'react';

export default function Page(){
  return (
    <>
      {/*  Main Container  */}
      <div className="w-full max-w-[1024px] flex flex-col min-h-screen relative bg-background-light dark:bg-background-dark shadow-xl overflow-hidden">
      {/*  Header  */}
      <header className="sticky top-0 z-10 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-4 py-3 flex items-center justify-between transition-colors">
      <div className="flex items-center gap-2">
      <button aria-label="戻る" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-text-dark dark:text-text-light transition-colors">
      <Icon name="arrow_back" className="text-2xl" />
      </button>
      </div>
      <h1 className="text-lg font-bold text-text-dark dark:text-text-light absolute left-1/2 -translate-x-1/2 pointer-events-none">
                      通知設定
                  </h1>
      <div className="flex items-center gap-2">
      <button aria-label="メニュー" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-text-dark dark:text-text-light transition-colors">
      <Icon name="more_vert" className="text-2xl" />
      </button>
      </div>
      </header>
      {/*  Scrollable Content  */}
      <main className="flex-1 px-4 py-6 w-full max-w-2xl mx-auto pb-32">
      {/*  Page Title  */}
      <div className="mb-8 animate-fade-in-up">
      <h2 className="text-3xl font-bold text-text-dark dark:text-text-light tracking-tight mb-2">通知設定</h2>
      <p className="text-gray-500 dark:text-gray-400 text-sm">アプリ内および外部連携の通知設定を管理します。</p>
      </div>
      {/*  Section 1: In-App Notifications  */}
      <section className="mb-8">
      <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 px-2">
                          アプリ内通知
                      </h3>
      <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden divide-y divide-gray-100 dark:divide-gray-800">
      {/*  Item: Question Notification  */}
      <div className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
      <div className="flex items-center gap-4 flex-1 overflow-hidden">
      <div className="flex items-center justify-center shrink-0 size-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
      <Icon name="help" className="text-[24px]" size={24} />
      </div>
      <div className="flex flex-col min-w-0">
      <span className="text-base font-bold text-text-dark dark:text-text-light truncate">質問通知設定</span>
      <span className="text-xs text-gray-500 dark:text-gray-400 truncate">新しい質問が投稿された時に通知</span>
      </div>
      </div>
      <div className="shrink-0 ml-4">
      <label className="relative inline-flex items-center cursor-pointer">
      <input checked className="sr-only peer" type="checkbox" value=""/>
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/50 dark:peer-focus:ring-primary/40 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
      </label>
      </div>
      </div>
      {/*  Item: Answer Notification  */}
      <div className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
      <div className="flex items-center gap-4 flex-1 overflow-hidden">
      <div className="flex items-center justify-center shrink-0 size-12 rounded-xl bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400">
      <Icon name="medical_services" className="text-[24px]" size={24} />
      </div>
      <div className="flex flex-col min-w-0">
      <span className="text-base font-bold text-text-dark dark:text-text-light truncate">回答通知設定</span>
      <span className="text-xs text-gray-500 dark:text-gray-400 truncate">医師からの回答があった時に通知</span>
      </div>
      </div>
      <div className="shrink-0 ml-4">
      <label className="relative inline-flex items-center cursor-pointer">
      <input checked className="sr-only peer" type="checkbox" value=""/>
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/50 dark:peer-focus:ring-primary/40 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
      </label>
      </div>
      </div>
      {/*  Item: Re-question Notification  */}
      <div className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
      <div className="flex items-center gap-4 flex-1 overflow-hidden">
      <div className="flex items-center justify-center shrink-0 size-12 rounded-xl bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400">
      <Icon name="forum" className="text-[24px]" size={24} />
      </div>
      <div className="flex flex-col min-w-0">
      <span className="text-base font-bold text-text-dark dark:text-text-light truncate">再質問通知設定</span>
      <span className="text-xs text-gray-500 dark:text-gray-400 truncate">追加の質問や返信があった時に通知</span>
      </div>
      </div>
      <div className="shrink-0 ml-4">
      <label className="relative inline-flex items-center cursor-pointer">
      <input className="sr-only peer" type="checkbox" value=""/>
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/50 dark:peer-focus:ring-primary/40 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
      </label>
      </div>
      </div>
      </div>
      </section>
      {/*  Section 2: External Integration  */}
      <section>
      <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 px-2">
                          外部連携
                      </h3>
      <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
      {/*  Item: LINE Notification  */}
      <label className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
      <div className="flex items-center gap-4 flex-1 overflow-hidden">
      <div className="flex items-center justify-center shrink-0 size-12 rounded-xl bg-[#06C755]/10 text-[#06C755]">
      <Icon name="chat_bubble" className="text-[24px]" size={24} />
      </div>
      <div className="flex flex-col min-w-0">
      <span className="text-base font-bold text-text-dark dark:text-text-light truncate">LINE通知許可</span>
      <span className="text-xs text-gray-500 dark:text-gray-400 truncate">重要な通知をLINEでも受け取る</span>
      </div>
      </div>
      <div className="shrink-0 ml-4">
      {/*  Custom Styled Checkbox  */}
      <input className="w-6 h-6 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer" type="checkbox"/>
      </div>
      </label>
      </div>
      <p className="mt-2 text-xs text-gray-400 px-2">
                          ※ LINE連携の設定が別途必要になる場合があります。
                      </p>
      </section>
      </main>
      {/*  Bottom Action Bar  */}
      <div className="fixed bottom-0 w-full max-w-[1024px] z-20 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800 p-4 safe-area-pb">
      <div className="max-w-2xl mx-auto flex flex-col gap-3">
      <button className="w-full h-12 flex items-center justify-center rounded-xl bg-primary text-background-dark font-bold text-base shadow-lg shadow-primary/20 hover:bg-primary/90 active:scale-[0.98] transition-all">
                          設定保存
                      </button>
      <button className="w-full h-12 flex items-center justify-center rounded-xl bg-transparent text-gray-500 dark:text-gray-400 font-bold text-base hover:bg-gray-100 dark:hover:bg-white/5 transition-all">
                          キャンセル
                      </button>
      </div>
      </div>
      </div>
      {/*  Background Decoration (Abstract Medical Theme)  */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px]"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-blue-400/5 blur-[80px]"></div>
      </div>
    </>
  );
}
