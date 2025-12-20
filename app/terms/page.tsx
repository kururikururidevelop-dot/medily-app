import Link from 'next/link';
import Icon from '@/components/Icon';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-screen-lg mx-auto px-4 py-4">
          <Link href="/" className="text-2xl font-bold text-primary">
            Medily
          </Link>
        </div>
      </nav>

      <div className="max-w-screen-lg mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">利用規約</h1>

        <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">第1条（適用）</h2>
            <p className="text-gray-700 leading-relaxed">
              本規約は、本サービスの利用に関する条件を定めるものです。登録ユーザーは、本規約に従って本サービスを利用するものとします。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">第2条（利用登録）</h2>
            <p className="text-gray-700 leading-relaxed">
              本サービスの利用を希望する者は、本規約に同意の上、所定の方法によって利用登録を申請し、運営者がこれを承認することで登録が完了します。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">第3条（禁止事項）</h2>
            <p className="text-gray-700 leading-relaxed mb-2">
              登録ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>法令または公序良俗に違反する行為</li>
              <li>犯罪行為に関連する行為</li>
              <li>他のユーザーまたは第三者の権利を侵害する行為</li>
              <li>虚偽の情報を登録する行為</li>
              <li>本サービスの運営を妨害する行為</li>
              <li><strong>医師法に抵触する恐れのある行為（医師資格を持たない者による診断・治療行為）</strong></li>
              <li><strong>医学的根拠のない情報の流布や、健康被害をもたらす恐れのあるデマの拡散</strong></li>
              <li><strong>許可のない営利目的の宣伝・勧誘行為（サプリメントや特定商品の販売など）</strong></li>
              <li><strong>特定の医療機関、医師、個人に対する誹謗中傷</strong></li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">第4条（本サービスの停止等）</h2>
            <p className="text-gray-700 leading-relaxed">
              運営者は、以下のいずれかに該当する場合には、ユーザーに事前に通知することなく、本サービスの全部または一部の提供を停止または中断することができるものとします。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">第5条（免責事項）</h2>
            <p className="text-gray-700 leading-relaxed">
              運営者は、本サービスに関して、ユーザーと他のユーザーまたは第三者との間において生じた取引、連絡または紛争等について一切責任を負いません。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">第6条（医療情報に関する免責）</h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-gray-800">
              <div className="flex items-start gap-3">
                <span className="text-red-600 mt-0.5">
                  <Icon name="error_outline" size={20} />
                </span>
                <div className="space-y-2">
                  <p className="font-bold text-red-900">本サービスは医療行為を提供するものではありません</p>
                  <ul className="list-disc list-inside space-y-1 text-red-800/90">
                    <li>本サービス上の情報は、ユーザーの体験談や個人的な意見であり、医学的な診断、治療、助言を目的とするものではありません。</li>
                    <li>ユーザーは、本サービス上の情報を自身の判断と責任において利用するものとし、当該情報によって生じた損害について、運営者は一切の責任を負いません。</li>
                    <li>体調に不安がある場合や緊急を要する場合は、本サービスのみに頼らず、必ず医師や専門機関に相談してください。</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">第7条（投稿データの権利）</h2>
            <p className="text-gray-700 leading-relaxed">
              ユーザーが投稿した文章、画像等のコンテンツの著作権はユーザーに帰属します。ただし、ユーザーは運営者に対し、本サービスの提供、改善、宣伝広告等の範囲内で、当該コンテンツを無償かつ非独占的に利用（複製、上映、公衆送信、展示、頒布、翻訳、翻案等）する権利を許諾するものとします。
            </p>
          </section>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-primary hover:underline">
            ホームへ戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
