import React from 'react';
import Icon from '@/components/Icon';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'default' | 'success' | 'warning' | 'danger' | 'neutral' | 'outline' | 'primary';
    icon?: string;
    className?: string;
}

export default function Badge({ children, variant = 'default', icon, className = '' }: BadgeProps) {
    const baseStyles = 'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap';

    const variants = {
        default: 'bg-gray-100 text-gray-700',
        primary: 'bg-primary-ultralight text-primary',
        success: 'bg-emerald-100 text-emerald-700', // for Answered
        warning: 'bg-amber-100 text-amber-700', // for Open
        danger: 'bg-red-100 text-red-700',
        neutral: 'bg-gray-100 text-gray-600', // for Closed
        outline: 'bg-transparent border border-gray-200 text-gray-600',
    };

    return (
        <span className={`${baseStyles} ${variants[variant]} ${className}`}>
            {icon && <Icon name={icon} size={14} />}
            {children}
        </span>
    );
}
