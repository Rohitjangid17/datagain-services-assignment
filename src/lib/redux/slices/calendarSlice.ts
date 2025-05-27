
import { CalendarEvent, CalendarState } from "@/shared/interfaces/common.type"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

const initialState: CalendarState = {
    events: [
        { id: "1", title: "PHASE 2 testing12", date: "2025-05-12", type: "event", color: "blue" },
        { id: "2", title: "phase 3rd LIMS", date: "2025-05-05", type: "reminder", color: "orange" },
        { id: "3", title: "Orange", date: "2025-05-21", type: "event", color: "orange" },
        { id: "4", title: "20", date: "2025-05-17", type: "reminder", color: "black" },
        { id: "5", title: "Orange", date: "2025-05-29", type: "event", color: "orange" },
        { id: "6", title: "Orange", date: "2025-05-02", type: "reminder", color: "orange" },
        { id: "7", title: "20", date: "2025-05-24", type: "event", color: "blue" },
        { id: "8", title: "Blue", date: "2025-05-18", type: "event", color: "blue" },
        { id: "9", title: "PHASE 2 testing12", date: "2025-05-11", type: "event", color: "blue" },
        { id: "10", title: "phase 3rd LIMS", date: "2025-05-30", type: "reminder", color: "orange" },
        { id: "11", title: "20", date: "2025-05-06", type: "reminder", color: "black" },
        { id: "12", title: "Orange", date: "2025-05-25", type: "event", color: "orange" },
        { id: "13", title: "Grey", date: "2025-05-28", type: "event", color: "grey" },
        { id: "14", title: "Black", date: "2025-05-19", type: "event", color: "black" },
        { id: "15", title: "20", date: "2025-05-08", type: "event", color: "blue" },
        { id: "16", title: "Reminder Task", date: "2025-05-07", type: "reminder", color: "orange" },
        { id: "17", title: "Event Alpha", date: "2025-05-23", type: "event", color: "blue" },
        { id: "18", title: "Urgent Reminder", date: "2025-05-10", type: "reminder", color: "black" },
        { id: "19", title: "Event Beta", date: "2025-05-15", type: "event", color: "orange" },
        { id: "20", title: "Check Schedule", date: "2025-05-20", type: "reminder", color: "orange" },
        { id: "21", title: "Event Gamma", date: "2025-05-27", type: "event", color: "blue" },
        { id: "22", title: "Meeting Reminder", date: "2025-05-14", type: "reminder", color: "black" },
        { id: "23", title: "Event Delta", date: "2025-05-03", type: "event", color: "grey" },
        { id: "24", title: "Follow-up", date: "2025-05-26", type: "reminder", color: "orange" },
        { id: "25", title: "Event Epsilon", date: "2025-05-16", type: "event", color: "blue" },
        { id: "26", title: "Reminder Notice", date: "2025-05-09", type: "reminder", color: "orange" },
        { id: "27", title: "Event Zeta", date: "2025-05-22", type: "event", color: "blue" },
        { id: "28", title: "Alert Reminder", date: "2025-05-13", type: "reminder", color: "black" },
        { id: "29", title: "Event Eta", date: "2025-05-01", type: "event", color: "blue" },
        { id: "30", title: "Daily Reminder", date: "2025-05-04", type: "reminder", color: "orange" },
        { id: "31", title: "Event Theta", date: "2025-05-20", type: "event", color: "grey" },
        { id: "32", title: "Urgent Notice", date: "2025-05-18", type: "reminder", color: "orange" },
        { id: "33", title: "Event Iota", date: "2025-05-28", type: "event", color: "blue" },
        { id: "34", title: "Final Reminder", date: "2025-05-19", type: "reminder", color: "black" },
        { id: "35", title: "Event Kappa", date: "2025-05-23", type: "event", color: "blue" },
        { id: "36", title: "Reminder Alert", date: "2025-05-25", type: "reminder", color: "orange" },
        { id: "37", title: "Event Lambda", date: "2025-05-07", type: "event", color: "blue" },
        { id: "38", title: "Notice Reminder", date: "2025-05-26", type: "reminder", color: "black" },
        { id: "39", title: "Event Mu", date: "2025-05-10", type: "event", color: "orange" },
        { id: "40", title: "Reminder Task", date: "2025-05-12", type: "reminder", color: "orange" },
        { id: "41", title: "Event Nu", date: "2025-05-15", type: "event", color: "blue" },
        { id: "42", title: "Alert Reminder", date: "2025-05-09", type: "reminder", color: "black" },
        { id: "43", title: "Event Xi", date: "2025-05-08", type: "event", color: "grey" },
        { id: "44", title: "Urgent Reminder", date: "2025-05-17", type: "reminder", color: "orange" },
        { id: "45", title: "Event Omicron", date: "2025-05-27", type: "event", color: "blue" },
        { id: "46", title: "Final Notice", date: "2025-05-11", type: "reminder", color: "black" },
        { id: "47", title: "Event Pi", date: "2025-05-06", type: "event", color: "orange" },
        { id: "48", title: "Reminder Alert", date: "2025-05-24", type: "reminder", color: "orange" },
        { id: "49", title: "Event Rho", date: "2025-05-03", type: "event", color: "blue" },
        { id: "50", title: "Daily Reminder", date: "2025-05-14", type: "reminder", color: "black" }
    ],
    selectedDate: null,
}

const calendarSlice = createSlice({
    name: "calendar",
    initialState,
    reducers: {
        addEvent: (state, action: PayloadAction<CalendarEvent>) => {
            state.events.push(action.payload)
        },
        updateEvent: (state, action: PayloadAction<CalendarEvent>) => {
            const index = state.events.findIndex((event) => event.id === action.payload.id)
            if (index !== -1) {
                state.events[index] = action.payload
            }
        },
        deleteEvent: (state, action: PayloadAction<string>) => {
            state.events = state.events.filter((event) => event.id !== action.payload)
        },
        setSelectedDate: (state, action: PayloadAction<string | null>) => {
            state.selectedDate = action.payload
        },
    },
})

export const { addEvent, updateEvent, deleteEvent, setSelectedDate } = calendarSlice.actions
export default calendarSlice.reducer
