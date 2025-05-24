"use client"

import type React from "react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { toggleSidebar, setActiveItem } from "@/lib/redux/slices/sidebarSlice"
import {
  CalendarMonth,
  Work,
  Description,
  ChevronRight,
  ExpandMore,
} from "@mui/icons-material"
import { usePathname } from "next/navigation";
import SidebarItem from "./sidebar-item";

export default function Sidebar() {
  const dispatch = useAppDispatch()
  const { isExpanded, activeItem } = useAppSelector((state) => state.sidebar)
  const pathname = usePathname()

  const handleToggle = () => {
    dispatch(toggleSidebar())
  }

  const handleItemClick = (item: string) => {
    dispatch(setActiveItem(item))
  }

  // Only include pages that actually exist
  const sidebarItems = [
    { icon: <Work />, text: "Work Orders", path: "/work-orders" },
    { icon: <Description />, text: "Reports", path: "/reports" },
    { icon: <CalendarMonth />, text: "Calendar", path: "/calendar" },
  ]

  return (
    <div className={`h-screen bg-white border-r transition-all duration-300 ${isExpanded ? "w-64" : "w-16"}`}>
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <img src="/images/placeholder.svg?height=40&width=40" alt="LIMS Logo" className="h-10 w-10 rounded-md" />
          {isExpanded && <h1 className="ml-3 text-xl font-semibold">LIMS</h1>}
        </div>
        <button onClick={handleToggle} className="p-1 rounded-full hover:bg-gray-100 text-gray-500">
          {isExpanded ? <ChevronRight /> : <ExpandMore />}
        </button>
      </div>

      <div className="p-3">
        {sidebarItems.map((item, index) => (
          <SidebarItem
            key={index}
            icon={item.icon}
            text={item.text}
            path={item.path}
            isActive={pathname === item.path || activeItem === item.text}
            isExpanded={isExpanded}
            // hasSubItems={item.hasSubItems}
            // subItems={item.subItems}
            onClick={() => handleItemClick(item.text)}
          />
        ))}
      </div>
    </div>
  )
}
