import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import MainLayout from "@/shared/components/layout/main-layout"

export const metadata: Metadata = {
  title: "LIMS | Laboratory Information Management System",
  description: "Laboratory Information Management System",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  )
}
