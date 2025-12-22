import { useState, useEffect } from 'react';
import Icon from '@/components/Icon';

interface AvatarProps {
    src?: string | null;
    alt?: string;
    size?: number | 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
}

export default function Avatar({
    src,
    alt = 'User',
    size = 'md',
    className = ''
}: AvatarProps) {
    const [error, setError] = useState(false);
    const [imgSrc, setImgSrc] = useState<string | null>(src || null);

    useEffect(() => {
        setImgSrc(src || null);
        setError(false);
    }, [src]);

    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-10 h-10',
        lg: 'w-12 h-12',
        xl: 'w-20 h-20',
    };

    const pixelSize = typeof size === 'number' ? `w-[${size}px] h-[${size}px]` : sizeClasses[size];
    // Note: arbitrary values in tailwind like w-[40px] might not work if not JIT/safelisted? 
    // Safer to use style for pixel numbers or predefined classes.
    // Standard sizes: 8(32px), 10(40px), 12(48px), 20(80px).

    const finalSizeClass = typeof size === 'number' ? '' : sizeClasses[size];
    const style = typeof size === 'number' ? { width: size, height: size } : undefined;

    if (!imgSrc || error) {
        return (
            <div
                className={`rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 text-gray-400 ${finalSizeClass} ${className}`}
                style={style}
            >
                <Icon name="person" size={typeof size === 'number' ? size * 0.6 : 24} />
            </div>
        );
    }

    return (
        <img
            src={imgSrc}
            alt={alt}
            className={`rounded-full object-cover border border-gray-200 ${finalSizeClass} ${className}`}
            style={style}
            onError={() => setError(true)}
        />
    );
}
