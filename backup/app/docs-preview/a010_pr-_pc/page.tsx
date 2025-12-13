import Icon from '../../../components/Icon';
import React from 'react';

export default function Page(){
  return (
    <>
      <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <header className="sticky top-0 z-50 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-gray-100 dark:border-white/5">
      <div className="max-w-[1024px] mx-auto w-full px-4 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2 group cursor-pointer">
      <div className="flex items-center justify-center size-8 rounded-lg bg-primary/10 dark:bg-primary/20 text-primary-dark dark:text-primary">
      <Icon name="medical_services" />
      </div>
      <h2 className="text-xl font-bold tracking-tight text-text-main-light dark:text-text-main-dark font-display">Medily</h2>
      </div>
      <button className="md:hidden text-text-main-light dark:text-text-main-dark p-1 rounded hover:bg-black/5 dark:hover:bg-white/5">
      <Icon name="menu" />
      </button>
      </div>
      </header>
      <main className="flex-1 flex flex-col items-center w-full">
      <div className="w-full max-w-[1024px] flex flex-col">
      <section className="flex flex-col items-center px-4 pt-8 pb-6 md:pt-16 md:pb-12 text-center">
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary-dark dark:text-primary text-xs font-medium mb-6">
      <Icon name="verified" className="text-[16px]" size={16} />
      <span>経験者同士の安心コミュニティ</span>
      </div>
      <h1 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight mb-4 max-w-3xl text-text-main-light dark:text-text-main-dark font-display">
                              あなたの経験が、<br className="hidden md:block"/>だれかの<span className="text-primary-dark dark:text-primary relative inline-block">安心<svg className="absolute w-full h-2 bottom-1 left-0 fill-primary/20 -z-10" viewBox="0 0 100 10"><rect height="10" rx="5" width="100"></rect></svg></span>に変わる。
                          </h1>
      <p className="text-base md:text-lg text-text-sub-light dark:text-text-sub-dark max-w-xl mx-auto leading-relaxed mb-8">
                              同じ病気や怪我を経験した人だからこそ、話せることがあります。<br className="hidden sm:block"/>
                              医療体験の「生の経験」を共有し、支え合う場所です。
                          </p>
      <div className="w-full max-w-4xl relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-blue-400/30 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
      <div className="relative w-full aspect-[4/3] md:aspect-[2/1] rounded-2xl overflow-hidden shadow-card">
      <div className="w-full h-full bg-cover bg-center transition-transform duration-700 hover:scale-105" data-alt="Two women smiling and talking comfortably in a bright, modern cafe setting, representing peer support" style={{ backgroundImage: '' }}  ><img src="/res_AE0F835F9A50.png" alt="" className="absolute inset-0 w-full h-full object-cover" /></div>
      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/60 to-transparent md:hidden">
      <p className="text-white text-sm font-medium">一人で悩まず、話してみませんか？</p>
      </div>
      </div>
      </div>
      </section>
      <section className="px-4 py-8 md:py-16">
      <div className="@container">
      <div className="flex flex-col md:flex-row items-center gap-8 bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-white/5 rounded-2xl p-6 md:p-10 shadow-soft">
      <div className="shrink-0 relative">
      <div className="size-20 md:size-24 rounded-full bg-primary/10 flex items-center justify-center text-primary-dark dark:text-primary">
      <Icon name="diversity_1" className="text-[40px] md:text-[48px]" size={40} />
      </div>
      <div className="absolute -bottom-1 -right-1 size-8 rounded-full bg-background-light dark:bg-background-dark flex items-center justify-center border-2 border-surface-light dark:border-surface-dark">
      <Icon name="check_circle" className="text-primary text-sm" />
      </div>
      </div>
      <div className="flex-1 text-center md:text-left">
      <h3 className="text-xl md:text-2xl font-bold text-text-main-light dark:text-text-main-dark mb-3 font-display">
                                          専門家ではない、「経験者」に相談する
                                      </h3>
      <p className="text-text-sub-light dark:text-text-sub-dark leading-relaxed">
                                          Medilyの回答者は医療従事者ではなく、あなたと同じ経験を持つ一般の方々です。専門的な診断ではなく、生活の工夫や気持ちの持ち方など、経験者ならではの「生の声」を聞くことができます。
                                      </p>
      </div>
      </div>
      </div>
      </section>
      <section className="px-4 py-8">
      <div className="flex flex-col items-center mb-8">
      <h3 className="text-2xl font-bold text-text-main-light dark:text-text-main-dark mb-2">こんな質問が届いています</h3>
      <p className="text-text-sub-light dark:text-text-sub-dark text-center text-sm">あなたの経験が必要です。回答者として参加してみませんか？</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-8">
      <div className="bg-surface-light dark:bg-surface-dark p-5 rounded-xl border border-gray-100 dark:border-white/5 shadow-sm relative">
      <div className="flex items-start gap-3 mb-3">
      <div className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">Question</div>
      <span className="text-xs text-gray-500">20代 女性</span>
      </div>
      <p className="text-text-main-light dark:text-text-main-dark font-medium text-sm leading-relaxed mb-4">
                                      初めての入院で不安です。大部屋での生活で気をつけるべきことや、持って行ってよかった便利グッズがあれば教えてください。
                                  </p>
      <div className="flex items-center justify-end">
      <span className="text-xs text-text-sub-light dark:text-text-sub-dark flex items-center gap-1">
      <Icon name="chat" className="text-[16px]" size={16} />
                                          回答受付中
                                      </span>
      </div>
      </div>
      <div className="bg-surface-light dark:bg-surface-dark p-5 rounded-xl border border-gray-100 dark:border-white/5 shadow-sm relative">
      <div className="flex items-start gap-3 mb-3">
      <div className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">Question</div>
      <span className="text-xs text-gray-500">40代 男性</span>
      </div>
      <p className="text-text-main-light dark:text-text-main-dark font-medium text-sm leading-relaxed mb-4">
                                      リハビリが辛くて心が折れそうです。同じような経験をされた方、どのようにモチベーションを維持していましたか？
                                  </p>
      <div className="flex items-center justify-end">
      <span className="text-xs text-text-sub-light dark:text-text-sub-dark flex items-center gap-1">
      <Icon name="chat" className="text-[16px]" size={16} />
                                          回答受付中
                                      </span>
      </div>
      </div>
      </div>
      <div className="flex justify-center">
      <button className="flex items-center justify-center px-8 h-12 bg-white dark:bg-surface-dark border-2 border-primary text-primary-dark dark:text-primary font-bold rounded-full hover:bg-primary/5 transition-colors shadow-sm">
      <Icon name="rate_review" className="mr-2" />
                                  回答してみる
                              </button>
      </div>
      </section>
      <section className="px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="p-5 rounded-xl bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-white/5">
      <Icon name="lock" className="text-primary mb-3 text-3xl" />
      <h4 className="font-bold text-lg mb-1">クローズドな安心感</h4>
      <p className="text-sm text-text-sub-light dark:text-text-sub-dark">相談内容は公開されず、マッチングした相手とだけの安心できる空間です。</p>
      </div>
      <div className="p-5 rounded-xl bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-white/5">
      <Icon name="favorite" className="text-primary mb-3 text-3xl" />
      <h4 className="font-bold text-lg mb-1">共感が癒しになる</h4>
      <p className="text-sm text-text-sub-light dark:text-text-sub-dark">「わかるよ」という一言が、孤独な闘病生活の大きな支えになります。</p>
      </div>
      <div className="p-5 rounded-xl bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-white/5">
      <Icon name="search" className="text-primary mb-3 text-3xl" />
      <h4 className="font-bold text-lg mb-1">病院選びの参考に</h4>
      <p className="text-sm text-text-sub-light dark:text-text-sub-dark">実際に通院した人のリアルな感想を聞いて、納得のいく病院選びを。</p>
      </div>
      </div>
      </section>
      <div className="h-12 md:h-24"></div>
      </div>
      </main>
      <div className="sticky bottom-0 z-40 w-full bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur border-t border-gray-100 dark:border-white/10 pb-safe pt-4 px-4 shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.05)]">
      <div className="max-w-[600px] mx-auto flex flex-col gap-3 pb-4">
      <button className="flex items-center justify-center w-full h-12 bg-primary hover:bg-primary-dark text-[#0d1b12] font-bold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0">
      <Icon name="chat_bubble" className="mr-2" />
                          質問してみる
                      </button>
      <button className="flex items-center justify-center w-full h-12 bg-transparent border-2 border-gray-200 dark:border-gray-700 text-text-main-light dark:text-text-main-dark font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                          ログイン
                      </button>
      </div>
      </div>
      <footer className="bg-background-light dark:bg-background-dark py-8 px-4 border-t border-gray-200 dark:border-white/5 mb-32 md:mb-0">
      <div className="max-w-[1024px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-2 opacity-80">
      <Icon name="medical_services" className="text-primary" />
      <span className="font-bold text-text-main-light dark:text-text-main-dark font-display">Medily</span>
      </div>
      <div className="flex flex-wrap justify-center gap-6 text-sm text-text-sub-light dark:text-text-sub-dark">
      <a className="hover:text-primary transition-colors" href="#">利用規約</a>
      <a className="hover:text-primary transition-colors" href="#">プライバシーポリシー</a>
      <a className="hover:text-primary transition-colors" href="#">お問い合わせ</a>
      </div>
      <div className="text-xs text-gray-400 dark:text-gray-600">
                          © 2023 Medily Inc.
                      </div>
      </div>
      </footer>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
              .pb-safe {
                  padding-bottom: env(safe-area-inset-bottom, 20px);
              }
          ` }} />
    </>
  );
}
