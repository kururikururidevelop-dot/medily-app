import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    hoverable?: boolean;
}

export default function Card({ children, className = '', onClick, hoverable = false }: CardProps) {
    const baseStyles = 'bg-white rounded-lg border border-gray-200 shadow-sm transition-all duration-200';
    const hoverStyles = hoverable || onClick ? 'hover:shadow-md hover:border-primary/30 cursor-pointer' : '';

    return (
        <div
            className={`${baseStyles} ${hoverStyles} ${className}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
}
