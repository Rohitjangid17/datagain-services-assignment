'use client';

import { useDispatch } from 'react-redux';
import { toggleMainSidebar } from '@/lib/redux/slices/sidebarSlice';
import { useState } from 'react';
import { Home, Payment, PowerSettingsNew, Face, CalendarMonth, ListAlt, Report, History, Work, } from '@mui/icons-material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SidebarItem from './sidebar-item';

const sidebarItems = [
    { icon: <Home />, label: 'Dashboard' },
    { icon: <Face />, label: 'Face Recognition' },
    { icon: <CalendarMonth />, label: 'Daily Visit' },
    { icon: <Payment />, label: 'Donate' },
    { icon: <Work />, label: 'Work Orders' },
    { icon: <Report />, label: 'Reports' },
    { icon: <History />, label: 'Report History' },
    { icon: <ListAlt />, label: 'Test History' },
    { icon: <PowerSettingsNew />, label: 'Logout' },
];

const SidebarIconBar = () => {
    const dispatch = useDispatch();
    const [isExpanded, setIsExpanded] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const handleClick = (index: number) => {
        setActiveIndex(index);
        dispatch(toggleMainSidebar());
    };

    return (
        <div
            className={`
        fixed top-0 left-0 z-50 bg-white shadow-md h-screen
        transition-all duration-300 flex flex-col
        ${isExpanded ? 'w-48' : 'w-16'} lg:static
      `}>
            {/* Toggle Button */}
            <div className="flex items-center justify-between px-3 py-4 border-b">
                <button onClick={() => setIsExpanded(!isExpanded)} className="text-gray-400">
                    {isExpanded ? <ArrowBackIcon /> : <ArrowForwardIcon />}
                </button>
                {isExpanded && <span className="font-semibold text-sm">Menu</span>}
            </div>

            {/* Sidebar Items */}
            <div className="flex-1 flex flex-col items-start space-y-2 mt-4">
                {sidebarItems.map(({ icon, label }, index) => (
                    <SidebarItem
                        key={index}
                        icon={icon}
                        label={label}
                        isActive={activeIndex === index}
                        isExpanded={isExpanded}
                        onClick={() => handleClick(index)}
                    />
                ))}
            </div>

        </div>
    );
}

export default SidebarIconBar;