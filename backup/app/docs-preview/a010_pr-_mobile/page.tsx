import Icon from '../../../components/Icon';
import React from 'react';

export default function Page(){
  return (
    <>
      <div className="relative w-full max-w-md mx-auto bg-white dark:bg-[#152e29] min-h-screen shadow-xl overflow-hidden flex flex-col">
      {/*  Top App Bar  */}
      <header className="flex items-center justify-between p-4 pb-2 sticky top-0 z-50 bg-white/90 dark:bg-[#152e29]/90 backdrop-blur-sm">
      <div className="flex items-center gap-2">
      <div className="flex items-center justify-center text-primary w-8 h-8 rounded-full bg-primary/10">
      <Icon name="medical_services" className="inline-block align-middle text-2xl" size={16} />
      </div>
      <h2 className="text-text-main dark:text-white text-xl font-bold tracking-tight">Medily</h2>
      </div>
      <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
      <Icon name="menu" className="inline-block align-middle text-gray-600 dark:text-gray-300" size={16} />
      </button>
      </header>
      {/*  Main Content  */}
      <main className="flex-1 flex flex-col">
      {/*  Hero Text Section  */}
      <div className="px-5 pt-8 pb-4 text-center">
      <h1 className="text-text-main dark:text-white text-[28px] font-bold leading-tight tracking-tight mb-4">
                          あなたの経験が、<br/>
      <span className="text-primary inline-block relative">
                              だれかの安心
                              <svg className="absolute w-full h-2 bottom-1 left-0 -z-10 text-primary/30" preserveAspectRatio="none" viewBox="0 0 100 10"><path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="8"></path></svg>
      </span>
                          に変わる。
                      </h1>
      <p className="text-text-sub dark:text-gray-300 text-sm leading-relaxed max-w-xs mx-auto">
                          Medilyは、医療の疑問や病院選びを経験者に相談できるアプリです。あなたの「生の経験」が、今悩んでいる誰かの助けになります。
                      </p>
      </div>
      {/*  Header Image / Visual  */}
      <div className="px-4 py-4 w-full">
      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-sm bg-gray-100">
      <div className="absolute inset-0 bg-cover bg-center" data-alt="Caring doctor holding patient hands in a comforting gesture" style={{ backgroundImage: '' }}  ><img src="/res_7004A6B2F5B2.png" alt="" className="absolute inset-0 w-full h-full object-cover" /></div>
      {/*  Gradient overlay for text readability if needed, though mostly visual here  */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>
      </div>
      {/*  Case Studies / Questions Section  */}
      <div className="bg-primary/5 dark:bg-white/5 py-8 px-4 mt-4">
      <div className="flex items-center justify-center gap-2 mb-6">
      <Icon name="chat_bubble" className="inline-block align-middle text-primary" size={16} />
      <h2 className="text-text-main dark:text-white text-lg font-bold">こんな質問が届いています</h2>
      </div>
      <div className="space-y-4">
      {/*  Card 1  */}
      <div className="bg-white dark:bg-[#1a3832] p-5 rounded-xl shadow-sm border border-gray-100 dark:border-white/5 relative">
      <div className="flex items-start gap-3">
      <div className="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300 text-xs font-bold px-2 py-1 rounded">産婦人科</div>
      <span className="text-xs text-gray-400 dark:text-gray-500">10分前</span>
      </div>
      <p className="mt-3 text-text-main dark:text-gray-200 font-medium text-sm leading-relaxed">
                                  初めての産婦人科選び、何を基準にしましたか？都内で通いやすく、先生が優しい病院を探しています...
                              </p>
      <div className="mt-4 flex items-center text-primary text-xs font-bold">
      <Icon name="volunteer_activism" className="inline-block align-middle text-sm mr-1" size={16} />
                                  回答募集中
                              </div>
      </div>
      {/*  Card 2  */}
      <div className="bg-white dark:bg-[#1a3832] p-5 rounded-xl shadow-sm border border-gray-100 dark:border-white/5 relative">
      <div className="flex items-start gap-3">
      <div className="bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-300 text-xs font-bold px-2 py-1 rounded">整形外科</div>
      <span className="text-xs text-gray-400 dark:text-gray-500">3時間前</span>
      </div>
      <p className="mt-3 text-text-main dark:text-gray-200 font-medium text-sm leading-relaxed">
                                  足の骨折のリハビリについて質問です。仕事復帰までどのくらいの期間がかかりましたか？
                              </p>
      <div className="mt-4 flex items-center text-primary text-xs font-bold">
      <Icon name="volunteer_activism" className="inline-block align-middle text-sm mr-1" size={16} />
                                  回答募集中
                              </div>
      </div>
      </div>
      {/*  Call to Action for Respondents  */}
      <div className="mt-8 text-center">
      <p className="text-sm font-bold text-text-main dark:text-white mb-3">あなたの経験が必要です</p>
      <button className="w-full bg-primary hover:bg-primary-dark text-black font-bold py-4 px-6 rounded-full shadow-lg transform transition active:scale-[0.98] flex items-center justify-center gap-2 group">
      <Icon name="edit_note" className="inline-block align-middle group-hover:animate-bounce" size={16} />
                              回答してみる
                          </button>
      <p className="text-xs text-gray-500 mt-2">※ 匿名で回答できます</p>
      </div>
      </div>
      {/*  Secondary Actions  */}
      <div className="px-5 py-8 space-y-4">
      <div className="relative flex py-2 items-center">
      <div className="flex-grow border-t border-gray-200 dark:border-white/10"></div>
      <span className="flex-shrink-0 mx-4 text-gray-400 text-xs">または</span>
      <div className="flex-grow border-t border-gray-200 dark:border-white/10"></div>
      </div>
      <button className="w-full bg-white dark:bg-white/5 border-2 border-primary text-primary hover:bg-primary/5 font-bold py-3.5 px-6 rounded-full transition-colors flex items-center justify-center gap-2">
      <Icon name="help" className="inline-block align-middle" size={16} />
                          質問してみる
                      </button>
      <button className="w-full text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-sm font-medium py-2 rounded-lg transition-colors">
                          ログインはこちら
                      </button>
      </div>
      </main>
      {/*  Footer  */}
      <footer className="bg-gray-50 dark:bg-[#0e1f1b] py-6 px-4 mt-auto border-t border-gray-100 dark:border-white/5">
      <div className="flex flex-col items-center justify-center space-y-4">
      <div className="flex space-x-6 text-xs text-gray-500 dark:text-gray-400">
      <a className="hover:underline" href="#">利用規約</a>
      <a className="hover:underline" href="#">プライバシーポリシー</a>
      </div>
      <p className="text-[10px] text-gray-400 dark:text-gray-600">
                          © 2024 Medily Inc. All rights reserved.
                      </p>
      </div>
      </footer>
      </div>
    </>
  );
}
