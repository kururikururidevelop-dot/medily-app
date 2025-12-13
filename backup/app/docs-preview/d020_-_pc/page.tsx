import Icon from '../../../components/Icon';
import React from 'react';

export default function Page(){
  return (
    <>
      {/*  Top App Bar  */}
      <header className="sticky top-0 z-50 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-[1024px] mx-auto px-4 h-16 flex items-center justify-between">
      <button className="flex items-center justify-center size-10 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-900 dark:text-white">
      <Icon name="arrow_back" />
      </button>
      <div className="flex items-center gap-2">
      {/*  Simple Logo Placeholder  */}
      <div className="size-6 bg-primary rounded-full flex items-center justify-center text-background-dark font-bold text-xs">M</div>
      <h1 className="text-lg font-bold tracking-tight">Medily</h1>
      </div>
      <button className="flex items-center justify-center size-10 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-900 dark:text-white">
      <Icon name="settings" />
      </button>
      </div>
      </header>
      {/*  Main Content Area  */}
      <main className="flex-1 w-full max-w-[1024px] mx-auto px-4 py-6 flex flex-col gap-6">
      {/*  Page Header  */}
      <section className="space-y-2">
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">プロフィール編集</h2>
      <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed max-w-2xl">
                      正確な情報を入力することで、より適切な医療相談や病院とのマッチングが可能になります。
                  </p>
      </section>
      {/*  Avatar Section  */}
      <section className="flex flex-col items-center justify-center py-4">
      <div className="relative group cursor-pointer">
      <div className="size-24 rounded-full overflow-hidden border-2 border-slate-200 dark:border-slate-700 bg-surface-light dark:bg-surface-dark">
      <img alt="Smiling person avatar placeholder with soft lighting" className="w-full h-full object-cover transition-opacity group-hover:opacity-75" data-alt="User profile avatar placeholder" src="res_C3552C97DC0B.png" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
      <Icon name="photo_camera" className="text-white drop-shadow-md" />
      </div>
      <div className="absolute bottom-0 right-0 bg-primary text-background-dark rounded-full p-1.5 shadow-lg border-2 border-background-light dark:border-background-dark flex items-center justify-center">
      <Icon name="edit" className="text-[16px]" size={16} />
      </div>
      </div>
      <button className="mt-3 text-sm font-medium text-primary hover:text-primary-dark dark:hover:text-primary transition-colors">
                      写真を変更
                  </button>
      </section>
      {/*  Form Card  */}
      <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 md:p-8">
      <form className="flex flex-col gap-8">
      {/*  Nickname  */}
      <div className="flex flex-col gap-2">
      <label className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                              ニックネーム
                              <span className="text-[10px] bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-1.5 py-0.5 rounded font-bold">必須</span>
      </label>
      <div className="relative">
      <input className="w-full h-12 px-4 rounded-xl bg-background-light dark:bg-background-dark border border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400 dark:text-white" placeholder="例: メディリー太郎" type="text" value="K. Tanaka"/>
      </div>
      </div>
      {/*  Region Select  */}
      <div className="flex flex-col gap-2">
      <label className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                              地域
                              <span className="text-[10px] bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-1.5 py-0.5 rounded font-bold">必須</span>
      </label>
      <div className="relative">
      <select defaultValue="tokyo" className="w-full h-12 px-4 pr-10 rounded-xl bg-background-light dark:bg-background-dark border border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none dark:text-white cursor-pointer">
      <option disabled value="">選択してください</option>
      <option value="tokyo">東京都</option>
      <option value="osaka">大阪府</option>
      <option value="kanagawa">神奈川県</option>
      <option value="aichi">愛知県</option>
      <option value="fukuoka">福岡県</option>
      <option value="hokkaido">北海道</option>
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
      <Icon name="chevron_right" />
      </div>
      </div>
      </div>
      {/*  Gender Radio Group (Segmented Control Style)  */}
      <div className="flex flex-col gap-2">
      <label className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                              性別
                              <span className="text-[10px] bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-1.5 py-0.5 rounded font-bold">必須</span>
      </label>
      <div className="flex flex-wrap sm:flex-nowrap gap-3">
      {/*  Male  */}
      <label className="flex-1 min-w-[100px] cursor-pointer group">
      <input checked className="peer sr-only" name="gender" type="radio" value="male"/>
      <div className="flex items-center justify-center gap-2 h-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-background-light dark:bg-background-dark peer-checked:bg-primary/20 peer-checked:border-primary peer-checked:text-slate-900 dark:peer-checked:text-white transition-all">
      <Icon name="male" className="text-lg opacity-50 peer-checked:opacity-100 peer-checked:text-primary-dark dark:peer-checked:text-primary" />
      <span className="text-sm font-medium">男性</span>
      </div>
      </label>
      {/*  Female  */}
      <label className="flex-1 min-w-[100px] cursor-pointer group">
      <input className="peer sr-only" name="gender" type="radio" value="female"/>
      <div className="flex items-center justify-center gap-2 h-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-background-light dark:bg-background-dark peer-checked:bg-primary/20 peer-checked:border-primary peer-checked:text-slate-900 dark:peer-checked:text-white transition-all">
      <Icon name="female" className="text-lg opacity-50 peer-checked:opacity-100 peer-checked:text-primary-dark dark:peer-checked:text-primary" />
      <span className="text-sm font-medium">女性</span>
      </div>
      </label>
      {/*  Other  */}
      <label className="flex-1 min-w-[100px] cursor-pointer group">
      <input className="peer sr-only" name="gender" type="radio" value="other"/>
      <div className="flex items-center justify-center gap-2 h-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-background-light dark:bg-background-dark peer-checked:bg-primary/20 peer-checked:border-primary peer-checked:text-slate-900 dark:peer-checked:text-white transition-all">
      <Icon name="person" className="text-lg opacity-50 peer-checked:opacity-100 peer-checked:text-primary-dark dark:peer-checked:text-primary" />
      <span className="text-sm font-medium">その他</span>
      </div>
      </label>
      </div>
      </div>
      {/*  Age Group Select  */}
      <div className="flex flex-col gap-2">
      <label className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                              年齢層
                              <span className="text-[10px] bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-1.5 py-0.5 rounded font-bold">必須</span>
      </label>
      <div className="relative">
      <select defaultValue="30s" className="w-full h-12 px-4 pr-10 rounded-xl bg-background-light dark:bg-background-dark border border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none dark:text-white cursor-pointer">
      <option disabled value="">選択してください</option>
      <option value="10s">10代</option>
      <option value="20s">20代</option>
      <option value="30s">30代</option>
      <option value="40s">40代</option>
      <option value="50s">50代</option>
      <option value="60plus">60代以上</option>
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
      <Icon name="chevron_right" />
      </div>
      </div>
      </div>
      <hr className="border-slate-100 dark:border-slate-800 my-2"/>
      {/*  Notifications Toggle  */}
      <div className="flex items-center justify-between gap-4 py-2">
      <div className="flex flex-col">
      <span className="text-base font-bold text-slate-900 dark:text-slate-100">通知受信設定</span>
      <span className="text-sm text-slate-500 dark:text-slate-400">重要なお知らせをメールで受け取る</span>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
      <input checked className="sr-only peer" type="checkbox" value=""/>
      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/50 dark:peer-focus:ring-primary/30 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
      </label>
      </div>
      </form>
      </div>
      {/*  Action Buttons  */}
      <div className="flex flex-col-reverse sm:flex-row gap-4 pt-4 pb-8">
      <button className="flex-1 h-14 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-bold text-base hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                      キャンセル
                  </button>
      <button className="flex-1 h-14 rounded-xl bg-primary text-slate-900 font-bold text-base shadow-lg shadow-primary/20 hover:bg-primary-dark hover:text-white transition-all flex items-center justify-center gap-2">
      <Icon name="save" />
                      変更を保存
                  </button>
      </div>
      </main>
      {/*  Footer  */}
      <footer className="bg-surface-light dark:bg-surface-dark border-t border-slate-200 dark:border-slate-800 py-6 mt-auto">
      <div className="max-w-[1024px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
      <div className="flex gap-4">
      <a className="hover:text-primary transition-colors" href="#">利用規約</a>
      <a className="hover:text-primary transition-colors" href="#">プライバシーポリシー</a>
      <a className="hover:text-primary transition-colors" href="#">ヘルプ</a>
      </div>
      <p>© 2024 Medily Inc.</p>
      </div>
      </footer>
    </>
  );
}
