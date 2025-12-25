// scripts/seed_dev.js
// 起動時用のDB登録（カテゴリ + 質問デモ）をまとめて投入

const { initializeApp } = require('firebase-admin/app');
const { getFirestore, Timestamp } = require('firebase-admin/firestore');
const { seedMasters } = require('./seed_masters');

// タイムスタンプを生成（古い順から新しい順）
const now = Date.now();
const createTimestamp = (daysAgo) => {
  return Timestamp.fromMillis(now - daysAgo * 24 * 60 * 60 * 1000);
};

const devUsers = [
  {
    id: 'dev-mock-user',
    displayName: 'デモユーザー',
    region: '東京都',

    categories: ['内科一般', '皮膚科', '小児科'],
    medicalBackground: '看護師（経験3年）',
    avatar: '',
    pictureUrl: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Felix',
    notificationConsent: true,
    profileCompletedAt: Timestamp.now(),
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
  {
    id: 'dev-helper-user',
    displayName: 'サポート医師',
    region: '東京都',

    categories: ['内科一般', '検査・人間ドック'],
    medicalBackground: '内科医（指導医）',
    avatar: '',
    pictureUrl: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Sarah',
    notificationConsent: true,
    profileCompletedAt: Timestamp.now(),
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
  // Scenario Users (Questioners)
  { id: 'dev-questioner-a', displayName: '質問者A', region: '東京都', categories: [], pictureUrl: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Jack', isProfileCompleted: true, notificationConsent: true, profileCompletedAt: Timestamp.now(), createdAt: Timestamp.now(), updatedAt: Timestamp.now() },
  { id: 'dev-questioner-b', displayName: '質問者B', region: '大阪府', categories: [], pictureUrl: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Jade', isProfileCompleted: true, notificationConsent: true, profileCompletedAt: Timestamp.now(), createdAt: Timestamp.now(), updatedAt: Timestamp.now() },
  { id: 'dev-questioner-c', displayName: '質問者C', region: '福岡県', categories: [], pictureUrl: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Avery', isProfileCompleted: true, notificationConsent: true, profileCompletedAt: Timestamp.now(), createdAt: Timestamp.now(), updatedAt: Timestamp.now() },
  // Scenario Users (Other Answerers)
  { id: 'dev-answerer-x', displayName: '回答者X', region: '北海道', categories: [], pictureUrl: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Max', isProfileCompleted: true, notificationConsent: true, profileCompletedAt: Timestamp.now(), createdAt: Timestamp.now(), updatedAt: Timestamp.now() },
  { id: 'dev-answerer-y', displayName: '回答者Y', region: '沖縄県', categories: [], pictureUrl: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Luna', isProfileCompleted: true, notificationConsent: true, profileCompletedAt: Timestamp.now(), createdAt: Timestamp.now(), updatedAt: Timestamp.now() },
];

// NOTE: デモデータは固定IDを使用（テスト用URLが予測可能）
// 本番APIはFirestoreの自動ID生成を使用（addDoc()により自動的にユニークなIDが生成される）
// batch.set()は同じIDで実行すると上書きするため、重複は発生しない
const demoQuestions = [
  // === 新規質問（parentQuestionIdなし）===
  {
    id: 'demo-q-new-simple',
    title: '花粉症の薬を変えるべきか迷っています',
    description: 'ここ2週間ほど花粉症の薬の効き目が弱く感じています。朝と夜にくしゃみと鼻水が続き、日中の作業にも支障が出ています。薬を変更する場合の目安や、医師に相談するタイミングを知りたいです。',
    region: '東京都',
    categories: ['basic-dermatology', 'basic-internal', 'basic-pediatrics'],
    choices: ['すぐ医師に相談する', '2週間様子をみてから相談する', '市販薬を試してから相談する'],
    userId: 'dev-mock-user',

    isPublic: true,
    genderFilter: 'male',
    ageGroups: ['20代', '30代'],
    status: 'answered',
    answerCount: 2,
    createdAt: createTimestamp(0), // 最新
    updatedAt: createTimestamp(0),
    postedAt: createTimestamp(0),
  },

  // === 追加質問チェーン（親→子→孫）===
  // 親質問
  {
    id: 'demo-q-parent',
    title: '子どもの夜泣きが続いています',
    description: '2歳の子どもが毎晩夜中に起きて泣いてしまいます。日中は元気なのですが、夜泣きで親も疲れてしまっています。何か良い対策はありますか？',
    region: '神奈川県',
    categories: ['life-parenting'],
    choices: [],
    userId: 'dev-mock-user',

    isPublic: true,
    status: 'answered',
    answerCount: 2,
    parentQuestionId: null,
    createdAt: createTimestamp(5), // 5日前 (Oldest)
    updatedAt: createTimestamp(5),
    postedAt: createTimestamp(5),
  },
  // 追加質問1（子）
  {
    id: 'demo-q-child1',
    title: '夜泣き対策を試したのですが...',
    description: '前回教えていただいた寝る前のルーティンを2週間試してみました。少し改善したのですが、まだ週に3-4回は起きてしまいます。次のステップとして何を試すべきでしょうか？',
    region: '神奈川県',
    categories: ['life-parenting'],
    choices: [],
    userId: 'dev-mock-user',

    isPublic: true,
    status: 'answered',
    answerCount: 1,
    parentQuestionId: 'demo-q-parent',
    createdAt: createTimestamp(4), // 4日前
    updatedAt: createTimestamp(4),
    postedAt: createTimestamp(4),
  },
  // 追加質問2（孫）
  {
    id: 'demo-q-child2',
    title: '小児科受診のタイミングについて',
    description: '環境調整も試してみましたが、まだ夜泣きが続いています。この場合、小児科を受診したほうがいいでしょうか？受診のタイミングの目安があれば教えてください。',
    region: '神奈川県',
    categories: ['life-parenting'],
    choices: [],
    userId: 'dev-mock-user',

    isPublic: true,
    status: 'matching',
    answerCount: 0,
    parentQuestionId: 'demo-q-child1',
    createdAt: createTimestamp(3), // 3日前 (Newest)
    updatedAt: createTimestamp(3),
    postedAt: createTimestamp(3),
  },

  // === 既存の質問（互換性維持）===
  {
    id: 'demo-q-internal',
    title: '小児科の発熱、受診目安を知りたい',
    description: '子どもが高熱で、何度目の受診が適切か悩んでいます。',
    region: '東京都',
    categories: ['basic-pediatrics'],
    choices: [],
    userId: 'dev-mock-user',

    isPublic: true,
    status: 'answered',
    answerCount: 2,
    createdAt: createTimestamp(6), // 6日前
    updatedAt: createTimestamp(6),
    postedAt: createTimestamp(6),
  },
  {
    id: 'dev-q1',
    title: 'デモユーザーの質問: 健康診断の結果について',
    description: '健康診断で血糖値が少し高めでした。生活習慣で改善できるポイントを知りたいです。',
    region: '東京都',
    categories: ['basic-internal'],
    choices: [],
    userId: 'dev-mock-user',

    isPublic: true,
    status: 'answered',
    answerCount: 2,
    createdAt: createTimestamp(2), // 2日前
    updatedAt: createTimestamp(2),
    postedAt: createTimestamp(2),
  },
  {
    id: 'demo-q-dermatology',
    title: '皮膚科の薬、副作用の体験談',
    description: '塗り薬の副作用について実体験を聞きたいです。',
    region: '大阪府',
    categories: ['basic-dermatology'],
    choices: [],
    userId: 'dev-questioner-b',

    isPublic: true,
    status: 'matching',
    answerCount: 0,
    createdAt: createTimestamp(7), // 7日前
    updatedAt: createTimestamp(7),
    postedAt: createTimestamp(7),
  },
  {
    id: 'demo-q-orthopedics',
    title: '整形外科のリハビリ頻度',
    description: '週何回通うのが一般的でしょうか？',
    region: '福岡県',
    categories: ['basic-orthopedics'],
    choices: [],
    userId: 'dev-questioner-c',

    isPublic: true,
    status: 'answered',
    answerCount: 1,
    createdAt: createTimestamp(8), // 8日前
    updatedAt: createTimestamp(8),
    postedAt: createTimestamp(8),
  },
];

// ページネーション検証用に追加のデモ質問を量産
const moreOpenQuestions = Array.from({ length: 12 }).map((_, idx) => ({
  id: `demo-q-open-${idx + 1}`,
  title: `公開質問サンプル ${idx + 1}`,
  description: `公開のサンプル質問です (${idx + 1})。ページネーション検証用。`,
  region: '東京都',
  categories: idx % 2 === 0 ? ['basic-internal'] : ['basic-dermatology'],
  choices: [],

  userId: 'dev-mock-user',
  isPublic: true,
  status: 'matching',
  answerCount: 0,
  createdAt: createTimestamp(9 + idx), // 9日前から古い順
  updatedAt: createTimestamp(9 + idx),
  postedAt: createTimestamp(9 + idx),
}));

const moreAnsweredQuestions = Array.from({ length: 12 }).map((_, idx) => ({
  id: `demo-q-answered-${idx + 1}`,
  title: `回答済みサンプル ${idx + 1}`,
  description: `回答済みのサンプル質問です (${idx + 1})。ページネーション検証用。`,
  region: '大阪府',
  categories: idx % 2 === 0 ? ['basic-orthopedics'] : ['basic-pediatrics'],
  choices: [],

  userId: 'dev-mock-user',
  isPublic: true,
  status: 'answered',
  answerCount: (idx % 3) + 1,
  createdAt: createTimestamp(21 + idx), // 21日前から古い順
  updatedAt: createTimestamp(21 + idx),
  postedAt: createTimestamp(21 + idx),
}));

demoQuestions.push(...moreOpenQuestions, ...moreAnsweredQuestions);

// === Contribution Scenario Questions ===
// 7 Questions: A(3), B(2), C(2)
const scenarioQuestions = [
  ...Array.from({ length: 3 }).map((_, i) => ({ id: `scenario-q-a-${i}`, userId: 'dev-questioner-a' })),
  ...Array.from({ length: 2 }).map((_, i) => ({ id: `scenario-q-b-${i}`, userId: 'dev-questioner-b' })),
  ...Array.from({ length: 2 }).map((_, i) => ({ id: `scenario-q-c-${i}`, userId: 'dev-questioner-c' })),
].map((q, idx) => ({
  ...q,
  title: `Scenario Q ${idx + 1}`,
  description: 'Contribution Check',
  region: '東京都',
  categories: ['basic-internal'],
  choices: [],
  isPublic: true,
  status: 'answered',
  answerCount: 3, // Me + X + Y
  createdAt: createTimestamp(idx + 1), // Recent
  updatedAt: createTimestamp(idx + 1),
  postedAt: createTimestamp(idx + 1),
}));
demoQuestions.push(...scenarioQuestions);

// === Verification Question for Specification Changes ===
const verificationQuestions = [
  {
    id: 'demo-q-public-multicat',
    title: '公開・複数カテゴリの質問サンプル',
    description: 'これは「公開」かつ「複数カテゴリ」を持つ質問の表示検証用データです。カテゴリバッジが正しく表示されるか確認してください。',
    region: '東京都',
    categories: ['basic-internal', 'basic-dermatology', 'basic-pediatrics'],
    choices: [],
    userId: 'dev-questioner-a', // Not me
    isPublic: true,
    status: 'matching',
    answerCount: 0,
    createdAt: createTimestamp(0),
    updatedAt: createTimestamp(0),
    postedAt: createTimestamp(0),
  }
];
demoQuestions.push(...verificationQuestions);

// === Private Questions (Verify A041) ===
const privateQuestions = [
  {
    id: 'demo-q-private-matching',
    title: '非公開：マッチング中（検証用）',
    description: '非公開の質問です。公開の質問一覧には表示されてはいけません。',
    region: '東京都',
    categories: ['basic-internal'],
    choices: [],
    userId: 'dev-questioner-a',
    isPublic: false,
    status: 'matching',
    answerCount: 0,
    createdAt: createTimestamp(0),
    updatedAt: createTimestamp(0),
    postedAt: createTimestamp(0),
  },
  {
    id: 'demo-q-private-answered',
    title: '非公開：回答済み（検証用）',
    description: '非公開ですが回答済みの質問です。これも公開一覧には表示されません。',
    region: '神奈川県',
    categories: ['basic-pediatrics'],
    choices: [],
    userId: 'dev-questioner-b',
    isPublic: false,
    status: 'answered',
    answerCount: 1,
    createdAt: createTimestamp(1),
    updatedAt: createTimestamp(1),
    postedAt: createTimestamp(1),
  }
];
demoQuestions.push(...privateQuestions);

const demoAnswers = [
  ...scenarioQuestions.flatMap(q => [
    { questionId: q.id, userId: 'dev-mock-user', content: 'My Answer', createdAt: Timestamp.now() },
    { questionId: q.id, userId: 'dev-answerer-x', content: 'X Answer', createdAt: Timestamp.now() },
    { questionId: q.id, userId: 'dev-answerer-y', content: 'Y Answer', createdAt: Timestamp.now() },
  ]),
  // dev-q1への回答
  {
    questionId: 'dev-q1',
    userId: 'dev-helper-user',
    content: '食後の散歩や甘い飲料を減らすだけでも改善が見込めます。まずは2週間続けてみてください。',
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
  /*
  {
    questionId: 'dev-q1',
    userId: 'dev-mock-user',
    content: 'ありがとうございます！夕食後の散歩から始めてみます。',
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
  */

  // 新規質問への回答
  {
    questionId: 'demo-q-new-simple',
    userId: 'dev-helper-user',
    content: '薬の効果が感じられなくなったら、すぐに医師に相談することをお勧めします。花粉症の薬は体質や症状によって合う・合わないがあります。2週間使用して改善が見られない場合は変更を検討しましょう。',
    choices: ['すぐ医師に相談する'],
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
  /*
  {
    questionId: 'demo-q-new-simple',
    userId: 'dev-mock-user',
    content: '私も同じ経験があります。病院を変えたら合う薬が見つかりました。セカンドオピニオンも検討してみてください。',
    choices: ['市販薬を試してから相談する'],
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
  */

  // 親質問への回答
  {
    questionId: 'demo-q-parent',
    userId: 'dev-helper-user',
    content: '2歳のお子さんの夜泣きは珍しくありません。まずは寝る前のルーティンを作ることをお勧めします。お風呂→絵本→寝る、といった流れを毎日同じ時間に繰り返すと効果的です。',
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
  /*
  {
    questionId: 'demo-q-parent',
    userId: 'dev-mock-user',
    content: 'うちも同じ経験がありました。部屋の温度調整や寝具の見直しも効果がありましたよ。',
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
  */

  // 追加質問1（子）への回答
  {
    questionId: 'demo-q-child1',
    userId: 'dev-helper-user',
    content: '2週間続けられたのは素晴らしいですね。次は環境調整を試してみましょう。部屋の暗さ、温度（18-22度が理想）、湿度（50-60%）を確認してみてください。また、日中の活動量を増やすことも効果的です。',
  },
  // Private Question Answer
  {
    questionId: 'demo-q-private-answered',
    userId: 'dev-helper-user',
    content: '非公開質問への回答です。ユーザーBさんと私（回答者）しか見えません。',
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

  // マスタ投入 (from seed_masters.js)
  // マスター登録は seed_masters.js に委譲
  await seedMasters(db);

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

  // 既存データ（質問＋回答サブコレクション）のクリーンアップ
  // answersをaddDocで追加しているため、再実行時に重複しないよう親ドキュメントごと削除する
  console.log('Cleaning up existing demo questions and answers...');
  const deletePromises = demoQuestions
    .filter(q => q.id)
    .map(q => db.recursiveDelete(qCol.doc(q.id)));
  await Promise.all(deletePromises);

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
      choices: ans.choices || [],
      answeredAt: ans.createdAt || Timestamp.now(),
      createdAt: ans.createdAt || Timestamp.now(),
      updatedAt: ans.updatedAt || Timestamp.now(),
    });
  }
  console.log('Seeded demo answers:', demoAnswers.length);

  // 確認ログ
  const qSnap = await qCol.limit(5).get();
  console.log('Questions count (sample up to 5):', qSnap.size);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
