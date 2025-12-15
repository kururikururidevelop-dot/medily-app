import { NextResponse } from 'next/server';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function GET(request: Request) {
  try {
    if (!db) {
      return NextResponse.json({ error: 'Firebase is not configured' }, { status: 500 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    const mastersRef = collection(db, 'masters');
    const q = type ? query(mastersRef, where('type', '==', type), orderBy('order', 'asc')) : query(mastersRef, orderBy('order', 'asc'));
    const snap = await getDocs(q);

    const items = snap.docs.map((doc) => {
      const data = doc.data() as any;
      return {
        id: doc.id,
        name: data.name || data.label || '名称未設定',
        description: data.description || '',
        group: data.group || null,
        order: data.order ?? 0,
        type: data.type || type || 'unknown',
      };
    });

    return NextResponse.json({ items });
  } catch (error) {
    console.error('[masters API] failed:', error);
    return NextResponse.json({ error: 'Failed to fetch masters' }, { status: 500 });
  }
}
