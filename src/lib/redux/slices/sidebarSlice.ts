import { createSlice } from '@reduxjs/toolkit';

interface SidebarState {
    isMainSidebarOpen: boolean;
    showOverlay: boolean;
}

const initialState: SidebarState = {
    isMainSidebarOpen: true,
    showOverlay: false,
};

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        toggleMainSidebar: (state) => {
            state.isMainSidebarOpen = !state.isMainSidebarOpen;
            if (typeof window !== 'undefined' && window.innerWidth < 991) {
                state.showOverlay = state.isMainSidebarOpen;
            }
        },
        openMainSidebar: (state) => {
            state.isMainSidebarOpen = true;
            if (typeof window !== 'undefined' && window.innerWidth < 991) {
                state.showOverlay = true;
            }
        },
        closeMainSidebar: (state) => {
            state.isMainSidebarOpen = false;
            state.showOverlay = false;
        },
    },
});

export const { toggleMainSidebar, openMainSidebar, closeMainSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
