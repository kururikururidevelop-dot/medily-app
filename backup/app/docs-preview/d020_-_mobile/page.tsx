import Icon from '../../../components/Icon';
import React from 'react';

export default function Page(){
  return (
    <>
      {/*  Header  */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer text-slate-600 dark:text-slate-300">
      <Icon name="arrow_back_ios_new" />
      </div>
      <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white flex-1 text-center">
                  プロフィール編集
              </h1>
      <div className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer text-slate-600 dark:text-slate-300">
      <Icon name="settings" />
      </div>
      </header>
      {/*  Main Content  */}
      <main className="flex-1 w-full max-w-md mx-auto px-4 py-6 flex flex-col gap-6">
      {/*  Avatar Section  */}
      <div className="flex flex-col items-center justify-center py-2">
      <div className="relative group cursor-pointer">
      <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white dark:border-surface-dark shadow-md bg-slate-100 dark:bg-slate-800">
      <img alt="Profile avatar placeholder showing a friendly medical professional" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" data-alt="Doctor profile avatar placeholder" src="res_334E99DA9EE2.png" />
      </div>
      <div className="absolute bottom-1 right-1 bg-primary text-slate-900 rounded-full p-2 shadow-lg border-2 border-background-light dark:border-background-dark flex items-center justify-center">
      <Icon name="photo_camera" className="text-[20px]" size={20} />
      </div>
      </div>
      <p className="mt-3 text-sm text-primary font-medium cursor-pointer">写真を変更</p>
      </div>
      {/*  Form Fields  */}
      <form className="flex flex-col gap-6">
      {/*  Nickname  */}
      <div className="flex flex-col gap-2">
      <label className="flex items-center justify-between text-sm font-semibold text-slate-700 dark:text-slate-300">
                          ニックネーム
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary text-slate-900">必須</span>
      </label>
      <div className="relative">
      <input className="w-full h-12 px-4 rounded-lg bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="例：メディリー太郎" type="text" value="メディリー太郎"/>
      </div>
      </div>
      {/*  Region  */}
      <div className="flex flex-col gap-2">
      <label className="flex items-center justify-between text-sm font-semibold text-slate-700 dark:text-slate-300">
                          お住まいの地域
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary text-slate-900">必須</span>
      </label>
      <div className="relative">
      <select defaultValue="tokyo" className="w-full h-12 px-4 pr-10 appearance-none rounded-lg bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all cursor-pointer">
      <option disabled value="">選択してください</option>
      <option value="tokyo">東京都</option>
      <option value="osaka">大阪府</option>
      <option value="kanagawa">神奈川県</option>
      <option value="aichi">愛知県</option>
      <option value="hokkaido">北海道</option>
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-slate-500">
      <Icon name="chevron_right" />
      </div>
      </div>
      </div>
      {/*  Gender  */}
      <div className="flex flex-col gap-2">
      <label className="flex items-center justify-between text-sm font-semibold text-slate-700 dark:text-slate-300">
                          性別
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary text-slate-900">必須</span>
      </label>
      <div className="flex p-1 bg-slate-100 dark:bg-surface-dark rounded-lg border border-slate-200 dark:border-slate-700">
      <label className="flex-1 cursor-pointer">
      <input checked className="peer sr-only" name="gender" type="radio" value="male"/>
      <div className="flex items-center justify-center py-2.5 rounded-md text-sm font-medium text-slate-500 dark:text-slate-400 peer-checked:bg-white dark:peer-checked:bg-slate-700 peer-checked:text-primary dark:peer-checked:text-primary peer-checked:shadow-sm transition-all">
                                  男性
                              </div>
      </label>
      <label className="flex-1 cursor-pointer">
      <input className="peer sr-only" name="gender" type="radio" value="female"/>
      <div className="flex items-center justify-center py-2.5 rounded-md text-sm font-medium text-slate-500 dark:text-slate-400 peer-checked:bg-white dark:peer-checked:bg-slate-700 peer-checked:text-primary dark:peer-checked:text-primary peer-checked:shadow-sm transition-all">
                                  女性
                              </div>
      </label>
      <label className="flex-1 cursor-pointer">
      <input className="peer sr-only" name="gender" type="radio" value="other"/>
      <div className="flex items-center justify-center py-2.5 rounded-md text-sm font-medium text-slate-500 dark:text-slate-400 peer-checked:bg-white dark:peer-checked:bg-slate-700 peer-checked:text-primary dark:peer-checked:text-primary peer-checked:shadow-sm transition-all">
                                  その他
                              </div>
      </label>
      </div>
      </div>
      {/*  Age Group  */}
      <div className="flex flex-col gap-2">
      <label className="flex items-center justify-between text-sm font-semibold text-slate-700 dark:text-slate-300">
                          年齢層
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-300">任意</span>
      </label>
      <div className="relative">
      <select defaultValue="30s" className="w-full h-12 px-4 pr-10 appearance-none rounded-lg bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all cursor-pointer">
      <option disabled value="">選択してください</option>
      <option value="20s">20代</option>
      <option value="30s">30代</option>
      <option value="40s">40代</option>
      <option value="50s">50代</option>
      <option value="60s">60代以上</option>
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-slate-500">
      <Icon name="chevron_right" />
      </div>
      </div>
      </div>
      {/*  Notification Settings  */}
      <div className="flex items-center justify-between p-4 bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-700 mt-2">
      <div className="flex flex-col">
      <span className="text-sm font-semibold text-slate-900 dark:text-white">通知設定</span>
      <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">マッチング成立時に通知を受け取る</span>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
      <input checked className="sr-only peer" type="checkbox" value=""/>
      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
      </label>
      </div>
      {/*  Privacy Note  */}
      <p className="text-xs text-center text-slate-400 dark:text-slate-500 mt-2 px-4">
                      ご入力いただいた情報は、<a className="underline hover:text-primary transition-colors" href="#">プライバシーポリシー</a>に基づき適切に管理されます。
                  </p>
      {/*  Action Buttons  */}
      <div className="flex flex-col gap-3 mt-4 mb-8">
      <button className="w-full h-12 rounded-lg bg-primary hover:bg-primary-dark text-slate-900 font-bold text-base shadow-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2" type="submit">
      <Icon name="save" className="text-[20px]" size={20} />
                          保存する
                      </button>
      <button className="w-full h-12 rounded-lg bg-transparent border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-medium text-base hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-[0.98] transition-all" type="button">
                          キャンセル
                      </button>
      </div>
      </form>
      </main>
      {/*  Bottom Navigation  */}
      <nav className="fixed bottom-0 w-full z-40 bg-white dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 pb-safe pt-2">
      <div className="grid grid-cols-4 h-16 max-w-md mx-auto">
      {/*  Home  */}
      <a className="flex flex-col items-center justify-center gap-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors group" href="#">
      <Icon name="home" className="group-hover:-translate-y-0.5 transition-transform duration-200" />
      <span className="text-[10px] font-medium">ホーム</span>
      </a>
      {/*  Questions  */}
      <a className="flex flex-col items-center justify-center gap-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors group" href="#">
      <Icon name="forum" className="group-hover:-translate-y-0.5 transition-transform duration-200" />
      <span className="text-[10px] font-medium">質問</span>
      </a>
      {/*  Answer  */}
      <a className="flex flex-col items-center justify-center gap-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors group" href="#">
      <Icon name="edit_note" className="group-hover:-translate-y-0.5 transition-transform duration-200" />
      <span className="text-[10px] font-medium">回答</span>
      </a>
      {/*  My Page (Active)  */}
      <a className="flex flex-col items-center justify-center gap-1 text-primary transition-colors group relative" href="#">
      <Icon name="person" className="group-hover:-translate-y-0.5 transition-transform duration-200" />
      <span className="text-[10px] font-bold">マイページ</span>
      <span className="absolute top-0 right-1/4 w-2 h-2 rounded-full bg-red-500 hidden"></span>
      </a>
      </div>
      </nav>
      {/*  iPhone Home Indicator Spacer handled by pb-safe-area logic if needed or just generic padding  */}
      <div className="h-6 w-full bg-white dark:bg-background-dark fixed bottom-0 z-30"></div>
    </>
  );
}
