import Link from 'next/link';

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
