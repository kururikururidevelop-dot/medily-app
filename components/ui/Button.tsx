import React from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    icon?: string;
    iconPosition?: 'left' | 'right';
    isLoading?: boolean;
    href?: string;
    target?: string;
}

export default function Button({
    children,
    className = '',
    variant = 'primary',
    size = 'md',
    icon,
    iconPosition = 'left',
    isLoading = false,
    disabled,
    href,
    target,
    ...props
}: ButtonProps) {
    const baseStyles = 'inline-flex items-center justify-center font-bold transition-all duration-200 rounded-lg focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-primary text-white hover:bg-primary-dark shadow-sm hover:shadow active:scale-95',
        secondary: 'bg-primary-ultralight text-primary hover:bg-primary/20',
        outline: 'bg-transparent border-2 border-primary text-primary hover:bg-primary-ultralight',
        ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900',
        danger: 'bg-red-50 text-red-600 hover:bg-red-100 border border-transparent hover:border-red-200',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-xs gap-1.5',
        md: 'px-4 py-2 text-sm gap-2',
        lg: 'px-6 py-3 text-base gap-2.5',
        xl: 'px-8 py-4 text-lg gap-3',
    };

    const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;
    const content = (
        <>
            {isLoading && <span className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />}
            {!isLoading && icon && iconPosition === 'left' && <Icon name={icon} size={size === 'sm' ? 16 : size === 'xl' ? 24 : 20} />}
            <span>{children}</span>
            {!isLoading && icon && iconPosition === 'right' && <Icon name={icon} size={size === 'sm' ? 16 : size === 'xl' ? 24 : 20} />}
        </>
    );

    if (href) {
        return (
            <Link href={href} className={classes} target={target}>
                {content}
            </Link>
        );
    }

    return (
        <button
            className={classes}
            disabled={isLoading || disabled}
            {...props}
        >
            {content}
        </button>
    );
}
