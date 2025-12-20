// app/api/system/regions/route.ts
// 地域マスタ取得 API

import { NextResponse } from 'next/server';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function GET() {
    try {
        if (!db) {
            return NextResponse.json(
                { error: 'Firebase is not configured' },
                { status: 500 }
            );
        }
        // マスタコレクションから type='region' を取得し、order順に並べる
        const mastersRef = collection(db, 'masters');
        // NOTE: クライアント側でソートするため、APIでは最低限の条件のみ指定
        // 単純なクエリならインデックス不要で動くことが多いが、複合クエリ（where + orderBy）は
        // インデックスが必要になる。開発環境で手軽に動かすため、whereのみで取得しJSでソートする。

        const q = query(mastersRef, where('type', '==', 'region'));
        const snapshot = await getDocs(q);

        const regions = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id.replace('region-', ''), // IDプレフィックスを除去（必要に応じて）
                name: data.name,
                group: data.group,
                order: data.order || 999,
                adjacentRegions: data.adjacentRegions || [],
            };
        });

        // order順にソート
        regions.sort((a, b) => a.order - b.order);

        return NextResponse.json({ regions });

    } catch (error) {
        console.error('Get regions error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch regions' },
            { status: 500 }
        );
    }
}
