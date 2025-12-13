import Icon from '../../../components/Icon';
import React from 'react';

export default function Page(){
  return (
    <>
      {/*  Top App Bar  */}
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm">
      <div className="flex items-center justify-center p-4 h-16 relative">
      <h1 className="text-lg font-bold tracking-tight text-center">質問投稿完了</h1>
      </div>
      </header>
      {/*  Main Content  */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-20 w-full max-w-md mx-auto">
      {/*  Success Icon  */}
      <div className="mb-8 relative animate-scale-in">
      <div className="absolute inset-0 bg-primary/20 dark:bg-primary/10 rounded-full blur-xl transform scale-150"></div>
      <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-primary text-white shadow-lg shadow-primary/30">
      <Icon name="check" className="inline-block align-middle text-[48px]" size={48} />
      </div>
      </div>
      {/*  Headline  */}
      <div className="text-center mb-2">
      <h2 className="text-2xl font-bold leading-tight tracking-tight text-text-main dark:text-white">
                      質問の投稿が<br/>完了しました！
                  </h2>
      </div>
      {/*  Body Text  */}
      <div className="text-center mb-10 px-4">
      <p className="text-text-sub dark:text-gray-400 text-sm leading-relaxed">
                      回答が届くまでしばらくお待ちください。<br/>
                      通常24時間以内に専門家から回答が届きます。
                  </p>
      </div>
      {/*  Stats / Info Card  */}
      <div className="w-full bg-white dark:bg-white/5 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-white/10 mb-8 relative overflow-hidden group">
      {/*  Decorative background pattern  */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
      <div className="flex flex-col items-center justify-center gap-1 relative z-10">
      <div className="flex items-center gap-2 mb-1">
      <Icon name="tag" className="inline-block align-middle text-primary text-lg" size={16} />
      <p className="text-sm font-medium text-text-sub dark:text-gray-400 uppercase tracking-wider">質問ID</p>
      </div>
      <p className="text-3xl font-bold text-text-main dark:text-white tracking-tight font-display text-primary">8829102</p>
      <div className="mt-4 flex items-center gap-1.5 px-3 py-1 bg-gray-50 dark:bg-white/5 rounded-full border border-gray-100 dark:border-white/10">
      <Icon name="lock" className="inline-block align-middle text-gray-400 text-xs" size={16} />
      <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">この質問は非公開で管理されます</span>
      </div>
      </div>
      </div>
      {/*  Recommended Action / Next Steps (Optional visual filler)  */}
      <div className="w-full mb-8">
      <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
      <div className="w-12 h-12 rounded-lg bg-cover bg-center shrink-0" data-alt="Abstract soft green gradient representing medical care" style={{ backgroundImage: '' }}  ><img src="/res_8079D6786155.png" alt="" className="absolute inset-0 w-full h-full object-cover" /></div>
      <div className="flex-1 min-w-0">
      <p className="text-xs font-bold text-text-main dark:text-white truncate">通知設定を確認する</p>
      <p className="text-[10px] text-text-sub dark:text-gray-400 line-clamp-2">回答を見逃さないようにプッシュ通知をオンにしましょう。</p>
      </div>
      <button className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-white/10 text-primary hover:bg-gray-50 dark:hover:bg-white/20 transition-colors">
      <Icon name="arrow_forward_ios" className="inline-block align-middle text-sm" size={16} />
      </button>
      </div>
      </div>
      </main>
      {/*  Bottom Action Bar  */}
      <footer className="fixed bottom-0 left-0 w-full bg-background-light dark:bg-background-dark p-4 pb-8 backdrop-blur-md bg-opacity-90 dark:bg-opacity-90 border-t border-gray-100 dark:border-white/5 z-40">
      <div className="max-w-md mx-auto w-full">
      <button className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold text-lg py-4 px-6 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98]">
      <span>ホームへ戻る</span>
      </button>
      </div>
      </footer>
    </>
  );
}
