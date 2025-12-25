'use client';



import Link from 'next/link';
import Icon from '@/components/Icon';
import { useRequireAuth } from '@/hooks/useRequireAuth';

export default function SettingsPage() {

  useRequireAuth();



  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-xl font-bold text-gray-800 mb-6 text-center">設定</h1>

        <div className="space-y-3">
          <Link
            href="/terms"
            className="flex items-center gap-4 px-6 py-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-all hover:bg-gray-50 shadow-sm"
          >
            <div className="p-2 bg-gray-50 rounded-full text-primary">
              <Icon name="description" size={24} />
            </div>
            <span className="flex-1 font-bold text-gray-800">利用規約</span>
            <Icon name="arrow_forward_ios" size={16} className="text-gray-300" />
          </Link>
          <Link
            href="/privacy"
            className="flex items-center gap-4 px-6 py-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-all hover:bg-gray-50 shadow-sm"
          >
            <div className="p-2 bg-gray-50 rounded-full text-primary">
              <Icon name="security" size={24} />
            </div>
            <span className="flex-1 font-bold text-gray-800">
              プライバシーポリシー
            </span>
            <Icon name="arrow_forward_ios" size={16} className="text-gray-300" />
          </Link>
          <Link
            href="/profile/withdraw"
            className="flex items-center gap-4 px-6 py-4 bg-white border border-gray-200 rounded-lg hover:border-red-200 transition-all hover:bg-red-50 shadow-sm"
          >
            <div className="p-2 bg-red-50 rounded-full text-red-500">
              <Icon name="logout" size={24} />
            </div>
            <span className="flex-1 font-bold text-red-600">退会</span>
            <Icon name="arrow_forward_ios" size={16} className="text-red-300" />
          </Link>
        </div>


      </div>
    </div>
  );
}

