// scripts/seed_dev.js
// 起動時用のDB登録（カテゴリ + 質問デモ）をまとめて投入

const { initializeApp } = require('firebase-admin/app');
const { getFirestore, Timestamp } = require('firebase-admin/firestore');

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

const devUsers = [
  {
    id: 'dev-mock-user',
    displayName: 'デモユーザー',
    region: '東京都',
    primaryCategory: '内科一般',
    medicalBackground: '看護師（経験3年）',
    avatar: '',
    profileCompletedAt: Timestamp.now(),
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
  {
    id: 'dev-helper-user',
    displayName: 'サポート医師',
    region: '東京都',
    primaryCategory: '内科一般',
    medicalBackground: '内科医（指導医）',
    avatar: '',
    profileCompletedAt: Timestamp.now(),
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
];

const demoQuestions = [
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
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
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
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
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
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
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
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
];

const demoAnswers = [
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
