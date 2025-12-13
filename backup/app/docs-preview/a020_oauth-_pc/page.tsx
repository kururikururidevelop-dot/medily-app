import Icon from '../../../components/Icon';
import React from 'react';

export default function Page(){
  return (
    <>
      <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden justify-between">
      {/*  Main Content Area  */}
      <main className="flex flex-col items-center justify-center flex-grow w-full max-w-md mx-auto px-6 py-8">
      {/*  Headline  */}
      <h1 className="text-slate-900 dark:text-white tracking-tight text-[28px] md:text-[32px] font-bold leading-tight text-center mb-6">
                      アカウント連携
                  </h1>
      {/*  Logo Area  */}
      <div className="mb-8 w-24 h-24 relative flex items-center justify-center bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-4">
      <div className="w-full h-full bg-contain bg-center bg-no-repeat" data-alt="Medily service logo abstract medical cross shape green" style={{ backgroundImage: '' }}  ><img src="/res_E40138C8E9FE.png" alt="" className="absolute inset-0 w-full h-full object-cover" /></div>
      </div>
      {/*  Description  */}
      <p className="text-slate-600 dark:text-slate-300 text-base font-normal leading-relaxed text-center mb-8">
                      Medilyをより便利に利用するために、<br className="hidden sm:block"/>LINEアカウントと連携しましょう。
                  </p>
      {/*  Benefits List  */}
      <div className="w-full flex flex-col gap-3 mb-10">
      {/*  List Item 1  */}
      <div className="flex items-center gap-4 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm">
      <div className="text-emerald-600 dark:text-primary flex items-center justify-center rounded-lg bg-emerald-50 dark:bg-slate-700 shrink-0 size-10">
      <Icon name="check_circle" className="text-[24px]" size={24} />
      </div>
      <p className="text-slate-800 dark:text-slate-100 text-sm md:text-base font-medium leading-normal flex-1">
                              次回からワンタップでログイン
                          </p>
      </div>
      {/*  List Item 2  */}
      <div className="flex items-center gap-4 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm">
      <div className="text-emerald-600 dark:text-primary flex items-center justify-center rounded-lg bg-emerald-50 dark:bg-slate-700 shrink-0 size-10">
      <Icon name="notifications_active" className="text-[24px]" size={24} />
      </div>
      <p className="text-slate-800 dark:text-slate-100 text-sm md:text-base font-medium leading-normal flex-1">
                              医師からの回答通知をLINEで受け取る
                          </p>
      </div>
      </div>
      {/*  Call to Action: LINE Login  */}
      <div className="w-full space-y-4">
      <button className="w-full h-14 bg-[#06C755] hover:bg-[#05b54d] active:scale-[0.98] transition-all rounded-lg flex items-center justify-center gap-3 shadow-md group">
      {/*  LINE uses a specific icon, mimicking with chat_bubble for constraints  */}
      <Icon name="chat_bubble" className="text-white text-[28px] group-hover:scale-110 transition-transform" size={28} />
      <span className="text-white text-base md:text-lg font-bold tracking-wide">LINEでログイン</span>
      </button>
      <button className="w-full py-2 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 text-sm font-medium transition-colors">
                          あとで設定する
                      </button>
      </div>
      </main>
      {/*  Footer: Legal Links  */}
      <footer className="w-full py-6 pb-8 bg-transparent">
      <div className="flex justify-center items-center gap-4 text-xs text-slate-400 dark:text-slate-500">
      <a className="hover:text-slate-600 dark:hover:text-slate-300 underline decoration-slate-300 dark:decoration-slate-600 underline-offset-2" href="#">利用規約</a>
      <span className="w-px h-3 bg-slate-300 dark:bg-slate-600"></span>
      <a className="hover:text-slate-600 dark:hover:text-slate-300 underline decoration-slate-300 dark:decoration-slate-600 underline-offset-2" href="#">プライバシーポリシー</a>
      </div>
      </footer>
      </div>
    </>
  );
}
