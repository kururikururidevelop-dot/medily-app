import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export default function Input({ label, error, className = '', ...props }: InputProps) {
    return (
        <div className="w-full">
            {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
            <input
                className={`w-full px-4 py-2 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 
          ${error ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-primary'} 
          transition-colors ${className}`}
                {...props}
            />
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );
}
