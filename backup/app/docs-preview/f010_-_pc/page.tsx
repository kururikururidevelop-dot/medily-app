import Icon from '../../../components/Icon';
import React from 'react';

export default function Page(){
  return (
    <>
      <div className="relative flex h-full min-h-screen w-full flex-col mx-auto max-w-[1024px] pb-24">
      {/*  Header  */}
      <header className="sticky top-0 z-50 flex items-center bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md p-4 pb-2 justify-between border-b border-gray-200 dark:border-gray-800">
      <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-[-0.015em] flex items-center gap-2">
      <Icon name="medical_services" className="inline-block align-middle text-primary text-3xl" size={16} />
                      Medily
                  </h2>
      <div className="flex items-center justify-end">
      <button className="flex items-center justify-center rounded-full size-10 bg-transparent text-slate-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
      <Icon name="menu" className="inline-block align-middle text-[24px]" size={16} />
      </button>
      </div>
      </header>
      {/*  Main Content  */}
      <main className="flex-1 px-4 pt-6">
      {/*  Page Title  */}
      <h1 className="text-slate-900 dark:text-white tracking-tight text-[32px] font-bold leading-tight text-left pb-6">設定</h1>
      {/*  Section 1: Account  */}
      <div className="mb-6">
      <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 pl-2">アカウント</h3>
      <div className="flex flex-col bg-surface-light dark:bg-surface-dark rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800">
      {/*  ListItem: Profile  */}
      <a className="flex items-center gap-4 px-4 min-h-[64px] justify-between group active:bg-gray-50 dark:active:bg-white/5 transition-colors" href="#">
      <div className="flex items-center gap-4 flex-1">
      <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
      <Icon name="person" className="inline-block align-middle text-primary" size={16} />
      </div>
      <p className="text-slate-900 dark:text-white text-base font-medium leading-normal flex-1 truncate">プロフィール編集</p>
      </div>
      <div className="shrink-0 text-gray-400">
      <Icon name="chevron_right" />
      </div>
      </a>
      <div className="h-px w-full bg-gray-100 dark:bg-gray-700 pl-[68px]"></div>
      {/*  ListItem: Notifications  */}
      <a className="flex items-center gap-4 px-4 min-h-[64px] justify-between group active:bg-gray-50 dark:active:bg-white/5 transition-colors" href="#">
      <div className="flex items-center gap-4 flex-1">
      <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
      <Icon name="notifications" className="inline-block align-middle text-primary" size={16} />
      </div>
      <p className="text-slate-900 dark:text-white text-base font-medium leading-normal flex-1 truncate">通知設定</p>
      </div>
      <div className="shrink-0 text-gray-400">
      <Icon name="chevron_right" />
      </div>
      </a>
      </div>
      </div>
      {/*  Section 2: Legal & Info  */}
      <div className="mb-6">
      <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 pl-2">サポート・規約</h3>
      <div className="flex flex-col bg-surface-light dark:bg-surface-dark rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800">
      {/*  ListItem: Terms  */}
      <a className="flex items-center gap-4 px-4 min-h-[64px] justify-between group active:bg-gray-50 dark:active:bg-white/5 transition-colors" href="#">
      <div className="flex items-center gap-4 flex-1">
      <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
      <Icon name="description" className="inline-block align-middle text-primary" size={16} />
      </div>
      <p className="text-slate-900 dark:text-white text-base font-medium leading-normal flex-1 truncate">利用規約</p>
      </div>
      <div className="shrink-0 text-gray-400">
      <Icon name="chevron_right" className="inline-block align-middle" size={16} />
      </div>
      </a>
      <div className="h-px w-full bg-gray-100 dark:bg-gray-700 pl-[68px]"></div>
      {/*  ListItem: Privacy  */}
      <a className="flex items-center gap-4 px-4 min-h-[64px] justify-between group active:bg-gray-50 dark:active:bg-white/5 transition-colors" href="#">
      <div className="flex items-center gap-4 flex-1">
      <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
      <Icon name="security" className="inline-block align-middle text-primary" size={16} />
      </div>
      <p className="text-slate-900 dark:text-white text-base font-medium leading-normal flex-1 truncate">プライバシーポリシー</p>
      </div>
      <div className="shrink-0 text-gray-400">
      <Icon name="chevron_right" className="inline-block align-middle" size={16} />
      </div>
      </a>
      </div>
      </div>
      {/*  Section 3: Danger Zone  */}
      <div className="mb-8">
      <div className="flex flex-col bg-surface-light dark:bg-surface-dark rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800">
      {/*  ListItem: Delete Account  */}
      <a className="flex items-center gap-4 px-4 min-h-[64px] justify-between group active:bg-gray-50 dark:active:bg-white/5 transition-colors" href="#">
      <div className="flex items-center gap-4 flex-1">
      <div className="size-10 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center shrink-0">
      <Icon name="person_remove" className="inline-block align-middle text-red-500" size={16} />
      </div>
      <p className="text-red-500 text-base font-medium leading-normal flex-1 truncate">退会手続き</p>
      </div>
      <div className="shrink-0 text-gray-400">
      <Icon name="chevron_right" className="inline-block align-middle" size={16} />
      </div>
      </a>
      </div>
      </div>
      {/*  Logout Button  */}
      <div className="flex justify-center mb-10">
      <button className="w-full max-w-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent py-3 px-6 text-base font-bold text-slate-700 dark:text-slate-300 shadow-sm hover:bg-gray-50 dark:hover:bg-white/5 transition-colors active:scale-95">
                          ログアウト
                      </button>
      </div>
      </main>
      {/*  Bottom Navigation / Footer  */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-[#1a2e22]/90 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 pb-safe">
      <div className="mx-auto max-w-[1024px] px-4">
      <ul className="flex justify-between items-center h-16 text-xs font-medium text-gray-500 dark:text-gray-400">
      <li className="flex-1">
      <a className="flex flex-col items-center justify-center h-full gap-1 hover:text-primary transition-colors" href="#">
      <Icon name="home" className="inline-block align-middle text-2xl" size={16} />
      <span>ホーム</span>
      </a>
      </li>
      <li className="flex-1">
      <a className="flex flex-col items-center justify-center h-full gap-1 hover:text-primary transition-colors" href="#">
      <Icon name="search" className="inline-block align-middle text-2xl" size={16} />
      <span>検索</span>
      </a>
      </li>
      <li className="flex-1">
      <a className="flex flex-col items-center justify-center h-full gap-1 hover:text-primary transition-colors" href="#">
      <div className="relative">
      <Icon name="chat_bubble" className="inline-block align-middle text-2xl" size={16} />
      <span className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-red-500 ring-2 ring-white dark:ring-[#1a2e22]"></span>
      </div>
      <span>相談</span>
      </a>
      </li>
      <li className="flex-1">
      <a className="flex flex-col items-center justify-center h-full gap-1 text-primary" href="#">
      <Icon name="settings" className="inline-block align-middle text-2xl fill-1" size={16} />
      <span>設定</span>
      </a>
      </li>
      </ul>
      </div>
      </nav>
      {/*  Safe area spacer for bottom nav  */}
      <div className="h-20"></div>
      </div>
      {/*  Background Pattern Effect  */}
      <div className="fixed inset-0 pointer-events-none -z-10 opacity-30 dark:opacity-10 mix-blend-multiply dark:mix-blend-screen" data-alt="Subtle dot pattern background for texture" style={{ backgroundImage: 'radial-gradient(#13ec5b 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>
    </>
  );
}
