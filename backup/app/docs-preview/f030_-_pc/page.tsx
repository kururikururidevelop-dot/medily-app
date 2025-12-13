import Icon from '../../../components/Icon';
import React from 'react';

export default function Page(){
  return (
    <>
      {/*  Sticky Header  */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 transition-colors duration-200">
      <div className="max-w-[1024px] mx-auto w-full px-4 h-16 flex items-center justify-between">
      {/*  Left: Spacer/Back potentially  */}
      <div className="w-12 flex items-center justify-start">
      <button className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
      <Icon name="arrow_back" className="inline-block align-middle text-2xl" size={16} />
      </button>
      </div>
      {/*  Center: Logo  */}
      <div className="flex-1 flex justify-center items-center gap-2">
      <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
      <Icon name="medical_services" className="inline-block align-middle text-white text-[18px] font-bold" size={16} />
      </div>
      <h1 className="text-xl font-bold tracking-tight text-[#0d1b12] dark:text-white">Medily</h1>
      </div>
      {/*  Right: Settings  */}
      <div className="w-12 flex items-center justify-end">
      <button className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-[#0d1b12] dark:text-white">
      <Icon name="settings" className="inline-block align-middle" size={16} />
      </button>
      </div>
      </div>
      </header>
      {/*  Main Content Area  */}
      <main className="relative flex flex-col w-full max-w-[1024px] mx-auto min-h-screen pt-20 pb-24 px-4 sm:px-6 lg:px-8">
      {/*  Page Title  */}
      <div className="mb-8 mt-2">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0d1b12] dark:text-white leading-tight">
                      プライバシーポリシー
                  </h1>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      お客様の個人情報の取り扱いについて
                  </p>
      </div>
      {/*  Content Card  */}
      <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
      {/*  Intro  */}
      <div className="mb-8">
      <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
                          Medily（以下、「当社」といいます。）は、本ウェブサイト上で提供するサービス（以下、「本サービス」といいます。）における、ユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下、「本ポリシー」といいます。）を定めます。
                      </p>
      </div>
      {/*  Article 1  */}
      <section className="mb-10 group">
      <div className="flex items-center gap-3 mb-4">
      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-bold text-sm">01</span>
      <h2 className="text-lg md:text-xl font-bold text-[#0d1b12] dark:text-white">第1条（個人情報）</h2>
      </div>
      <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 pl-2 border-l-2 border-transparent group-hover:border-primary/30 transition-colors duration-300">
                          「個人情報」とは、個人情報保護法にいう「個人情報」を指すものとし、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日、住所、電話番号、連絡先その他の記述等により特定の個人を識別できる情報を指します。
                      </p>
      </section>
      {/*  Article 2  */}
      <section className="mb-10 group">
      <div className="flex items-center gap-3 mb-4">
      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-bold text-sm">02</span>
      <h2 className="text-lg md:text-xl font-bold text-[#0d1b12] dark:text-white">第2条（個人情報の収集方法）</h2>
      </div>
      <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 pl-2 border-l-2 border-transparent group-hover:border-primary/30 transition-colors duration-300">
                          当社は、ユーザーが利用登録をする際に氏名、生年月日、住所、電話番号、メールアドレス、銀行口座番号、クレジットカード番号、運転免許証番号などの個人情報をお尋ねすることがあります。また、ユーザーと提携先などとの間でなされたユーザーの個人情報を含む取引記録や決済に関する情報を、当社の提携先（情報提供元、広告主、広告配信先などを含みます。以下、｢提携先｣といいます。）などから収集することがあります。
                      </p>
      </section>
      {/*  Article 3  */}
      <section className="mb-10 group">
      <div className="flex items-center gap-3 mb-4">
      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-bold text-sm">03</span>
      <h2 className="text-lg md:text-xl font-bold text-[#0d1b12] dark:text-white">第3条（個人情報を収集・利用する目的）</h2>
      </div>
      <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-3 pl-2 border-l-2 border-transparent group-hover:border-primary/30 transition-colors duration-300">
                          当社が個人情報を収集・利用する目的は、以下のとおりです。
                      </p>
      <ul className="list-none space-y-2 pl-4 text-gray-700 dark:text-gray-300">
      <li className="flex items-start gap-2">
      <Icon name="check_circle" className="inline-block align-middle text-primary text-sm mt-1" size={16} />
      <span>当社サービスの提供・運営のため</span>
      </li>
      <li className="flex items-start gap-2">
      <Icon name="check_circle" className="inline-block align-middle text-primary text-sm mt-1" size={16} />
      <span>ユーザーからのお問い合わせに回答するため（本人確認を行うことを含む）</span>
      </li>
      <li className="flex items-start gap-2">
      <Icon name="check_circle" className="inline-block align-middle text-primary text-sm mt-1" size={16} />
      <span>メンテナンス、重要なお知らせなど必要に応じたご連絡のため</span>
      </li>
      <li className="flex items-start gap-2">
      <Icon name="check_circle" className="inline-block align-middle text-primary text-sm mt-1" size={16} />
      <span>利用規約に違反したユーザーや、不正・不当な目的でサービスを利用しようとするユーザーの特定をし、ご利用をお断りするため</span>
      </li>
      </ul>
      </section>
      {/*  Article 4  */}
      <section className="mb-10 group">
      <div className="flex items-center gap-3 mb-4">
      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-bold text-sm">04</span>
      <h2 className="text-lg md:text-xl font-bold text-[#0d1b12] dark:text-white">第4条（利用目的の変更）</h2>
      </div>
      <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 pl-2 border-l-2 border-transparent group-hover:border-primary/30 transition-colors duration-300">
                          当社は、利用目的が変更前と関連性を有すると合理的に認められる場合に限り、個人情報の利用目的を変更するものとします。利用目的の変更を行った場合には、変更後の目的について、当社所定の方法により、ユーザーに通知し、または本ウェブサイト上に公表するものとします。
                      </p>
      </section>
      {/*  Article 5  */}
      <section className="mb-12 group">
      <div className="flex items-center gap-3 mb-4">
      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-bold text-sm">05</span>
      <h2 className="text-lg md:text-xl font-bold text-[#0d1b12] dark:text-white">第5条（お問い合わせ窓口）</h2>
      </div>
      <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-4 pl-2 border-l-2 border-transparent group-hover:border-primary/30 transition-colors duration-300">
                          本ポリシーに関するお問い合わせは、下記の窓口までお願いいたします。
                      </p>
      <div className="bg-background-light dark:bg-background-dark p-4 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
      <p className="text-sm text-gray-600 dark:text-gray-400">Medily カスタマーサポート</p>
      <p className="text-base font-semibold text-[#0d1b12] dark:text-white mt-1">support@medily.example.com</p>
      </div>
      </section>
      {/*  Footer Meta  */}
      <div className="border-t border-gray-100 dark:border-gray-800 pt-6 mt-8 flex flex-col items-end gap-1">
      <p className="text-xs text-gray-400 dark:text-gray-500">制定日：2023年4月1日</p>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">最終改定日：2023年10月15日</p>
      </div>
      </div>
      </main>
      {/*  Global Footer Navigation  */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-surface-light dark:bg-surface-dark border-t border-gray-200 dark:border-gray-800 pb-safe">
      <div className="max-w-[1024px] mx-auto w-full px-2 flex justify-around items-center h-16">
      <button className="flex-1 flex flex-col items-center justify-center gap-1 h-full text-gray-400 dark:text-gray-500 hover:text-primary dark:hover:text-primary transition-colors">
      <Icon name="home" className="inline-block align-middle text-2xl" size={16} />
      <span className="text-[10px] font-medium">ホーム</span>
      </button>
      <button className="flex-1 flex flex-col items-center justify-center gap-1 h-full text-gray-400 dark:text-gray-500 hover:text-primary dark:hover:text-primary transition-colors">
      <Icon name="search" className="inline-block align-middle text-2xl" size={16} />
      <span className="text-[10px] font-medium">さがす</span>
      </button>
      <div className="relative -top-5">
      <button className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30 text-white hover:scale-105 transition-transform">
      <Icon name="add_circle" className="inline-block align-middle text-3xl" size={16} />
      </button>
      </div>
      <button className="flex-1 flex flex-col items-center justify-center gap-1 h-full text-gray-400 dark:text-gray-500 hover:text-primary dark:hover:text-primary transition-colors">
      <Icon name="chat_bubble" className="inline-block align-middle text-2xl" size={16} />
      <span className="text-[10px] font-medium">相談</span>
      </button>
      <button className="flex-1 flex flex-col items-center justify-center gap-1 h-full text-primary dark:text-primary transition-colors">
      <Icon name="person" className="inline-block align-middle text-2xl fill-1" size={16} />
      <span className="text-[10px] font-medium">マイページ</span>
      </button>
      </div>
      {/*  Safe area padding for iPhone home indicator  */}
      <div className="h-[env(safe-area-inset-bottom)] w-full bg-surface-light dark:bg-surface-dark"></div>
      </nav>
      {/*  Overlay Gradient for Bottom Scroll  */}
      <div className="fixed bottom-16 left-0 right-0 h-12 bg-gradient-to-t from-background-light dark:from-background-dark to-transparent pointer-events-none z-40"></div>
    </>
  );
}
