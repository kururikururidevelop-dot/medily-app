import Icon from '../../../components/Icon';
import React from 'react';

export default function Page(){
  return (
    <>
      <div className="relative flex h-full max-h-screen w-full flex-col overflow-hidden">
      {/*  TopAppBar  */}
      <header className="flex-none flex items-center justify-between px-4 py-3 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm sticky top-0 z-20 border-b border-gray-200 dark:border-gray-800">
      <button className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-slate-900 dark:text-slate-100">
      <Icon name="arrow_back" className="inline-block align-middle" size={20} />
      </button>
      <h2 className="text-base font-bold leading-tight tracking-wide text-slate-900 dark:text-slate-100">設定</h2>
      <button className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-slate-900 dark:text-slate-100">
      <Icon name="settings" className="inline-block align-middle" size={20} />
      </button>
      </header>
      {/*  Main Content Area (Scrollable)  */}
      <main className="flex-1 overflow-y-auto custom-scrollbar pb-24">
      <div className="px-5 pt-6 pb-4">
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">利用規約</h1>
      {/*  Medical Disclaimer Alert  */}
      <div className="mb-8 p-4 bg-primary/10 dark:bg-primary/5 border border-primary/20 rounded-xl flex items-start gap-3">
      <Icon name="medical_services" className="inline-block align-middle" size={20} />
      <div>
      <h3 className="text-sm font-bold text-primary-dark dark:text-primary mb-1">重要なお知らせ</h3>
      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                                  本サービス「Medily」は、医療情報の提供および相談のマッチングを行うものであり、医師による診断、治療、投薬などの医療行為を提供するものではありません。緊急を要する症状の場合は、直ちに医療機関を受診してください。
                              </p>
      </div>
      </div>
      {/*  Terms Content  */}
      <div className="space-y-8 text-slate-700 dark:text-slate-300">
      <section>
      <p className="text-sm leading-relaxed mb-4">
                                  この利用規約（以下，「本規約」といいます。）は，Medily（以下，「当社」といいます。）がこのウェブサイト上で提供するサービス（以下，「本サービス」といいます。）の利用条件を定めるものです。登録ユーザーの皆さま（以下，「ユーザー」といいます。）には，本規約に従って，本サービスをご利用いただきます。
                              </p>
      </section>
      <section>
      <h3 className="text-slate-900 dark:text-white font-bold text-base mb-2 flex items-center gap-2">
      <span className="w-1 h-5 bg-primary rounded-full"></span>
                                  第1条（適用）
                              </h3>
      <p className="text-sm leading-7">
                                  本規約は，ユーザーと当社との間の本サービスの利用に関わる一切の関係に適用されるものとします。<br/>
                                  当社は本サービスに関し，本規約のほか，ご利用にあたってのルール等，各種の定め（以下，「個別規定」といいます。）をすることがあります。これら個別規定はその名称のいかんに関わらず，本規約の一部を構成するものとします。
                              </p>
      </section>
      <section>
      <h3 className="text-slate-900 dark:text-white font-bold text-base mb-2 flex items-center gap-2">
      <span className="w-1 h-5 bg-primary rounded-full"></span>
                                  第2条（利用登録）
                              </h3>
      <p className="text-sm leading-7">
                                  登録希望者が当社の定める方法によって利用登録を申請し，当社がこれを承認することによって，利用登録が完了するものとします。<br/>
                                  当社は，利用登録の申請者に以下の事由があると判断した場合，利用登録の申請を承認しないことがあり，その理由については一切の開示義務を負わないものとします。
                              </p>
      <ul className="list-disc list-inside mt-2 text-sm space-y-1 pl-2 marker:text-primary">
      <li>利用登録の申請に際して虚偽の事項を届け出た場合</li>
      <li>本規約に違反したことがある者からの申請である場合</li>
      <li>その他，当社が利用登録を相当でないと判断した場合</li>
      </ul>
      </section>
      <section>
      <h3 className="text-slate-900 dark:text-white font-bold text-base mb-2 flex items-center gap-2">
      <span className="w-1 h-5 bg-primary rounded-full"></span>
                                  第3条（禁止事項）
                              </h3>
      <p className="text-sm leading-7">
                                  ユーザーは，本サービスの利用にあたり，以下の行為をしてはなりません。
                              </p>
      <div className="mt-3 space-y-2 text-sm bg-surface-light dark:bg-surface-dark p-4 rounded-lg border border-gray-100 dark:border-gray-800">
      <div className="flex gap-2">
      <span className="text-primary font-bold">1.</span>
      <p>法令または公序良俗に違反する行為</p>
      </div>
      <div className="flex gap-2">
      <span className="text-primary font-bold">2.</span>
      <p>犯罪行為に関連する行為</p>
      </div>
      <div className="flex gap-2">
      <span className="text-primary font-bold">3.</span>
      <p>当社のサーバーまたはネットワークの機能を破壊したり，妨害したりする行為</p>
      </div>
      <div className="flex gap-2">
      <span className="text-primary font-bold">4.</span>
      <p>当社のサービスの運営を妨害するおそれのある行為</p>
      </div>
      <div className="flex gap-2">
      <span className="text-primary font-bold">5.</span>
      <p>他のユーザーに関する個人情報等を収集または蓄積する行為</p>
      </div>
      <div className="flex gap-2">
      <span className="text-primary font-bold">6.</span>
      <p>医療従事者になりすます行為、または資格を有しないにも関わらず医療アドバイスを行う行為</p>
      </div>
      </div>
      </section>
      <section>
      <h3 className="text-slate-900 dark:text-white font-bold text-base mb-2 flex items-center gap-2">
      <span className="w-1 h-5 bg-primary rounded-full"></span>
                                  第4条（本サービスの提供の停止等）
                              </h3>
      <p className="text-sm leading-7">
                                  当社は，以下のいずれかの事由があると判断した場合，ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
                              </p>
      </section>
      <section>
      <h3 className="text-slate-900 dark:text-white font-bold text-base mb-2 flex items-center gap-2">
      <span className="w-1 h-5 bg-primary rounded-full"></span>
                                  第5条（免責事項）
                              </h3>
      <p className="text-sm leading-7">
                                  当社の債務不履行責任は，当社の故意または重過失によらない場合には免責されるものとします。<br/>
                                  当社は，本サービスに関して，ユーザーと他のユーザーまたは第三者との間において生じた取引，連絡または紛争等について一切責任を負いません。
                              </p>
      </section>
      </div>
      {/*  Meta Text  */}
      <div className="mt-12 mb-8 border-t border-gray-200 dark:border-gray-800 pt-6">
      <p className="text-slate-500 dark:text-slate-400 text-xs text-right">
                              最終更新日：2023年10月27日<br/>
                              制定日：2023年1月15日
                          </p>
      </div>
      </div>
      </main>
      {/*  Bottom Navigation Bar  */}
      <nav className="flex-none bg-background-light dark:bg-background-dark border-t border-gray-200 dark:border-gray-800 pb-safe pt-2 absolute bottom-0 w-full z-30">
      <div className="flex justify-around items-center px-2 pb-3">
      <a className="flex flex-1 flex-col items-center gap-1 group" href="#">
      <div className="relative p-1 rounded-full group-hover:bg-primary/10 transition-colors">
      <Icon name="home" className="inline-block align-middle" size={24} />
      </div>
      <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 group-hover:text-primary transition-colors">ホーム</span>
      </a>
      <a className="flex flex-1 flex-col items-center gap-1 group" href="#">
      <div className="relative p-1 rounded-full group-hover:bg-primary/10 transition-colors">
      <Icon name="help" className="inline-block align-middle" size={24} />
      </div>
      <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 group-hover:text-primary transition-colors">質問</span>
      </a>
      <a className="flex flex-1 flex-col items-center gap-1 group" href="#">
      <div className="relative p-1 rounded-full group-hover:bg-primary/10 transition-colors">
      <Icon name="chat_bubble" className="inline-block align-middle" size={24} />
      {/*  Notification Badge  */}
      <span className="absolute top-1 right-0.5 h-2 w-2 rounded-full bg-primary ring-2 ring-background-light dark:ring-background-dark"></span>
      </div>
      <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 group-hover:text-primary transition-colors">回答</span>
      </a>
      <a className="flex flex-1 flex-col items-center gap-1 group" href="#">
      <div className="relative p-1 rounded-full bg-primary/10">
      <Icon name="person" className="inline-block align-middle text-primary-dark dark:text-primary" size={24} />
      </div>
      <span className="text-[10px] font-medium text-primary-dark dark:text-primary">マイページ</span>
      </a>
      </div>
      </nav>
      </div>
    </>
  );
}
