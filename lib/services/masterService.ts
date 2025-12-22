import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';

export interface MasterItem {
    id: string;
    name: string;
    description?: string;
    group?: string;
    order: number;
    type: string;
}

export const masterService = {
    async getMasters(type?: string): Promise<MasterItem[]> {
        if (!db) return [];

        const mastersRef = collection(db, 'masters');
        let q = query(mastersRef);

        if (type) {
            q = query(mastersRef, where('type', '==', type));
        }

        try {
            const snap = await getDocs(q);
            const items = snap.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: data.id || doc.id,
                    name: data.name || data.label || '名称未設定',
                    description: data.description || '',
                    group: data.group || null,
                    order: data.order ?? 0,
                    type: data.type || type || 'unknown',
                } as MasterItem;
            });

            return items.sort((a, b) => a.order - b.order);
        } catch (error) {
            console.error('[masterService] Failed to fetch masters:', error);
            return [];
        }
    },

    async getCategoryMap(): Promise<Record<string, string>> {
        const items = await this.getMasters('category');
        const map: Record<string, string> = {};
        items.forEach(item => {
            map[item.id] = item.name;
        });
        return map;
    }
};
