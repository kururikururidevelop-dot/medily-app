import Icon from '../../../components/Icon';
import React from 'react';

export default function Page(){
  return (
    <>
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      {/*  Max-width container for responsiveness  */}
      <div className="w-full max-w-[1024px] mx-auto flex flex-col min-h-screen">
      {/*  Top App Bar  */}
      <header className="flex items-center p-4 justify-between sticky top-0 z-10 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm">
      <button className="text-gray-800 dark:text-gray-200 flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-surface-dark transition-colors">
      <Icon name="arrow_back" />
      </button>
      <h2 className="text-gray-900 dark:text-white text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">
                          登録
                      </h2>
      </header>
      {/*  Main Content Area  */}
      <main className="flex-1 px-4 py-2 pb-12 w-full max-w-lg mx-auto">
      {/*  Headline Section  */}
      <div className="mb-8 text-center sm:text-left">
      <h1 className="text-gray-900 dark:text-white tracking-tight text-[28px] sm:text-[32px] font-bold leading-tight pt-2">
                              プロフィール登録
                          </h1>
      <p className="text-gray-600 dark:text-gray-400 text-base font-normal leading-relaxed pt-3">
                              より良い医療相談マッチングのために、あなたのことを教えてください。
                          </p>
      </div>
      {/*  Form Section  */}
      <form className="space-y-6">
      {/*  Nickname Input  */}
      <div className="flex flex-col gap-2">
      <label className="flex items-center gap-2 text-base font-bold text-gray-800 dark:text-gray-200">
                                  ニックネーム
                                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary/20 text-green-800 dark:text-primary">必須</span>
      </label>
      <input className="form-input w-full rounded-xl border border-input-border dark:border-input-border-dark bg-surface-light dark:bg-surface-dark px-4 py-3.5 text-base text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-1 focus:ring-primary focus:border-primary transition-all" placeholder="例：メディリー太郎" type="text"/>
      </div>
      {/*  Region Select  */}
      <div className="flex flex-col gap-2">
      <label className="flex items-center gap-2 text-base font-bold text-gray-800 dark:text-gray-200">
                                  お住まいの地域
                                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary/20 text-green-800 dark:text-primary">必須</span>
      </label>
      <div className="relative">
      <select defaultValue="" className="form-select w-full rounded-xl border border-input-border dark:border-input-border-dark bg-surface-light dark:bg-surface-dark px-4 py-3.5 text-base text-gray-900 dark:text-white focus:ring-1 focus:ring-primary focus:border-primary transition-all appearance-none">
      <option disabled value="">都道府県を選択してください</option>
      <option value="tokyo">東京都</option>
      <option value="osaka">大阪府</option>
      <option value="kanagawa">神奈川県</option>
      <option value="aichi">愛知県</option>
      <option value="other">その他</option>
      </select>
      </div>
      </div>
      {/*  Gender Radio Group  */}
      <div className="flex flex-col gap-2">
      <label className="flex items-center gap-2 text-base font-bold text-gray-800 dark:text-gray-200">
                                  性別
                                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary/20 text-green-800 dark:text-primary">必須</span>
      </label>
      <div className="grid grid-cols-3 gap-3">
      <label className="cursor-pointer group relative">
      <input className="peer sr-only" name="gender" type="radio" value="male"/>
      <div className="flex items-center justify-center rounded-xl border border-input-border dark:border-input-border-dark bg-surface-light dark:bg-surface-dark p-3 text-center transition-all peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-green-800 dark:peer-checked:text-primary group-hover:border-primary/50">
      <span className="text-sm font-medium">男性</span>
      </div>
      </label>
      <label className="cursor-pointer group relative">
      <input className="peer sr-only" name="gender" type="radio" value="female"/>
      <div className="flex items-center justify-center rounded-xl border border-input-border dark:border-input-border-dark bg-surface-light dark:bg-surface-dark p-3 text-center transition-all peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-green-800 dark:peer-checked:text-primary group-hover:border-primary/50">
      <span className="text-sm font-medium">女性</span>
      </div>
      </label>
      <label className="cursor-pointer group relative">
      <input className="peer sr-only" name="gender" type="radio" value="other"/>
      <div className="flex items-center justify-center rounded-xl border border-input-border dark:border-input-border-dark bg-surface-light dark:bg-surface-dark p-3 text-center transition-all peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-green-800 dark:peer-checked:text-primary group-hover:border-primary/50">
      <span className="text-sm font-medium">その他</span>
      </div>
      </label>
      </div>
      </div>
      {/*  Birth Year Select  */}
      <div className="flex flex-col gap-2">
      <label className="flex items-center gap-2 text-base font-bold text-gray-800 dark:text-gray-200">
                                  生まれ年
                                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary/20 text-green-800 dark:text-primary">必須</span>
      </label>
      <div className="relative">
      <select defaultValue="" className="form-select w-full rounded-xl border border-input-border dark:border-input-border-dark bg-surface-light dark:bg-surface-dark px-4 py-3.5 text-base text-gray-900 dark:text-white focus:ring-1 focus:ring-primary focus:border-primary transition-all appearance-none">
      <option disabled value="">都道府県を選択してください</option>
      <option value="2005">2005年</option>
      <option value="2000">2000年</option>
      <option value="1995">1995年</option>
      <option value="1990">1990年</option>
      <option value="1985">1985年</option>
      <option value="1980">1980年</option>
      </select>
      </div>
      </div>
      {/*  Target Categories (Chips)  */}
      <div className="flex flex-col gap-3">
      <label className="flex items-center gap-2 text-base font-bold text-gray-800 dark:text-gray-200">
                                  興味のある相談カテゴリ
                                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary/20 text-green-800 dark:text-primary">必須</span>
      </label>
      <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">複数選択可</p>
      <div className="flex flex-wrap gap-2">
      {/*  Helper to generate chips  */}
      {/*  Chip 1  */}
      <label className="cursor-pointer">
      <input checked className="peer sr-only" type="checkbox"/>
      <div className="rounded-full border border-input-border dark:border-input-border-dark bg-surface-light dark:bg-surface-dark px-4 py-2 text-sm font-medium transition-colors peer-checked:border-primary peer-checked:bg-primary peer-checked:text-black hover:bg-gray-50 dark:hover:bg-surface-dark/80">
                                          内科
                                      </div>
      </label>
      {/*  Chip 2  */}
      <label className="cursor-pointer">
      <input className="peer sr-only" type="checkbox"/>
      <div className="rounded-full border border-input-border dark:border-input-border-dark bg-surface-light dark:bg-surface-dark px-4 py-2 text-sm font-medium transition-colors peer-checked:border-primary peer-checked:bg-primary peer-checked:text-black hover:bg-gray-50 dark:hover:bg-surface-dark/80">
                                          小児科
                                      </div>
      </label>
      {/*  Chip 3  */}
      <label className="cursor-pointer">
      <input className="peer sr-only" type="checkbox"/>
      <div className="rounded-full border border-input-border dark:border-input-border-dark bg-surface-light dark:bg-surface-dark px-4 py-2 text-sm font-medium transition-colors peer-checked:border-primary peer-checked:bg-primary peer-checked:text-black hover:bg-gray-50 dark:hover:bg-surface-dark/80">
                                          皮膚科
                                      </div>
      </label>
      {/*  Chip 4  */}
      <label className="cursor-pointer">
      <input checked className="peer sr-only" type="checkbox"/>
      <div className="rounded-full border border-input-border dark:border-input-border-dark bg-surface-light dark:bg-surface-dark px-4 py-2 text-sm font-medium transition-colors peer-checked:border-primary peer-checked:bg-primary peer-checked:text-black hover:bg-gray-50 dark:hover:bg-surface-dark/80">
                                          精神科
                                      </div>
      </label>
      {/*  Chip 5  */}
      <label className="cursor-pointer">
      <input className="peer sr-only" type="checkbox"/>
      <div className="rounded-full border border-input-border dark:border-input-border-dark bg-surface-light dark:bg-surface-dark px-4 py-2 text-sm font-medium transition-colors peer-checked:border-primary peer-checked:bg-primary peer-checked:text-black hover:bg-gray-50 dark:hover:bg-surface-dark/80">
                                          産婦人科
                                      </div>
      </label>
      {/*  Chip 6  */}
      <label className="cursor-pointer">
      <input className="peer sr-only" type="checkbox"/>
      <div className="rounded-full border border-input-border dark:border-input-border-dark bg-surface-light dark:bg-surface-dark px-4 py-2 text-sm font-medium transition-colors peer-checked:border-primary peer-checked:bg-primary peer-checked:text-black hover:bg-gray-50 dark:hover:bg-surface-dark/80">
                                          整形外科
                                      </div>
      </label>
      </div>
      </div>
      {/*  Notification Toggle  */}
      <div className="flex items-center justify-between rounded-xl border border-input-border dark:border-input-border-dark bg-surface-light dark:bg-surface-dark p-4">
      <div className="flex flex-col">
      <span className="text-base font-bold text-gray-800 dark:text-gray-200">通知を受け取る</span>
      <span className="text-xs text-gray-500 dark:text-gray-400">新着の回答やお知らせを通知します</span>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
      <input checked className="sr-only peer" type="checkbox" value=""/>
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
      </label>
      </div>
      {/*  Action Area  */}
      <div className="pt-6 flex flex-col items-center gap-4">
      <button className="w-full rounded-full bg-primary py-4 px-6 text-center text-base font-bold text-background-dark shadow-sm hover:brightness-95 active:scale-[0.98] transition-all">
                                  登録完了
                              </button>
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
      <a className="underline hover:text-primary transition-colors" href="#">利用規約</a>
      <a className="underline hover:text-primary transition-colors" href="#">プライバシーポリシー</a>
      </div>
      </div>
      </form>
      {/*  Spacer for bottom safe area  */}
      <div className="h-8"></div>
      </main>
      </div>
      </div>
    </>
  );
}
