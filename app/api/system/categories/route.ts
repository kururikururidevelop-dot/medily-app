// app/api/system/categories/route.ts
// カテゴリ取得 API

import { NextResponse } from 'next/server';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function GET() {
  try {
    if (!db) {
      return NextResponse.json(
        { error: 'Firebase is not configured' },
        { status: 500 }
      );
    }
    // カテゴリコレクションからすべてのカテゴリを取得
    const categoriesRef = collection(db, 'categories');
    const categoriesSnap = await getDocs(categoriesRef);

    const categories = categoriesSnap.docs.map(doc => {
      const data = doc.data() as any;
      const label = data.label || data.name || '未分類';
      const group = data.group || 'その他';
      const icon = data.icon || iconForGroupOrLabel(group, label);
      return {
        id: doc.id,
        name: label,
        icon,
        group,
        description: data.description || '',
        order: data.order || 999,
      };
    });

    return NextResponse.json({ categories });
  } catch (error) {
    console.error('Get categories error:', error);

    // デフォルトカテゴリ（Firestore にまだ存在しない場合）
    const defaultCategories = [
      { id: 'medical', name: '医療相談', icon: 'local_hospital' },
      { id: 'health', name: '健康管理', icon: 'favorite' },
      { id: 'mental', name: 'メンタルヘルス', icon: 'psychology' },
      { id: 'nutrition', name: '栄養・食事', icon: 'restaurant' },
      { id: 'fitness', name: 'フィットネス', icon: 'fitness_center' },
      { id: 'other', name: 'その他', icon: 'help' },
    ];

    return NextResponse.json({ categories: defaultCategories });
  }
}

function iconForGroupOrLabel(group: string, label: string): string {
  const map: Record<string, string> = {
    '基本的な診療科': 'medical_services',
    'お悩み・症状別': 'psychology',
    'ライフステージ・属性別': 'groups',
    '病院選びの体験': 'reviews',
    '内科一般': 'healing',
    '小児科': 'child_care',
    '皮膚科': 'spa',
    '眼科': 'visibility',
    '歯科・矯正歯科': 'dentistry',
    '耳鼻咽喉科': 'hearing',
    '整形外科': 'accessibility',
    '産婦人科': 'pregnant_woman',
    'メンタルヘルス': 'psychology',
    '胃腸・消化器': 'restaurant',
    'アレルギー・免疫': 'healing',
    'リハビリ・介護': 'elderly',
    'ダイエット・栄養': 'nutrition',
    '検査・人間ドック': 'analytics',
    '子育て・乳幼児': 'family_restroom',
    '女性特有の悩み': 'female',
    '高齢者の健康': 'elderly',
    '闘病・長期療養': 'health_and_safety',
    '通いやすさ・設備': 'map',
    '接遇・対応': 'sentiment_satisfied',
    '費用・保険': 'savings',
    'セカンドオピニオン': 'switch_access_shortcut',
  };
  return map[label] || map[group] || 'category';
}
