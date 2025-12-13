import Icon from '../../../components/Icon';
import React from 'react';

export default function Page(){
  return (
    <>
      <div className="relative flex min-h-screen w-full flex-col overflow-hidden pb-24">
      {/*  Header  */}
      <header className="sticky top-0 z-50 flex items-center justify-between bg-background-light/90 dark:bg-background-dark/90 px-4 py-3 backdrop-blur-md">
      <div className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-black">
      <Icon name="local_hospital" className="text-2xl" />
      </div>
      <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Medily</h1>
      </div>
      <div className="flex items-center gap-2">
      <button className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 relative">
      <Icon name="notifications" className="text-gray-700 dark:text-gray-200" />
      <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-background-light dark:border-background-dark"></span>
      </button>
      <button className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10">
      <Icon name="settings" className="text-gray-700 dark:text-gray-200" />
      </button>
      </div>
      </header>
      {/*  Greeting Section  */}
      <section className="px-5 pt-6 pb-4">
      <h2 className="text-2xl font-bold leading-tight text-gray-900 dark:text-white">
                      こんにちは、<br/>田中さん
                  </h2>
      </section>
      {/*  Primary Action Button  */}
      <section className="px-5 pb-8">
      <button className="group relative w-full overflow-hidden rounded-2xl bg-primary p-4 shadow-[0_8px_20px_-6px_rgba(19,236,91,0.5)] transition-transform active:scale-[0.98]">
      <div className="relative z-10 flex items-center justify-center gap-3">
      <Icon name="add_circle" className="text-3xl text-black" />
      <span className="text-lg font-bold text-black">質問を投稿する</span>
      </div>
      {/*  Subtle gradient overlay for depth  */}
      <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity group-hover:opacity-100"></div>
      </button>
      </section>
      {/*  Tabs / Links  */}
      <section className="px-5">
      <div className="flex w-full items-center border-b border-gray-200 dark:border-gray-700">
      <button className="relative flex-1 py-3 text-center">
      <span className="block text-sm font-bold text-gray-900 dark:text-white">自分の質問</span>
      <span className="absolute bottom-0 left-0 h-[3px] w-full rounded-t-full bg-primary"></span>
      </button>
      <button className="relative flex-1 py-3 text-center">
      <span className="block text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">自分の回答</span>
      <span className="absolute bottom-0 left-0 h-[3px] w-full rounded-t-full bg-transparent"></span>
      </button>
      </div>
      </section>
      {/*  Question Cards List  */}
      <section className="flex flex-col gap-4 px-4 py-6">
      {/*  Card 1: Matching (With Image)  */}
      <article className="group relative overflow-hidden rounded-2xl bg-card-light dark:bg-card-dark shadow-sm ring-1 ring-black/5 dark:ring-white/10 transition-all hover:shadow-md">
      <div className="relative h-32 w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
      <img alt="Medical pills and thermometer on a table" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" src="res_64E99AF3DD9F.png" />
      <div className="absolute bottom-3 left-4 right-4 z-20 flex justify-between items-end">
      <span className="inline-flex items-center rounded-full bg-primary px-2.5 py-0.5 text-xs font-bold text-black shadow-sm">
                                  マッチング中
                              </span>
      <span className="text-xs font-medium text-white/90">10/24</span>
      </div>
      </div>
      <div className="p-4">
      <h3 className="mb-1 text-lg font-bold leading-tight text-gray-900 dark:text-white line-clamp-2">
                              頭痛の症状が続いています。市販薬で様子を見ても良いでしょうか？
                          </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                              3日前から偏頭痛のような痛みが続いており、ロキソニンを服用していますが改善しません。光に敏感になっています...
                          </p>
      <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-3">
      <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
      <Icon name="visibility" className="text-[16px]" size={16} />
      <span>閲覧 12</span>
      </div>
      <button className="flex items-center gap-1 text-sm font-bold text-primary hover:underline">
                                  詳細を見る
                                  <Icon name="arrow_forward" className="text-[18px]" size={18} />
      </button>
      </div>
      </div>
      </article>
      {/*  Card 2: Waiting for Answer (Text Only)  */}
      <article className="group relative flex flex-col rounded-2xl bg-card-light dark:bg-card-dark shadow-sm ring-1 ring-black/5 dark:ring-white/10 p-4 transition-all hover:shadow-md">
      <div className="flex items-center justify-between mb-3">
      <span className="inline-flex items-center rounded-full bg-orange-100 dark:bg-orange-900/30 px-2.5 py-0.5 text-xs font-bold text-orange-700 dark:text-orange-300">
                              回答待ち
                          </span>
      <span className="text-xs text-gray-400">10/20</span>
      </div>
      <h3 className="mb-2 text-lg font-bold leading-tight text-gray-900 dark:text-white">
                          皮膚科の専門医を探しています
                      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                          東京都内でアトピー性皮膚炎の治療に定評のある皮膚科をご存知の方がいらっしゃれば教えてください。ステロイド以外の治療法も...
                      </p>
      <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-3">
      <div className="flex items-center -space-x-2">
      {/*  Avatars representing potential responders  */}
      <div className="h-6 w-6 rounded-full border-2 border-white dark:border-card-dark bg-gray-200"></div>
      <div className="h-6 w-6 rounded-full border-2 border-white dark:border-card-dark bg-gray-300"></div>
      <span className="ml-3 text-xs text-gray-500 dark:text-gray-400">2名の医師が閲覧中</span>
      </div>
      </div>
      </article>
      {/*  Card 3: Resolved (Text Only)  */}
      <article className="group relative flex flex-col rounded-2xl bg-card-light dark:bg-card-dark shadow-sm ring-1 ring-black/5 dark:ring-white/10 p-4 opacity-80 hover:opacity-100 transition-all">
      <div className="flex items-center justify-between mb-3">
      <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 dark:bg-gray-700 px-2.5 py-0.5 text-xs font-bold text-gray-600 dark:text-gray-300">
      <Icon name="check_circle" className="text-[14px]" size={14} />
                              解決済み
                          </span>
      <span className="text-xs text-gray-400">10/15</span>
      </div>
      <h3 className="mb-2 text-lg font-bold leading-tight text-gray-500 dark:text-gray-400 line-through decoration-gray-400">
                          小児科の夜間診療について
                      </h3>
      <p className="mb-4 text-sm text-gray-400 dark:text-gray-500 line-clamp-1">
                          夜間に子供が高熱を出した場合の対応について相談です...
                      </p>
      <div className="flex items-center justify-end border-t border-gray-100 dark:border-gray-700 pt-3">
      <button className="text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                              履歴を見る
                          </button>
      </div>
      </article>
      </section>
      {/*  Bottom Spacing for Fixed Footer  */}
      <div className="h-8"></div>
      </div>
      {/*  Bottom Navigation Bar  */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-[88px] w-full items-start justify-around bg-white/95 dark:bg-[#102216]/95 pt-3 pb-8 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)]">
      <a className="group flex flex-col items-center justify-center gap-1 text-primary" href="#">
      <Icon name="home" className="filled text-[28px]" size={28} />
      <span className="text-[10px] font-bold">ホーム</span>
      </a>
      <a className="group flex flex-col items-center justify-center gap-1 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors" href="#">
      <Icon name="search" className="text-[28px]" size={28} />
      <span className="text-[10px] font-medium">検索</span>
      </a>
      <a className="group flex flex-col items-center justify-center gap-1 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors relative" href="#">
      <div className="relative">
      <Icon name="chat_bubble" className="text-[28px]" size={28} />
      <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white dark:border-[#102216]"></span>
      </div>
      <span className="text-[10px] font-medium">メッセージ</span>
      </a>
      <a className="group flex flex-col items-center justify-center gap-1 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors" href="#">
      <Icon name="person" className="text-[28px]" size={28} />
      <span className="text-[10px] font-medium">マイページ</span>
      </a>
      </nav>
      
    </>
  );
}
