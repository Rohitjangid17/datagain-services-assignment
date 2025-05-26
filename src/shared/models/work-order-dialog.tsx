"use client"

import React from "react"
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
} from "@mui/material"
import { WorkOrderDialogProps } from "@/shared/interfaces/common.type"

const WorkOrderDialog: React.FC<WorkOrderDialogProps> = ({
    open,
    onClose,
    onSubmit,
    formData,
    setFormData,
    isEdit,
}) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>{isEdit ? "Edit Work Order" : "Add Work Order"}</DialogTitle>
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
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={onSubmit} variant="contained" color="primary">
                    {isEdit ? "Update" : "Add"}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default WorkOrderDialog
