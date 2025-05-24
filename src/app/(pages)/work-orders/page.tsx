"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  InputAdornment,
} from "@mui/material"
import {
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material"
import { addOrder, deleteOrder, filterOrders, updateOrder, WorkOrder } from "@/lib/redux/slices/workOrdersSlice"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"

// Simple ID generator
const generateId = () => Math.random().toString(36).substr(2, 9)

export default function WorkOrdersPage() {
  const dispatch = useAppDispatch()
  const { orders, filteredOrders, startDate, endDate } = useAppSelector((state) => state.workOrders)

  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentOrder, setCurrentOrder] = useState<WorkOrder | null>(null)
  const [displayOrders, setDisplayOrders] = useState<WorkOrder[]>([])
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    donor: "",
    panels: "",
    barcode: "",
    source: "",
    date: "",
    amount: "",
    observedBy: "",
    status: "",
  })

  useEffect(() => {
    // Filter orders based on search term
    const filtered = filteredOrders.length > 0 ? filteredOrders : orders
    if (searchTerm) {
      setDisplayOrders(
        filtered.filter((order: any) =>
          Object.values(order).some((value: any) => value.toString().toLowerCase().includes(searchTerm.toLowerCase())),
        ),
      )
    } else {
      setDisplayOrders(filtered)
    }
  }, [orders, filteredOrders, searchTerm])

  const handleClickOpen = () => {
    setCurrentOrder(null)
    setFormData({
      donor: "",
      panels: "",
      barcode: "",
      source: "",
      date: new Date().toLocaleDateString(),
      amount: "",
      observedBy: "",
      status: "",
    })
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = () => {
    if (currentOrder) {
      dispatch(
        updateOrder({
          ...currentOrder,
          ...formData,
        }),
      )
    } else {
      dispatch(
        addOrder({
          id: generateId(),
          ...formData,
        }),
      )
    }
    setOpen(false)
  }

  const handleEdit = (order: WorkOrder) => {
    setCurrentOrder(order)
    setFormData({
      donor: order.donor,
      panels: order.panels,
      barcode: order.barcode,
      source: order.source,
      date: order.date,
      amount: order.amount,
      observedBy: order.observedBy,
      status: order.status,
    })
    setOpen(true)
    handleMenuClose()
  }

  const handleDelete = (id: string) => {
    dispatch(deleteOrder(id))
    handleMenuClose()
  }

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, id: string) => {
    setAnchorEl(event.currentTarget)
    setSelectedOrderId(id)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedOrderId(null)
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>, field: "startDate" | "endDate") => {
    const value = e.target.value
    if (field === "startDate") {
      dispatch(filterOrders({ startDate: value, endDate }))
    } else {
      dispatch(filterOrders({ startDate, endDate: value }))
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Work Orders</h1>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleClickOpen}>
          React Order
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex items-center">
          <span className="mr-2">Date:</span>
          <TextField
            size="small"
            value={startDate}
            onChange={(e) => handleFilterChange(e as React.ChangeEvent<HTMLInputElement>, "startDate")}
            className="w-32"
          />
          <span className="mx-2">-</span>
          <TextField
            size="small"
            value={endDate}
            onChange={(e) => handleFilterChange(e as React.ChangeEvent<HTMLInputElement>, "endDate")}
            className="w-32"
          />
        </div>

        <div className="flex-grow"></div>

        <TextField
          placeholder="Search..."
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          className="w-64"
        />

        <Button variant="contained" color="primary">
          Search
        </Button>

        <Button variant="outlined" startIcon={<FilterIcon />}>
          Filters
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="work orders table">
          <TableHead>
            <TableRow>
              <TableCell>Donor</TableCell>
              <TableCell>Panels</TableCell>
              <TableCell>Barcode</TableCell>
              <TableCell>Source</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Amount($)</TableCell>
              <TableCell>Observed By</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayOrders.map((order) => (
              <TableRow key={order.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {order.donor}
                </TableCell>
                <TableCell>{order.panels}</TableCell>
                <TableCell>{order.barcode}</TableCell>
                <TableCell>{order.source}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.amount}</TableCell>
                <TableCell>{order.observedBy}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>
                  <IconButton aria-label="more" onClick={(e) => handleMenuClick(e, order.id)}>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={() => selectedOrderId && handleEdit(orders.find((o:any) => o.id === selectedOrderId)!)}>
          Edit
        </MenuItem>
        <MenuItem onClick={() => selectedOrderId && handleDelete(selectedOrderId)}>Delete</MenuItem>
      </Menu>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{currentOrder ? "Edit Work Order" : "Add Work Order"}</DialogTitle>
        <DialogContent>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <TextField
              label="Donor"
              fullWidth
              value={formData.donor}
              onChange={(e) => setFormData({ ...formData, donor: e.target.value })}
            />
            <TextField
              label="Panels"
              fullWidth
              value={formData.panels}
              onChange={(e) => setFormData({ ...formData, panels: e.target.value })}
            />
            <TextField
              label="Barcode"
              fullWidth
              value={formData.barcode}
              onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
            />
            <TextField
              label="Source"
              fullWidth
              value={formData.source}
              onChange={(e) => setFormData({ ...formData, source: e.target.value })}
            />
            <TextField
              label="Date"
              fullWidth
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
            <TextField
              label="Amount"
              fullWidth
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            />
            <TextField
              label="Observed By"
              fullWidth
              value={formData.observedBy}
              onChange={(e) => setFormData({ ...formData, observedBy: e.target.value })}
            />
            <TextField
              label="Status"
              fullWidth
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {currentOrder ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
