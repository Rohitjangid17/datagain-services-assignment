'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Work,
  Report,
  CalendarMonth,
  ChevronRight,
  Close,
} from '@mui/icons-material';
import { closeMainSidebar } from '@/lib/redux/slices/sidebarSlice';

const menuItems = [
  { name: 'Work Orders', icon: <Work />, path: '/work-orders' },
  { name: 'Reports', icon: <Report />, path: '/reports' },
  { name: 'Calendar', icon: <CalendarMonth />, path: '/calendar' },
];

export default function SidebarMain() {
  const isOpen = useSelector((state: RootState) => state.sidebar.isMainSidebarOpen);
  const pathname = usePathname();
  const dispatch = useDispatch();

  return (
    <div className="relative">
      {/* Background Overlay behind Sidebar on Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-300 bg-opacity-50 z-40 lg:hidden"
          onClick={() => dispatch(closeMainSidebar())}
        />
      )}

      <div
        className={`
          fixed top-0 left-0 z-50 bg-white shadow-md h-screen
          transition-all duration-300 ease-in-out overflow-hidden
          ${isOpen ? 'w-60' : 'w-0'}
          lg:static lg:w-60
        `}>
        {/* Close Button (Mobile only) */}
        <div className="lg:hidden flex justify-end p-2">
          <button
            onClick={() => dispatch(closeMainSidebar())}
            className="text-gray-600 hover:text-gray-900"
            aria-label="Close Sidebar">
            <Close />
          </button>
        </div>

        <div className="pt-2 px-2">
          <ul className="space-y-1">
            {menuItems.map(({ name, icon, path }, index) => {
              const isActive = pathname === path;
              return (
                <li key={index}>
                  <Link href={path} className="block">
                    <div
                      className={`
                        flex items-center justify-between px-4 py-2 rounded-md cursor-pointer transition-all
                        ${isActive
                          ? 'bg-[#dcf6f3] text-[#17c2af] font-medium'
                          : 'text-gray-800 hover:bg-gray-100'}
                      `}>
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{icon}</span>
                        <span className="text-sm">{name}</span>
                      </div>
                      <ChevronRight fontSize="small" />
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
