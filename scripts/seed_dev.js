// scripts/seed_dev.js
// 起動時用のDB登録（カテゴリ + 質問デモ）をまとめて投入

const { initializeApp } = require('firebase-admin/app');
const { getFirestore, Timestamp } = require('firebase-admin/firestore');

// タイムスタンプを生成（古い順から新しい順）
const now = Date.now();
const createTimestamp = (daysAgo) => {
  return Timestamp.fromMillis(now - daysAgo * 24 * 60 * 60 * 1000);
};

const categories = [
  { id: 'basic-internal', group: '基本的な診療科', label: '内科一般', description: '風邪、生活習慣病など', order: 101 },
  { id: 'basic-pediatrics', group: '基本的な診療科', label: '小児科', description: '子供の病気、予防接種など', order: 102 },
  { id: 'basic-dermatology', group: '基本的な診療科', label: '皮膚科', description: '肌荒れ、アトピー、美容皮膚科など', order: 103 },
  { id: 'basic-ophthalmology', group: '基本的な診療科', label: '眼科', description: '視力、コンタクト、目の不調など', order: 104 },
  { id: 'basic-dentistry', group: '基本的な診療科', label: '歯科・矯正歯科', description: '虫歯、歯並び、ホワイトニングなど', order: 105 },
  { id: 'basic-ent', group: '基本的な診療科', label: '耳鼻咽喉科', description: '花粉症、鼻炎、喉の痛みなど', order: 106 },
  { id: 'basic-orthopedics', group: '基本的な診療科', label: '整形外科', description: '腰痛、関節痛、怪我など', order: 107 },
  { id: 'basic-obgyn', group: '基本的な診療科', label: '産婦人科', description: '不妊治療、妊娠・出産、婦人科疾患など', order: 108 },
  { id: 'concern-mental-health', group: 'お悩み・症状別', label: 'メンタルヘルス', description: 'ストレス、不眠、自律神経など', order: 201 },
  { id: 'concern-gi', group: 'お悩み・症状別', label: '胃腸・消化器', description: '胃痛、便秘、腹痛など', order: 202 },
  { id: 'concern-allergy', group: 'お悩み・症状別', label: 'アレルギー・免疫', description: '花粉症、食物アレルギー、喘息など', order: 203 },
  { id: 'concern-rehab-care', group: 'お悩み・症状別', label: 'リハビリ・介護', description: '在宅介護、リハビリテーションなど', order: 204 },
  { id: 'concern-diet-nutrition', group: 'お悩み・症状別', label: 'ダイエット・栄養', description: '食事制限、サプリメント、栄養指導など', order: 205 },
  { id: 'concern-checkup', group: 'お悩み・症状別', label: '検査・人間ドック', description: '健康診断の結果、がん検診など', order: 206 },
  { id: 'life-parenting', group: 'ライフステージ・属性別', label: '子育て・乳幼児', description: '夜泣き、離乳食、発育など', order: 301 },
  { id: 'life-women', group: 'ライフステージ・属性別', label: '女性特有の悩み', description: '生理不順、更年期障害など', order: 302 },
  { id: 'life-seniors', group: 'ライフステージ・属性別', label: '高齢者の健康', description: '認知症、持病の管理など', order: 303 },
  { id: 'life-long-treatment', group: 'ライフステージ・属性別', label: '闘病・長期療養', description: '難病、慢性疾患との付き合い方など', order: 304 },
  { id: 'experience-accessibility', group: '病院選びの体験', label: '通いやすさ・設備', description: '待ち時間、バリアフリー、清潔感など', order: 401 },
  { id: 'experience-hospitality', group: '病院選びの体験', label: '接遇・対応', description: '医師の丁寧さ、看護師の対応など', order: 402 },
  { id: 'experience-cost', group: '病院選びの体験', label: '費用・保険', description: '自由診療、高額療養費、医療費控除など', order: 403 },
  { id: 'experience-second-opinion', group: '病院選びの体験', label: 'セカンドオピニオン', description: '転院の経験、他院との比較など', order: 404 },
];

const statuses = [
  { id: 'all', type: 'status', name: 'すべて', order: 0 },
  { id: 'open', type: 'status', name: '回答募集中', order: 1 },
  { id: 'answered', type: 'status', name: '回答済み', order: 2 },
  { id: 'closed', type: 'status', name: 'クローズ', order: 3 },
];

const regionGroups = [
  { group: '北海道', prefectures: ['北海道'] },
  { group: '東北', prefectures: ['青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県'] },
  { group: '関東', prefectures: ['茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県'] },
  { group: '中部', prefectures: ['新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県', '静岡県', '愛知県'] },
  { group: '近畿', prefectures: ['三重県', '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県'] },
  { group: '中国', prefectures: ['鳥取県', '島根県', '岡山県', '広島県', '山口県'] },
  { group: '四国', prefectures: ['徳島県', '香川県', '愛媛県', '高知県'] },
  { group: '九州・沖縄', prefectures: ['福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'] },
];

const regions = regionGroups.flatMap((g, groupIndex) =>
  g.prefectures.map((pref, prefIndex) => ({
    id: pref,
    type: 'region',
    name: pref,
    group: g.group,
    order: groupIndex * 100 + prefIndex,
  }))
);

const devUsers = [
  {
    id: 'dev-mock-user',
    displayName: 'デモユーザー',
    region: '東京都',
    primaryCategory: '内科一般',
    categories: ['内科一般', '皮膚科', '小児科'],
    medicalBackground: '看護師（経験3年）',
    avatar: '',
    notificationConsent: true,
    profileCompletedAt: Timestamp.now(),
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
  {
    id: 'dev-helper-user',
    displayName: 'サポート医師',
    region: '東京都',
    primaryCategory: '内科一般',
    categories: ['内科一般', '検査・人間ドック'],
    medicalBackground: '内科医（指導医）',
    avatar: '',
    notificationConsent: true,
    profileCompletedAt: Timestamp.now(),
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
];

// NOTE: デモデータは固定IDを使用（テスト用URLが予測可能）
// 本番APIはFirestoreの自動ID生成を使用（addDoc()により自動的にユニークなIDが生成される）
// batch.set()は同じIDで実行すると上書きするため、重複は発生しない
const demoQuestions = [
  // === 新規質問（parentQuestionIdなし）===
  {
    id: 'demo-q-new-simple',
    title: '花粉症の薬を変更するタイミング',
    description: '今使っている花粉症の薬が効きにくくなってきた気がします。薬を変更する場合、どのタイミングで医師に相談すべきでしょうか？',
    region: '東京都',
    category: 'basic-ent',
    userId: 'dev-mock-user',
    authorName: 'デモユーザー',
    public: true,
    status: 'answered',
    answerCount: 2,
    createdAt: createTimestamp(0), // 最新
    updatedAt: createTimestamp(0),
  },
  
  // === 追加質問チェーン（親→子→孫）===
  // 親質問
  {
    id: 'demo-q-parent',
    title: '子どもの夜泣きが続いています',
    description: '2歳の子どもが毎晩夜中に起きて泣いてしまいます。日中は元気なのですが、夜泣きで親も疲れてしまっています。何か良い対策はありますか？',
    region: '神奈川県',
    category: 'life-parenting',
    userId: 'dev-mock-user',
    authorName: 'デモユーザー',
    public: true,
    status: 'answered',
    answerCount: 2,
    parentQuestionId: null,
    createdAt: createTimestamp(3), // 3日前
    updatedAt: createTimestamp(3),
  },
  // 追加質問1（子）
  {
    id: 'demo-q-child1',
    title: '夜泣き対策を試したのですが...',
    description: '前回教えていただいた寝る前のルーティンを2週間試してみました。少し改善したのですが、まだ週に3-4回は起きてしまいます。次のステップとして何を試すべきでしょうか？',
    region: '神奈川県',
    category: 'life-parenting',
    userId: 'dev-mock-user',
    authorName: 'デモユーザー',
    public: true,
    status: 'answered',
    answerCount: 1,
    parentQuestionId: 'demo-q-parent',
    createdAt: createTimestamp(4), // 4日前
    updatedAt: createTimestamp(4),
  },
  // 追加質問2（孫）
  {
    id: 'demo-q-child2',
    title: '小児科受診のタイミングについて',
    description: '環境調整も試してみましたが、まだ夜泣きが続いています。この場合、小児科を受診したほうがいいでしょうか？受診のタイミングの目安があれば教えてください。',
    region: '神奈川県',
    category: 'life-parenting',
    userId: 'dev-mock-user',
    authorName: 'デモユーザー',
    public: true,
    status: 'open',
    answerCount: 0,
    parentQuestionId: 'demo-q-child1',
    createdAt: createTimestamp(5), // 5日前
    updatedAt: createTimestamp(5),
  },
  
  // === 既存の質問（互換性維持）===
  {
    id: 'demo-q-internal',
    title: '小児科の発熱、受診目安を知りたい',
    description: '子どもが高熱で、何度目の受診が適切か悩んでいます。',
    region: '東京都',
    category: '小児科',
    authorName: 'ユーザーA',
    public: true,
    status: 'open',
    answerCount: 2,
    createdAt: createTimestamp(6), // 6日前
    updatedAt: createTimestamp(6),
  },
  {
    id: 'dev-q1',
    title: 'デモユーザーの質問: 健康診断の結果について',
    description: '健康診断で血糖値が少し高めでした。生活習慣で改善できるポイントを知りたいです。',
    region: '東京都',
    category: '内科一般',
    userId: 'dev-mock-user',
    authorName: 'デモユーザー',
    public: true,
    status: 'open',
    answerCount: 2,
    createdAt: createTimestamp(2), // 2日前
    updatedAt: createTimestamp(2),
  },
  {
    id: 'demo-q-dermatology',
    title: '皮膚科の薬、副作用の体験談',
    description: '塗り薬の副作用について実体験を聞きたいです。',
    region: '大阪府',
    category: '皮膚科',
    authorName: 'ユーザーB',
    public: true,
    status: 'open',
    answerCount: 0,
    createdAt: createTimestamp(7), // 7日前
    updatedAt: createTimestamp(7),
  },
  {
    id: 'demo-q-orthopedics',
    title: '整形外科のリハビリ頻度',
    description: '週何回通うのが一般的でしょうか？',
    region: '福岡県',
    category: '整形外科',
    authorName: 'ユーザーC',
    public: true,
    status: 'answered',
    answerCount: 1,
    createdAt: createTimestamp(8), // 8日前
    updatedAt: createTimestamp(8),
  },
];

// ページネーション検証用に追加のデモ質問を量産
const moreOpenQuestions = Array.from({ length: 12 }).map((_, idx) => ({
  id: `demo-q-open-${idx + 1}`,
  title: `公開質問サンプル ${idx + 1}`,
  description: `公開のサンプル質問です (${idx + 1})。ページネーション検証用。`,
  region: '東京都',
  category: idx % 2 === 0 ? '内科一般' : '皮膚科',
  authorName: 'デモユーザー',
  userId: 'dev-mock-user',
  public: true,
  status: 'open',
  answerCount: idx % 3,
  createdAt: createTimestamp(9 + idx), // 9日前から古い順
  updatedAt: createTimestamp(9 + idx),
}));

const moreAnsweredQuestions = Array.from({ length: 12 }).map((_, idx) => ({
  id: `demo-q-answered-${idx + 1}`,
  title: `回答済みサンプル ${idx + 1}`,
  description: `回答済みのサンプル質問です (${idx + 1})。ページネーション検証用。`,
  region: '大阪府',
  category: idx % 2 === 0 ? '整形外科' : '小児科',
  authorName: idx % 2 === 0 ? 'ユーザーF' : 'ユーザーG',
  public: true,
  status: 'answered',
  answerCount: (idx % 3) + 1,
  createdAt: createTimestamp(21 + idx), // 21日前から古い順
  updatedAt: createTimestamp(21 + idx),
}));

demoQuestions.push(...moreOpenQuestions, ...moreAnsweredQuestions);

const demoAnswers = [
  // dev-q1への回答
  {
    questionId: 'dev-q1',
    userId: 'dev-helper-user',
    content: '食後の散歩や甘い飲料を減らすだけでも改善が見込めます。まずは2週間続けてみてください。',
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
  {
    questionId: 'dev-q1',
    userId: 'dev-mock-user',
    content: 'ありがとうございます！夕食後の散歩から始めてみます。',
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
  
  // 新規質問への回答
  {
    questionId: 'demo-q-new-simple',
    userId: 'dev-helper-user',
    content: '薬の効果が感じられなくなったら、すぐに医師に相談することをお勧めします。花粉症の薬は体質や症状によって合う・合わないがあります。2週間使用して改善が見られない場合は変更を検討しましょう。',
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
  {
    questionId: 'demo-q-new-simple',
    userId: 'dev-mock-user',
    content: '私も同じ経験があります。病院を変えたら合う薬が見つかりました。セカンドオピニオンも検討してみてください。',
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
  
  // 親質問への回答
  {
    questionId: 'demo-q-parent',
    userId: 'dev-helper-user',
    content: '2歳のお子さんの夜泣きは珍しくありません。まずは寝る前のルーティンを作ることをお勧めします。お風呂→絵本→寝る、といった流れを毎日同じ時間に繰り返すと効果的です。',
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
  {
    questionId: 'demo-q-parent',
    userId: 'dev-mock-user',
    content: 'うちも同じ経験がありました。部屋の温度調整や寝具の見直しも効果がありましたよ。',
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
  
  // 追加質問1（子）への回答
  {
    questionId: 'demo-q-child1',
    userId: 'dev-helper-user',
    content: '2週間続けられたのは素晴らしいですね。次は環境調整を試してみましょう。部屋の暗さ、温度（18-22度が理想）、湿度（50-60%）を確認してみてください。また、日中の活動量を増やすことも効果的です。',
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
];

async function main() {
  const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'medily-dev';
  // Emulator接続: firebase-tools のデフォルト localhost:8080
  process.env.FIRESTORE_EMULATOR_HOST = process.env.FIRESTORE_EMULATOR_HOST || 'localhost:8080';

  console.log('Project ID:', projectId);
  console.log('Firestore Emulator Host:', process.env.FIRESTORE_EMULATOR_HOST);

  // Emulator使用時は認証不要。credentialを省略して初期化。
  initializeApp({ projectId });
  const db = getFirestore();

  // カテゴリ投入
  const catBatch = db.batch();
  const catCol = db.collection('categories');
  categories.forEach((c) => {
    const ref = catCol.doc(c.id);
    catBatch.set(ref, { ...c, public: true, createdAt: Timestamp.now(), updatedAt: Timestamp.now() });
  });
  await catBatch.commit();
  console.log('Seeded categories:', categories.length);

  // マスタ投入（categories + statuses + regions）
  const masterBatch = db.batch();
  const masterCol = db.collection('masters');

  categories.forEach((c) => {
    const ref = masterCol.doc(c.id);
    masterBatch.set(ref, { ...c, type: 'category', createdAt: Timestamp.now(), updatedAt: Timestamp.now() });
  });

  statuses.forEach((s) => {
    const ref = masterCol.doc(`status-${s.id}`);
    masterBatch.set(ref, { ...s, createdAt: Timestamp.now(), updatedAt: Timestamp.now() });
  });

  regions.forEach((r) => {
    const ref = masterCol.doc(`region-${r.id}`);
    masterBatch.set(ref, { ...r, createdAt: Timestamp.now(), updatedAt: Timestamp.now() });
  });

  await masterBatch.commit();
  console.log('Seeded masters:', categories.length + statuses.length + regions.length);

  // 開発用ユーザー投入
  const userBatch = db.batch();
  const userCol = db.collection('users');
  devUsers.forEach((u) => {
    const ref = userCol.doc(u.id);
    userBatch.set(ref, u, { merge: true });
  });
  await userBatch.commit();
  console.log('Seeded dev users:', devUsers.length);

  // 質問デモ投入
  const qBatch = db.batch();
  const qCol = db.collection('questions');
  demoQuestions.forEach((q) => {
    const ref = q.id ? qCol.doc(q.id) : qCol.doc();
    const { id, ...rest } = q;
    qBatch.set(ref, {
      ...rest,
      createdAt: rest.createdAt || Timestamp.now(),
      updatedAt: rest.updatedAt || Timestamp.now(),
    });
  });
  await qBatch.commit();
  console.log('Seeded demo questions:', demoQuestions.length);

  // 回答デモ投入（dev 質問のサンプル回答）
  for (const ans of demoAnswers) {
    const ansCol = db.collection('questions').doc(ans.questionId).collection('answers');
    await ansCol.add({
      userId: ans.userId,
      content: ans.content,
      createdAt: ans.createdAt || Timestamp.now(),
      updatedAt: ans.updatedAt || Timestamp.now(),
    });
  }
  console.log('Seeded demo answers:', demoAnswers.length);

  // 確認ログ
  const catSnap = await catCol.orderBy('order').get();
  console.log('Categories count:', catSnap.size);
  const qSnap = await qCol.limit(5).get();
  console.log('Questions count (sample up to 5):', qSnap.size);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
