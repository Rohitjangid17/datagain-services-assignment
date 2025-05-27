"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, IconButton, Menu, MenuItem, InputAdornment, Select, Typography, Pagination, } from "@mui/material"
import { Search as SearchIcon, FilterList as FilterIcon, MoreVert as MoreVertIcon, } from "@mui/icons-material"
import { addOrder, deleteOrder, filterOrders, updateOrder } from "@/lib/redux/slices/workOrdersSlice"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import PageTitle from "@/shared/components/page-title"
import { WorkOrder, WorkOrderFormData } from "@/shared/interfaces/common.type"
import WorkOrderDialog from "@/shared/models/work-order-dialog"
import { generateId } from "@/lib/utils/calendar-helpers"
import FilterDialog from "@/shared/models/filter-dialog"

const WorkOrdersPage = () => {
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

  const [filterDialogOpen, setFilterDialogOpen] = useState(false)
  const [filterData, setFilterData] = useState({ startDate: "", endDate: "" })

  const [formData, setFormData] = useState<WorkOrderFormData>({
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
    const filtered = filteredOrders.length > 0 ? filteredOrders : orders;
    setDisplayOrders(filtered)
  }, [orders, filteredOrders, searchTerm]);

  // hanle model open
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

  // const handleChangePage = (_event: unknown, newPage: number) => {
  //   setPage(newPage);
  // };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  const searchOrdersData = () => {
    const filtered = filteredOrders.length > 0 ? filteredOrders : orders
    if (searchTerm.trim()) {
      setDisplayOrders(
        filtered.filter((order) =>
          Object.values(order).some((value) =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
      )
    } else {
      setDisplayOrders(filtered)
    }
    setPage(0)
  }

  // filter apply
  const filterApply = () => {
    dispatch(filterOrders(filterData))
    setFilterDialogOpen(false)
  }

  const paginatedOrders = displayOrders.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  return (
    <>
      <PageTitle title="Work Orders" showButton onClick={handleClickOpen} buttonText="React Order" />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
          <div className="text-gray-600 font-bold">Date:</div>
          <div className="flex items-center gap-x-1 text-sm text-gray-600">
            <span>06/01/2024</span>
            <span>-</span>
            <span>07/19/2024</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
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
            className="w-full sm:w-64"
          />

          <Button variant="contained" onClick={searchOrdersData} className="!bg-[#17c2af] w-full sm:w-auto !rounded-full !text-white !font-bold !text-sm !px-6 !py-3 !shadow-none">
            Search
          </Button>

          <Button
            variant="outlined"
            onClick={() => setFilterDialogOpen(true)}
            className="w-full sm:w-auto !bg-[#f4f6f5]  !border-[#17c2af] !rounded-full !text-black !font-bold !text-sm !px-6 !py-2 !shadow-none flex items-center justify-between sm:justify-start gap-2"
            startIcon={<FilterIcon className="text-[#17c2af]" />}>
            <span className="text-gray-600 text-sm">FILTERS</span>
            <span className="bg-[#17c2af] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
              3
            </span>
          </Button>
        </div>
      </div>

      <Paper className="rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <TableContainer>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow className="!bg-[#f4f6f5]">
                  {['Donor', 'Panels', 'Barcode', 'Source', 'Date', 'Amount($)', 'Observed By', 'Status', 'Action'].map(header => (
                    <TableCell key={header} className="!text-gray-600 !font-bold !text-xs sm:!text-sm whitespace-nowrap">{header}</TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {paginatedOrders.map((order: any) => (
                  <TableRow
                    key={order.id}
                    className={order.highlight ? 'bg-[#ffe7e7]' : ''}
                  >
                    <TableCell className="text-[#17c2af] font-medium cursor-pointer hover:underline text-xs sm:text-sm">
                      {order.donor}
                    </TableCell>
                    <TableCell className="text-xs sm:text-sm">{order.panels}</TableCell>
                    <TableCell className="text-[#17c2af] text-xs sm:text-sm">{order.barcode}</TableCell>
                    <TableCell className="text-xs sm:text-sm">{order.source}</TableCell>
                    <TableCell className="text-xs sm:text-sm whitespace-nowrap">{order.date}</TableCell>
                    <TableCell className="text-xs sm:text-sm">{order.amount}</TableCell>
                    <TableCell className="text-xs sm:text-sm">{order.observedBy}</TableCell>
                    <TableCell className="capitalize text-xs sm:text-sm whitespace-nowrap">{order.status}</TableCell>
                    <TableCell>
                      <IconButton onClick={(e) => handleMenuClick(e, order.id)} size="small">
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-4 py-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Pagination
              count={Math.ceil(orders.length / rowsPerPage)}
              page={page + 1}
              onChange={(_: any, value: any) => setPage(value - 1)}
              shape="rounded"
              variant="outlined"
              size="small"
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "#17c2af",
                  borderColor: "#17c2af",
                },
                "& .MuiPaginationItem-root.Mui-selected": {
                  backgroundColor: "#17c2af",
                  color: "#fff",
                  borderColor: "#17c2af",
                  "&:hover": {
                    backgroundColor: "#17c2af",
                    color: "#fff",
                    borderColor: "#17c2af",
                  },
                },
              }}
            />
            <Select
              value={rowsPerPage}
              onChange={(e) => handleChangeRowsPerPage(e as any)}
              size="small"
              className="text-sm"
              sx={{ minWidth: 80 }}
            >
              {[5, 10, 25, 50].map((val) => (
                <MenuItem key={val} value={val}>{val}</MenuItem>
              ))}
            </Select>
            <span className="text-sm text-[#17c2af] font-medium">items per page</span>
          </div>

          <Typography variant="body2" className="text-sm text-[#17c2af] font-medium text-center sm:text-left">
            Showing {page * rowsPerPage + 1} -{' '}
            {Math.min((page + 1) * rowsPerPage, orders.length)} of {orders.length}
          </Typography>
        </div>

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

      <WorkOrderDialog
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        isEdit={!!currentOrder}
      />

      <FilterDialog
        open={filterDialogOpen}
        onClose={() => setFilterDialogOpen(false)}
        onFilter={filterApply}
        filterData={filterData}
        setFilterData={setFilterData}
      />

    </>
  )
}

export default WorkOrdersPage;