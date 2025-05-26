'use client';

import React, { useEffect, useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store, RootState } from '@/lib/redux/store';
import { closeMainSidebar, openMainSidebar } from '@/lib/redux/slices/sidebarSlice';
import SidebarIconBar from '../sidebar/sidebar-icon-bar';
import SidebarMain from '../sidebar/sidebar';

function InnerLayout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const isMainSidebarOpen = useSelector((state: RootState) => state.sidebar.isMainSidebarOpen);
  const [hasMounted, setHasMounted] = useState(false);

  // Run only on client mount
  useEffect(() => {
    setHasMounted(true);

    const handleResize = () => {
      if (window.innerWidth < 991) {
        dispatch(closeMainSidebar());
      } else {
        dispatch(openMainSidebar());
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch]);

  if (!hasMounted) return null;

  return (
    <div className="relative">
      {isMainSidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-300 bg-opacity-50 z-40 lg:hidden"
          onClick={() => dispatch(closeMainSidebar())}
        />
      )}

      <div className="flex relative z-50">
        {/* Sidebar Icon Bar */}
        <SidebarIconBar />
        {/* Main Sidebar */}
        <SidebarMain />
        {/* Content Area */}
        <main className="flex-1 p-6 ml-16 sm:ml-0 bg-gray-50 overflow-auto h-screen">{children}</main>
      </div>
    </div>
  );
}

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <InnerLayout>{children}</InnerLayout>
    </Provider>
  );
}
