import Icon from '../../../components/Icon';
import React from 'react';

export default function Page(){
  return (
    <>
      {/*  Top App Bar  */}
      <header className="sticky top-0 z-50 flex items-center justify-between bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md px-4 py-3 border-b border-gray-200/50 dark:border-gray-800/50">
      <button aria-label="戻る" className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-200/50 dark:hover:bg-gray-800/50 transition-colors text-slate-800 dark:text-white">
      <Icon name="arrow_back" className="inline-block align-middle text-2xl" size={16} />
      </button>
      <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10 text-slate-900 dark:text-white">質問詳細</h2>
      </header>
      {/*  Main Content Area  */}
      <main className="flex-1 w-full pb-32">
      {/*  Question Section  */}
      <section className="p-5">
      {/*  Status & Date  */}
      <div className="flex items-center justify-between mb-4">
      <div className="flex h-7 items-center justify-center gap-x-1.5 rounded-full bg-primary/20 px-3 border border-primary/20">
      <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
      </span>
      <p className="text-green-800 dark:text-green-300 text-xs font-bold leading-normal">回答受付中</p>
      </div>
      <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">2023/10/27 14:30</p>
      </div>
      {/*  Question Body  */}
      <div className="mb-6">
      <p className="text-slate-800 dark:text-slate-100 text-base md:text-lg font-medium leading-relaxed font-body">
                          最近、食後に胃がキリキリと痛むことが多く、市販の胃薬を飲んでもあまり改善しません。特に脂っこいものを食べた後に症状が強くなります。どのような病院に行けばよいでしょうか？また、考えられる病気はありますか？
                      </p>
      </div>
      {/*  Meta Data List  */}
      <div className="grid grid-cols-2 gap-3 mb-2">
      <div className="flex flex-col gap-1 p-3 rounded-xl bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-sm">
      <div className="flex items-center gap-1.5 text-primary">
      <Icon name="category" className="inline-block align-middle text-lg" size={16} />
      <span className="text-xs font-bold uppercase tracking-wider">カテゴリ</span>
      </div>
      <p className="text-slate-900 dark:text-white text-sm font-semibold pl-6">内科・消化器科</p>
      </div>
      <div className="flex flex-col gap-1 p-3 rounded-xl bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-sm">
      <div className="flex items-center gap-1.5 text-primary">
      <Icon name="location_on" className="inline-block align-middle text-lg" size={16} />
      <span className="text-xs font-bold uppercase tracking-wider">地域</span>
      </div>
      <p className="text-slate-900 dark:text-white text-sm font-semibold pl-6">東京都新宿区</p>
      </div>
      </div>
      </section>
      {/*  Divider / Transition to Answers  */}
      <div className="h-4 bg-gray-100 dark:bg-[#0c1a11] border-y border-gray-200 dark:border-gray-800/50 mb-6"></div>
      {/*  Answers Section  */}
      <section className="px-5">
      <div className="flex items-center gap-2 mb-6">
      <Icon name="forum" className="inline-block align-middle text-primary fill-1" size={16} />
      <h3 className="text-lg font-bold text-slate-900 dark:text-white">専門家からの回答 <span className="text-slate-400 dark:text-slate-500 text-sm font-normal ml-1">(2件)</span></h3>
      </div>
      <div className="space-y-6">
      {/*  Answer Card 1  */}
      <article className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-2xl opacity-50 blur-sm transition duration-200"></div>
      <div className="relative bg-white dark:bg-surface-dark rounded-xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm">
      {/*  Sender Header  */}
      <div className="flex items-start justify-between mb-3">
      <div className="flex items-center gap-3">
      <div className="size-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
      <Icon name="medical_services" className="inline-block align-middle" size={16} />
      </div>
      <div>
      <div className="flex items-center gap-2">
      <p className="text-sm font-bold text-slate-900 dark:text-white">消化器内科専門医</p>
      <Icon name="verified" className="inline-block align-middle text-blue-500 text-base" size={16} />
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400">新宿メディカルセンター • 30分前</p>
      </div>
      </div>
      </div>
      {/*  Message Body  */}
      <div className="pl-13 ml-0 md:ml-12">
      <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-3 font-body">
                                      症状から察するに、胆石症や逆流性食道炎の可能性も考えられます。特に食後の痛みという点が気になりますね。<br/><br/>
                                      市販薬で改善しない場合は、一度消化器内科でエコー検査や胃カメラを受けることを強くお勧めします。早めの受診が安心に繋がりますよ。
                                  </p>
      {/*  Action Buttons inside card  */}
      <div className="flex gap-3 mt-4">
      <button className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-xs font-medium text-slate-700 dark:text-slate-300 border border-gray-200 dark:border-gray-700">
      <Icon name="thumb_up" className="inline-block align-middle text-lg" size={16} />
                                          参考になった
                                      </button>
      <button className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors text-xs font-medium text-green-800 dark:text-green-300 border border-transparent">
      <Icon name="reply" className="inline-block align-middle text-lg" size={16} />
                                          返信する
                                      </button>
      </div>
      </div>
      </div>
      </article>
      {/*  Answer Card 2  */}
      <article className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-2xl opacity-50 blur-sm transition duration-200"></div>
      <div className="relative bg-white dark:bg-surface-dark rounded-xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm">
      {/*  Sender Header  */}
      <div className="flex items-start justify-between mb-3">
      <div className="flex items-center gap-3">
      <div className="size-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
      <Icon name="local_hospital" className="inline-block align-middle" size={16} />
      </div>
      <div>
      <div className="flex items-center gap-2">
      <p className="text-sm font-bold text-slate-900 dark:text-white">駅前ケアクリニック</p>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400">地域医療機関 • 2時間前</p>
      </div>
      </div>
      </div>
      {/*  Message Body  */}
      <div className="pl-13 ml-0 md:ml-12">
      <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-3 font-body">
                                      当院では土日も消化器内科の専門外来を行っております。お仕事でお忙しい場合でも受診しやすいかと思います。<br/>
                                      初診でもWeb予約が可能ですので、ぜひご活用ください。
                                  </p>
      {/*  Rich Content: Map/Link Preview  */}
      <a className="block mt-3 mb-4 group/link" href="#">
      <div className="flex overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
      <div className="w-24 h-auto relative bg-gray-200">
      <img alt="Map view of Shinjuku area" className="absolute inset-0 w-full h-full object-cover" data-alt="Map view showing the clinic location in Shinjuku" data-location="Tokyo, Shinjuku" src="res_31E4972ED8B8.png" />
      </div>
      <div className="flex-1 p-3">
      <p className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover/link:text-primary transition-colors">駅前ケアクリニック - 新宿駅徒歩3分</p>
      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">東京都新宿区西新宿1-1-1 メディカルビル3F</p>
      </div>
      </div>
      </a>
      {/*  Action Buttons inside card  */}
      <div className="flex gap-3">
      <button className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-xs font-medium text-slate-700 dark:text-slate-300 border border-gray-200 dark:border-gray-700">
      <Icon name="thumb_up" className="inline-block align-middle text-lg" size={16} />
                                          参考になった
                                      </button>
      <button className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors text-xs font-medium text-green-800 dark:text-green-300 border border-transparent">
      <Icon name="calendar_month" className="inline-block align-middle text-lg" size={16} />
                                          予約する
                                      </button>
      </div>
      </div>
      </div>
      </article>
      </div>
      </section>
      </main>
      {/*  Sticky Footer CTA  */}
      <div className="fixed bottom-0 left-0 w-full bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 p-4 safe-area-pb z-40">
      <button className="w-full relative group overflow-hidden rounded-xl bg-primary text-slate-900 shadow-[0_0_20px_rgba(19,236,91,0.3)] hover:shadow-[0_0_25px_rgba(19,236,91,0.5)] transition-all duration-300 active:scale-[0.98]">
      <div className="absolute inset-0 bg-white/20 group-hover:bg-transparent transition-colors"></div>
      <div className="relative flex items-center justify-center gap-2 py-3.5 px-6">
      <Icon name="add_circle" className="inline-block align-middle font-bold" size={16} />
      <span className="text-base font-bold tracking-wide">追加で質問する</span>
      </div>
      </button>
      </div>
    </>
  );
}
