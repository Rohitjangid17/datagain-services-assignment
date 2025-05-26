"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Menu, MenuItem, InputAdornment, TablePagination, Select, Typography, Pagination, } from "@mui/material"
import { Add as AddIcon, Search as SearchIcon, FilterList as FilterIcon, MoreVert as MoreVertIcon, } from "@mui/icons-material"
import { addOrder, deleteOrder, filterOrders, updateOrder } from "@/lib/redux/slices/workOrdersSlice"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import PageTitle from "@/shared/components/page-title"
import { WorkOrder } from "@/shared/interfaces/common.type"

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
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedOrders = orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      <PageTitle title="Work Orders" showButton onClick={handleClickOpen} buttonText="React Order" />

      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex items-center">
          <span className="mr-2 text-gray-600 font-bold">Date:</span>
          <div className="flex items-center gap-x-1">
            <span className="text-gray-600">06/01/2024</span>
            <span className="text-gray-600">-</span>
            <span className="text-gray-600">07/19/2024</span>
          </div>
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

        <Button variant="contained" className="!bg-[#17c2af] !rounded-full !text-white !font-bold !text-sm !px-6 !py-3 !shadow-none">
          Search
        </Button>

        <Button
          variant="outlined"
          className="!bg-[#f4f6f5]  !border-[#17c2af] !rounded-full !text-black !font-bold !text-sm !px-6 !py-2 !shadow-none flex items-center gap-2"
          startIcon={<FilterIcon className="text-[#17c2af]" />}>
          <span className="mr-1 text-gray-600 text-sm">FILTERS</span>
          <span className="bg-[#17c2af] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
            3
          </span>
        </Button>
      </div>

      <Paper className="rounded-lg overflow-hidden">
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow className="!bg-[#f4f6f5]">
                {['Donor', 'Panels', 'Barcode', 'Source', 'Date', 'Amount($)', 'Observed By', 'Status', 'Action'].map(header => (
                  <TableCell key={header} className="!text-gray-600 !font-bold !text-sm whitespace-nowrap">{header}</TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedOrders.map((order: any) => (
                <TableRow
                  key={order.id}
                  className={order.highlight ? 'bg-[#ffe7e7]' : ''}
                >
                  <TableCell className="text-[#17c2af] font-medium cursor-pointer hover:underline">
                    {order.donor}
                  </TableCell>
                  <TableCell>{order.panels}</TableCell>
                  <TableCell className="text-[#17c2af]">{order.barcode}</TableCell>
                  <TableCell>{order.source}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.amount}</TableCell>
                  <TableCell>{order.observedBy}</TableCell>
                  <TableCell className="capitalize">{order.status}</TableCell>
                  <TableCell>
                    <IconButton onClick={(e) => handleMenuClick(e, order.id)}>
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <Pagination
              count={Math.ceil(orders.length / rowsPerPage)}
              page={page + 1}
              onChange={(_: any, value: any) => setPage(value - 1)}
              shape="rounded"
              color="primary"
              variant="outlined"
              size="small"
            />
            <Select
              value={rowsPerPage}
              onChange={(e) => handleChangeRowsPerPage(e as any)}
              size="small"
              className="h-9 text-sm"
              sx={{ minWidth: 80 }}
            >
              {[10, 25, 50].map((val) => (
                <MenuItem key={val} value={val}>{val}</MenuItem>
              ))}
            </Select>
            <span className="text-sm text-teal-600 font-medium">items per page</span>
          </div>

          <Typography variant="body2" className="text-sm text-teal-600 font-medium">
            Showing {page * rowsPerPage + 1} -{' '}
            {Math.min((page + 1) * rowsPerPage, orders.length)} of {orders.length}
          </Typography>
        </div>


        {/* Menu Actions */}
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem
            onClick={() => {
              if (selectedOrderId) {
                const order = orders.find((o: any) => o.id === selectedOrderId);
                if (order) handleEdit(order);
              }
            }}>
            Edit
          </MenuItem>
          <MenuItem onClick={() => selectedOrderId && handleDelete(selectedOrderId)}>Delete</MenuItem>
        </Menu>
      </Paper>

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
    </>
  )
}
