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

const statuses = [
    { id: 'matching', type: 'status', name: 'マッチング中', order: 1 },
    { id: 'waiting_for_answer', type: 'status', name: '回答待ち', order: 2 },
    { id: 'answered', type: 'status', name: '回答済み', order: 3 },
    { id: 'matching_failed', type: 'status', name: 'マッチング失敗', order: 4 },
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

const adjacencyMap = {
    '北海道': ['青森県'],
    '青森県': ['北海道', '岩手県', '秋田県'],
    '岩手県': ['青森県', '宮城県', '秋田県'],
    '宮城県': ['岩手県', '秋田県', '山形県', '福島県'],
    '秋田県': ['青森県', '岩手県', '宮城県', '山形県'],
    '山形県': ['宮城県', '秋田県', '福島県', '新潟県'],
    '福島県': ['宮城県', '山形県', '茨城県', '栃木県', '群馬県', '新潟県'],
    '茨城県': ['福島県', '栃木県', '埼玉県', '千葉県'],
    '栃木県': ['福島県', '茨城県', '群馬県', '埼玉県'],
    '群馬県': ['福島県', '栃木県', '埼玉県', '新潟県', '長野県'],
    '埼玉県': ['茨城県', '栃木県', '群馬県', '千葉県', '東京都', '山梨県', '長野県'],
    '千葉県': ['茨城県', '埼玉県', '東京都', '神奈川県'],
    '東京都': ['埼玉県', '千葉県', '神奈川県', '山梨県'],
    '神奈川県': ['千葉県', '東京都', '山梨県', '静岡県'],
    '新潟県': ['山形県', '福島県', '群馬県', '富山県', '長野県'],
    '富山県': ['新潟県', '石川県', '長野県', '岐阜県'],
    '石川県': ['富山県', '福井県', '岐阜県'],
    '福井県': ['石川県', '岐阜県', '滋賀県', '京都府'],
    '山梨県': ['埼玉県', '東京都', '神奈川県', '長野県', '静岡県'],
    '長野県': ['群馬県', '埼玉県', '新潟県', '富山県', '山梨県', '岐阜県', '静岡県', '愛知県'],
    '岐阜県': ['富山県', '石川県', '福井県', '長野県', '愛知県', '三重県', '滋賀県'],
    '静岡県': ['神奈川県', '山梨県', '長野県', '愛知県'],
    '愛知県': ['長野県', '岐阜県', '静岡県', '三重県'],
    '三重県': ['岐阜県', '愛知県', '滋賀県', '京都府', '奈良県', '和歌山県'],
    '滋賀県': ['福井県', '岐阜県', '三重県', '京都府'],
    '京都府': ['福井県', '三重県', '滋賀県', '大阪府', '兵庫県', '奈良県'],
    '大阪府': ['京都府', '兵庫県', '奈良県', '和歌山県'],
    '兵庫県': ['京都府', '大阪府', '鳥取県', '岡山県', '徳島県'],
    '奈良県': ['三重県', '京都府', '大阪府', '和歌山県'],
    '和歌山県': ['三重県', '大阪府', '奈良県', '徳島県'],
    '鳥取県': ['兵庫県', '島根県', '岡山県', '広島県'],
    '島根県': ['鳥取県', '広島県', '山口県'],
    '岡山県': ['兵庫県', '鳥取県', '広島県', '香川県'],
    '広島県': ['鳥取県', '島根県', '岡山県', '山口県', '愛媛県'],
    '山口県': ['島根県', '広島県', '愛媛県', '福岡県', '大分県'],
    '徳島県': ['兵庫県', '和歌山県', '香川県', '愛媛県', '高知県'],
    '香川県': ['岡山県', '徳島県', '愛媛県'],
    '愛媛県': ['広島県', '山口県', '徳島県', '香川県', '高知県', '大分県'],
    '高知県': ['徳島県', '愛媛県'],
    '福岡県': ['山口県', '佐賀県', '熊本県', '大分県'],
    '佐賀県': ['福岡県', '長崎県'],
    '長崎県': ['佐賀県', '熊本県'],
    '熊本県': ['福岡県', '長崎県', '大分県', '宮崎県', '鹿児島県'],
    '大分県': ['山口県', '愛媛県', '福岡県', '熊本県', '宮崎県'],
    '宮崎県': ['熊本県', '大分県', '鹿児島県'],
    '鹿児島県': ['熊本県', '宮崎県', '沖縄県'],
    '沖縄県': ['鹿児島県'],
};

const regions = regionGroups.flatMap((g, groupIndex) =>
    g.prefectures.map((pref, prefIndex) => ({
        id: pref,
        type: 'region',
        name: pref,
        group: g.group,
        order: groupIndex * 100 + prefIndex,
        adjacentRegions: adjacencyMap[pref] || [],
    }))
);

async function seedMasters(db) {
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

    // Cleanup obsolete masters
    const obsoleteIds = ['status-all', 'status-open'];
    obsoleteIds.forEach(id => {
        masterBatch.delete(masterCol.doc(id));
    });

    await masterBatch.commit();
    console.log('Seeded masters:', categories.length + statuses.length + regions.length);
}

if (require.main === module) {
    const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'medily-dev';
    console.log('Project ID:', projectId);

    if (process.env.FIRESTORE_EMULATOR_HOST) {
        console.log('Firestore Emulator Host:', process.env.FIRESTORE_EMULATOR_HOST);
    }

    initializeApp({ projectId });
    const db = getFirestore();

    seedMasters(db)
        .then(() => {
            console.log('Done.');
            process.exit(0);
        })
        .catch((e) => {
            console.error(e);
            process.exit(1);
        });
}

module.exports = { seedMasters };
