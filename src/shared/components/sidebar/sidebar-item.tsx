'use client';

import Link from 'next/link';
import { ChevronRight } from '@mui/icons-material';
import React from 'react';
import clsx from 'clsx';
import { SidebarItemProps } from '@/shared/interfaces/common.type';

const SidebarItem: React.FC<SidebarItemProps> = ({
    icon,
    label,
    path,
    isActive = false,
    isExpanded = true,
    onClick,
    showChevron = false,
}) => {
    const content = (
        <div
            className={clsx(
                'flex items-center justify-between px-4 py-2 rounded-md cursor-pointer transition-all w-full',
                {
                    'bg-[#dcf6f3] text-[#17c2af] font-medium': isActive,
                    'text-gray-800 hover:bg-gray-100': !isActive,
                }
            )}
            onClick={onClick}
        >
            <div className="flex items-center gap-3">
                <span className="text-xl">{icon}</span>
                {isExpanded && <span className="text-sm">{label}</span>}
            </div>
            {showChevron && isExpanded && <ChevronRight fontSize="small" />}
        </div>
    );

    return path ? <Link href={path}>{content}</Link> : content;
};

export default SidebarItem;
