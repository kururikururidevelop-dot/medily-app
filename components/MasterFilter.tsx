'use client';

import { useEffect, useMemo, useState, useId } from 'react';
import Icon from './Icon';

interface MasterOption {
  id: string;
  name: string;
  description?: string;
  group?: string;
  order?: number;
}

interface MasterFilterProps {
  title: string;
  masterType: string; // 例: category, status, region
  multiple?: boolean; // true: 複数選択, false: 単一選択
  required?: boolean; // true: トグル固定ON
  grouped?: boolean; // true: groupをタブで切り替え
  fetchUrl?: string; // APIエンドポイント (省略時は masterType に応じたデフォルト)
  options?: MasterOption[]; // 事前に渡されたマスタ
  value: string[]; // 選択中のIDリスト（単一選択でも配列）
  onChange: (ids: string[]) => void;
  showToggle?: boolean; // トグル表示有無
}

const DEFAULT_URL: Record<string, string> = {
  category: '/api/system/masters?type=category',
  status: '/api/system/masters?type=status',
  region: '/api/system/masters?type=region',
};

// 簡易キャッシュ：同一 masterType の再マウント時のちらつきを抑制
const masterCache: Record<string, MasterOption[]> = {};

export default function MasterFilter({
  title,
  masterType,
  multiple = true,
  required = false,
  grouped = false,
  fetchUrl,
  options,
  value,
  onChange,
  showToggle = true,
}: MasterFilterProps) {
  const [items, setItems] = useState<MasterOption[]>(options ?? []);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(required || !showToggle || value.length > 0);
  const [selectedGroup, setSelectedGroup] = useState<string>('');
  const toggleId = useId();

  // マスタ取得（options が無ければフェッチ）
  useEffect(() => {
    if (options && options.length > 0) return;
    const url = fetchUrl || DEFAULT_URL[masterType];
    if (!url) return;

    const load = async () => {
      const cached = masterCache[masterType];
      if (cached && cached.length > 0) {
        setItems(cached);
      } else {
        setLoading(true);
      }
      try {
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch master');
        const data = await res.json();
        const fetched = data.categories || data.items || [];
        setItems(fetched);
        masterCache[masterType] = fetched;
      } catch (err) {
        console.error('[MasterFilter] fetch error', err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [fetchUrl, masterType, options]);

  // グループリスト
  const groups = useMemo(() => {
    if (!grouped) return [] as string[];

    const groupOrder = new Map<string, number>();
    items.forEach((i) => {
      if (!i.group) return;
      const current = groupOrder.get(i.group);
      const candidate = typeof i.order === 'number' ? i.order : Number.MAX_SAFE_INTEGER;
      if (current === undefined || candidate < current) {
        groupOrder.set(i.group, candidate);
      }
    });

    const names = Array.from(groupOrder.keys());
    return names.sort((a, b) => {
      const orderA = groupOrder.get(a) ?? Number.MAX_SAFE_INTEGER;
      const orderB = groupOrder.get(b) ?? Number.MAX_SAFE_INTEGER;
      if (orderA !== orderB) return orderA - orderB;
      return a.localeCompare(b);
    });
  }, [grouped, items]);

  // グループの初期選択と不整合補正
  useEffect(() => {
    if (!grouped) return;
    if (groups.length === 0) return;
    if (!selectedGroup || !groups.includes(selectedGroup)) {
      setSelectedGroup(groups[0]);
    }
  }, [grouped, groups, selectedGroup]);

  const filteredItems = useMemo(() => {
    const sorted = [...items].sort((a, b) => (a.order || 0) - (b.order || 0));
    if (!grouped || !selectedGroup) return sorted;
    return sorted.filter((i) => i.group === selectedGroup);
  }, [grouped, items, selectedGroup]);

  // 初回グループ選択（既存選択のグループを優先）
  useEffect(() => {
    if (!grouped) return;
    if (groups.length === 0) return;
    const firstSelected = value.find((v) => items.find((i) => i.id === v));

    // 既存選択がある場合は初回だけそのグループを選択する。
    if (!selectedGroup) {
      if (firstSelected) {
        const item = items.find((i) => i.id === firstSelected);
        if (item?.group) {
          setSelectedGroup(item.group);
          return;
        }
      }
      setSelectedGroup(groups[0]);
      return;
    }

    // 既存の選択グループがリストに無ければ補正する。
    if (!groups.includes(selectedGroup)) {
      if (firstSelected) {
        const item = items.find((i) => i.id === firstSelected);
        if (item?.group && groups.includes(item.group)) {
          setSelectedGroup(item.group);
          return;
        }
      }
      setSelectedGroup(groups[0]);
    }
  }, [grouped, groups, items, selectedGroup, value]);

  const toggleActive = () => {
    if (required) return;
    const next = !active;
    setActive(next);
    if (!next) {
      onChange([]);
    }
  };

  const toggleValue = (id: string) => {
    if (!multiple) {
      if (value[0] === id) {
        onChange([]);
      } else {
        onChange([id]);
      }
      return;
    }
    const exists = value.includes(id);
    onChange(exists ? value.filter((v) => v !== id) : [...value, id]);
  };

  const showList = showToggle ? active || required : true;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        {showToggle ? (
          <label htmlFor={toggleId} className="flex items-center gap-2 cursor-pointer select-none">
            <input
              id={toggleId}
              type="checkbox"
              checked={active}
              disabled={required}
              onChange={toggleActive}
              className="w-4 h-4 border-gray-300 text-blue-600 rounded"
            />
            <span className="text-sm font-semibold text-gray-800">
              {title}
              {required && <span className="ml-1 text-red-500 text-xs">必須</span>}
            </span>
          </label>
        ) : (
          <span className="text-sm font-semibold text-gray-800">
            {title}
            {required && <span className="ml-1 text-red-500 text-xs">必須</span>}
          </span>
        )}
      </div>

      {showList && (
        <div className="space-y-3">
          {grouped && groups.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {groups.map((g) => (
                <button
                  key={g}
                  onClick={() => setSelectedGroup(g)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors ${
                    selectedGroup === g
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {filteredItems.map((item) => {
              const checked = value.includes(item.id);
              const inputType = multiple ? 'checkbox' : 'radio';
              return (
                <label
                  key={item.id}
                  className="flex items-start gap-3 p-2 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer"
                >
                  <input
                    type={inputType}
                    checked={checked}
                    onChange={() => toggleValue(item.id)}
                    className={`mt-1 ${multiple ? 'w-5 h-5' : 'w-4 h-4'} text-blue-600 border-gray-300 rounded`}
                  />
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-800 flex items-center gap-1">
                      {item.name}
                    </div>
                    {item.description && <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>}
                  </div>
                </label>
              );
            })}

            {loading && items.length === 0 && (
              <div className="col-span-2 text-sm text-gray-500">読み込み中...</div>
            )}
          </div>

          {value.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {value.map((id) => {
                const item = items.find((i) => i.id === id);
                if (!item) return null;
                return (
                  <span
                    key={id}
                    className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold"
                  >
                    {item.name}
                    <button
                      type="button"
                      onClick={() => toggleValue(id)}
                      className="hover:text-blue-900"
                      aria-label="remove"
                    >
                      <Icon name="close" size={14} />
                    </button>
                  </span>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
