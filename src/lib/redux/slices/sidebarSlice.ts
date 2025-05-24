import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface SidebarState {
    isExpanded: boolean
    activeItem: string | null
}

const initialState: SidebarState = {
    isExpanded: true,
    activeItem: null,
}

const sidebarSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.isExpanded = !state.isExpanded
        },
        setActiveItem: (state, action: PayloadAction<string | null>) => {
            state.activeItem = action.payload
        },
    },
})

export const { toggleSidebar, setActiveItem } = sidebarSlice.actions
export default sidebarSlice.reducer
