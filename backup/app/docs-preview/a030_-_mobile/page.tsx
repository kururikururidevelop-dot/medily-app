import Icon from '../../../components/Icon';
import React from 'react';

export default function Page(){
  return (
    <>
      {/*  Main Container  */}
      <div className="w-full max-w-md bg-background-light dark:bg-background-dark min-h-screen flex flex-col relative shadow-2xl overflow-hidden">
      {/*  Header Section  */}
      <header className="pt-12 pb-4 px-6 flex flex-col gap-2 bg-background-light dark:bg-background-dark z-10">
      <div className="flex items-center justify-between mb-2">
      {/*  Back button placeholder for context, though not explicitly requested, good for UX  */}
      <button className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 text-gray-600 dark:text-gray-300 transition-colors">
      <Icon name="arrow_back" />
      </button>
      <div className="w-8"></div> {/*  spacer to balance  */}
      </div>
      <h1 className="text-2xl font-bold font-display tracking-tight text-gray-900 dark:text-white">プロフィール登録</h1>
      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      より適切な医療従事者とマッチングするために、<br/>基本情報を入力してください。
                  </p>
      </header>
      {/*  Form Content  */}
      <main className="flex-1 px-6 py-2 overflow-y-auto pb-32">
      <form className="flex flex-col gap-8">
      {/*  Nickname Input (Required)  */}
      <div className="group">
      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center justify-between">
                              ニックネーム
                              <span className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-[10px] px-2 py-0.5 rounded font-bold border border-red-100 dark:border-red-800">必須</span>
      </label>
      <div className="relative">
      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
      <Icon name="badge" className="text-[20px]" size={20} />
      </span>
      <input className="block w-full pl-10 pr-3 py-3.5 bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary text-gray-900 dark:text-white placeholder-gray-400 transition-all shadow-sm" placeholder="例: メディリー太郎" type="text"/>
      </div>
      </div>
      {/*  Region Select (Required)  */}
      <div className="group">
      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center justify-between">
                              お住まいの地域
                              <span className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-[10px] px-2 py-0.5 rounded font-bold border border-red-100 dark:border-red-800">必須</span>
      </label>
      <div className="relative">
      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
      <Icon name="location_on" className="text-[20px]" size={20} />
      </span>
      <select defaultValue="" className="block w-full pl-10 pr-10 py-3.5 bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary text-gray-900 dark:text-white appearance-none cursor-pointer shadow-sm">
      <option disabled value="">都道府県を選択</option>
      <option value="tokyo">東京都</option>
      <option value="osaka">大阪府</option>
      <option value="kanagawa">神奈川県</option>
      <option value="other">その他</option>
      </select>
      <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
      <Icon name="chevron_right" className="text-[20px]" size={20} />
      </span>
      </div>
      </div>
      {/*  Gender Segmented Control (Optional)  */}
      <div className="group">
      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center justify-between">
                              性別
                              <span className="text-gray-400 text-[10px] px-2 py-0.5 font-normal">任意</span>
      </label>
      <div className="flex p-1 bg-gray-100 dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-xl">
      <label className="flex-1 cursor-pointer">
      <input className="peer sr-only" name="gender" type="radio" value="male"/>
      <div className="py-2.5 text-sm text-center rounded-lg text-gray-500 peer-checked:bg-white dark:peer-checked:bg-background-dark peer-checked:text-gray-900 dark:peer-checked:text-white peer-checked:shadow-sm font-medium transition-all">男性</div>
      </label>
      <label className="flex-1 cursor-pointer">
      <input className="peer sr-only" name="gender" type="radio" value="female"/>
      <div className="py-2.5 text-sm text-center rounded-lg text-gray-500 peer-checked:bg-white dark:peer-checked:bg-background-dark peer-checked:text-gray-900 dark:peer-checked:text-white peer-checked:shadow-sm font-medium transition-all">女性</div>
      </label>
      <label className="flex-1 cursor-pointer">
      <input checked className="peer sr-only" name="gender" type="radio" value="other"/>
      <div className="py-2.5 text-sm text-center rounded-lg text-gray-500 peer-checked:bg-white dark:peer-checked:bg-background-dark peer-checked:text-gray-900 dark:peer-checked:text-white peer-checked:shadow-sm font-medium transition-all">その他</div>
      </label>
      </div>
      </div>
      {/*  Birth Year Select (Optional)  */}
      <div className="group">
      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center justify-between">
                              生まれ年
                              <span className="text-gray-400 text-[10px] px-2 py-0.5 font-normal">任意</span>
      </label>
      <div className="relative">
      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
      <Icon name="calendar_today" className="text-[20px]" size={20} />
      </span>
      <select defaultValue="" className="block w-full pl-10 pr-10 py-3.5 bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary text-gray-900 dark:text-white appearance-none cursor-pointer shadow-sm">
      <option disabled value="">年を選択</option>
      <option value="1990">1990年</option>
      <option value="1991">1991年</option>
      <option value="1992">1992年</option>
      <option value="1993">1993年</option>
      <option value="1994">1994年</option>
      {/*  In a real app, populate with JS  */}
      </select>
      <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
      <Icon name="chevron_right" className="text-[20px]" size={20} />
      </span>
      </div>
      </div>
      {/*  Interest Categories (Optional)  */}
      <div className="group">
      <label className="block mb-3 text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center justify-between">
                              興味のあるカテゴリ
                              <span className="text-gray-400 text-[10px] px-2 py-0.5 font-normal">任意・複数選択可</span>
      </label>
      <div className="flex flex-wrap gap-2">
      {/*  Category Item Component  */}
      <label className="cursor-pointer group/chip">
      <input className="peer sr-only" type="checkbox"/>
      <div className="px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-surface-light dark:bg-surface-dark text-sm text-gray-600 dark:text-gray-300 peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-green-800 dark:peer-checked:text-primary transition-all flex items-center gap-1">
      <span>内科</span>
      </div>
      </label>
      <label className="cursor-pointer group/chip">
      <input className="peer sr-only" type="checkbox"/>
      <div className="px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-surface-light dark:bg-surface-dark text-sm text-gray-600 dark:text-gray-300 peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-green-800 dark:peer-checked:text-primary transition-all flex items-center gap-1">
      <span>小児科</span>
      </div>
      </label>
      <label className="cursor-pointer group/chip">
      <input className="peer sr-only" type="checkbox"/>
      <div className="px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-surface-light dark:bg-surface-dark text-sm text-gray-600 dark:text-gray-300 peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-green-800 dark:peer-checked:text-primary transition-all flex items-center gap-1">
      <span>皮膚科</span>
      </div>
      </label>
      <label className="cursor-pointer group/chip">
      <input className="peer sr-only" type="checkbox"/>
      <div className="px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-surface-light dark:bg-surface-dark text-sm text-gray-600 dark:text-gray-300 peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-green-800 dark:peer-checked:text-primary transition-all flex items-center gap-1">
      <span>メンタルヘルス</span>
      </div>
      </label>
      <label className="cursor-pointer group/chip">
      <input className="peer sr-only" type="checkbox"/>
      <div className="px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-surface-light dark:bg-surface-dark text-sm text-gray-600 dark:text-gray-300 peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-green-800 dark:peer-checked:text-primary transition-all flex items-center gap-1">
      <span>婦人科</span>
      </div>
      </label>
      <label className="cursor-pointer group/chip">
      <input className="peer sr-only" type="checkbox"/>
      <div className="px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-surface-light dark:bg-surface-dark text-sm text-gray-600 dark:text-gray-300 peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-green-800 dark:peer-checked:text-primary transition-all flex items-center gap-1">
      <span>眼科</span>
      </div>
      </label>
      </div>
      </div>
      {/*  Notification Consent (Required)  */}
      <div className="group pt-2">
      <label className="flex items-start gap-3 p-4 bg-surface-light dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-gray-700 cursor-pointer hover:border-primary/50 transition-colors">
      <div className="flex items-center h-5">
      <input className="w-5 h-5 rounded text-primary focus:ring-primary border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700" type="checkbox"/>
      </div>
      <div className="flex flex-col">
      <span className="text-sm font-medium text-gray-900 dark:text-white">回答がついた際に通知を受け取る</span>
      <span className="text-xs text-gray-500 mt-1">重要な回答を見逃さないために、オンにすることをおすすめします。</span>
      </div>
      </label>
      </div>
      </form>
      </main>
      {/*  Footer Action Area  */}
      <footer className="fixed bottom-0 w-full max-w-md bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-t border-gray-200 dark:border-gray-800 p-6 z-20">
      <button className="w-full bg-primary hover:bg-primary-dark text-background-dark font-bold text-lg py-4 px-6 rounded-2xl shadow-lg shadow-primary/20 transform active:scale-[0.98] transition-all flex items-center justify-center gap-2">
      <span>登録完了</span>
      <Icon name="check" className="text-[20px] font-bold" size={20} />
      </button>
      <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-500 dark:text-gray-400">
      <a className="hover:text-primary underline" href="#">利用規約</a>
      <span className="text-gray-300 dark:text-gray-700">|</span>
      <a className="hover:text-primary underline" href="#">プライバシーポリシー</a>
      </div>
      </footer>
      </div>
    </>
  );
}
