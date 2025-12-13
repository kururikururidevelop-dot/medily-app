import ContributionCategory from '../../components/ContributionCategory';
import ContributionGraphic from '../../components/ContributionGraphic';
import ThankCount from '../../components/ThankCount';

export default function AnswersPage() {
  return (
    <main className="max-w-[1024px] mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">自分の回答</h2>
        <p className="text-sm text-gray-500 mt-1">過去に回答した相談や活動状況を確認できます。</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-8">
        <div className="lg:col-span-8 bg-white dark:bg-surface-dark p-5 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold flex items-center gap-2">貢献度グラフィック</h3>
            <p className="text-xs text-gray-500">直近3ヶ月の回答アクティビティ</p>
          </div>
          <div className="w-full h-36">
            <ContributionGraphic />
          </div>
        </div>
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="p-5 rounded-xl bg-white dark:bg-surface-dark border">
            <ThankCount />
          </div>
          <div className="p-5 rounded-xl bg-white dark:bg-surface-dark border">
            <h3 className="text-xs font-bold text-gray-500 mb-4">貢献カテゴリ</h3>
            <ContributionCategory />
          </div>
        </div>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <article className="bg-white dark:bg-surface-dark p-4 rounded-xl border">
          <div
            className="h-40 bg-cover bg-center mb-4 rounded-lg"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%), url(/images/sample-1.png)",
            }}
          />
          <h3 className="font-bold">インフルエンザの予防接種の時期について教えてください</h3>
          <p className="text-sm text-gray-700 mt-2">
            一般的には10月下旬から接種を開始することをお勧めします。流行状況によって変わるため、最新情報を確認しましょう。
          </p>
        </article>
      </section>
    </main>
  );
}

