"use client"

import type React from "react"
import { useState, useMemo } from "react"
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, TextField, IconButton, Menu, MenuItem, InputAdornment, Select,
  Typography, Pagination,
  SelectChangeEvent
} from "@mui/material"
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  MoreVert as MoreVertIcon
} from "@mui/icons-material"
import {
  addOrder, deleteOrder, updateOrder
} from "@/lib/redux/slices/workOrdersSlice"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import PageTitle from "@/shared/components/page-title"
import { WorkOrder, WorkOrderFormData } from "@/shared/interfaces/common.type"
import { generateId } from "@/lib/utils/calendar-helpers"
import FilterDialog from "@/shared/models/filter-dialog"
import WorkOrderDialog from "@/shared/models/work-order-dialog"

const WorkOrdersPage = () => {
  const dispatch = useAppDispatch()
  const { orders } = useAppSelector((state) => state.workOrders)

  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentOrder, setCurrentOrder] = useState<WorkOrder | null>(null)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [filterDialogOpen, setFilterDialogOpen] = useState(false)

  // This is the filter applied to the data
  const [filterData, setFilterData] = useState({ startDate: "", endDate: "" })
  // This is the local filter data used only inside the dialog inputs
  const [localFilterData, setLocalFilterData] = useState({ startDate: "", endDate: "" })

  const [appliedSearchTerm, setAppliedSearchTerm] = useState("")

  const [formData, setFormData] = useState<WorkOrderFormData>({
    donor: "", panels: "", barcode: "", source: "",
    date: new Date().toISOString().split("T")[0],
    amount: "", observedBy: "", status: ""
  });

  const { displayOrders, dateFilteredCount } = useMemo(() => {
    const start = filterData.startDate ? new Date(filterData.startDate) : null;
    const end = filterData.endDate ? new Date(filterData.endDate) : null;

    let filteredByDate = [...orders];

    if (start || end) {
      filteredByDate = filteredByDate.filter((order) => {
        const orderDate = new Date(order.date);
        if (start && end) return orderDate >= start && orderDate <= end;
        if (start) return orderDate >= start;
        if (end) return orderDate <= end;
        return true;
      });
    }

    const dateFilteredCount = (filterData.startDate && filterData.endDate) ? filteredByDate.length : 0;

    let fullyFiltered = [...filteredByDate];

    if (appliedSearchTerm.trim()) {
      fullyFiltered = fullyFiltered.filter((order) =>
        Object.values(order).some((value: string) =>
          value.toString().toLowerCase().includes(appliedSearchTerm.toLowerCase())
        )
      );
    }

    return {
      displayOrders: fullyFiltered,
      dateFilteredCount,
    };
  }, [orders, filterData.startDate, filterData.endDate, appliedSearchTerm]);

  const paginatedOrders = displayOrders.slice(page * rowsPerPage, (page + 1) * rowsPerPage)

  const handleClickOpen = () => {
    setCurrentOrder(null)
    setFormData({
      donor: "", panels: "", barcode: "", source: "",
      date: new Date().toISOString().split("T")[0],
      amount: "", observedBy: "", status: ""
    })
    setOpen(true)
  }

  const handleSubmit = () => {
    if (currentOrder) {
      dispatch(updateOrder({ ...currentOrder, ...formData }))
    } else {
      dispatch(addOrder({ id: generateId(), ...formData }))
    }
    setOpen(false)
  }

  const updateWorkOrder = (order: WorkOrder) => {
    setCurrentOrder(order)
    setFormData({
      donor: order.donor,
      panels: order.panels,
      barcode: order.barcode,
      source: order.source,
      date: order.date,
      amount: order.amount,
      observedBy: order.observedBy,
      status: order.status
    })
    setOpen(true)
    handleMenuClose()
  }

  const deleteWorkOrder = (id: string) => {
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

  const handleChangeRowsPerPage = (event: SelectChangeEvent) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  // Open filter dialog and set local copy
  const openFilterDialog = () => {
    setLocalFilterData(filterData)
    setFilterDialogOpen(true)
  }

  // Apply filter when user clicks apply button
  const filterApply = () => {
    setFilterData(localFilterData);
    setPage(0);
    setFilterDialogOpen(false);
    setLocalFilterData({ startDate: "", endDate: "" });
  }

  return (
    <>
      <PageTitle title="Work Orders" showButton onClick={handleClickOpen} buttonText="Creact Order" />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
          {filterData.startDate && filterData.endDate && <div className="text-gray-600 font-bold">Date:</div>}
          <div className="flex items-center gap-x-1 text-sm text-gray-600">
            {filterData.startDate && filterData.endDate &&
              <>
                <span>{filterData.startDate || "Start"}</span>
                <span>-</span>
                <span>{filterData.endDate || "End"}</span>
              </>
            }
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

          <Button
            variant="contained"
            onClick={() => {
              setAppliedSearchTerm(searchTerm)
              setPage(0)
            }}
            className="!bg-[#17c2af] w-full sm:w-auto !rounded-full !text-white !font-bold !text-sm !px-6 !py-3 !shadow-none">
            Search
          </Button>

          <Button variant="outlined" onClick={openFilterDialog}
            className="w-full sm:w-auto !bg-[#f4f6f5]  !border-[#17c2af] !rounded-full !text-black !font-bold !text-sm !px-6 !py-2 !shadow-none flex items-center justify-between sm:justify-start gap-2"
            startIcon={<FilterIcon className="text-[#17c2af]" />}>
            <span className="text-gray-600 text-sm">FILTERS</span>
            <span className="bg-[#17c2af] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
              {(filterData.startDate && filterData.endDate) ? dateFilteredCount : 0}
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
                {paginatedOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="!text-[#17c2af] font-medium cursor-pointer hover:underline text-xs sm:text-sm">
                      {order.donor}
                    </TableCell>
                    <TableCell className="text-xs sm:text-sm">{order.panels}</TableCell>
                    <TableCell className="!text-[#17c2af] text-xs sm:text-sm">{order.barcode}</TableCell>
                    <TableCell className="text-xs sm:text-sm">{order.source}</TableCell>
                    <TableCell className="text-xs sm:text-sm whitespace-nowrap">{order.date}</TableCell>
                    <TableCell className="text-xs sm:text-sm">${order.amount}</TableCell>
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

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-4 py-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Pagination
              count={Math.ceil(displayOrders.length / rowsPerPage)}
              page={page + 1}
              onChange={(_, value) => setPage(value - 1)}
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
              value={rowsPerPage.toString()}
              onChange={(e: SelectChangeEvent) => handleChangeRowsPerPage(e)}
              size="small"
              className="text-sm"
              sx={{ minWidth: 80 }}>
              {[5, 10, 25, 50].map((val) => (
                <MenuItem key={val} value={val}>{val}</MenuItem>
              ))}
            </Select>
            <span className="text-sm text-[#17c2af] font-medium">items per page</span>
          </div>

          <Typography variant="body2" className="text-sm text-[#17c2af] font-medium text-center sm:text-left">
            Showing {page * rowsPerPage + 1} - {Math.min((page + 1) * rowsPerPage, displayOrders.length)} of {displayOrders.length}
          </Typography>
        </div>

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={() => {
            if (selectedOrderId) {
              const order = orders.find((o) => o.id === selectedOrderId);
              if (order) updateWorkOrder(order);
            }
          }}>Edit</MenuItem>
          <MenuItem onClick={() => selectedOrderId && deleteWorkOrder(selectedOrderId)}>Delete</MenuItem>
        </Menu>
      </Paper>

      <WorkOrderDialog
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        isEdit={!!currentOrder}
      />

      <FilterDialog
        open={filterDialogOpen}
        onClose={() => setFilterDialogOpen(false)}
        onFilter={filterApply}
        filterData={localFilterData}
        setFilterData={setLocalFilterData}
      />
    </>
  )
}

export default WorkOrdersPage
