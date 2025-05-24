"use client"

import type React from "react"
import { useState } from "react"
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks"
import {
    addEvent,
    updateEvent,
    deleteEvent,
    setSelectedDate,
    type CalendarEvent,
} from "@/lib/redux/slices/calendarSlice"
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Typography,
    Paper,
    IconButton,
    Menu,
} from "@mui/material"
import {
    Add as AddIcon,
    ChevronLeft,
    ChevronRight,
    Print as PrintIcon,
    FileDownload as FileDownloadIcon,
    Delete as DeleteIcon,
    Refresh as RefreshIcon,
} from "@mui/icons-material"

// Simple ID generator
const generateId = () => Math.random().toString(36).substr(2, 9)

// Helper function to get days in month
const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
}

// Helper function to get day of week (0 = Sunday, 6 = Saturday)
const getDayOfWeek = (year: number, month: number, day: number) => {
    return new Date(year, month, day).getDay()
}

// Helper function to format date as YYYY-MM-DD
const formatDate = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
}

export default function CalendarPage() {
    const dispatch = useAppDispatch()
    const { events, selectedDate } = useAppSelector((state) => state.calendar)

    const [currentDate, setCurrentDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [eventType, setEventType] = useState<"event" | "reminder">("event")
    const [currentEvent, setCurrentEvent] = useState<CalendarEvent | null>(null)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const [formData, setFormData] = useState({
        title: "",
        date: "",
        type: "event" as "event" | "reminder",
        color: "blue",
    })

    const [addMenuAnchorEl, setAddMenuAnchorEl] = useState<null | HTMLElement>(null)
    const [selectedDay, setSelectedDay] = useState<string | null>(null)

    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const daysInMonth = getDaysInMonth(year, month)
    const firstDayOfWeek = getDayOfWeek(year, month, 1)

    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ]

    const handlePrevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1))
    }

    const handleNextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1))
    }

    const handleDayClick = (day: number) => {
        const dateString = formatDate(year, month, day)
        setSelectedDay(dateString)
        dispatch(setSelectedDate(dateString))
    }

    const handleAddClick = (event: React.MouseEvent<HTMLElement>, day: number) => {
        const dateString = formatDate(year, month, day)
        setSelectedDay(dateString)
        setAddMenuAnchorEl(event.currentTarget)
    }

    const handleAddMenuClose = () => {
        setAddMenuAnchorEl(null)
    }

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

    const handleClose = () => {
        setOpen(false)
    }

    const handleSubmit = () => {
        if (currentEvent) {
            dispatch(
                updateEvent({
                    ...currentEvent,
                    ...formData,
                }),
            )
        } else {
            dispatch(
                addEvent({
                    id: generateId(),
                    ...formData,
                }),
            )
        }
        setOpen(false)
    }

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

    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    const handleEditEvent = () => {
        setOpen(true)
        handleMenuClose()
    }

    const handleDeleteEvent = () => {
        if (currentEvent) {
            dispatch(deleteEvent(currentEvent.id))
        }
        handleMenuClose()
    }

    // Generate calendar grid
    const generateCalendarRows = () => {
        const rows = []
        let currentRow = []

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDayOfWeek; i++) {
            currentRow.push(<td key={`empty-${i}`} className="border p-1 h-24 align-top"></td>)
        }

        // Add cells for each day of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dateString = formatDate(year, month, day)
            const dayEvents = events.filter((event: any) => event.date === dateString)

            currentRow.push(
                <td key={day} className="border p-1 h-24 align-top">
                    <div className="flex justify-between">
                        <span className="text-sm font-semibold">{day}</span>
                        <IconButton size="small" onClick={(e) => handleAddClick(e, day)}>
                            <AddIcon fontSize="small" />
                        </IconButton>
                    </div>
                    <div className="mt-1">
                        {dayEvents.map((event: any) => (
                            <div
                                key={event.id}
                                className={`text-xs p-1 mb-1 rounded cursor-pointer ${event.color === "blue"
                                    ? "bg-blue-500 text-white"
                                    : event.color === "orange"
                                        ? "bg-orange-500 text-white"
                                        : "bg-gray-800 text-white"
                                    }`}
                                onClick={(e) => handleEventClick(event, e)}
                            >
                                {event.title}
                            </div>
                        ))}
                    </div>
                </td>,
            )

            // If we've filled 7 cells, start a new row
            if (currentRow.length === 7) {
                rows.push(<tr key={`row-${Math.floor((day + firstDayOfWeek - 1) / 7)}`}>{currentRow}</tr>)
                currentRow = []
            }
        }

        // Fill remaining cells in the last row if needed
        while (currentRow.length > 0 && currentRow.length < 7) {
            currentRow.push(<td key={`empty-end-${currentRow.length}`} className="border p-1 h-24 align-top"></td>)
        }

        // Add the last row if it has any cells
        if (currentRow.length > 0) {
            rows.push(<tr key="last-row">{currentRow}</tr>)
        }

        return rows
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Calendar</h1>
            </div>

            <Paper className="p-4 mb-6">
                <div className="flex justify-between items-center mb-4">
                    <Typography variant="h6">Add new schedule(s) :</Typography>
                    <div className="flex gap-2">
                        <TextField select label="Select Months" size="small" className="w-64" defaultValue="">
                            <MenuItem value="">All Months</MenuItem>
                            {monthNames.map((name, index) => (
                                <MenuItem key={index} value={index}>
                                    {name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <Button variant="contained" color="primary">
                            Schedule
                        </Button>
                        <Button variant="outlined">Reset</Button>
                    </div>
                </div>

                <div className="flex gap-2">
                    <Button variant="contained" color="primary" startIcon={<RefreshIcon />}>
                        Replenish
                    </Button>
                    <Button variant="contained" color="primary" startIcon={<DeleteIcon />}>
                        Delete Schedule
                    </Button>
                    <Button variant="contained" color="primary" startIcon={<FileDownloadIcon />}>
                        Export & Download
                    </Button>
                    <Button variant="contained" color="primary" startIcon={<PrintIcon />}>
                        Print
                    </Button>
                </div>
            </Paper>

            <div className="mb-4 flex justify-between items-center">
                <div className="flex items-center">
                    <IconButton onClick={handlePrevMonth}>
                        <ChevronLeft />
                    </IconButton>
                    <IconButton onClick={handleNextMonth}>
                        <ChevronRight />
                    </IconButton>
                    <Button variant="text">today</Button>
                </div>

                <Typography variant="h5" className="font-bold">
                    {monthNames[month]} {year}
                </Typography>

                <div className="flex gap-2">
                    <Button variant="outlined" className="bg-gray-200">
                        Month
                    </Button>
                    <Button variant="text">week</Button>
                    <Button variant="text">day</Button>
                </div>
            </div>

            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border p-2 bg-gray-100">Sun</th>
                        <th className="border p-2 bg-gray-100">Mon</th>
                        <th className="border p-2 bg-gray-100">Tue</th>
                        <th className="border p-2 bg-gray-100">Wed</th>
                        <th className="border p-2 bg-gray-100">Thu</th>
                        <th className="border p-2 bg-gray-100">Fri</th>
                        <th className="border p-2 bg-gray-100">Sat</th>
                    </tr>
                </thead>
                <tbody>{generateCalendarRows()}</tbody>
            </table>

            <Menu anchorEl={addMenuAnchorEl} open={Boolean(addMenuAnchorEl)} onClose={handleAddMenuClose}>
                <MenuItem onClick={() => handleAddEvent("event")}>Add Event</MenuItem>
                <MenuItem onClick={() => handleAddEvent("reminder")}>Add Reminder</MenuItem>
            </Menu>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={handleEditEvent}>Edit</MenuItem>
                <MenuItem onClick={handleDeleteEvent}>Delete</MenuItem>
            </Menu>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    {currentEvent ? "Edit" : "Add"} {eventType === "event" ? "Event" : "Reminder"}
                </DialogTitle>
                <DialogContent>
                    <div className="w-96 pt-4">
                        <TextField
                            label="Title"
                            fullWidth
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            margin="normal"
                        />
                        <TextField
                            label="Date"
                            type="date"
                            fullWidth
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Type</InputLabel>
                            <Select
                                value={formData.type}
                                label="Type"
                                onChange={(e) => setFormData({ ...formData, type: e.target.value as "event" | "reminder" })}
                            >
                                <MenuItem value="event">Event</MenuItem>
                                <MenuItem value="reminder">Reminder</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Color</InputLabel>
                            <Select
                                value={formData.color}
                                label="Color"
                                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                            >
                                <MenuItem value="blue">Blue</MenuItem>
                                <MenuItem value="orange">Orange</MenuItem>
                                <MenuItem value="black">Black</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained" color="primary">
                        {currentEvent ? "Update" : "Add"}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
