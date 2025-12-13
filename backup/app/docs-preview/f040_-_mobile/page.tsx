import Icon from '../../../components/Icon';
import React from 'react';

export default function Page(){
  return (
    <>
      {/*  App Container  */}
      <div className="relative flex flex-col h-screen max-w-md mx-auto bg-surface-light dark:bg-surface-dark shadow-2xl overflow-hidden">
      {/*  Header (TopAppBar)  */}
      <header className="flex-none flex items-center justify-between px-4 py-3 bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark sticky top-0 z-10">
      <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-text-main-light dark:text-text-main-dark">
      <Icon name="arrow_back" className="inline-block align-middle text-[24px]" size={20} />
      </button>
      <h1 className="text-lg font-bold tracking-tight text-center flex-1 text-text-main-light dark:text-text-main-dark">退会手続き</h1>
      <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-text-main-light dark:text-text-main-dark">
      <Icon name="settings" className="inline-block align-middle text-[24px]" size={20} />
      </button>
      </header>
      {/*  Main Content Area (Scrollable)  */}
      <main className="flex-1 overflow-y-auto hide-scrollbar pb-24">
      {/*  Hero Title  */}
      <div className="px-6 pt-8 pb-4">
      <h2 className="text-2xl font-bold leading-tight text-text-main-light dark:text-text-main-dark">
                          Medilyを退会する
                      </h2>
      <p className="mt-2 text-sm text-text-sub-light dark:text-text-sub-dark leading-relaxed">
                          アカウントを削除する前に、以下の注意事項をご確認ください。
                      </p>
      </div>
      {/*  Warning Card (ActionPanel variant)  */}
      <div className="px-4 mb-6">
      <div className="bg-danger-bg dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-5 shadow-sm">
      <div className="flex items-start gap-3 mb-3">
      <Icon name="help" className="inline-block align-middle text-danger" size={24} />
      <h3 className="text-danger font-bold text-lg leading-tight pt-0.5">重要：データの消失</h3>
      </div>
      <div className="text-sm text-red-800 dark:text-red-200 leading-relaxed space-y-2">
      <p>
                                  退会すると、これまでの<span className="font-bold">相談履歴</span>や<span className="font-bold">保存した病院リスト</span>など、すべてのデータが完全に削除されます。
                              </p>
      <p>
                                  一度削除されたデータは、再登録しても<span className="font-bold underline">復元することはできません</span>のでご注意ください。
                              </p>
      </div>
      </div>
      </div>
      <div className="h-px bg-border-light dark:bg-border-dark mx-6 mb-6"></div>
      {/*  Reason Form (TextField variant)  */}
      <div className="px-4 mb-8">
      <label className="block mb-2 text-sm font-bold text-text-main-light dark:text-text-main-dark">
                          退会理由 <span className="text-xs font-normal text-text-sub-light dark:text-text-sub-dark ml-1">（任意）</span>
      </label>
      <div className="relative">
      <select defaultValue="" className="appearance-none w-full bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-xl px-4 py-3.5 pr-10 text-text-main-light dark:text-text-main-dark focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-base">
      <option disabled value="">退会理由を選択してください</option>
      <option value="solved">悩みが解決したため</option>
      <option value="not_useful">希望する情報が得られなかった</option>
      <option value="difficult">使い方が難しかった</option>
      <option value="notifications">通知が多い</option>
      <option value="other">その他</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-text-sub-light dark:text-text-sub-dark">
      <Icon name="chevron_right" className="inline-block align-middle" size={16} />
      </div>
      </div>
      </div>
      {/*  Confirmation Checkbox (Checklists variant)  */}
      <div className="px-4 mb-10">
      <label className="group relative flex items-start gap-3 p-4 rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark hover:bg-background-light dark:hover:bg-background-dark cursor-pointer transition-colors shadow-sm">
      <div className="relative flex items-center h-6">
      <input className="peer h-5 w-5 cursor-pointer appearance-none rounded border-2 border-border-light dark:border-border-dark bg-transparent transition-all checked:border-primary checked:bg-primary hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" type="checkbox"/>
      <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100">
      <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd"></path>
      </svg>
      </span>
      </div>
      <div className="flex-1">
      <p className="font-bold text-text-main-light dark:text-text-main-dark text-sm leading-tight">
                                  注意事項を確認し、同意します
                              </p>
      <p className="text-xs text-text-sub-light dark:text-text-sub-dark mt-1 leading-normal">
                                  チェックを入れると退会ボタンが有効になります。
                              </p>
      </div>
      </label>
      </div>
      {/*  Action Buttons  */}
      <div className="px-4 pb-8 space-y-3">
      <button className="w-full flex items-center justify-center gap-2 h-12 rounded-full bg-danger text-white font-bold text-base shadow-md disabled:bg-gray-300 disabled:dark:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed disabled:shadow-none hover:bg-red-600 active:scale-[0.98] transition-all group" disabled>"
      <Icon name="person_remove" className="inline-block align-middle" size={20} />
                          退会を実行する
                      </button>
      <button className="w-full flex items-center justify-center h-12 rounded-full bg-transparent border border-border-light dark:border-border-dark text-text-main-light dark:text-text-main-dark font-medium text-base hover:bg-background-light dark:hover:bg-background-dark active:bg-gray-100 dark:active:bg-gray-800 transition-colors">
                          キャンセルして戻る
                      </button>
      </div>
      <div className="h-6"></div>
      </main>
      {/*  Bottom Navigation  */}
      <nav className="flex-none bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark pb-safe">
      <div className="grid grid-cols-4 h-16">
      {/*  Home  */}
      <a className="flex flex-col items-center justify-center gap-1 text-text-sub-light dark:text-text-sub-dark hover:text-primary dark:hover:text-primary transition-colors" href="#">
      <Icon name="home" className="inline-block align-middle text-[24px]" size={20} />
      <span className="text-[10px] font-medium">ホーム</span>
      </a>
      {/*  Q&A  */}
      <a className="flex flex-col items-center justify-center gap-1 text-text-sub-light dark:text-text-sub-dark hover:text-primary dark:hover:text-primary transition-colors" href="#">
      <Icon name="chat_bubble" className="inline-block align-middle text-[24px]" size={20} />
      <span className="text-[10px] font-medium">相談</span>
      </a>
      {/*  Hospitals  */}
      <a className="flex flex-col items-center justify-center gap-1 text-text-sub-light dark:text-text-sub-dark hover:text-primary dark:hover:text-primary transition-colors" href="#">
      <Icon name="local_hospital" className="inline-block align-middle text-[24px]" size={20} />
      <span className="text-[10px] font-medium">病院</span>
      </a>
      {/*  My Page (Active, but muted since we are in deep settings)  */}
      <a className="flex flex-col items-center justify-center gap-1 text-primary dark:text-primary transition-colors relative" href="#">
      <span className="absolute -top-[1px] w-8 h-[2px] bg-primary rounded-b-full"></span>
      <Icon name="person" className="inline-block align-middle text-[24px] fill-1" size={20} />
      <span className="text-[10px] font-medium">マイページ</span>
      </a>
      </div>
      {/*  iOS Home Indicator Spacing  */}
      <div className="h-1 bg-surface-light dark:bg-surface-dark w-full"></div>
      </nav>
      </div>
      
    </>
  );
}
