"use client"

import type React from "react"
import { useState } from "react"
import {
    ChevronRight,
    ExpandMore,
} from "@mui/icons-material"
import Link from "next/link"
import { Collapse } from "@mui/material"

interface SidebarItemProps {
    icon: React.ReactNode
    text: string
    path: string
    isActive: boolean
    isExpanded: boolean
    hasSubItems?: boolean
    subItems?: { text: string; path: string }[]
    onClick: () => void
}

const SidebarItem: React.FC<SidebarItemProps> = ({
    icon,
    text,
    path,
    isActive,
    isExpanded,
    hasSubItems = false,
    subItems = [],
    onClick,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        if (hasSubItems) {
            setIsOpen(!isOpen)
        }
        onClick()
    }

    return (
        <div className="mb-1">
            <Link
                href={path}
                className={`flex items-center p-2 rounded-md ${isActive ? "bg-teal-100 text-teal-600" : "text-gray-800 hover:bg-gray-100"}`}
                onClick={handleClick}
            >
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                        <span className="text-gray-600">{icon}</span>
                        {isExpanded && <span className="ml-3 text-sm">{text}</span>}
                    </div>
                    {isExpanded && hasSubItems && (
                        <span className="text-gray-400">
                            {isOpen ? <ExpandMore fontSize="small" /> : <ChevronRight fontSize="small" />}
                        </span>
                    )}
                </div>
            </Link>

            {hasSubItems && isExpanded && (
                <Collapse in={isOpen}>
                    <div className="ml-8 mt-1">
                        {subItems.map((item, index) => (
                            <Link
                                key={index}
                                href={item.path}
                                className="flex items-center p-1 text-sm text-gray-600 hover:text-teal-600 hover:bg-gray-50 rounded-md"
                            >
                                {item.text}
                            </Link>
                        ))}
                    </div>
                </Collapse>
            )}
        </div>
    )
}

export default SidebarItem;