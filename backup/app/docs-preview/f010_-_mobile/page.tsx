import Icon from '../../../components/Icon';
import React from 'react';

export default function Page(){
  return (
    <>
      {/*  Mobile Container  */}
      <div className="w-full max-w-md h-screen max-h-[900px] bg-background-light dark:bg-background-dark relative flex flex-col shadow-2xl overflow-hidden mx-auto sm:rounded-3xl sm:h-[850px] sm:border-8 sm:border-slate-900">
      {/*  Header  */}
      <header className="flex items-center justify-between px-6 py-4 bg-background-light dark:bg-background-dark sticky top-0 z-10 shrink-0">
      <div className="flex items-center gap-2">
      {/*  Logo mark  */}
      <div className="size-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary dark:text-primary">
      <Icon name="local_hospital" className="inline-block align-middle text-2xl" size={24} />
      </div>
      <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Medily</h2>
      </div>
      <button className="p-2 -mr-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-surface-dark rounded-full transition-colors">
      <Icon name="menu" className="inline-block align-middle" size={20} />
      </button>
      </header>
      {/*  Scrollable Content  */}
      <main className="flex-1 overflow-y-auto no-scrollbar pb-24">
      {/*  Page Title  */}
      <div className="px-6 pt-2 pb-6">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">設定</h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">アプリの各種設定やアカウント管理</p>
      </div>
      {/*  Settings Group 1: Account & Notifications  */}
      <div className="px-4 mb-6">
      <h3 className="px-2 mb-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">アカウント</h3>
      <div className="bg-surface-light dark:bg-surface-dark rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800">
      {/*  Notification Settings  */}
      <button className="w-full flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group text-left">
      <div className="size-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
      <Icon name="notifications" className="inline-block align-middle text-blue-600 dark:text-blue-400" size={20} />
      </div>
      <div className="flex-1 min-w-0">
      <p className="text-base font-medium text-slate-900 dark:text-white truncate">通知設定</p>
      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">プッシュ通知の管理</p>
      </div>
      <Icon name="chevron_right" className="inline-block align-middle text-slate-400 group-hover:text-primary transition-colors" size={16} />
      </button>
      <div className="h-px bg-slate-100 dark:bg-slate-800 mx-4"></div>
      {/*  Profile Edit  */}
      <button className="w-full flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group text-left">
      <div className="size-10 rounded-full bg-primary/20 dark:bg-primary/10 flex items-center justify-center shrink-0">
      <Icon name="person_edit" className="inline-block align-middle text-primary-700 dark:text-primary" size={20} />
      </div>
      <div className="flex-1 min-w-0">
      <p className="text-base font-medium text-slate-900 dark:text-white truncate">プロフィール編集</p>
      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">基本情報の変更</p>
      </div>
      <Icon name="chevron_right" className="inline-block align-middle text-slate-400 group-hover:text-primary transition-colors" size={16} />
      </button>
      </div>
      </div>
      {/*  Settings Group 2: Support & Info  */}
      <div className="px-4 mb-6">
      <h3 className="px-2 mb-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">サポート・情報</h3>
      <div className="bg-surface-light dark:bg-surface-dark rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800">
      {/*  Terms  */}
      <button className="w-full flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group text-left">
      <div className="size-10 rounded-full bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center shrink-0">
      <Icon name="description" className="inline-block align-middle text-purple-600 dark:text-purple-400" size={20} />
      </div>
      <div className="flex-1 min-w-0">
      <p className="text-base font-medium text-slate-900 dark:text-white truncate">利用規約</p>
      </div>
      <Icon name="chevron_right" className="inline-block align-middle text-slate-400 group-hover:text-primary transition-colors" size={16} />
      </button>
      <div className="h-px bg-slate-100 dark:bg-slate-800 mx-4"></div>
      {/*  Privacy Policy  */}
      <button className="w-full flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group text-left">
      <div className="size-10 rounded-full bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center shrink-0">
      <Icon name="lock" className="inline-block align-middle text-teal-600 dark:text-teal-400" size={20} />
      </div>
      <div className="flex-1 min-w-0">
      <p className="text-base font-medium text-slate-900 dark:text-white truncate">プライバシーポリシー</p>
      </div>
      <Icon name="chevron_right" className="inline-block align-middle text-slate-400 group-hover:text-primary transition-colors" size={16} />
      </button>
      <div className="h-px bg-slate-100 dark:bg-slate-800 mx-4"></div>
      {/*  FAQ / Help (Added for completeness)  */}
      <button className="w-full flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group text-left">
      <div className="size-10 rounded-full bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center shrink-0">
      <Icon name="help" className="inline-block align-middle text-orange-600 dark:text-orange-400" size={20} />
      </div>
      <div className="flex-1 min-w-0">
      <p className="text-base font-medium text-slate-900 dark:text-white truncate">ヘルプ・お問い合わせ</p>
      </div>
      <Icon name="chevron_right" className="inline-block align-middle text-slate-400 group-hover:text-primary transition-colors" size={16} />
      </button>
      </div>
      </div>
      {/*  Settings Group 3: Danger Zone  */}
      <div className="px-4 mb-8">
      <h3 className="px-2 mb-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">その他</h3>
      <div className="bg-surface-light dark:bg-surface-dark rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800">
      {/*  Delete Account  */}
      <button className="w-full flex items-center gap-4 p-4 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors group text-left">
      <div className="size-10 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center shrink-0">
      <Icon name="person_remove" className="inline-block align-middle text-red-600 dark:text-red-400" size={20} />
      </div>
      <div className="flex-1 min-w-0">
      <p className="text-base font-medium text-red-600 dark:text-red-400 truncate">退会する</p>
      </div>
      <Icon name="chevron_right" className="inline-block align-middle text-slate-300 dark:text-slate-600 group-hover:text-red-400 transition-colors" size={16} />
      </button>
      </div>
      </div>
      {/*  Logout Button  */}
      <div className="px-6 mb-12">
      <button className="w-full bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold py-3.5 px-6 rounded-xl shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2">
      <Icon name="person_remove" className="inline-block align-middle" size={20} />
                          ログアウト
                      </button>
      <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-4">Medily Version 1.0.2</p>
      </div>
      </main>
      {/*  Bottom Navigation Bar  */}
      <nav className="shrink-0 bg-surface-light dark:bg-surface-dark border-t border-slate-200 dark:border-slate-800 pb-safe pt-2">
      <div className="flex items-center justify-around h-16">
      {/*  Home  */}
      <button className="flex flex-col items-center justify-center w-full h-full space-y-1 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300">
      <Icon name="home" className="inline-block align-middle" size={28} />
      <span className="text-[10px] font-medium">ホーム</span>
      </button>
      {/*  Questions  */}
      <button className="flex flex-col items-center justify-center w-full h-full space-y-1 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300">
      <Icon name="chat_bubble" className="inline-block align-middle" size={28} />
      <span className="text-[10px] font-medium">質問</span>
      </button>
      {/*  Answers/Match  */}
      <button className="flex flex-col items-center justify-center w-full h-full space-y-1 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300">
      <Icon name="volunteer_activism" className="inline-block align-middle" size={28} />
      <span className="text-[10px] font-medium">マッチング</span>
      </button>
      {/*  My Page (Active)  */}
      <button className="flex flex-col items-center justify-center w-full h-full space-y-1 text-primary dark:text-primary relative">
      {/*  Active Indicator  */}
      <div className="absolute -top-2 w-8 h-1 bg-primary rounded-full shadow-[0_0_10px_#13ec5b]"></div>
      <Icon name="person" className="inline-block align-middle fill-current" size={28} />
      <span className="text-[10px] font-bold">マイページ</span>
      </button>
      </div>
      {/*  Safe area spacer for notched phones  */}
      <div className="h-6 w-full bg-surface-light dark:bg-surface-dark"></div>
      </nav>
      </div>
    </>
  );
}
