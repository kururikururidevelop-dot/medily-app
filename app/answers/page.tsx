"use client";

import { useRequireAuth } from '@/hooks/useRequireAuth';

export default function AnswersPage() {
  useRequireAuth();

  return (
    <main className="max-w-[1024px] mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">自分の回答</h2>
        <p className="text-sm text-gray-500 mt-1">過去に回答した相談や活動状況を確認できます。</p>
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

