'use client';

import { useState, useEffect } from 'react';
import Icon from './Icon';

interface Category {
  id: string;
  name: string;
  group: string;
  description?: string;
  order?: number;
}

interface HierarchicalCategorySelectProps {
  selectedCategories: string[];
  onCategoriesChange: (categories: string[]) => void;
}

export default function HierarchicalCategorySelect({
  selectedCategories,
  onCategoriesChange,
}: HierarchicalCategorySelectProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string>('');
  const [groups, setGroups] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // カテゴリを取得
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/system/categories');
        if (!res.ok) throw new Error('Failed to fetch categories');
        const data = await res.json();
        
        // グループごとにカテゴリをグループ化
        const categoriesList = data.categories || [];
        setCategories(categoriesList);
        
        // ユニークなグループを取得（順序を保つ）
        const groupOrder: Record<string, number> = {
          '基本的な診療科': 1,
          'お悩み・症状別': 2,
          'ライフステージ・属性別': 3,
          '病院選びの「体験」に関するカテゴリ': 4,
        };
        
        const uniqueGroupsSet = new Map<string, string>();
        categoriesList.forEach((c: Category) => {
          uniqueGroupsSet.set(c.group, c.group);
        });
        
        const uniqueGroups = Array.from(uniqueGroupsSet.values())
          .sort((a, b) => (groupOrder[a] || 999) - (groupOrder[b] || 999));
        
        setGroups(uniqueGroups);
        if (uniqueGroups.length > 0) {
          setSelectedGroup(uniqueGroups[0]);
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // 選択されたグループのカテゴリを取得
  const selectedGroupCategories = categories
    .filter((c) => c.group === selectedGroup)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const toggleCategory = (categoryId: string) => {
    const updated = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];
    onCategoriesChange(updated);
  };

  const getSelectedCategoryNames = () => {
    return selectedCategories
      .map((id) => categories.find((c) => c.id === id)?.name)
      .filter(Boolean);
  };

  if (loading) {
    return <div className="text-center py-4 text-gray-500">読み込み中...</div>;
  }

  return (
    <div className="space-y-4">
      {/* グループタブ */}
      <div className="flex flex-wrap gap-2">
        {groups.map((group) => (
          <button
            key={group}
            onClick={() => setSelectedGroup(group)}
            className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedGroup === group
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {group}
          </button>
        ))}
      </div>

      {/* カテゴリチェックボックス */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-white p-4 rounded-lg border border-gray-200">
        {selectedGroupCategories.map((category) => (
          <label
            key={category.id}
            className="flex items-start gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
          >
            <input
              type="checkbox"
              checked={selectedCategories.includes(category.id)}
              onChange={() => toggleCategory(category.id)}
              className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 cursor-pointer accent-blue-600"
            />
            <div className="flex-1">
              <div className="font-medium text-gray-800">{category.name}</div>
              {category.description && (
                <div className="text-xs text-gray-500 mt-0.5">{category.description}</div>
              )}
            </div>
          </label>
        ))}
      </div>

      {/* 選択済みカテゴリ表示 */}
      {selectedCategories.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">選択済みカテゴリ</p>
          <div className="flex flex-wrap gap-2">
            {getSelectedCategoryNames().map((name, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
              >
                {name}
                <button
                  onClick={() => {
                    const categoryId = categories.find((c) => c.name === name)?.id;
                    if (categoryId) toggleCategory(categoryId);
                  }}
                  className="hover:text-blue-900"
                  aria-label="削除"
                >
                  <Icon name="close" size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
