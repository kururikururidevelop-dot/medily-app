import Icon from '../../../components/Icon';
import React from 'react';

export default function Page(){
  return (
    <>
      {/*  Top App Bar  */}
      <header className="sticky top-0 z-50 w-full bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="flex items-center justify-between px-4 h-14 max-w-screen-md mx-auto">
      <div className="flex items-center gap-2 text-primary">
      <Icon name="local_hospital" className="inline-block align-middle text-[28px]" size={28} />
      <span className="text-xl font-bold tracking-tight text-[#101917] dark:text-white">Medily</span>
      </div>
      <button className="flex items-center justify-center p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-[#101917] dark:text-white">
      <Icon name="settings" className="inline-block align-middle" size={16} />
      </button>
      </div>
      </header>
      {/*  Main Content  */}
      <main className="flex-1 w-full max-w-screen-md mx-auto flex flex-col px-4 pt-6 pb-20">
      {/*  Headline  */}
      <div className="mb-6 text-center">
      <h1 className="text-2xl md:text-3xl font-bold text-[#101917] dark:text-white tracking-tight mb-2">退会画面</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400">退会手続きを行います</p>
      </div>
      {/*  Warning Card  */}
      <div className="mb-8 group">
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/50 rounded-xl p-5 shadow-sm transition-all duration-300">
      <div className="flex items-start gap-4">
      <div className="shrink-0 text-red-600 dark:text-red-400 mt-1 bg-red-100 dark:bg-red-900/50 p-2 rounded-full">
      <Icon name="help" className="inline-block align-middle text-[24px]" size={24} />
      </div>
      <div className="flex-1">
      <h3 className="text-red-700 dark:text-red-300 text-base font-bold leading-tight mb-2">重要：退会のご注意</h3>
      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                                  退会すると、これまでの<span className="font-bold">相談履歴やメッセージはすべて削除</span>され、復元できません。現在進行中の相談がある場合も相手に通知されず、アクセスできなくなります。
                              </p>
      </div>
      </div>
      </div>
      </div>
      {/*  Form Section  */}
      <div className="flex flex-col gap-6">
      {/*  Reason Select  */}
      <div className="relative">
      <label className="block text-sm font-bold text-[#101917] dark:text-gray-200 mb-2">
                          退会理由 <span className="text-gray-400 font-normal ml-1">（任意）</span>
      </label>
      <div className="relative">
      <select defaultValue="" className="w-full h-14 pl-4 pr-10 bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-xl text-base text-[#101917] dark:text-white appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-shadow cursor-pointer">
      <option disabled value="">理由を選択してください</option>
      <option value="solved">悩みが解決したため</option>
      <option value="usability">使い方がわからなかったため</option>
      <option value="frequency">利用頻度が低いため</option>
      <option value="other">その他</option>
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500 dark:text-gray-400">
      <Icon name="chevron_right" className="inline-block align-middle" size={16} />
      </div>
      </div>
      </div>
      {/*  Confirmation Checkbox  */}
      <div className="bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-xl p-4 transition-colors hover:border-primary/30">
      <label className="flex items-center gap-3 cursor-pointer group/checkbox">
      <div className="relative flex items-center">
      <input className="peer h-6 w-6 rounded border-2 border-gray-300 dark:border-gray-600 text-primary focus:ring-primary/20 focus:ring-offset-0 bg-transparent transition-all checked:bg-primary checked:border-primary cursor-pointer" type="checkbox"/>
      {/*  Custom check icon simulation for stricter control if needed, but Tailwind forms plugin handles basic svg check  */}
      </div>
      <span className="text-[#101917] dark:text-white text-base font-medium select-none group-hover/checkbox:text-primary transition-colors">
                              注意事項を確認しました
                          </span>
      </label>
      </div>
      {/*  Actions  */}
      <div className="mt-4 flex flex-col gap-3">
      {/*  Danger Button (Visual state: Disabled style for demonstration, would be toggled by JS)  */}
      <button aria-disabled="true" className="w-full h-14 rounded-xl bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-500 font-bold text-lg flex items-center justify-center gap-2 cursor-not-allowed transition-all" title="注意事項を確認してください">
      <Icon name="person_remove" />
                          退会実行
                      </button>
      {/*  Active Danger Button State (Hidden by default in this static mockup, but showing how it would look if active)  */}
      {/*  
                      <button className="w-full h-14 rounded-xl bg-danger text-white font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-red-500/30 hover:bg-red-600 transition-all active:scale-[0.98]">
                          <Icon name="person_remove" className="inline-block align-middle" size={20} />
                          退会実行
                      </button> 
                       */}
      <button className="w-full h-14 rounded-xl bg-transparent border-2 border-primary text-primary dark:text-primary font-bold text-lg hover:bg-primary/5 active:bg-primary/10 transition-colors">
                          キャンセル
                      </button>
      </div>
      </div>
      {/*  Decorative Image/Illustration area (Optional for context)  */}
      <div className="mt-12 flex justify-center opacity-50 grayscale">
      <div className="w-full max-w-[200px] h-32 bg-center bg-contain bg-no-repeat rounded-lg" data-alt="Abstract medical plus signs pattern representing health context" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 10 h20 v30 h30 v20 h-30 v30 h-20 v-30 h-30 v-20 h30 z' fill='%23d3e4e0' opacity='0.4'/%3E%3C/svg%3E')" }}>
      </div>
      </div>
      </main>
      {/*  Footer  */}
      <footer className="w-full bg-background-light dark:bg-background-dark py-6 border-t border-gray-200 dark:border-gray-800 text-center">
      <div className="flex justify-center gap-6 mb-4 text-xs font-medium text-gray-500 dark:text-gray-400">
      <a className="hover:text-primary transition-colors" href="#">利用規約</a>
      <a className="hover:text-primary transition-colors" href="#">プライバシーポリシー</a>
      <a className="hover:text-primary transition-colors" href="#">ヘルプ</a>
      </div>
      <p className="text-xs text-gray-400 dark:text-gray-600">© 2024 Medily Inc.</p>
      </footer>
    </>
  );
}
