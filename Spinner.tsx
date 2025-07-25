
import React from 'react';

interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    color?: string;
    text?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'md', color = 'border-violet-400', text }) => {
    const sizeClasses = {
        sm: 'w-6 h-6',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-2">
            <div className={`animate-spin rounded-full ${sizeClasses[size]} border-t-2 border-b-2 ${color}`}></div>
            {text && <p className="text-violet-300">{text}</p>}
        </div>
    );
};

export default Spinner;
