import { WorkOrder, WorkOrdersState } from "@/shared/interfaces/common.type"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

const initialState: WorkOrdersState = {
    orders: [
        { id: "WO201", donor: "Ravi Kumar", panels: "Panel A1", barcode: "IN1234567890", source: "Mumbai Warehouse", date: "2025-03-10", amount: "5000", observedBy: "Anita Sharma", status: "Pending" },
        { id: "WO202", donor: "Priya Singh", panels: "Panel B2", barcode: "IN0987654321", source: "Delhi Depot", date: "2025-03-12", amount: "7500", observedBy: "Suresh Patel", status: "Completed" },
        { id: "WO203", donor: "Amit Joshi", panels: "Panel C3", barcode: "IN1122334455", source: "Bangalore Hub", date: "2025-03-15", amount: "6300", observedBy: "Neha Gupta", status: "In Progress" },
        { id: "WO204", donor: "Sunita Verma", panels: "Panel D4", barcode: "IN2233445566", source: "Chennai Warehouse", date: "2025-03-17", amount: "8200", observedBy: "Rahul Mehta", status: "Pending" },
        { id: "WO205", donor: "Anil Reddy", panels: "Panel E5", barcode: "IN3344556677", source: "Hyderabad Depot", date: "2025-03-20", amount: "4700", observedBy: "Pooja Nair", status: "Completed" },
        { id: "WO206", donor: "Kavita Desai", panels: "Panel F6", barcode: "IN4455667788", source: "Pune Hub", date: "2025-03-22", amount: "5400", observedBy: "Rajesh Kumar", status: "In Progress" },
        { id: "WO207", donor: "Sanjay Malik", panels: "Panel G7", barcode: "IN5566778899", source: "Ahmedabad Warehouse", date: "2025-03-25", amount: "6900", observedBy: "Deepa Joshi", status: "Pending" },
        { id: "WO208", donor: "Neha Shah", panels: "Panel H8", barcode: "IN6677889900", source: "Kolkata Depot", date: "2025-03-27", amount: "7200", observedBy: "Vikas Gupta", status: "Completed" },
        { id: "WO209", donor: "Rahul Sharma", panels: "Panel I9", barcode: "IN7788990011", source: "Lucknow Hub", date: "2025-03-29", amount: "5800", observedBy: "Smita Joshi", status: "In Progress" },
        { id: "WO210", donor: "Meena Iyer", panels: "Panel J10", barcode: "IN8899001122", source: "Chandigarh Warehouse", date: "2025-03-31", amount: "6600", observedBy: "Ajay Singh", status: "Pending" },
        { id: "WO211", donor: "Vikram Patel", panels: "Panel K11", barcode: "IN9900112233", source: "Indore Depot", date: "2025-04-02", amount: "7100", observedBy: "Ritika Verma", status: "Completed" },
        { id: "WO212", donor: "Asha Nair", panels: "Panel L12", barcode: "IN1011121314", source: "Nagpur Hub", date: "2025-04-04", amount: "5300", observedBy: "Sanjay Singh", status: "In Progress" },
        { id: "WO213", donor: "Rajesh Kumar", panels: "Panel M13", barcode: "IN1213141516", source: "Coimbatore Warehouse", date: "2025-04-06", amount: "7700", observedBy: "Meera Joshi", status: "Pending" },
        { id: "WO214", donor: "Pooja Sharma", panels: "Panel N14", barcode: "IN1314151617", source: "Jaipur Depot", date: "2025-04-08", amount: "6200", observedBy: "Anil Verma", status: "Completed" },
        { id: "WO215", donor: "Manish Gupta", panels: "Panel O15", barcode: "IN1415161718", source: "Surat Hub", date: "2025-04-10", amount: "5500", observedBy: "Kiran Patel", status: "In Progress" },
        { id: "WO216", donor: "Sonal Reddy", panels: "Panel P16", barcode: "IN1516171819", source: "Mysore Warehouse", date: "2025-04-12", amount: "8000", observedBy: "Ajay Kumar", status: "Pending" },
        { id: "WO217", donor: "Deepak Singh", panels: "Panel Q17", barcode: "IN1617181920", source: "Gurgaon Depot", date: "2025-04-14", amount: "6800", observedBy: "Nidhi Sharma", status: "Completed" },
        { id: "WO218", donor: "Ritika Joshi", panels: "Panel R18", barcode: "IN1718192021", source: "Bhubaneswar Hub", date: "2025-04-16", amount: "6000", observedBy: "Vivek Nair", status: "In Progress" },
        { id: "WO219", donor: "Suresh Patel", panels: "Panel S19", barcode: "IN1819202122", source: "Patna Warehouse", date: "2025-04-18", amount: "7200", observedBy: "Priya Gupta", status: "Pending" },
        { id: "WO220", donor: "Kiran Verma", panels: "Panel T20", barcode: "IN1920212223", source: "Vadodara Depot", date: "2025-04-20", amount: "6900", observedBy: "Rajesh Kumar", status: "Completed" },
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
        setFilterDate: (state, action) => {
            console.log(action.payload)
            state.startDate = action.payload.startDate;
            state.endDate = action.payload.endDate;
        },
    },
})

export const { setOrders, addOrder, updateOrder, deleteOrder, filterOrders, setFilterDate } = workOrdersSlice.actions
export default workOrdersSlice.reducer
