import Icon from '../../../components/Icon';
import React from 'react';

export default function Page(){
  return (
    <>
      {/*  Top AppBar  */}
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800">
      <div className="flex items-center px-4 py-3 justify-between max-w-md mx-auto w-full">
      <div className="flex items-center gap-2 flex-1">
      <div className="flex items-center justify-center size-8 bg-primary rounded-lg text-primary-content font-bold text-lg">M</div>
      <h1 className="text-xl font-bold font-display tracking-tight text-gray-900 dark:text-white">自分の回答</h1>
      </div>
      <button className="flex items-center justify-center size-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300">
      <Icon name="settings" />
      </button>
      </div>
      </header>
      <main className="flex-1 w-full max-w-md mx-auto flex flex-col pb-24">
      {/*  Contribution Dashboard Section  */}
      <section className="p-4 space-y-4">
      <h2 className="text-lg font-bold px-1 font-display">貢献ダッシュボード</h2>
      {/*  Charts / Progress Area  */}
      <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col gap-4">
      <div className="flex justify-between items-start">
      <div>
      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">現在の貢献レベル</p>
      <div className="flex items-baseline gap-2 mt-1">
      <span className="text-3xl font-bold text-gray-900 dark:text-white font-display">Level 5</span>
      <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">+12% 上昇中</span>
      </div>
      </div>
      <div className="size-12 rounded-full border-4 border-gray-100 dark:border-gray-700 relative flex items-center justify-center">
      <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent border-l-transparent transform -rotate-45" style={{ clipPath: 'circle(50%)' }}></div>
      <Icon name="trending_up" className="text-primary" />
      </div>
      </div>
      {/*  Contribution Chart Simulation  */}
      <div className="h-24 w-full flex items-end justify-between gap-2 pt-4">
      <div className="flex flex-col items-center gap-1 w-full">
      <div className="w-full bg-primary/20 rounded-t-sm h-[40%] relative group">
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-gray-800 text-white text-[10px] px-1 rounded">12件</div>
      </div>
      <span className="text-[10px] text-gray-400">1週</span>
      </div>
      <div className="flex flex-col items-center gap-1 w-full">
      <div className="w-full bg-primary/40 rounded-t-sm h-[65%] relative group">
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-gray-800 text-white text-[10px] px-1 rounded">18件</div>
      </div>
      <span className="text-[10px] text-gray-400">2週</span>
      </div>
      <div className="flex flex-col items-center gap-1 w-full">
      <div className="w-full bg-primary/60 rounded-t-sm h-[50%] relative group">
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-gray-800 text-white text-[10px] px-1 rounded">15件</div>
      </div>
      <span className="text-[10px] text-gray-400">3週</span>
      </div>
      <div className="flex flex-col items-center gap-1 w-full">
      <div className="w-full bg-primary rounded-t-sm h-[90%] relative group">
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-gray-800 text-white text-[10px] px-1 rounded">28件</div>
      </div>
      <span className="text-[10px] font-bold text-primary">今週</span>
      </div>
      </div>
      </div>
      {/*  Stats Cards Row  */}
      <div className="grid grid-cols-2 gap-3">
      <div className="flex flex-col gap-1 rounded-xl bg-surface-light dark:bg-surface-dark p-4 shadow-sm border border-gray-100 dark:border-gray-800">
      <div className="flex items-center gap-2 mb-1">
      <div className="size-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-500">
      <Icon name="favorite" className="text-[16px]" size={16} />
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">獲得サンキュー</p>
      </div>
      <p className="text-2xl font-bold text-gray-900 dark:text-white font-display">124</p>
      </div>
      <div className="flex flex-col gap-1 rounded-xl bg-surface-light dark:bg-surface-dark p-4 shadow-sm border border-gray-100 dark:border-gray-800">
      <div className="flex items-center gap-2 mb-1">
      <div className="size-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-500">
      <Icon name="medical_services" className="text-[16px]" size={16} />
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">トップカテゴリ</p>
      </div>
      <p className="text-xl font-bold text-gray-900 dark:text-white truncate font-display">皮膚科</p>
      </div>
      </div>
      </section>
      {/*  Filter Chips Section  */}
      <div className="sticky top-[60px] z-40 bg-background-light dark:bg-background-dark py-2 border-b border-gray-100 dark:border-gray-800">
      <div className="flex gap-2 px-4 overflow-x-auto no-scrollbar items-center">
      <button className="flex h-9 shrink-0 items-center justify-center gap-x-1.5 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 pl-3 pr-2 shadow-sm whitespace-nowrap active:scale-95 transition-transform">
      <span className="text-gray-700 dark:text-gray-200 text-sm font-medium">ステータス: すべて</span>
      <Icon name="keyboard_arrow_down" className="text-gray-500 text-[18px]" size={18} />
      </button>
      <button className="flex h-9 shrink-0 items-center justify-center gap-x-1.5 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 pl-3 pr-2 shadow-sm whitespace-nowrap active:scale-95 transition-transform">
      <span className="text-gray-700 dark:text-gray-200 text-sm font-medium">カテゴリ: 内科</span>
      <Icon name="keyboard_arrow_down" className="text-gray-500 text-[18px]" size={18} />
      </button>
      <button className="flex h-9 shrink-0 items-center justify-center gap-x-1.5 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 pl-3 pr-2 shadow-sm whitespace-nowrap active:scale-95 transition-transform">
      <span className="text-gray-700 dark:text-gray-200 text-sm font-medium">新しい順</span>
      <Icon name="sort" className="text-gray-500 text-[18px]" size={18} />
      </button>
      </div>
      </div>
      {/*  Answer List  */}
      <div className="px-4 py-4 space-y-4">
      {/*  Card 1  */}
      <article className="bg-surface-light dark:bg-surface-dark rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col gap-3 group active:bg-gray-50 dark:active:bg-gray-800/50 transition-colors cursor-pointer">
      <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
      <span className="bg-primary/20 text-primary-content dark:text-primary text-[10px] font-bold px-2 py-1 rounded-full">回答済</span>
      <span className="text-gray-400 text-xs font-display">2023/10/25</span>
      </div>
      <div className="flex items-center gap-1 text-red-500">
      <Icon name="favorite" className="text-[16px] fill-current" size={16} />
      <span className="text-xs font-bold font-display">12</span>
      </div>
      </div>
      <div className="space-y-2">
      <div className="flex gap-2">
      <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 size-5 flex items-center justify-center rounded text-xs font-bold shrink-0">Q</span>
      <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 line-clamp-2 leading-relaxed">
                                  3歳の子供が昨晩から38度の熱を出しており、水分は取れていますが食欲があまりありません。すぐに病院に行くべきでしょうか？
                              </h3>
      </div>
      <div className="h-px bg-gray-100 dark:bg-gray-800 w-full my-1"></div>
      <div className="flex gap-2">
      <span className="bg-primary/20 text-primary-content dark:text-primary size-5 flex items-center justify-center rounded text-xs font-bold shrink-0">A</span>
      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                                  水分が取れていて機嫌が悪くなければ、まずは様子を見て大丈夫です。ただし、ぐったりしている場合や水分が取れなくなった場合は受診を検討してください。解熱剤を使用する場合は...
                              </p>
      </div>
      </div>
      <div className="flex items-center justify-end gap-2 mt-1">
      <span className="text-xs text-gray-400 bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded flex items-center gap-1">
      <Icon name="pediatrics" className="text-[14px]" size={14} /> 小児科
                          </span>
      </div>
      </article>
      {/*  Card 2  */}
      <article className="bg-surface-light dark:bg-surface-dark rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col gap-3 group active:bg-gray-50 dark:active:bg-gray-800/50 transition-colors cursor-pointer">
      <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
      <span className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-[10px] font-bold px-2 py-1 rounded-full">ベストアンサー</span>
      <span className="text-gray-400 text-xs font-display">2023/10/22</span>
      </div>
      <div className="flex items-center gap-1 text-red-500">
      <Icon name="favorite" className="text-[16px] fill-current" size={16} />
      <span className="text-xs font-bold font-display">45</span>
      </div>
      </div>
      <div className="space-y-2">
      <div className="flex gap-2">
      <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 size-5 flex items-center justify-center rounded text-xs font-bold shrink-0">Q</span>
      <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 line-clamp-2 leading-relaxed">
                                  背中に赤い発疹が出て痒みがあります。市販のステロイド軟膏を使っても良いでしょうか？写真を添付します。
                              </h3>
      </div>
      <div className="h-px bg-gray-100 dark:bg-gray-800 w-full my-1"></div>
      <div className="flex gap-2">
      <span className="bg-primary/20 text-primary-content dark:text-primary size-5 flex items-center justify-center rounded text-xs font-bold shrink-0">A</span>
      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                                  写真を拝見する限り、帯状疱疹の可能性があります。その場合、市販のステロイドは症状を悪化させる恐れがあるため使用を控え、早急に皮膚科を受診してください。
                              </p>
      </div>
      </div>
      <div className="flex items-center justify-end gap-2 mt-1">
      <span className="text-xs text-gray-400 bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded flex items-center gap-1">
      <Icon name="dermatology" className="text-[14px]" size={14} /> 皮膚科
                          </span>
      </div>
      </article>
      {/*  Card 3  */}
      <article className="bg-surface-light dark:bg-surface-dark rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col gap-3 group active:bg-gray-50 dark:active:bg-gray-800/50 transition-colors cursor-pointer opacity-75">
      <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
      <span className="bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-[10px] font-bold px-2 py-1 rounded-full">クローズ</span>
      <span className="text-gray-400 text-xs font-display">2023/10/18</span>
      </div>
      <div className="flex items-center gap-1 text-gray-400">
      <Icon name="favorite" className="text-[16px]" size={16} />
      <span className="text-xs font-bold font-display">2</span>
      </div>
      </div>
      <div className="space-y-2">
      <div className="flex gap-2">
      <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 size-5 flex items-center justify-center rounded text-xs font-bold shrink-0">Q</span>
      <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 line-clamp-2 leading-relaxed">
                                  健康診断でLDLコレステロールが高いと言われました。食事制限だけで改善可能でしょうか？数値は150です。
                              </h3>
      </div>
      <div className="h-px bg-gray-100 dark:bg-gray-800 w-full my-1"></div>
      <div className="flex gap-2">
      <span className="bg-primary/20 text-primary-content dark:text-primary size-5 flex items-center justify-center rounded text-xs font-bold shrink-0">A</span>
      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                                  数値150であれば、まずは生活習慣の改善から始めるのが一般的です。特に動物性脂肪を控え、食物繊維を多く摂ることを意識してください。3ヶ月後に再検査をして...
                              </p>
      </div>
      </div>
      <div className="flex items-center justify-end gap-2 mt-1">
      <span className="text-xs text-gray-400 bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded flex items-center gap-1">
      <Icon name="cardiology" className="text-[14px]" size={14} /> 内科
                          </span>
      </div>
      </article>
      {/*  Load More  */}
      <button className="w-full py-3 text-sm font-bold text-primary hover:text-primary-content transition-colors flex items-center justify-center gap-2 mt-4">
                      もっと見る
                      <Icon name="chevron_right" className="text-[18px]" size={18} />
      </button>
      </div>
      </main>
      {/*  Bottom Navigation  */}
      <nav className="fixed bottom-0 z-50 w-full max-w-md left-1/2 -translate-x-1/2 bg-surface-light dark:bg-surface-dark border-t border-gray-100 dark:border-gray-800 pb-safe">
      <div className="flex justify-around items-center h-16 pb-2">
      <a className="flex flex-col items-center justify-center w-full h-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" href="#">
      <Icon name="home" className="text-2xl mb-0.5" />
      <span className="text-[10px] font-medium">ホーム</span>
      </a>
      <a className="flex flex-col items-center justify-center w-full h-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" href="#">
      <Icon name="help" className="text-2xl mb-0.5" />
      <span className="text-[10px] font-medium">質問を探す</span>
      </a>
      {/*  Active State  */}
      <a className="flex flex-col items-center justify-center w-full h-full text-primary" href="#">
      <Icon name="edit_note" className="text-2xl mb-0.5 fill-current" />
      <span className="text-[10px] font-bold">回答一覧</span>
      </a>
      <a className="flex flex-col items-center justify-center w-full h-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" href="#">
      <Icon name="person" className="text-2xl mb-0.5" />
      <span className="text-[10px] font-medium">マイページ</span>
      </a>
      </div>
      </nav>
      <div className="h-[env(safe-area-inset-bottom)] bg-surface-light dark:bg-surface-dark w-full fixed bottom-0 left-0 -z-10"></div>
    </>
  );
}
