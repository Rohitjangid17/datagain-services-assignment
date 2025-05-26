export interface CalendarEvent {
    id: string;
    title: string;
    date: string;
    type: 'event' | 'reminder';
    color: string;
}

export interface CalendarState {
    events: CalendarEvent[];
    selectedDate: string | null;
}

export interface SidebarState {
    isMainSidebarOpen: boolean;
    showOverlay: boolean;
}

export interface WorkOrder {
    id: string
    donor: string
    panels: string
    barcode: string
    source: string
    date: string
    amount: string
    observedBy: string
    status: string
}

export interface WorkOrdersState {
    orders: WorkOrder[]
    filteredOrders: WorkOrder[]
    startDate: string
    endDate: string
}

export interface PageTitleProps {
    title: string;
    showButton?: boolean;
    buttonText?: string;
    onClick?: () => void;
}

export interface EventDialogProps {
    open: boolean
    onClose: () => void
    onSubmit: () => void
    formData: {
        title: string
        date: string
        type: "event" | "reminder"
        color: string
    }
    setFormData: React.Dispatch<React.SetStateAction<{
        title: string
        date: string
        type: "event" | "reminder"
        color: string
    }>>
    currentEvent: CalendarEvent | null
}

export type WorkOrderFormData = Omit<WorkOrder, "id">

export interface WorkOrderDialogProps {
    open: boolean
    onClose: () => void
    onSubmit: () => void
    formData: WorkOrderFormData
    setFormData: React.Dispatch<React.SetStateAction<WorkOrderFormData>>
    isEdit: boolean
}

export interface SidebarItemProps {
    icon: React.ReactNode;
    label: string;
    path?: string;
    isActive?: boolean;
    isExpanded?: boolean;
    onClick?: () => void;
    showChevron?: boolean;
}