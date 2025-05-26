import { WorkOrder, WorkOrdersState } from "@/shared/interfaces/common.type"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

const initialState: WorkOrdersState = {
    orders: [
        {
            id: "1",
            donor: "Jimmy, Testington",
            panels: "3 Panel, 12 Panel U CUP",
            barcode: "1792602409",
            source: "medicaid",
            date: "07/18/2023",
            amount: "$0.00",
            observedBy: "Chavan Vishal",
            status: "Unable to Donate",
        },
        {
            id: "2",
            donor: "Jimmy, Testington",
            panels: "3 Panel, 12 Panel U CUP",
            barcode: "1501691893",
            source: "Self Pay",
            date: "07/18/2023",
            amount: "$7.00",
            observedBy: "Chavan Vishal",
            status: "Refused",
        },
        {
            id: "3",
            donor: "Jimmy, Testington",
            panels: "3 Panel, 12 Panel U CUP",
            barcode: "1937334336",
            source: "Self Pay",
            date: "07/18/2023",
            amount: "$0.00",
            observedBy: "Chavan Vishal",
            status: "Duplicate/Error",
        },
        {
            id: "4",
            donor: "TestMishraa, Ramakrishnaa",
            panels: "4th Panel, 3 Panel",
            barcode: "1976557961",
            source: "Self Pay",
            date: "07/18/2023",
            amount: "$5.00",
            observedBy: "Chavan Vishal",
            status: "Insufficient Donation",
        },
        {
            id: "5",
            donor: "TestMishraa, Ramakrishnaa",
            panels: "BA, 4th Panel",
            barcode: "1729320465",
            source: "medicaid",
            date: "07/18/2023",
            amount: "$5.00",
            observedBy: "Chavan Vishal",
            status: "Approved",
        },
        {
            id: "6",
            donor: "Jimmy, Testington",
            panels: "BZO, BZ2",
            barcode: "1182496815",
            source: "Self Pay",
            date: "07/18/2023",
            amount: "$7.00",
            observedBy: "Mashalkar Rohit",
            status: "Approved",
        },
    ],
    filteredOrders: [],
    startDate: "06/01/2023",
    endDate: "7/19/2023",
}

const workOrdersSlice = createSlice({
    name: "workOrders",
    initialState,
    reducers: {
        setOrders: (state, action: PayloadAction<WorkOrder[]>) => {
            state.orders = action.payload
            state.filteredOrders = action.payload
        },
        addOrder: (state, action: PayloadAction<WorkOrder>) => {
            state.orders.push(action.payload)
            state.filteredOrders = state.orders
        },
        updateOrder: (state, action: PayloadAction<WorkOrder>) => {
            const index = state.orders.findIndex((order) => order.id === action.payload.id)
            if (index !== -1) {
                state.orders[index] = action.payload
                state.filteredOrders = state.orders
            }
        },
        deleteOrder: (state, action: PayloadAction<string>) => {
            state.orders = state.orders.filter((order) => order.id !== action.payload)
            state.filteredOrders = state.orders
        },
        filterOrders: (state, action: PayloadAction<{ startDate: string; endDate: string }>) => {
            state.startDate = action.payload.startDate
            state.endDate = action.payload.endDate
            state.filteredOrders = state.orders.filter(
                (order) =>
                    new Date(order.date) >= new Date(action.payload.startDate) &&
                    new Date(order.date) <= new Date(action.payload.endDate),
            )
        },
    },
})

export const { setOrders, addOrder, updateOrder, deleteOrder, filterOrders } = workOrdersSlice.actions
export default workOrdersSlice.reducer
