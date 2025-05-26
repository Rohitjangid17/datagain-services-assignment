"use client"

import type React from "react"
import { useState } from "react"
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks"
import { addEvent, updateEvent, deleteEvent, setSelectedDate } from "@/lib/redux/slices/calendarSlice"
import {
    Button,
    TextField,
    MenuItem,
    Typography,
    Paper,
    IconButton,
    Menu,
    Divider,
} from "@mui/material"
import {
    Add as AddIcon,
    ChevronLeft,
    ChevronRight,
    Print as PrintIcon,
    FileDownload as FileDownloadIcon,
    Delete as DeleteIcon,
} from "@mui/icons-material"
import PageTitle from "@/shared/components/page-title"
import { CalendarEvent } from "@/shared/interfaces/common.type"
import EventDialog from "@/shared/models/event-dialog"
import {
    generateId,
    getDaysInMonth,
    getDayOfWeek,
    formatDate,
} from "@/lib/utils/calendar-helpers"

const CalendarPage = () => {
    const dispatch = useAppDispatch()
    const { events } = useAppSelector((state) => state.calendar)

    const [currentDate, setCurrentDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [eventType, setEventType] = useState<"event" | "reminder">("event")
    const [currentEvent, setCurrentEvent] = useState<CalendarEvent | null>(null)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [addMenuAnchorEl, setAddMenuAnchorEl] = useState<null | HTMLElement>(null)
    const [selectedDay, setSelectedDay] = useState<string | null>(null)

    const [formData, setFormData] = useState({
        title: "",
        date: "",
        type: "event" as "event" | "reminder",
        color: "blue",
    })

    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const daysInMonth = getDaysInMonth(year, month)
    const firstDayOfWeek = getDayOfWeek(year, month, 1)

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]

    // handle the calendar previous month
    const handlePrevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1))
    }

    // handle the calendar next month
    const handleNextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1))
    }

    // handle the add event and reminder
    const handleAddClick = (event: React.MouseEvent<HTMLElement>, day: number) => {
        const dateString = formatDate(year, month, day)
        setSelectedDay(dateString)
        setAddMenuAnchorEl(event.currentTarget)
    }

    // handle add menu close
    const handleAddMenuClose = () => setAddMenuAnchorEl(null)

    // handle add event and reminder
    const handleAddEvent = (type: "event" | "reminder") => {
        setEventType(type)
        setCurrentEvent(null)
        setFormData({
            title: "",
            date: selectedDay || "",
            type,
            color: type === "event" ? "blue" : "orange",
        })
        setOpen(true)
        handleAddMenuClose()
    }

    // handle close dialog
    const handleClose = () => setOpen(false)

    // add event and remonder
    const addEventReminder = () => {
        if (currentEvent) {
            dispatch(updateEvent({ ...currentEvent, ...formData }))
        } else {
            dispatch(addEvent({ id: generateId(), ...formData }))
        }
        setOpen(false)
    }

    // event reminder action
    const handleEventClick = (event: CalendarEvent, e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        setCurrentEvent(event)
        setFormData({
            title: event.title,
            date: event.date,
            type: event.type,
            color: event.color,
        })
        setAnchorEl(e.currentTarget)
    }

    // handle menu close
    const handleMenuClose = () => setAnchorEl(null)

    // update event
    const eventUpdate = () => {
        setOpen(true)
        handleMenuClose()
    }

    // event delete
    const eventDelete = () => {
        if (currentEvent) {
            dispatch(deleteEvent(currentEvent.id))
        }
        handleMenuClose()
    }

    // calendar rows generate
    const generateCalendarRows = () => {
        const rows = []
        let currentRow = []

        for (let i = 0; i < firstDayOfWeek; i++) {
            currentRow.push(<td key={`empty-${i}`} className="border p-1 h-24 align-top"></td>)
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dateString = formatDate(year, month, day)
            const dayEvents = events.filter((event) => event.date === dateString)

            currentRow.push(
                <td key={day} className="border p-1 h-24 align-top">
                    <div className="flex justify-between items-center">
                        <IconButton size="small" onClick={(e) => handleAddClick(e, day)}>
                            <AddIcon fontSize="small" />
                        </IconButton>
                        <span className="text-sm text-gray-400 font-semibold">{day}</span>
                    </div>
                    <div className="mt-1">
                        {dayEvents.map((event) => (
                            <div
                                key={event.id}
                                className={`text-xs p-1 mb-1 rounded cursor-pointer ${event.color === "blue"
                                    ? "bg-blue-500 text-white"
                                    : event.color === "orange"
                                        ? "bg-orange-500 text-white"
                                        : "bg-gray-800 text-white"
                                    }`}
                                onClick={(e) => handleEventClick(event, e)}>
                                {event.title}
                            </div>
                        ))}
                    </div>
                </td>
            )

            if (currentRow.length === 7) {
                rows.push(<tr key={`row-${Math.floor((day + firstDayOfWeek - 1) / 7)}`}>{currentRow}</tr>)
                currentRow = []
            }
        }

        while (currentRow.length > 0 && currentRow.length < 7) {
            currentRow.push(<td key={`empty-end-${currentRow.length}`} className="border p-1 h-24 align-top"></td>)
        }

        if (currentRow.length > 0) {
            rows.push(<tr key="last-row">{currentRow}</tr>)
        }

        return rows
    }

    return (
        <>
            <PageTitle title="Calendar" />

            <div className="bg-transparent sm:bg-[#e5e5e5] rounded-full px-6 py-4 w-full shadow-none sm:shadow-sm">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    {/* Heading */}
                    <Typography variant="h6" className="text-black font-semibold text-left">
                        Add new schedule(s) :
                    </Typography>

                    {/* Controls */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                        <TextField
                            select
                            label="Select Months"
                            size="small"
                            defaultValue=""
                            className="w-full sm:w-64 !bg-white !rounded-full"
                            InputProps={{ className: "!rounded-full !bg-white" }}
                            InputLabelProps={{ className: "!text-gray-600" }}
                        >
                            <MenuItem value="">All Months</MenuItem>
                            {monthNames.map((name, index) => (
                                <MenuItem key={index} value={index}>
                                    {name}
                                </MenuItem>
                            ))}
                        </TextField>

                        <Button
                            variant="contained"
                            className="!bg-[#17c2af] !rounded-full !text-white !font-bold !text-sm !px-6 !py-2.5 !shadow-none w-full sm:w-auto"
                        >
                            SCHEDULE
                        </Button>

                        <Button
                            variant="outlined"
                            className="!bg-[#f4f6f5] !rounded-full !text-black !font-bold !border-2 !border-black !text-sm !px-6 !py-2.5 !shadow-none w-full sm:w-auto"
                        >
                            RESET
                        </Button>
                    </div>
                </div>
            </div>

            <Divider className="!my-4" />

            <div className="flex gap-2 mb-6">
                <Button
                    variant="contained"
                    className="!bg-[#17c2af] !rounded-full !text-white !font-bold !text-sm !px-2 lg:!px-6 !py-3 !shadow-none"
                    startIcon={<AddIcon />}
                >
                    <span className="hidden lg:inline">Replenish</span>
                </Button>
                <Button
                    variant="contained"
                    className="!bg-[#17c2af] !rounded-full !text-white !font-bold !text-sm !px-2 lg:!px-6 !py-3 !shadow-none"
                    startIcon={<DeleteIcon />}
                >
                    <span className="hidden lg:inline">Delete Schedule</span>
                </Button>
                <Button
                    variant="contained"
                    className="!bg-[#17c2af] !rounded-full !text-white !font-bold !text-sm !px-2 lg:!px-6 !py-3 !shadow-none"
                    startIcon={<FileDownloadIcon />}
                >
                    <span className="hidden lg:inline">Export & Download</span>
                </Button>
                <Button
                    variant="contained"
                    className="!bg-[#17c2af] !rounded-full !text-white !font-bold !text-sm !px-2 lg:!px-6 !py-3 !shadow-none"
                    startIcon={<PrintIcon />}
                >
                    <span className="hidden lg:inline">Print</span>
                </Button>
            </div>


            <div className="mb-4 flex justify-between items-center">
                <div className="flex items-center">
                    <IconButton className="!border !border-solid !border-gray-200 !rounded-none !px-2 !py-1 !bg-gray-100" onClick={handlePrevMonth}>
                        <ChevronLeft className="!text-lg" />
                    </IconButton>
                    <IconButton className="!border !border-solid !border-gray-200 !rounded-none !px-2 !py-1 !bg-gray-100" onClick={handleNextMonth}>
                        <ChevronRight className="!text-lg" />
                    </IconButton>
                </div>

                <Typography variant="h5" className="!font-bold !text-black">
                    {monthNames[month]} {year}
                </Typography>

                <div className="flex">
                    <Button variant="contained" className="!border !border-solid !border-gray-200 !rounded-none !px-2 !py-[1px] !bg-gray-100 !text-gray-400 !capitalize !shadow-none">Month</Button>
                    <Button variant="contained" className="!border !border-solid !border-gray-200 !rounded-none !px-2 !py-[1px] !bg-gray-100 !text-gray-400 !capitalize !shadow-none">Week</Button>
                    <Button variant="contained" className="!border !border-solid !border-gray-200 !rounded-none !px-2 !py-[1px] !bg-gray-100 !text-gray-400 !capitalize !shadow-none">Day</Button>
                </div>
            </div>

            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                            <th key={day} className="border p-2 bg-gray-100 text-sm font-semibold text-black">
                                {day}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>{generateCalendarRows()}</tbody>
            </table>

            <Menu anchorEl={addMenuAnchorEl} open={Boolean(addMenuAnchorEl)} onClose={handleAddMenuClose}>
                <MenuItem onClick={() => handleAddEvent("event")}>Add Event</MenuItem>
                <MenuItem onClick={() => handleAddEvent("reminder")}>Add Reminder</MenuItem>
            </Menu>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={eventUpdate}>Edit</MenuItem>
                <MenuItem onClick={eventDelete}>Delete</MenuItem>
            </Menu>

            <EventDialog
                open={open}
                onClose={handleClose}
                onSubmit={addEventReminder}
                formData={formData}
                setFormData={setFormData}
                currentEvent={currentEvent}
            />
        </>
    )
}
export default CalendarPage;