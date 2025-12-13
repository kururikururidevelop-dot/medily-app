import Icon from '../../../components/Icon';
import React from 'react';

export default function Page(){
  return (
    <>
      {/*  Main Container (Mobile Width Restriction)  */}
      <div className="relative w-full max-w-md mx-auto flex flex-col min-h-screen bg-background-light dark:bg-background-dark shadow-xl overflow-hidden group/design-root">
      {/*  Header  */}
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800">
      <div className="flex items-center justify-center h-14 relative px-4">
      <button className="absolute left-4 p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
      <Icon name="arrow_back" className="inline-block align-middle text-text-main dark:text-gray-200" size={16} />
      </button>
      <h1 className="text-base font-bold text-text-main dark:text-white tracking-wide">質問投稿確認</h1>
      </div>
      {/*  Progress Bar Indicator  */}
      <div className="w-full h-1 bg-gray-200 dark:bg-gray-700">
      <div className="h-full bg-primary w-full rounded-r-full"></div>
      </div>
      </header>
      {/*  Content Scroll Area  */}
      <main className="flex-1 overflow-y-auto pb-32 px-4 py-6 space-y-6">
      {/*  Question Type & Category Card  */}
      <section className="bg-surface-light dark:bg-surface-dark rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-800/50">
      <div className="flex items-center gap-2 mb-4">
      <Icon name="psychology_alt" className="inline-block align-middle text-primary" size={16} />
      <h2 className="text-sm font-bold text-text-sub dark:text-primary uppercase tracking-wider">質問の概要</h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-1 border-r border-gray-100 dark:border-gray-700 pr-2">
      <span className="text-xs text-text-sub dark:text-gray-400">質問タイプ</span>
      <p className="text-sm font-semibold text-text-main dark:text-white">病院選びの相談</p>
      </div>
      <div className="flex flex-col gap-1 pl-2">
      <span className="text-xs text-text-sub dark:text-gray-400">カテゴリ</span>
      <p className="text-sm font-semibold text-text-main dark:text-white">内科・総合診療科</p>
      </div>
      </div>
      </section>
      {/*  Main Question Content  */}
      <section className="bg-surface-light dark:bg-surface-dark rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-800/50 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-3 opacity-10 pointer-events-none">
      <Icon name="format_quote" className="inline-block align-middle text-6xl text-primary" size={48} />
      </div>
      <div className="flex flex-col gap-2 relative z-10">
      <span className="text-xs font-bold text-text-sub dark:text-primary uppercase tracking-wider">質問内容</span>
      <p className="text-base leading-relaxed text-text-main dark:text-white whitespace-pre-line font-medium">最近、原因不明の頭痛が続いており、どこの病院に行けば良いかわかりません。
                              
      特に朝起きた時にズキズキとした痛みがあり、市販の鎮痛剤もあまり効きません。神経内科に行くべきか、まずは普通の内科で良いのかアドバイスをいただきたいです。</p>
      </div>
      </section>
      {/*  Details List  */}
      <section className="space-y-3">
      <h3 className="text-xs font-bold text-text-sub dark:text-gray-400 px-2 uppercase">詳細設定</h3>
      <div className="bg-surface-light dark:bg-surface-dark rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800/50 divide-y divide-gray-50 dark:divide-gray-800">
      {/*  Template Type  */}
      <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-3">
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary">
      <Icon name="description" className="inline-block align-middle text-[20px]" size={16} />
      </div>
      <span className="text-sm font-medium text-text-main dark:text-gray-200">テンプレート種別</span>
      </div>
      <span className="text-sm text-gray-500 dark:text-gray-400">標準フォーマット</span>
      </div>
      {/*  Answer Options  */}
      <div className="flex items-start justify-between p-4">
      <div className="flex items-start gap-3">
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary shrink-0">
      <Icon name="format_list_numbered" className="inline-block align-middle text-[20px]" size={16} />
      </div>
      <div className="flex flex-col">
      <span className="text-sm font-medium text-text-main dark:text-gray-200">回答選択肢</span>
      <div className="mt-1 flex flex-wrap gap-1">
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300">とても知りたい</span>
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300">知りたい</span>
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300">興味ない</span>
      </div>
      </div>
      </div>
      </div>
      {/*  URL Permission  */}
      <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-3">
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary">
      <Icon name="link" className="inline-block align-middle text-[20px]" size={16} />
      </div>
      <span className="text-sm font-medium text-text-main dark:text-gray-200">URL添付許可</span>
      </div>
      <div className="flex items-center text-primary gap-1">
      <Icon name="check_circle" className="inline-block align-middle text-lg" size={16} />
      <span className="text-sm font-medium">許可する</span>
      </div>
      </div>
      </div>
      </section>
      {/*  Targeting & Privacy  */}
      <section className="space-y-3">
      <h3 className="text-xs font-bold text-text-sub dark:text-gray-400 px-2 uppercase">ターゲット・公開設定</h3>
      <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-800/50 space-y-4">
      {/*  Location  */}
      <div className="flex flex-col gap-1">
      <span className="text-xs text-text-sub dark:text-gray-400">地域</span>
      <div className="flex items-center gap-2">
      <Icon name="location_on" className="inline-block align-middle text-gray-400 text-lg" size={16} />
      <span className="text-sm font-medium text-text-main dark:text-white">東京都 港区周辺</span>
      </div>
      </div>
      {/*  Filters  */}
      <div className="flex flex-col gap-2 pt-2 border-t border-gray-50 dark:border-gray-800">
      <span className="text-xs text-text-sub dark:text-gray-400">フィルター設定</span>
      <div className="flex flex-wrap gap-2">
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800">
      <Icon name="female" className="inline-block align-middle text-[14px]" size={16} /> 女性医師
                                  </span>
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border border-orange-100 dark:border-orange-800">
      <Icon name="cake" className="inline-block align-middle text-[14px]" size={16} /> 30代〜50代
                                  </span>
      </div>
      </div>
      {/*  Privacy Level  */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-50 dark:border-gray-800 mt-2">
      <div className="flex flex-col">
      <span className="text-xs text-text-sub dark:text-gray-400">公開レベル</span>
      <span className="text-sm font-bold text-text-main dark:text-white">クローズド（医師のみ）</span>
      </div>
      <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400">
      <Icon name="lock" className="inline-block align-middle" size={16} />
      </div>
      </div>
      </div>
      </section>
      {/*  Warning/Note  */}
      <div className="flex gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-100 dark:border-yellow-900/50">
      <Icon name="info" className="inline-block align-middle text-yellow-600 dark:text-yellow-500 shrink-0" size={16} />
      <p className="text-xs text-yellow-800 dark:text-yellow-200 leading-relaxed">
                          投稿内容は医療従事者に共有されます。個人を特定できる情報の記載には十分ご注意ください。
                      </p>
      </div>
      </main>
      {/*  Fixed Footer Actions  */}
      <footer className="fixed bottom-0 w-full max-w-md bg-white dark:bg-background-dark border-t border-gray-100 dark:border-gray-800 p-4 pb-8 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <div className="flex flex-col gap-3">
      <button className="w-full h-12 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 active:scale-[0.98] transition-all text-white font-bold rounded-full shadow-lg shadow-primary/30 text-base">
      <Icon name="send" className="inline-block align-middle" size={16} />
                          投稿を確定する
                      </button>
      <button className="w-full h-10 flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm font-medium hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
                          修正する
                      </button>
      </div>
      </footer>
      </div>
    </>
  );
}
