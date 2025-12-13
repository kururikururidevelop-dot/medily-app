// app/api/system/categories/route.ts
// カテゴリ取得 API

import { NextResponse } from 'next/server';
import { collection, query, where, getDocs } from 'firebase/firestore';
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

    const categories = categoriesSnap.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

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
