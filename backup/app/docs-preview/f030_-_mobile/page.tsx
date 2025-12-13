import Icon from '../../../components/Icon';
import React from 'react';

export default function Page(){
  return (
    <>
      <div className="relative flex min-h-screen flex-col overflow-hidden max-w-md mx-auto shadow-2xl bg-background-light dark:bg-background-dark">
      {/*  Top App Bar  */}
      <header className="sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-slate-200/50 dark:border-white/5">
      <div className="flex items-center gap-3">
      {/*  Logo  */}
      <div className="flex items-center justify-center size-9 rounded-xl bg-primary text-background-dark shadow-lg shadow-primary/20">
      <Icon name="local_hospital" className="inline-block align-middle" size={20} />
      </div>
      <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">Medily</h1>
      </div>
      <button className="flex items-center justify-center size-10 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors text-slate-600 dark:text-slate-300">
      <Icon name="settings" className="inline-block align-middle" size={16} />
      </button>
      </header>
      {/*  Main Content Area  */}
      <main className="flex-1 overflow-y-auto no-scrollbar w-full pb-24">
      {/*  Headline  */}
      <div className="px-5 pt-8 pb-6">
      <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-wide text-primary uppercase bg-primary/10 rounded-full dark:bg-primary/20">
                          Legal
                      </span>
      <h1 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white">
                          プライバシー<br/>ポリシー
                      </h1>
      <p className="mt-4 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                          Medily（以下、「当社」といいます。）は、本ウェブサイト上で提供するサービスにおける、ユーザーの個人情報の取扱いについて、以下のとおり定めます。
                      </p>
      </div>
      {/*  Policy Sections  */}
      <div className="flex flex-col gap-6 px-5">
      {/*  Section 1  */}
      <div className="group/card">
      <h2 className="flex items-center gap-2 mb-3 text-lg font-bold text-slate-800 dark:text-white">
      <span className="flex items-center justify-center w-6 h-6 text-xs font-bold rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300">1</span>
                              個人情報
                          </h2>
      <div className="p-5 bg-surface-light dark:bg-surface-dark rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm dark:shadow-none transition-all group-hover/card:border-primary/30 dark:group-hover/card:border-primary/30">
      <p className="text-sm leading-7 text-slate-600 dark:text-slate-300 text-justify">
                                  「個人情報」とは、個人情報保護法にいう「個人情報」を指すものとし、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日、住所、電話番号、連絡先その他の記述等により特定の個人を識別できる情報を指します。
                              </p>
      </div>
      </div>
      {/*  Section 2  */}
      <div className="group/card">
      <h2 className="flex items-center gap-2 mb-3 text-lg font-bold text-slate-800 dark:text-white">
      <span className="flex items-center justify-center w-6 h-6 text-xs font-bold rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300">2</span>
                              収集方法
                          </h2>
      <div className="p-5 bg-surface-light dark:bg-surface-dark rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm dark:shadow-none transition-all group-hover/card:border-primary/30 dark:group-hover/card:border-primary/30">
      <p className="text-sm leading-7 text-slate-600 dark:text-slate-300 text-justify">
                                  当社は、ユーザーが利用登録をする際に氏名、生年月日、住所、電話番号、メールアドレス、銀行口座番号、クレジットカード番号、運転免許証番号などの個人情報をお尋ねすることがあります。
                              </p>
      </div>
      </div>
      {/*  Section 3  */}
      <div className="group/card">
      <h2 className="flex items-center gap-2 mb-3 text-lg font-bold text-slate-800 dark:text-white">
      <span className="flex items-center justify-center w-6 h-6 text-xs font-bold rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300">3</span>
                              利用目的
                          </h2>
      <div className="p-5 bg-surface-light dark:bg-surface-dark rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm dark:shadow-none transition-all group-hover/card:border-primary/30 dark:group-hover/card:border-primary/30">
      <ul className="space-y-3">
      <li className="flex gap-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
      <Icon name="check_small" className="text-primary text-[20px] shrink-0" size={20} />
                                      当社サービスの提供・運営のため
                                  </li>
      <li className="flex gap-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
      <Icon name="check_small" className="text-primary text-[20px] shrink-0" size={20} />
                                      ユーザーからのお問い合わせに回答するため（本人確認を行うことを含む）
                                  </li>
      <li className="flex gap-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
      <Icon name="check_small" className="text-primary text-[20px] shrink-0" size={20} />
                                      メンテナンス、重要なお知らせなど必要に応じたご連絡のため
                                  </li>
      </ul>
      </div>
      </div>
      {/*  Section 4  */}
      <div className="group/card">
      <h2 className="flex items-center gap-2 mb-3 text-lg font-bold text-slate-800 dark:text-white">
      <span className="flex items-center justify-center w-6 h-6 text-xs font-bold rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300">4</span>
                              第三者提供
                          </h2>
      <div className="p-5 bg-surface-light dark:bg-surface-dark rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm dark:shadow-none transition-all group-hover/card:border-primary/30 dark:group-hover/card:border-primary/30">
      <p className="text-sm leading-7 text-slate-600 dark:text-slate-300 text-justify">
                                  当社は、次に掲げる場合を除いて、あらかじめユーザーの同意を得ることなく、第三者に個人情報を提供することはありません。ただし、個人情報保護法その他の法令で認められる場合を除きます。
                              </p>
      </div>
      </div>
      {/*  Contact  */}
      <div className="mt-4 p-5 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent dark:from-primary/5 border border-primary/20">
      <h3 className="font-bold text-slate-900 dark:text-white mb-2 text-sm">お問い合わせ</h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                              プライバシーポリシーに関するご質問は下記までご連絡ください。
                          </p>
      <button className="w-full py-2.5 bg-background-light dark:bg-background-dark rounded-lg text-sm font-semibold text-slate-900 dark:text-white shadow-sm border border-slate-200 dark:border-white/10 active:scale-95 transition-transform">
                              サポートに連絡する
                          </button>
      </div>
      </div>
      {/*  Footer Date  */}
      <div className="px-5 py-8 mt-4 text-center">
      <p className="text-xs font-medium text-slate-400/80 dark:text-slate-500">
                          最終更新日：2023年10月27日
                      </p>
      </div>
      {/*  Safe Area Spacer  */}
      <div className="h-6"></div>
      </main>
      {/*  Bottom Navigation  */}
      <nav className="absolute bottom-0 left-0 right-0 z-50 bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-lg border-t border-slate-200/50 dark:border-white/5">
      <div className="grid grid-cols-4 h-[72px] pb-2">
      {/*  Home  */}
      <button className="flex flex-col items-center justify-center gap-1 group">
      <div className="relative p-1 transition-transform group-hover:-translate-y-1 duration-200">
      <Icon name="home" className="inline-block align-middle text-slate-400 dark:text-slate-500 group-hover:text-primary transition-colors" size={24} />
      </div>
      <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white">ホーム</span>
      </button>
      {/*  Question  */}
      <button className="flex flex-col items-center justify-center gap-1 group">
      <div className="relative p-1 transition-transform group-hover:-translate-y-1 duration-200">
      <Icon name="help" className="inline-block align-middle text-slate-400 dark:text-slate-500 group-hover:text-primary transition-colors" size={24} />
      </div>
      <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white">質問</span>
      </button>
      {/*  Answer  */}
      <button className="flex flex-col items-center justify-center gap-1 group">
      <div className="relative p-1 transition-transform group-hover:-translate-y-1 duration-200">
      <Icon name="forum" className="inline-block align-middle text-slate-400 dark:text-slate-500 group-hover:text-primary transition-colors" size={24} />
      </div>
      <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white">回答</span>
      </button>
      {/*  My Page (Active)  */}
      <button className="flex flex-col items-center justify-center gap-1 group relative">
      {/*  Active Indicator  */}
      <span className="absolute top-0 w-12 h-0.5 bg-primary rounded-b-full shadow-[0_0_10px_rgba(19,236,91,0.5)]"></span>
      <div className="relative p-1 transition-transform group-hover:-translate-y-1 duration-200">
      <Icon name="person" className="inline-block align-middle text-primary" size={24} />
      </div>
      <span className="text-[10px] font-bold text-slate-900 dark:text-white">マイページ</span>
      </button>
      </div>
      </nav>
      </div>
    </>
  );
}
