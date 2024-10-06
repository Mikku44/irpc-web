import React from 'react';

interface BadgeProps {
    text?: string;
    className?: string;
    status?: string; // You can further specify this type if needed
}

const type : any = {
    "very":"bg-[--primary-50] text-[--primary] border-[--primary]",
    "good":"bg-[--success-50] text-[--success] border-[--success]",
    "medium":"bg-[--yellow-50] text-[--yellow] border-[--yellow]",
    "effect":"bg-[--orange-50] text-[--orange] border-[--orange]",
    "effected":"bg-[--error-50] text-[--error] border-[--error]",
}

const Badge: React.FC<BadgeProps> = ({ text = '', className = '', status }) => {
    return (
        <div
            className={`rounded-full px-3 h-6 text-[12px] border border-1 flex items-center justify-center ${status && type[status]} ${className} `}
        >
            {text}
        </div>
    );
};

export default Badge;


