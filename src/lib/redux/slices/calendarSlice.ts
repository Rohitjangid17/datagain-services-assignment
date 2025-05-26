
import { CalendarEvent, CalendarState } from "@/shared/interfaces/common.type"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"



const initialState: CalendarState = {
    events: [
        { id: "1", title: "PHASE 2 testing12", date: "2023-07-02", type: "event", color: "blue" },
        { id: "2", title: "phase 3rd LIMS", date: "2023-07-02", type: "reminder", color: "orange" },
        { id: "3", title: "Orange", date: "2023-07-03", type: "event", color: "orange" },
        { id: "4", title: "20", date: "2023-07-04", type: "reminder", color: "black" },
        { id: "5", title: "Orange", date: "2023-07-05", type: "event", color: "orange" },
        { id: "6", title: "Orange", date: "2023-07-06", type: "reminder", color: "orange" },
        { id: "7", title: "20", date: "2023-07-07", type: "event", color: "blue" },
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
