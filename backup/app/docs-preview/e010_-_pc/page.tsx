import Icon from '../../../components/Icon';
import React from 'react';

export default function Page(){
  return (
    <>
      {/*  Header  */}
      <header className="sticky top-0 z-30 flex items-center bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm p-4 border-b border-gray-100 dark:border-gray-800 justify-between">
      <div className="flex items-center gap-2">
      {/*  Icon Logo Placeholder  */}
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-text-primary">
      <Icon name="medical_services" className="text-xl" />
      </div>
      <h2 className="text-text-primary dark:text-white text-xl font-display font-bold leading-tight tracking-[-0.015em]">Medily</h2>
      </div>
      <div className="flex items-center justify-end">
      <button className="flex items-center justify-center rounded-full w-10 h-10 hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-text-primary dark:text-white">
      <Icon name="settings" />
      </button>
      <button className="flex items-center justify-center rounded-full w-10 h-10 hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-text-primary dark:text-white ml-1">
      <Icon name="account_circle" />
      </button>
      </div>
      </header>
      {/*  Main Content  */}
      <main className="flex-1 w-full max-w-[1024px] mx-auto px-4 pb-24">
      {/*  Page Title  */}
      <div className="pt-6 pb-2">
      <h2 className="text-text-primary dark:text-white tracking-tight text-[28px] font-bold leading-tight font-display">自分の質問</h2>
      <p className="text-text-secondary dark:text-gray-400 text-sm mt-1">過去に投稿した医療相談の履歴を確認できます</p>
      </div>
      {/*  Filters  */}
      <div className="sticky top-[73px] z-20 -mx-4 px-4 bg-background-light dark:bg-background-dark py-3 mb-2">
      <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1">
      <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-700 pl-4 pr-3 hover:border-primary active:bg-primary/10 transition-colors shadow-sm">
      <Icon name="filter_list" className="text-lg" />
      <p className="text-text-primary dark:text-white text-sm font-medium leading-normal">絞り込み</p>
      </button>
      <div className="w-px h-9 bg-gray-200 dark:bg-gray-700 shrink-0 mx-1"></div>
      <button className="group flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-primary text-text-primary pl-4 pr-3 shadow-sm border border-transparent">
      <p className="text-sm font-bold leading-normal">すべて</p>
      </button>
      <button className="group flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-700 pl-4 pr-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm">
      <p className="text-text-primary dark:text-white text-sm font-medium leading-normal">回答募集中</p>
      <div className="flex items-center justify-center bg-primary/20 text-primary-dark rounded-full px-1.5 h-5 min-w-[20px]">
      <span className="text-xs font-bold">2</span>
      </div>
      </button>
      <button className="group flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-700 pl-4 pr-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm">
      <p className="text-text-primary dark:text-white text-sm font-medium leading-normal">回答あり</p>
      </button>
      <button className="group flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-700 pl-4 pr-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm">
      <p className="text-text-primary dark:text-white text-sm font-medium leading-normal">解決済み</p>
      </button>
      </div>
      </div>
      {/*  Question List Grid  */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
      {/*  Card 1: Waiting for answer (Featured Image style)  */}
      <div className="group relative flex flex-col overflow-hidden rounded-xl bg-surface-light dark:bg-surface-dark shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-none border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow cursor-pointer">
      {/*  Status Badge  */}
      <div className="absolute top-3 left-3 z-10">
      <span className="inline-flex items-center rounded-md bg-blue-100 dark:bg-blue-900/50 px-2 py-1 text-xs font-bold text-blue-700 dark:text-blue-300 ring-1 ring-inset ring-blue-700/10">
      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-1.5 animate-pulse"></span>
                              回答募集中
                          </span>
      </div>
      <div className="relative h-48 w-full overflow-hidden bg-gray-100">
      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" data-alt="Abstract gradient in calming blue and green tones representing healthcare" style={{ backgroundImage: '' }}  ><img src="/res_3BB3FE710AC7.png" alt="" className="absolute inset-0 w-full h-full object-cover" /></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
      <div className="absolute bottom-3 left-3 right-3 text-white">
      <div className="flex items-center gap-2 text-xs font-medium opacity-90 mb-1">
      <Icon name="calendar_today" className="text-sm" /> 2023/10/27
                                  <span>•</span>
      <span>内科</span>
      </div>
      <h3 className="font-bold text-lg leading-snug line-clamp-2">最近、食後の胃痛が気になります。市販薬で様子を見ても良いでしょうか？</h3>
      </div>
      </div>
      <div className="p-4 flex flex-col gap-3 flex-1">
      <p className="text-sm text-text-secondary dark:text-gray-400 line-clamp-2">
                              食後30分くらいすると胃がキリキリと痛むことが増えました。特に脂っこいものを食べた後に顕著です。仕事が忙しく病院に行く時間が取れないため、まずは市販薬を試したいのですが...
                          </p>
      <div className="mt-auto pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
      <div className="flex items-center gap-1 text-text-secondary dark:text-gray-400 text-xs">
      <Icon name="visibility" className="text-base" />
      <span>12 閲覧</span>
      </div>
      <button className="text-primary text-sm font-bold flex items-center hover:underline">
                                  詳細を見る
                                  <Icon name="arrow_forward" className="text-base ml-0.5" />
      </button>
      </div>
      </div>
      </div>
      {/*  Card 2: Answered (Simple style)  */}
      <div className="group relative flex flex-col rounded-xl bg-surface-light dark:bg-surface-dark shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-none border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow cursor-pointer p-4 h-full">
      <div className="flex justify-between items-start mb-2">
      <span className="inline-flex items-center rounded-md bg-primary/20 px-2 py-1 text-xs font-bold text-text-primary ring-1 ring-inset ring-primary/30">
      <Icon name="check_circle" className="text-sm mr-1" />
                              回答あり
                          </span>
      <span className="text-xs text-text-secondary dark:text-gray-500">2023/10/20</span>
      </div>
      <h3 className="font-bold text-lg text-text-primary dark:text-white leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          子供が熱を出しましたが、座薬を使うタイミングがわかりません。
                      </h3>
      <div className="flex items-center gap-2 mb-3">
      <span className="inline-flex items-center gap-1 rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-xs font-medium text-text-secondary dark:text-gray-300">
      <Icon name="pediatrics" className="text-sm" />
                              小児科
                          </span>
      </div>
      <p className="text-sm text-text-secondary dark:text-gray-400 line-clamp-3 mb-4 flex-1">
                          3歳の子供が38.5度の熱を出しています。機嫌はそこまで悪くないのですが、食欲が少し落ちています。手元に以前処方されたアンヒバ座薬があるのですが、どのタイミングで使うべきでしょうか？
                      </p>
      <div className="mt-auto flex items-center justify-between bg-background-light dark:bg-black/20 -mx-4 -mb-4 px-4 py-3 border-t border-gray-100 dark:border-gray-800">
      <div className="flex items-center gap-3">
      <div className="flex items-center gap-1 text-primary font-bold text-sm">
      <Icon name="chat_bubble" className="text-lg filled" />
      <span>2件の回答</span>
      </div>
      </div>
      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-text-primary">
      <Icon name="arrow_forward" className="text-lg" />
      </div>
      </div>
      </div>
      {/*  Card 3: Resolved  */}
      <div className="group relative flex flex-col rounded-xl bg-surface-light dark:bg-surface-dark shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-none border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow cursor-pointer p-4 h-full opacity-80 hover:opacity-100">
      <div className="flex justify-between items-start mb-2">
      <span className="inline-flex items-center rounded-md bg-gray-100 dark:bg-gray-700 px-2 py-1 text-xs font-bold text-gray-600 dark:text-gray-300 ring-1 ring-inset ring-gray-500/10">
      <Icon name="lock" className="text-sm mr-1" />
                              解決済み
                          </span>
      <span className="text-xs text-text-secondary dark:text-gray-500">2023/09/15</span>
      </div>
      <h3 className="font-bold text-lg text-text-primary dark:text-white leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          健康診断の結果で「肝機能の数値が高い」と言われました。
                      </h3>
      <div className="flex items-center gap-2 mb-3">
      <span className="inline-flex items-center gap-1 rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-xs font-medium text-text-secondary dark:text-gray-300">
      <Icon name="monitor_heart" className="text-sm" />
                              一般内科
                          </span>
      </div>
      <p className="text-sm text-text-secondary dark:text-gray-400 line-clamp-3 mb-4 flex-1">
                          先日の健康診断でASTとALTの数値が基準値を超えていました。お酒はあまり飲まないのですが、何が原因として考えられるでしょうか？再検査に行く前に気をつけるべきことはありますか？
                      </p>
      <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
      <div className="flex items-center gap-1 text-text-secondary dark:text-gray-500 text-sm">
      <Icon name="check" className="text-lg" />
      <span>解決しました</span>
      </div>
      <span className="text-xs text-text-secondary dark:text-gray-500">回答 3件</span>
      </div>
      </div>
      {/*  Card 4: Waiting  */}
      <div className="group relative flex flex-col rounded-xl bg-surface-light dark:bg-surface-dark shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-none border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow cursor-pointer p-4 h-full">
      <div className="flex justify-between items-start mb-2">
      <span className="inline-flex items-center rounded-md bg-blue-100 dark:bg-blue-900/50 px-2 py-1 text-xs font-bold text-blue-700 dark:text-blue-300 ring-1 ring-inset ring-blue-700/10">
      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-1.5"></span>
                              回答募集中
                          </span>
      <span className="text-xs text-text-secondary dark:text-gray-500">2023/08/02</span>
      </div>
      <h3 className="font-bold text-lg text-text-primary dark:text-white leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          腕に発疹が出て痒みが止まりません。
                      </h3>
      <div className="flex items-center gap-2 mb-3">
      <span className="inline-flex items-center gap-1 rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-xs font-medium text-text-secondary dark:text-gray-300">
      <Icon name="dermatology" className="text-sm" />
                              皮膚科
                          </span>
      <span className="inline-flex items-center gap-1 rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-xs font-medium text-text-secondary dark:text-gray-300">
      <Icon name="image" className="text-sm" />
                              写真あり
                          </span>
      </div>
      <p className="text-sm text-text-secondary dark:text-gray-400 line-clamp-3 mb-4 flex-1">
                          今朝起きたら右腕の内側に赤い発疹が広がっていました。虫刺されのような感じもしますが、範囲が広く痒みが強いです。画像を添付しますので見ていただけますか？
                      </p>
      <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
      <div className="flex items-center gap-1 text-text-secondary dark:text-gray-500 text-sm">
      <Icon name="schedule" className="text-lg" />
      <span>回答待ち</span>
      </div>
      </div>
      </div>
      </div>
      {/*  Pagination  */}
      <div className="flex justify-center mt-8 mb-4">
      <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-sm">
      <a className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 dark:ring-gray-700 dark:hover:bg-gray-800" href="#">
      <span className="sr-only">Previous</span>
      <Icon name="chevron_left" className="text-xl" />
      </a>
      <a aria-current="page" className="relative z-10 inline-flex items-center bg-primary px-4 py-2 text-sm font-semibold text-text-primary focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" href="#">1</a>
      <a className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-text-primary ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 dark:text-white dark:ring-gray-700 dark:hover:bg-gray-800" href="#">2</a>
      <a className="relative hidden items-center px-4 py-2 text-sm font-semibold text-text-primary ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex dark:text-white dark:ring-gray-700 dark:hover:bg-gray-800" href="#">3</a>
      <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0 dark:text-gray-400 dark:ring-gray-700">...</span>
      <a className="relative hidden items-center px-4 py-2 text-sm font-semibold text-text-primary ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex dark:text-white dark:ring-gray-700 dark:hover:bg-gray-800" href="#">8</a>
      <a className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 dark:ring-gray-700 dark:hover:bg-gray-800" href="#">
      <span className="sr-only">Next</span>
      <Icon name="chevron_right" className="text-xl" />
      </a>
      </nav>
      </div>
      </main>
      {/*  Floating Action Button  */}
      <div className="fixed bottom-20 right-4 z-40 md:right-[calc(50%-512px+1rem)]">
      <button className="flex items-center justify-center w-14 h-14 rounded-full bg-primary text-text-primary shadow-lg hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 group">
      <Icon name="add" className="text-3xl" />
      <span className="sr-only">新しい質問</span>
      {/*  Tooltip for desktop  */}
      <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-surface-dark text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none hidden md:block">
                      質問する
                   </div>
      </button>
      </div>
      {/*  Bottom Navigation (App style Footer)  */}
      <nav className="fixed bottom-0 w-full bg-surface-light dark:bg-surface-dark border-t border-gray-200 dark:border-gray-800 z-50">
      <div className="max-w-[1024px] mx-auto px-4 h-16 flex items-center justify-between md:justify-around">
      <a className="flex flex-col items-center justify-center w-full h-full text-text-secondary dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors gap-1" href="#">
      <Icon name="home" className="text-2xl" />
      <span className="text-[10px] font-medium">ホーム</span>
      </a>
      <a className="flex flex-col items-center justify-center w-full h-full text-primary gap-1 relative" href="#">
      <Icon name="help_center" className="text-2xl filled" />
      <span className="text-[10px] font-medium">質問</span>
      <span className="absolute top-2 right-[20%] w-2 h-2 bg-red-500 rounded-full"></span>
      </a>
      <a className="flex flex-col items-center justify-center w-full h-full text-text-secondary dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors gap-1" href="#">
      <Icon name="mail" className="text-2xl" />
      <span className="text-[10px] font-medium">メッセージ</span>
      </a>
      <a className="flex flex-col items-center justify-center w-full h-full text-text-secondary dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors gap-1" href="#">
      <Icon name="person" className="text-2xl" />
      <span className="text-[10px] font-medium">マイページ</span>
      </a>
      </div>
      </nav>
    </>
  );
}
