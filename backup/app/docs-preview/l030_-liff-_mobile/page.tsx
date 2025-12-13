import Icon from '../../../components/Icon';
import React from 'react';

export default function Page(){
  return (
    <>
      <div className="flex-1 flex flex-col w-full max-w-md mx-auto pb-24 relative">
      <header className="pt-8 pb-2 px-6">
      <h1 className="text-text-main-light dark:text-text-main-dark text-[32px] font-bold leading-tight tracking-tight">マイページ</h1>
      <p className="text-text-sub-light dark:text-text-sub-dark text-base mt-2">こんにちは、山田 太郎さん</p>
      </header>
      <section className="px-5 py-4">
      <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-5 shadow-soft border border-black/5 dark:border-white/5 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
      <div className="flex items-center gap-5 relative z-10">
      <div className="relative">
      <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 bg-cover bg-center border-2 border-primary/20" data-alt="User profile avatar image showing a generic person icon" style={{ backgroundImage: '' }}  ><img src="/res_D73594D04BAF.png" alt="" className="absolute inset-0 w-full h-full object-cover" /></div>
      <div className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1 border-2 border-white dark:border-surface-dark flex items-center justify-center">
      <Icon name="edit" className="inline-block align-middle text-[14px]" size={16} />
      </div>
      </div>
      <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between mb-1">
      <h2 className="text-text-main-light dark:text-text-main-dark text-xl font-bold truncate">たろう</h2>
      </div>
      <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1 text-text-sub-light dark:text-text-sub-dark text-sm">
      <Icon name="location_on" className="inline-block align-middle text-[16px]" size={16} />
      <span>東京都 港区</span>
      </div>
      <div className="flex items-center gap-1 text-text-sub-light dark:text-text-sub-dark text-sm">
      <Icon name="medical_services" className="inline-block align-middle text-[16px]" size={16} />
      <span>30代男性 • 会社員</span>
      </div>
      </div>
      </div>
      </div>
      </div>
      </section>
      <section className="px-5 pb-4">
      <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-5 shadow-soft border border-black/5 dark:border-white/5 relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
      <h3 className="font-bold text-text-main-light dark:text-text-main-dark text-base flex items-center gap-2">
      <Icon name="award_star" className="inline-block align-middle text-primary" size={16} />
                  貢献度ステータス
              </h3>
      <a className="text-xs font-bold text-primary hover:opacity-80 flex items-center transition-opacity" href="#">
                  回答一覧へ
                  <Icon name="chevron_right" className="inline-block align-middle text-[16px]" size={16} />
      </a>
      </div>
      <div className="flex items-center gap-6">
      <div className="relative w-20 h-20 shrink-0">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
      <path className="text-gray-100 dark:text-gray-800" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3"></path>
      <path className="text-primary drop-shadow-[0_0_4px_rgba(19,236,91,0.4)]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="75, 100" strokeLinecap="round" strokeWidth="3"></path>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
      <span className="text-[10px] text-text-sub-light dark:text-text-sub-dark font-medium">Rank</span>
      <span className="text-xl font-bold text-text-main-light dark:text-text-main-dark leading-none">B</span>
      </div>
      </div>
      <div className="flex-1 grid grid-cols-2 gap-3">
      <div className="flex flex-col">
      <span className="text-xs text-text-sub-light dark:text-text-sub-dark mb-1">総回答数</span>
      <div className="flex items-baseline gap-1">
      <span className="text-xl font-bold text-text-main-light dark:text-text-main-dark">28</span>
      <span className="text-[10px] text-text-sub-light dark:text-text-sub-dark">件</span>
      </div>
      </div>
      <div className="flex flex-col">
      <span className="text-xs text-text-sub-light dark:text-text-sub-dark mb-1">ベストアンサー</span>
      <div className="flex items-baseline gap-1">
      <span className="text-xl font-bold text-text-main-light dark:text-text-main-dark">5</span>
      <span className="text-[10px] text-text-sub-light dark:text-text-sub-dark">回</span>
      </div>
      </div>
      <div className="col-span-2 mt-1">
      <div className="flex justify-between text-[10px] text-text-sub-light dark:text-text-sub-dark mb-1">
      <span>次のランクまで</span>
      <span>あと<span className="font-bold text-primary">2件</span></span>
      </div>
      <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
      <div className="h-full bg-primary rounded-full" style={{ width: '80%' }}></div>
      </div>
      </div>
      </div>
      </div>
      </div>
      </section>
      <section className="mt-2 px-5">
      <div className="flex items-center justify-between px-1 mb-3">
      <h3 className="text-text-main-light dark:text-text-main-dark text-lg font-bold">過去の相談リスト</h3>
      <button className="text-primary text-sm font-medium hover:opacity-80 transition-opacity">すべて見る</button>
      </div>
      <div className="flex flex-col gap-4">
      <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-4 shadow-sm border border-black/5 dark:border-white/5 active:scale-[0.98] transition-transform duration-100 cursor-pointer">
      <div className="flex gap-4">
      <div className="flex-1 flex flex-col gap-2">
      <div className="flex items-center gap-2">
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20">
      <span className="w-1.5 h-1.5 rounded-full bg-primary mr-1.5 animate-pulse"></span>
                                          マッチング中
                                      </span>
      <span className="text-xs text-text-sub-light dark:text-text-sub-dark">2023/10/25</span>
      </div>
      <p className="text-text-main-light dark:text-text-main-dark font-bold leading-snug line-clamp-2">
                                      3日前から偏頭痛が続いており、市販薬が効きません。何科を受診すべきでしょうか？
                                  </p>
      <div className="mt-auto pt-2 flex items-center gap-3">
      <div className="flex items-center gap-1 text-xs text-text-sub-light dark:text-text-sub-dark">
      <Icon name="chat_bubble" className="inline-block align-middle text-[16px]" size={16} />
      <span>回答 2件</span>
      </div>
      </div>
      </div>
      <div className="w-20 h-20 rounded-lg bg-gray-100 dark:bg-gray-800 bg-cover bg-center shrink-0 self-start" data-alt="Abstract icon representing a headache or medical symptom" style={{ backgroundImage: '' }}  ><img src="/res_7C441A4F4F80.png" alt="" className="absolute inset-0 w-full h-full object-cover" /></div>
      </div>
      </div>
      <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-4 shadow-sm border border-black/5 dark:border-white/5 active:scale-[0.98] transition-transform duration-100 cursor-pointer opacity-80 hover:opacity-100">
      <div className="flex gap-4">
      <div className="flex-1 flex flex-col gap-2">
      <div className="flex items-center gap-2">
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
      <Icon name="check_circle" className="inline-block align-middle text-[12px] mr-1" size={16} />
                                          解決済み
                                      </span>
      <span className="text-xs text-text-sub-light dark:text-text-sub-dark">2023/09/15</span>
      </div>
      <p className="text-text-main-light dark:text-text-main-dark font-bold leading-snug line-clamp-2">
                                      皮膚のかゆみが治まりません。近所で評判の良い皮膚科を教えてください。
                                  </p>
      <div className="mt-auto pt-2 flex items-center gap-3">
      <div className="flex items-center gap-1 text-xs text-text-sub-light dark:text-text-sub-dark">
      <Icon name="chat_bubble" className="inline-block align-middle text-[16px]" size={16} />
      <span>回答 5件</span>
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
      </section>
      <section className="mt-8 px-5">
      <div className="bg-surface-light dark:bg-surface-dark rounded-xl overflow-hidden shadow-sm border border-black/5 dark:border-white/5 divide-y divide-gray-100 dark:divide-gray-800">
      <a className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group" href="#">
      <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
      <Icon name="person_edit" className="inline-block align-middle text-[18px]" size={16} />
      </div>
      <span className="text-text-main-light dark:text-text-main-dark font-medium">プロフィール編集</span>
      </div>
      <Icon name="chevron_right" className="inline-block align-middle text-gray-400 group-hover:text-primary transition-colors text-[20px]" size={16} />
      </a>
      <a className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group" href="#">
      <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400">
      <Icon name="settings" className="inline-block align-middle text-[18px]" size={16} />
      </div>
      <span className="text-text-main-light dark:text-text-main-dark font-medium">設定</span>
      </div>
      <Icon name="chevron_right" className="inline-block align-middle text-gray-400 group-hover:text-primary transition-colors text-[20px]" size={16} />
      </a>
      <a className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group" href="#">
      <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400">
      <Icon name="help" className="inline-block align-middle text-[18px]" size={16} />
      </div>
      <span className="text-text-main-light dark:text-text-main-dark font-medium">ヘルプ・お問い合わせ</span>
      </div>
      <Icon name="chevron_right" className="inline-block align-middle text-gray-400 group-hover:text-primary transition-colors text-[20px]" size={16} />
      </a>
      </div>
      <div className="mt-4 flex justify-center pb-4">
      <a className="text-xs text-text-sub-light dark:text-text-sub-dark underline" href="#">プライバシーポリシー</a>
      <span className="mx-2 text-gray-300">|</span>
      <a className="text-xs text-text-sub-light dark:text-text-sub-dark underline" href="#">利用規約</a>
      </div>
      </section>
      </div>
      <div className="fixed bottom-0 left-0 w-full bg-surface-light dark:bg-surface-dark border-t border-gray-100 dark:border-gray-800 p-4 pb-8 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <div className="max-w-md mx-auto">
      <button className="w-full bg-primary hover:bg-[#10d450] text-text-main-light font-bold text-lg py-3.5 rounded-full shadow-lg shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
      <Icon name="home" className="inline-block align-middle" size={16} />
                      ホームに戻る
                  </button>
      </div>
      </div>
    </>
  );
}
