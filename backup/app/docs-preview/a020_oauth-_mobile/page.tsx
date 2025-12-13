import Icon from '../../../components/Icon';
import React from 'react';

export default function Page(){
  return (
    <>
      <div className="relative flex h-full min-h-screen w-full max-w-[480px] flex-col bg-background-light dark:bg-background-dark shadow-xl mx-auto overflow-hidden">
      {/*  Top App Bar  */}
      <div className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-10">
      {/*  Close Icon (Optional context for modal/flow)  */}
      <button className="text-[#0d1b12] dark:text-white p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
      <Icon name="close" />
      </button>
      <h2 className="text-[#0d1b12] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-10">アカウント連携</h2>
      </div>
      {/*  Scrollable Content Area  */}
      <div className="flex-1 flex flex-col items-center pt-8 px-6">
      {/*  Logo Section  */}
      <div className="mb-8 flex flex-col items-center">
      <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4 shadow-sm border border-primary/10">
      {/*  Representing Medily Logo  */}
      <Icon name="medical_services" className="text-primary text-[48px]" size={48} />
      </div>
      <h1 className="text-2xl font-bold text-center text-[#0d1b12] dark:text-white tracking-tight">Medily</h1>
      </div>
      {/*  Headline  */}
      <h2 className="text-[#0d1b12] dark:text-white tracking-tight text-[24px] font-bold leading-tight text-center mb-6">
                      LINE連携で、より便利に。
                  </h2>
      {/*  Benefits List  */}
      <div className="w-full bg-surface-light dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 mb-8">
      <ul className="space-y-5">
      <li className="flex items-start gap-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
      <Icon name="check" className="text-primary text-[20px] font-bold" size={20} />
      </div>
      <div className="flex flex-col">
      <span className="font-bold text-[#0d1b12] dark:text-white text-base">ワンタップでログイン</span>
      <span className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">IDやパスワード入力の手間がありません</span>
      </div>
      </li>
      <li className="flex items-start gap-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
      <Icon name="notifications_active" className="text-primary text-[20px] font-bold" size={20} />
      </div>
      <div className="flex flex-col">
      <span className="font-bold text-[#0d1b12] dark:text-white text-base">相談の回答をすぐに通知</span>
      <span className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">医師からの回答を見逃さず確認できます</span>
      </div>
      </li>
      </ul>
      </div>
      {/*  Spacer to push content up slightly  */}
      <div className="flex-1"></div>
      {/*  Action Area  */}
      <div className="w-full flex flex-col gap-4 pb-4">
      {/*  LINE Button  */}
      <button className="w-full cursor-pointer flex items-center justify-center rounded-xl h-14 px-5 bg-[#06C755] hover:bg-[#05b34c] transition-colors text-white gap-3 shadow-md relative group">
      {/*  LINE Logo Simulation using Chat Bubble  */}
      <Icon name="chat_bubble" className="text-white text-[28px] absolute left-6" size={28} />
      <span className="text-lg font-bold tracking-wide">LINEでログイン</span>
      </button>
      {/*  Email Fallback  */}
      <button className="w-full cursor-pointer flex items-center justify-center rounded-xl h-12 px-5 bg-transparent border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 gap-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
      <Icon name="mail" className="text-[20px]" size={20} />
      <span className="text-base font-medium">メールアドレスで続ける</span>
      </button>
      </div>
      </div>
      {/*  Footer  */}
      <div className="p-6 bg-background-light dark:bg-background-dark">
      <p className="text-xs text-center text-gray-400 dark:text-gray-500 leading-relaxed">
                      ログインすることで、<a className="underline hover:text-primary transition-colors" href="#">利用規約</a> および <a className="underline hover:text-primary transition-colors" href="#">プライバシーポリシー</a> に同意したものとみなされます。
                  </p>
      </div>
      </div>
    </>
  );
}
