import Icon from '../../../components/Icon';
import React from 'react';

export default function Page(){
  return (
    <>
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden pb-24">
      {/*  Header  */}
      <header className="sticky top-0 z-50 flex items-center justify-between bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-sm px-4 py-3 border-b border-border-light dark:border-border-dark">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer text-gray-800 dark:text-gray-200">
      <Icon name="close" className="inline-block align-middle" size={20} />
      </div>
      <h2 className="text-lg font-bold leading-tight text-center flex-1 pr-10 text-gray-900 dark:text-white">質問投稿</h2>
      </header>
      {/*  Main Content  */}
      <main className="flex-1 px-4 py-6 space-y-8">
      {/*  Question Type Segmented Control  */}
      <section>
      <div className="flex h-12 w-full items-center justify-center rounded-xl bg-gray-200 dark:bg-gray-800 p-1">
      <label className="relative flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 group">
      <input checked className="peer invisible w-0 absolute" name="question_type" type="radio" value="new"/>
      <div className="flex h-full w-full items-center justify-center rounded-lg bg-transparent text-gray-600 dark:text-gray-400 font-medium transition-all peer-checked:bg-white peer-checked:text-primary-content peer-checked:shadow-sm dark:peer-checked:bg-surface-dark dark:peer-checked:text-primary">
      <span className="truncate">新規質問</span>
      </div>
      </label>
      <label className="relative flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 group">
      <input className="peer invisible w-0 absolute" name="question_type" type="radio" value="followup"/>
      <div className="flex h-full w-full items-center justify-center rounded-lg bg-transparent text-gray-600 dark:text-gray-400 font-medium transition-all peer-checked:bg-white peer-checked:text-primary-content peer-checked:shadow-sm dark:peer-checked:bg-surface-dark dark:peer-checked:text-primary">
      <span className="truncate">追加質問</span>
      </div>
      </label>
      </div>
      </section>
      {/*  Basic Info Section  */}
      <section className="space-y-5">
      {/*  Template Selector  */}
      <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">質問テンプレート</label>
      <div className="relative">
      <select defaultValue="" className="w-full appearance-none rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark px-4 py-3.5 pr-10 text-base text-gray-900 dark:text-gray-100 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-shadow">
      <option disabled value="">テンプレートを選択してください</option>
      <option value="symptom">症状から相談する</option>
      <option value="hospital">病院選びについて</option>
      <option value="second_opinion">セカンドオピニオン</option>
      </select>
      <Icon name="chevron_right" className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 inline-block" size={16} />
      </div>
      </div>
      {/*  Question Body  */}
      <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">相談内容 <span className="text-red-500 text-xs ml-1">必須</span></label>
      <textarea className="w-full min-h-[140px] rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark px-4 py-3 text-base text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none transition-shadow" placeholder="具体的な症状や、聞きたいことを入力してください..."></textarea>
      </div>
      {/*  Category Selector  */}
      <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">カテゴリ</label>
      <div className="relative">
      <Icon name="medical_services" className="absolute left-3 top-1/2 -translate-y-1/2 text-primary pointer-events-none inline-block" size={16} />
      <select defaultValue="" className="w-full appearance-none rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark pl-11 pr-10 py-3.5 text-base text-gray-900 dark:text-gray-100 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-shadow">
      <option disabled value="">診療科・カテゴリを選択</option>
      <option value="internal">内科</option>
      <option value="surgery">外科</option>
      <option value="pediatrics">小児科</option>
      <option value="dermatology">皮膚科</option>
      </select>
      <Icon name="chevron_right" className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 inline-block" size={16} />
      </div>
      </div>
      </section>
      {/*  Divider  */}
      <div className="h-px w-full bg-border-light dark:bg-border-dark"></div>
      {/*  Answer Options Section  */}
      <section className="space-y-4">
      <div className="flex items-center justify-between">
      <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">回答の選択肢 (任意)</h3>
      <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">複数回答可</span>
      </div>
      <div className="space-y-3">
      <div className="flex items-center gap-3">
      <span className="flex items-center justify-center size-6 rounded-full bg-gray-200 dark:bg-gray-700 text-xs font-bold text-gray-600 dark:text-gray-300">A</span>
      <input className="flex-1 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark px-4 py-3 text-sm focus:border-primary focus:ring-primary" placeholder="選択肢 1" type="text"/>
      </div>
      <div className="flex items-center gap-3">
      <span className="flex items-center justify-center size-6 rounded-full bg-gray-200 dark:bg-gray-700 text-xs font-bold text-gray-600 dark:text-gray-300">B</span>
      <input className="flex-1 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark px-4 py-3 text-sm focus:border-primary focus:ring-primary" placeholder="選択肢 2" type="text"/>
      </div>
      <div className="flex items-center gap-3">
      <span className="flex items-center justify-center size-6 rounded-full bg-gray-200 dark:bg-gray-700 text-xs font-bold text-gray-600 dark:text-gray-300">C</span>
      <input className="flex-1 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark px-4 py-3 text-sm focus:border-primary focus:ring-primary" placeholder="選択肢 3" type="text"/>
      </div>
      </div>
      <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 dark:border-gray-600 p-3 text-sm font-medium text-primary hover:bg-primary/5 transition-colors">
      <Icon name="add_circle" className="inline-block align-middle" size={20} />
                          選択肢を追加
                      </button>
      </section>
      {/*  Divider  */}
      <div className="h-px w-full bg-border-light dark:bg-border-dark"></div>
      {/*  Matching Conditions Section  */}
      <section className="space-y-5">
      <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">マッチング条件</h3>
      {/*  Region  */}
      <div className="space-y-2">
      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">地域</label>
      <div className="relative">
      <Icon name="location_on" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 inline-block" size={16} />
      <select className="w-full appearance-none rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark pl-10 pr-10 py-3 text-sm text-gray-900 dark:text-gray-100 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
      <option value="">指定なし</option>
      <option value="tokyo">東京都</option>
      <option value="osaka">大阪府</option>
      <option value="fukuoka">福岡県</option>
      </select>
      <Icon name="chevron_right" className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 inline-block" size={16} />
      </div>
      </div>
      {/*  Filters Grid  */}
      <div className="grid grid-cols-2 gap-4">
      {/*  Gender  */}
      <div className="space-y-2">
      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">性別フィルタ</label>
      <select className="w-full appearance-none rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark px-4 py-3 text-sm text-gray-900 dark:text-gray-100 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
      <option value="all">指定なし</option>
      <option value="male">男性医師</option>
      <option value="female">女性医師</option>
      </select>
      </div>
      {/*  Age  */}
      <div className="space-y-2">
      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">年齢フィルタ</label>
      <select className="w-full appearance-none rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark px-4 py-3 text-sm text-gray-900 dark:text-gray-100 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
      <option value="all">指定なし</option>
      <option value="20s">20代</option>
      <option value="30s">30代</option>
      <option value="40s">40代以上</option>
      </select>
      </div>
      </div>
      {/*  Toggles  */}
      <div className="space-y-4 pt-2">
      <label className="flex items-center justify-between cursor-pointer group">
      <div className="flex flex-col">
      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">位置情報の利用</span>
      <span className="text-xs text-gray-500 dark:text-gray-400">近くの医療機関を優先的に表示</span>
      </div>
      <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700 transition-colors peer-checked:bg-primary has-[:checked]:bg-primary">
      <input className="peer sr-only" type="checkbox"/>
      <span className="inline-block size-4 translate-x-1 rounded-full bg-white transition-transform peer-checked:translate-x-6"></span>
      </div>
      </label>
      <label className="flex items-center justify-between cursor-pointer group">
      <div className="flex flex-col">
      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">URL添付の許可</span>
      <span className="text-xs text-gray-500 dark:text-gray-400">回答に参考リンクを含めることを許可</span>
      </div>
      <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700 transition-colors peer-checked:bg-primary has-[:checked]:bg-primary">
      <input checked className="peer sr-only" type="checkbox"/>
      <span className="inline-block size-4 translate-x-1 rounded-full bg-white transition-transform peer-checked:translate-x-6"></span>
      </div>
      </label>
      </div>
      </section>
      {/*  Privacy Section  */}
      <section className="bg-white dark:bg-surface-dark rounded-2xl p-4 shadow-sm border border-border-light dark:border-border-dark">
      <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
      <Icon name="lock" className="inline-block align-middle text-primary text-[20px]" size={16} />
                          公開設定
                      </h3>
      <div className="space-y-2">
      <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-background-light dark:hover:bg-background-dark/50 cursor-pointer transition-colors">
      <input checked className="size-5 border-gray-300 text-primary focus:ring-primary bg-transparent" name="privacy" type="radio" value="public"/>
      <div className="flex flex-col">
      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">全体に公開</span>
      <span className="text-xs text-gray-500">すべての登録医師が閲覧できます</span>
      </div>
      </label>
      <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-background-light dark:hover:bg-background-dark/50 cursor-pointer transition-colors">
      <input className="size-5 border-gray-300 text-primary focus:ring-primary bg-transparent" name="privacy" type="radio" value="restricted"/>
      <div className="flex flex-col">
      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">本人確認済み医師のみ</span>
      <span className="text-xs text-gray-500">信頼できる医師のみに限定</span>
      </div>
      </label>
      </div>
      </section>
      </main>
      {/*  Sticky Footer Action Bar  */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 w-full bg-white/90 dark:bg-surface-dark/90 backdrop-blur-md border-t border-border-light dark:border-border-dark pb-safe">
      <div className="flex flex-col gap-3 px-4 py-4 max-w-md mx-auto">
      <button className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 text-base font-bold text-primary-content hover:bg-primary/90 transition-all shadow-md shadow-primary/20 active:scale-[0.98]">
      <Icon name="send" className="inline-block align-middle text-[20px]" size={16} />
                          投稿確認
                      </button>
      <button className="flex h-12 w-full items-center justify-center rounded-full bg-transparent text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                          キャンセル
                      </button>
      </div>
      {/*  Safe area spacer handled by pb-safe if supported, otherwise extra padding handled by container  */}
      <div className="h-4 w-full"></div>
      </footer>
      </div>
    </>
  );
}
