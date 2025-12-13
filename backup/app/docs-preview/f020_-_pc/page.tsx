import Icon from '../../../components/Icon';
import React from 'react';

export default function Page(){
  return (
    <>
      <div className="relative flex h-full min-h-screen w-full flex-col overflow-hidden max-w-screen-md mx-auto shadow-xl">
      {/*  Header  */}
      <header className="sticky top-0 z-50 flex items-center justify-between bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md px-4 py-3 border-b border-gray-200 dark:border-gray-800">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full active:bg-gray-200 dark:active:bg-gray-800 transition-colors cursor-pointer text-text-main-light dark:text-text-main-dark">
      <Icon name="arrow_back" className="inline-block align-middle text-[24px]" size={20} />
      </div>
      <h1 className="text-xl font-bold tracking-tight text-center flex items-center gap-2">
      <Icon name="local_hospital" className="inline-block align-middle text-[24px] fill-1" size={20} />
                      Medily
                  </h1>
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full active:bg-gray-200 dark:active:bg-gray-800 transition-colors cursor-pointer text-text-main-light dark:text-text-main-dark">
      <Icon name="settings" className="inline-block align-middle text-[24px]" size={20} />
      </div>
      </header>
      {/*  Main Content  */}
      <main className="flex-1 overflow-y-auto px-4 py-6 pb-24">
      {/*  Page Title Area  */}
      <div className="mb-6">
      <h2 className="text-3xl font-bold leading-tight tracking-tight mb-2">利用規約</h2>
      <div className="flex items-center gap-2 text-text-sub-light dark:text-text-sub-dark text-sm">
      <Icon name="edit" className="inline-block align-middle text-[16px]" size={16} />
      <p>最終更新日：2023年10月27日</p>
      </div>
      </div>
      {/*  Terms Card  */}
      <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800">
      {/*  Introduction  */}
      <div className="mb-8">
      <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 font-body">
                              この利用規約（以下，「本規約」といいます。）は，Medily（以下，「当社」といいます。）がこのウェブサイト上で提供する医療相談マッチングサービス（以下，「本サービス」といいます。）の利用条件を定めるものです。登録ユーザーの皆さま（以下，「ユーザー」といいます。）には，本規約に従って，本サービスをご利用いただきます。
                          </p>
      </div>
      {/*  Article 1  */}
      <div className="mb-8 group">
      <div className="flex items-center gap-2 mb-3">
      <div className="w-1 h-6 bg-primary rounded-full"></div>
      <h3 className="text-lg font-bold">第1条（適用）</h3>
      </div>
      <p className="text-sm leading-7 text-gray-600 dark:text-gray-400 font-body pl-3 border-l border-gray-100 dark:border-gray-700">
                              本規約は，ユーザーと当社との間の本サービスの利用に関わる一切の関係に適用されるものとします。当社は本サービスに関し，本規約のほか，ご利用にあたってのルール等，各種の定め（以下，「個別規定」といいます。）をすることがあります。これら個別規定はその名称のいかんに関わらず，本規約の一部を構成するものとします。
                          </p>
      </div>
      {/*  Article 2  */}
      <div className="mb-8 group">
      <div className="flex items-center gap-2 mb-3">
      <div className="w-1 h-6 bg-primary rounded-full"></div>
      <h3 className="text-lg font-bold">第2条（利用登録）</h3>
      </div>
      <p className="text-sm leading-7 text-gray-600 dark:text-gray-400 font-body pl-3 border-l border-gray-100 dark:border-gray-700">
                              本サービスにおいては，登録希望者が本規約に同意の上，当社の定める方法によって利用登録を申請し，当社がこれを承認することによって，利用登録が完了するものとします。当社は，利用登録の申請者に以下の事由があると判断した場合，利用登録の申請を承認しないことがあり，その理由については一切の開示義務を負わないものとします。
                          </p>
      <ul className="mt-2 pl-6 list-disc text-sm leading-7 text-gray-600 dark:text-gray-400 font-body space-y-1">
      <li>利用登録の申請に際して虚偽の事項を届け出た場合</li>
      <li>本規約に違反したことがある者からの申請である場合</li>
      <li>その他，当社が利用登録を相当でないと判断した場合</li>
      </ul>
      </div>
      {/*  Article 3  */}
      <div className="mb-8 group">
      <div className="flex items-center gap-2 mb-3">
      <div className="w-1 h-6 bg-primary rounded-full"></div>
      <h3 className="text-lg font-bold">第3条（禁止事項）</h3>
      </div>
      <p className="text-sm leading-7 text-gray-600 dark:text-gray-400 font-body pl-3 border-l border-gray-100 dark:border-gray-700">
                              ユーザーは，本サービスの利用にあたり，以下の行為をしてはなりません。
                          </p>
      <div className="mt-3 pl-3 grid gap-3">
      <div className="flex items-start gap-3 p-3 rounded-lg bg-background-light dark:bg-background-dark/50">
      <Icon name="notifications" className="inline-block align-middle text-red-500 text-[20px] mt-0.5" size={20} />
      <span className="text-sm text-gray-700 dark:text-gray-300">法令または公序良俗に違反する行為</span>
      </div>
      <div className="flex items-start gap-3 p-3 rounded-lg bg-background-light dark:bg-background-dark/50">
      <Icon name="notifications" className="inline-block align-middle text-red-500 text-[20px] mt-0.5" size={20} />
      <span className="text-sm text-gray-700 dark:text-gray-300">犯罪行為に関連する行為</span>
      </div>
      <div className="flex items-start gap-3 p-3 rounded-lg bg-background-light dark:bg-background-dark/50">
      <Icon name="notifications" className="inline-block align-middle text-red-500 text-[20px] mt-0.5" size={20} />
      <span className="text-sm text-gray-700 dark:text-gray-300">本サービスの内容等，本サービスに含まれる著作権，商標権ほか知的財産権を侵害する行為</span>
      </div>
      <div className="flex items-start gap-3 p-3 rounded-lg bg-background-light dark:bg-background-dark/50">
      <Icon name="notifications" className="inline-block align-middle text-red-500 text-[20px] mt-0.5" size={20} />
      <span className="text-sm text-gray-700 dark:text-gray-300">他のユーザーに関する個人情報等を収集または蓄積する行為</span>
      </div>
      </div>
      </div>
      {/*  Article 4  */}
      <div className="mb-4 group">
      <div className="flex items-center gap-2 mb-3">
      <div className="w-1 h-6 bg-primary rounded-full"></div>
      <h3 className="text-lg font-bold">第4条（免責事項）</h3>
      </div>
      <p className="text-sm leading-7 text-gray-600 dark:text-gray-400 font-body pl-3 border-l border-gray-100 dark:border-gray-700">
                              当社の債務不履行責任は，当社の故意または重過失によらない場合には免責されるものとします。当社は，本サービスに関して，ユーザーと他のユーザーまたは第三者との間において生じた取引，連絡または紛争等について一切責任を負いません。<br/><br/>
      <span className="font-bold text-red-500/80 dark:text-red-400">※本サービスは医療行為を提供するものではありません。緊急の場合は直ちに医療機関を受診してください。</span>
      </p>
      </div>
      </div>
      {/*  Agreement Action (Contextual)  */}
      <div className="mt-8 flex justify-center">
      <p className="text-xs text-center text-gray-400 dark:text-gray-500">
                          ご不明な点がございましたら、<a className="text-primary hover:underline" href="#">お問い合わせ</a>よりご連絡ください。
                       </p>
      </div>
      </main>
      {/*  Common Footer / Tab Bar  */}
      <nav className="fixed bottom-0 w-full max-w-screen-md bg-surface-light dark:bg-surface-dark border-t border-gray-200 dark:border-gray-800 pb-safe pt-2 px-2 z-40">
      <div className="flex items-center justify-around h-16 pb-2">
      {/*  Home  */}
      <button className="flex flex-col items-center justify-center w-16 gap-1 group">
      <Icon name="home" className="inline-block align-middle text-[26px] text-gray-400 group-hover:text-primary transition-colors" size={24} />
      <span className="text-[10px] font-medium text-gray-400 group-hover:text-primary transition-colors">ホーム</span>
      </button>
      {/*  Search  */}
      <button className="flex flex-col items-center justify-center w-16 gap-1 group">
      <Icon name="search" className="inline-block align-middle text-[26px] text-gray-400 group-hover:text-primary transition-colors" size={24} />
      <span className="text-[10px] font-medium text-gray-400 group-hover:text-primary transition-colors">探す</span>
      </button>
      {/*  Action Button (Center)  */}
      <div className="relative -top-6">
      <button className="flex items-center justify-center size-14 rounded-full bg-primary shadow-lg shadow-primary/40 text-background-dark hover:scale-105 transition-transform">
      <Icon name="add_circle" className="inline-block align-middle text-[32px]" size={32} />
      </button>
      </div>
      {/*  Chat  */}
      <button className="flex flex-col items-center justify-center w-16 gap-1 group">
      <div className="relative">
      <Icon name="chat_bubble" className="inline-block align-middle text-[26px] text-gray-400 group-hover:text-primary transition-colors" size={24} />
      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">2</span>
      </div>
      <span className="text-[10px] font-medium text-gray-400 group-hover:text-primary transition-colors">相談</span>
      </button>
      {/*  Profile (Active)  */}
      <button className="flex flex-col items-center justify-center w-16 gap-1 group">
      <Icon name="person" className="inline-block align-middle text-[26px] text-primary fill-1" size={24} />
      <span className="text-[10px] font-bold text-primary">マイページ</span>
      </button>
      </div>
      </nav>
      {/*  Safe area padding for bottom nav  */}
      <div className="h-[80px]"></div>
      </div>
    </>
  );
}
