import { configureStore } from "@reduxjs/toolkit"
import { combineReducers } from "redux"
import sidebarReducer from "./slices/sidebarSlice"
import workOrdersReducer from "./slices/workOrdersSlice"
import calendarReducer from "./slices/calendarSlice"

const rootReducer = combineReducers({
  sidebar: sidebarReducer,
  workOrders: workOrdersReducer,
  calendar: calendarReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
