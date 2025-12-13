import Icon from '../../../components/Icon';
import React from 'react';

export default function Page(){
  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-[1024px] mx-auto flex items-center justify-between px-4 h-16">
      <div className="flex items-center gap-2">
      <div className="flex items-center justify-center size-8 rounded bg-primary text-[#0d1b12]">
      <Icon name="medical_services" className="inline-block align-middle" size={20} />
      </div>
      <h1 className="text-xl font-bold tracking-tight text-[#0d1b12] dark:text-white">Medily</h1>
      </div>
      <button className="flex items-center justify-center size-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
      <Icon name="settings" className="inline-block align-middle" size={20} />
      </button>
      </div>
      </header>
      <main className="flex-1 w-full max-w-[1024px] mx-auto px-4 py-6 pb-24">
      <div className="mb-6">
      <h2 className="text-2xl font-bold text-[#0d1b12] dark:text-white leading-tight">自分の回答</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">過去に回答した相談の管理・確認ができます</p>
      </div>
      <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div className="relative">
      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 ml-1">ステータス</label>
      <div className="relative">
      <select className="w-full h-10 pl-3 pr-10 appearance-none bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-[#0d1b12] dark:text-white">
      <option>すべて</option>
      <option>回答済み</option>
      <option>下書き</option>
      <option>クローズ</option>
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
      <Icon name="chevron_right" className="text-[20px]" size={20} />
      </div>
      </div>
      </div>
      <div className="relative">
      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 ml-1">カテゴリ</label>
      <div className="relative">
      <select className="w-full h-10 pl-3 pr-10 appearance-none bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-[#0d1b12] dark:text-white">
      <option>すべてのカテゴリ</option>
      <option>内科</option>
      <option>外科</option>
      <option>小児科</option>
      <option>皮膚科</option>
      <option>精神科</option>
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
      <Icon name="chevron_right" className="text-[20px]" size={20} />
      </div>
      </div>
      </div>
      <div className="relative">
      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 ml-1">並び替え</label>
      <div className="relative">
      <select className="w-full h-10 pl-3 pr-10 appearance-none bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-[#0d1b12] dark:text-white">
      <option>新しい順</option>
      <option>古い順</option>
      <option>いいね数順</option>
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
      <Icon name="sort" className="inline-block align-middle" size={16} />
      </div>
      </div>
      </div>
      </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-8">
      <div className="lg:col-span-8 bg-surface-light dark:bg-surface-dark p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-6">
      <div>
      <h3 className="font-bold text-[#0d1b12] dark:text-white text-base flex items-center gap-2">
      <Icon name="verified" className="inline-block align-middle text-primary" size={16} />
                                  貢献度グラフィック
                              </h3>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 pl-8">直近6ヶ月の回答アクティビティ</p>
      </div>
      <div className="hidden sm:flex items-center gap-2">
      <span className="inline-block w-2.5 h-2.5 rounded-sm bg-primary"></span>
      <span className="text-xs text-gray-500 dark:text-gray-400">回答数</span>
      </div>
      </div>
      <div className="w-full h-36 flex items-end justify-between gap-2 sm:gap-4 px-2">
      <div className="flex flex-col items-center gap-2 flex-1 group cursor-pointer relative">
      <div className="w-full bg-gray-50 dark:bg-gray-800/50 rounded-t-sm h-full flex items-end overflow-hidden border-b border-gray-100 dark:border-gray-700">
      <div className="w-full bg-primary/30 h-[40%] group-hover:bg-primary/50 transition-all duration-300 relative rounded-t-sm"></div>
      </div>
      <span className="text-[10px] text-gray-400 font-medium">5月</span>
      </div>
      <div className="flex flex-col items-center gap-2 flex-1 group cursor-pointer relative">
      <div className="w-full bg-gray-50 dark:bg-gray-800/50 rounded-t-sm h-full flex items-end overflow-hidden border-b border-gray-100 dark:border-gray-700">
      <div className="w-full bg-primary/40 h-[60%] group-hover:bg-primary/60 transition-all duration-300 relative rounded-t-sm"></div>
      </div>
      <span className="text-[10px] text-gray-400 font-medium">6月</span>
      </div>
      <div className="flex flex-col items-center gap-2 flex-1 group cursor-pointer relative">
      <div className="w-full bg-gray-50 dark:bg-gray-800/50 rounded-t-sm h-full flex items-end overflow-hidden border-b border-gray-100 dark:border-gray-700">
      <div className="w-full bg-primary/50 h-[35%] group-hover:bg-primary/70 transition-all duration-300 relative rounded-t-sm"></div>
      </div>
      <span className="text-[10px] text-gray-400 font-medium">7月</span>
      </div>
      <div className="flex flex-col items-center gap-2 flex-1 group cursor-pointer relative">
      <div className="w-full bg-gray-50 dark:bg-gray-800/50 rounded-t-sm h-full flex items-end overflow-hidden border-b border-gray-100 dark:border-gray-700">
      <div className="w-full bg-primary/90 h-[85%] group-hover:bg-primary transition-all duration-300 relative rounded-t-sm shadow-[0_0_10px_rgba(19,236,91,0.2)]">
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none shadow-lg">
                                          42件<div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
      </div>
      </div>
      </div>
      <span className="text-[10px] font-bold text-[#0d1b12] dark:text-white">8月</span>
      </div>
      <div className="flex flex-col items-center gap-2 flex-1 group cursor-pointer relative">
      <div className="w-full bg-gray-50 dark:bg-gray-800/50 rounded-t-sm h-full flex items-end overflow-hidden border-b border-gray-100 dark:border-gray-700">
      <div className="w-full bg-primary/60 h-[55%] group-hover:bg-primary/80 transition-all duration-300 relative rounded-t-sm"></div>
      </div>
      <span className="text-[10px] text-gray-400 font-medium">9月</span>
      </div>
      <div className="flex flex-col items-center gap-2 flex-1 group cursor-pointer relative">
      <div className="w-full bg-gray-50 dark:bg-gray-800/50 rounded-t-sm h-full flex items-end overflow-hidden border-b border-gray-100 dark:border-gray-700">
      <div className="w-full bg-primary h-[70%] group-hover:brightness-110 transition-all duration-300 relative rounded-t-sm"></div>
      </div>
      <span className="text-[10px] text-gray-400 font-medium">10月</span>
      </div>
      </div>
      </div>
      <div className="lg:col-span-4 flex flex-col gap-4">
      <div className="flex-1 bg-surface-light dark:bg-surface-dark p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center justify-between relative overflow-hidden">
      <div className="relative z-10">
      <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-1">
                                  獲得サンキュー数
                              </h3>
      <div className="flex items-baseline gap-2">
      <span className="text-3xl font-extrabold text-[#0d1b12] dark:text-white tracking-tight">1,284</span>
      <span className="text-[10px] text-gray-400">Total</span>
      </div>
      <p className="text-[10px] text-primary font-bold mt-1 bg-primary/10 inline-block px-1.5 py-0.5 rounded">+12 今週</p>
      </div>
      <div className="size-12 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-500 relative z-10">
      <Icon name="volunteer_activism" className="inline-block align-middle text-[28px]" size={28} />
      </div>
      <div className="absolute -right-6 -bottom-6 text-gray-50 dark:text-white/5 pointer-events-none">
      <Icon name="thumb_up" className="inline-block align-middle text-[100px] opacity-50" size={96} />
      </div>
      </div>
      <div className="bg-surface-light dark:bg-surface-dark p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
      <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-4 flex items-center justify-between">
      <span>貢献カテゴリ</span>
      <span className="bg-gray-100 dark:bg-gray-700 text-[10px] px-1.5 py-0.5 rounded text-gray-500 dark:text-gray-300">Top 3</span>
      </h3>
      <div className="space-y-4">
      <div>
      <div className="flex justify-between items-center text-xs mb-1.5">
      <span className="font-bold text-[#0d1b12] dark:text-gray-200">内科</span>
      <span className="text-primary font-bold">45%</span>
      </div>
      <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
      <div className="bg-primary h-1.5 rounded-full" style={{ width: '45%' }}></div>
      </div>
      </div>
      <div>
      <div className="flex justify-between items-center text-xs mb-1.5">
      <span className="font-bold text-[#0d1b12] dark:text-gray-200">小児科</span>
      <span className="text-gray-500 dark:text-gray-400">30%</span>
      </div>
      <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
      <div className="bg-blue-400 h-1.5 rounded-full" style={{ width: '30%' }}></div>
      </div>
      </div>
      <div>
      <div className="flex justify-between items-center text-xs mb-1.5">
      <span className="font-bold text-[#0d1b12] dark:text-gray-200">皮膚科</span>
      <span className="text-gray-500 dark:text-gray-400">15%</span>
      </div>
      <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
      <div className="bg-orange-400 h-1.5 rounded-full" style={{ width: '15%' }}></div>
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="group relative flex flex-col h-full rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800">
      <div className="h-40 bg-cover bg-center relative" data-alt="Abstract green medical background pattern" style={{ backgroundImage: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%),' }} data-bg="res_EA59D0A143BC.png">
      <div className="absolute top-3 left-3">
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary text-[#0d1b12]">
      <Icon name="check_circle" className="text-[14px] mr-1" size={14} />
                                  回答済み
                              </span>
      </div>
      <div className="absolute bottom-3 left-3 right-3">
      <p className="text-white text-xs opacity-90 mb-1">内科 • 2023/10/15</p>
      <h3 className="text-white text-lg font-bold leading-tight line-clamp-2 drop-shadow-sm">インフルエンザの予防接種の時期について教えてください</h3>
      </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
      <div className="flex-1 mb-4">
      <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">あなたの回答:</p>
      <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3 leading-relaxed">
                                  基本的には10月下旬頃から接種を開始することをお勧めします。抗体ができるまでに約2週間かかり、効果は約5ヶ月持続するため、流行のピーク（例年1月〜2月）に合わせるのが理想的です...
                              </p>
      </div>
      <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-3 mt-auto">
      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
      <span className="flex items-center gap-1"><Icon name="thumb_up" className="inline-block align-middle" size={16} /> 12</span>
      <span className="flex items-center gap-1"><Icon name="search" className="inline-block align-middle" size={16} /> 450</span>
      </div>
      <button className="text-primary hover:text-green-400 text-sm font-bold flex items-center gap-1 transition-colors">
                                  詳細を見る <Icon name="arrow_forward" className="text-[18px]" size={18} />
      </button>
      </div>
      </div>
      </div>
      <div className="group relative flex flex-col h-full rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800">
      <div className="h-40 bg-cover bg-center relative" data-alt="Blue toned abstract medical background" style={{ backgroundImage: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%),' }} data-bg="res_A21314A13147.png">
      <div className="absolute top-3 left-3">
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-gray-600 text-white">
      <Icon name="lock" className="inline-block align-middle" size={14} />
                                  クローズ
                              </span>
      </div>
      <div className="absolute bottom-3 left-3 right-3">
      <p className="text-white text-xs opacity-90 mb-1">整形外科 • 2023/09/20</p>
      <h3 className="text-white text-lg font-bold leading-tight line-clamp-2 drop-shadow-sm">デスクワークによる慢性的な腰痛におすすめのストレッチ</h3>
      </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
      <div className="flex-1 mb-4">
      <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">あなたの回答:</p>
      <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3 leading-relaxed">
                                  腰痛の種類にもよりますが、まずは無理のない範囲でハムストリングス（太もも裏）を伸ばす前屈運動をお試しください。椅子に座ったままでもできるストレッチとして...
                              </p>
      </div>
      <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-3 mt-auto">
      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
      <span className="flex items-center gap-1"><Icon name="thumb_up" className="text-[16px]" size={16} /> 8</span>
      <span className="flex items-center gap-1"><Icon name="visibility" className="text-[16px]" size={16} /> 210</span>
      </div>
      <button className="text-primary hover:text-green-400 text-sm font-bold flex items-center gap-1 transition-colors">
                                  詳細を見る <Icon name="arrow_forward" className="text-[18px]" size={18} />
      </button>
      </div>
      </div>
      </div>
      <div className="group relative flex flex-col h-full rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800">
      <div className="h-40 bg-cover bg-center relative" data-alt="Light minimalistic workspace background" style={{ backgroundImage: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%),' }} data-bg="res_F6956C98C644.png">
      <div className="absolute top-3 left-3">
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-yellow-400 text-[#0d1b12]">
      <Icon name="edit" className="inline-block align-middle" size={14} />
                                  下書き
                              </span>
      </div>
      <div className="absolute bottom-3 left-3 right-3">
      <p className="text-white text-xs opacity-90 mb-1">小児科 • 2023/11/02</p>
      <h3 className="text-white text-lg font-bold leading-tight line-clamp-2 drop-shadow-sm">子供の発熱時、解熱剤を使うタイミングは何度からですか？</h3>
      </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
      <div className="flex-1 mb-4">
      <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">下書き中の内容:</p>
      <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3 leading-relaxed opacity-70">
                                  一般的には38.5℃以上で、かつ本人がぐったりしていて水分が取れない、眠れないなどの症状がある場合に使用を検討してください。ただし熱があっても元気なら...
                              </p>
      </div>
      <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-3 mt-auto">
      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
      <span>-</span>
      </div>
      <button className="text-primary hover:text-green-400 text-sm font-bold flex items-center gap-1 transition-colors">
                                  編集を再開 <Icon name="edit_note" className="text-[18px]" size={18} />
      </button>
      </div>
      </div>
      </div>
      <div className="group relative flex flex-col h-full rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800">
      <div className="h-40 bg-cover bg-center relative" data-alt="Dermatology related skin care products blurred background" style={{ backgroundImage: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%),' }} data-bg="res_F0D8DE24D828.png">
      <div className="absolute top-3 left-3">
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary text-[#0d1b12]">
      <Icon name="check_circle" className="text-[14px] mr-1" size={14} />
                                  回答済み
                              </span>
      </div>
      <div className="absolute bottom-3 left-3 right-3">
      <p className="text-white text-xs opacity-90 mb-1">皮膚科 • 2023/10/28</p>
      <h3 className="text-white text-lg font-bold leading-tight line-clamp-2 drop-shadow-sm">乾燥肌による冬のかゆみ対策について効果的な保湿剤は？</h3>
      </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
      <div className="flex-1 mb-4">
      <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">あなたの回答:</p>
      <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3 leading-relaxed">
                                  ヘパリン類似物質が含まれた保湿剤が高い保湿効果を期待できます。入浴後5分以内に塗布するのが最も効果的です。また、ナイロンタオルでの摩擦は避け...
                              </p>
      </div>
      <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-3 mt-auto">
      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
      <span className="flex items-center gap-1"><Icon name="thumb_up" className="text-[16px]" size={16} /> 34</span>
      <span className="flex items-center gap-1"><Icon name="visibility" className="text-[16px]" size={16} /> 890</span>
      </div>
      <button className="text-primary hover:text-green-400 text-sm font-bold flex items-center gap-1 transition-colors">
                                  詳細を見る <Icon name="arrow_forward" className="text-[18px]" size={18} />
      </button>
      </div>
      </div>
      </div>
      </div>
      <div className="mt-8 flex justify-center">
      <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow hover:bg-gray-50 dark:hover:bg-gray-700 transition-all text-sm font-bold text-[#0d1b12] dark:text-white group">
      <Icon name="refresh" className="group-hover:animate-spin" />
                      もっと読み込む
                  </button>
      </div>
      </main>
      <footer className="fixed bottom-0 w-full bg-white dark:bg-surface-dark border-t border-gray-200 dark:border-gray-800 z-50 safe-area-bottom">
      <div className="max-w-[1024px] mx-auto flex items-center justify-around h-16 px-2">
      <a className="flex flex-col items-center justify-center w-full h-full gap-1 text-gray-400 hover:text-primary transition-colors" href="#">
      <Icon name="home" className="inline-block align-middle" size={20} />
      <span className="text-[10px] font-medium">ホーム</span>
      </a>
      <a className="flex flex-col items-center justify-center w-full h-full gap-1 text-gray-400 hover:text-primary transition-colors" href="#">
      <Icon name="search" className="inline-block align-middle" size={20} />
      <span className="text-[10px] font-medium">さがす</span>
      </a>
      <a className="flex flex-col items-center justify-center w-full h-full gap-1 text-primary" href="#">
      <Icon name="chat_bubble" className="inline-block align-middle" size={20} />
      <span className="text-[10px] font-bold">回答一覧</span>
      </a>
      <a className="flex flex-col items-center justify-center w-full h-full gap-1 text-gray-400 hover:text-primary transition-colors" href="#">
      <Icon name="notifications" className="inline-block align-middle" size={20} />
      <span className="text-[10px] font-medium">通知</span>
      </a>
      <a className="flex flex-col items-center justify-center w-full h-full gap-1 text-gray-400 hover:text-primary transition-colors" href="#">
      <Icon name="person" className="inline-block align-middle" size={20} />
      <span className="text-[10px] font-medium">マイページ</span>
      </a>
      </div>
      </footer>
    </>
  );
}
