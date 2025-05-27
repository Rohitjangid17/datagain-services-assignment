"use client"

import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, } from "@mui/material";
import { FilterDialogProps } from "../interfaces/common.type";

const FilterDialog: React.FC<FilterDialogProps> = ({
    open,
    onClose,
    onFilter,
    filterData,
    setFilterData,
}) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Filter</DialogTitle>
            <DialogContent>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <TextField
                        label="Start Date"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={filterData.startDate}
                        onChange={(e) => setFilterData({ ...filterData, startDate: e.target.value })}
                    />
                    <TextField
                        label="End Date"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={filterData.endDate}
                        onChange={(e) => setFilterData({ ...filterData, endDate: e.target.value })}
                    />
                </div>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={onClose}
                    variant="outlined"
                    className="!bg-[#f4f6f5] !rounded-full !text-black !font-bold !border-black !text-sm !px-6 !py-2 !shadow-none"
                >
                    Cancel
                </Button>
                <Button
                    onClick={onFilter}
                    variant="contained"
                    className="!bg-[#17c2af] !rounded-full !text-white !font-bold !text-sm !px-6 !py-2 !shadow-none"
                >
                    Apply Filter
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default FilterDialog;
