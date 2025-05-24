"use client"

import type React from "react"
import { Provider } from "react-redux"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { store } from "@/lib/redux/store"
import Sidebar from "../sidebar/sidebar"

const theme = createTheme({
    palette: {
        primary: {
            main: "#00BFA6",
        },
        secondary: {
            main: "#FF5722",
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
})

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            {/* <ThemeProvider theme={theme}> */}
                <div className="flex h-screen bg-gray-50">
                    <Sidebar />
                    <main className="flex-1 overflow-auto">{children}</main>
                </div>
            {/* </ThemeProvider> */}
        </Provider>
    )
}
