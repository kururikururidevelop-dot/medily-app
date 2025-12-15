import React from 'react';

interface TemplateOption {
  id: string;
  name: string;
  description?: string;
}

interface TemplateSelectProps {
  value: string;
  onChange: (id: string) => void;
  options?: TemplateOption[];
}

const DEFAULT_OPTIONS: TemplateOption[] = [
  { id: 'none', name: '選択しない' },
  { id: 'simple', name: 'シンプルに相談', description: '短めの本文で相談するテンプレート' },
  { id: 'detail', name: '詳しく相談', description: '症状・期間・経緯などを整理するテンプレート' },
  { id: 'followup', name: '追加相談', description: '前回の相談に続けて状況更新を伝える' },
];

export default function TemplateSelect({ value, onChange, options }: TemplateSelectProps) {
  const list = options && options.length > 0 ? options : DEFAULT_OPTIONS;
  return (
    <div className="space-y-2">
      <select
        value={value || 'none'}
        onChange={(e) => onChange(e.target.value === 'none' ? '' : e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:ring-2 focus:ring-[#2DB596] focus:border-transparent"
      >
        {list.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.name}
          </option>
        ))}
      </select>
      {value && (
        <p className="text-xs text-gray-500">
          {list.find((o) => o.id === value)?.description || 'テンプレートが選択されました'}
        </p>
      )}
    </div>
  );
}
