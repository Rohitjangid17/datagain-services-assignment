"use client"

import React, { useState, useEffect } from "react"
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
    const [errors, setErrors] = useState<{ [key: string]: string }>({})

    useEffect(() => {
        if (open) {
            setErrors({})
        }
    }, [open])

    const validate = () => {
        const newErrors: { [key: string]: string } = {}

        if (!formData.donor || formData.donor.trim() === "")
            newErrors.donor = "Donor is required"
        if (!formData.panels || formData.panels.trim() === "")
            newErrors.panels = "Panels is required"
        if (!formData.barcode || formData.barcode.trim() === "")
            newErrors.barcode = "Barcode is required"
        if (!formData.source || formData.source.trim() === "")
            newErrors.source = "Source is required"
        if (!formData.date || formData.date.trim() === "")
            newErrors.date = "Date is required"
        if (!formData.amount || formData.amount.trim() === "") {
            newErrors.amount = "Amount is required"
        } else if (isNaN(Number(formData.amount))) {
            newErrors.amount = "Amount must be a valid number"
        }
        if (!formData.observedBy || formData.observedBy.trim() === "")
            newErrors.observedBy = "Observed By is required"
        if (!formData.status || formData.status.trim() === "")
            newErrors.status = "Status is required"

        setErrors(newErrors)

        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = () => {
        if (validate()) {
            onSubmit()
        }
    }

    // helper for required label with red asterisk
    const requiredLabel = (labelText: string) => (
        <>
            {labelText} <span style={{ color: "red" }}>*</span>
        </>
    )

    // Generic handler to update form data and clear error for that field
    const handleChange = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value })

        // Clear error for the current field on input
        if (errors[field]) {
            setErrors((prevErrors) => {
                const newErrors = { ...prevErrors }
                delete newErrors[field]
                return newErrors
            })
        }
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>{isEdit ? "Edit Work Order" : "Add Work Order"}</DialogTitle>
            <DialogContent>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <TextField
                        label={requiredLabel("Donor")}
                        fullWidth
                        value={formData.donor}
                        onChange={(e) => handleChange("donor", e.target.value)}
                        error={!!errors.donor}
                        helperText={errors.donor}
                    />
                    <TextField
                        label={requiredLabel("Panels")}
                        fullWidth
                        value={formData.panels}
                        onChange={(e) => handleChange("panels", e.target.value)}
                        error={!!errors.panels}
                        helperText={errors.panels}
                    />
                    <TextField
                        label={requiredLabel("Barcode")}
                        fullWidth
                        value={formData.barcode}
                        onChange={(e) => handleChange("barcode", e.target.value)}
                        error={!!errors.barcode}
                        helperText={errors.barcode}
                    />
                    <TextField
                        label={requiredLabel("Source")}
                        fullWidth
                        value={formData.source}
                        onChange={(e) => handleChange("source", e.target.value)}
                        error={!!errors.source}
                        helperText={errors.source}
                    />
                    <TextField
                        label={requiredLabel("Date")}
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={formData.date}
                        onChange={(e) => handleChange("date", e.target.value)}
                        error={!!errors.date}
                        helperText={errors.date}
                    />

                    <TextField
                        label={requiredLabel("Amount")}
                        fullWidth
                        type="number"
                        inputProps={{ inputMode: "decimal", pattern: "[0-9]*" }}
                        value={formData.amount}
                        onChange={(e) => {
                            // Allow only numbers and decimal point
                            const value = e.target.value;
                            if (/^\d*\.?\d*$/.test(value)) {
                                handleChange("amount", value);
                            }
                        }}
                        error={!!errors.amount}
                        helperText={errors.amount}
                    />
                    <TextField
                        label={requiredLabel("Observed By")}
                        fullWidth
                        value={formData.observedBy}
                        onChange={(e) => handleChange("observedBy", e.target.value)}
                        error={!!errors.observedBy}
                        helperText={errors.observedBy}
                    />
                    <TextField
                        label={requiredLabel("Status")}
                        fullWidth
                        value={formData.status}
                        onChange={(e) => handleChange("status", e.target.value)}
                        error={!!errors.status}
                        helperText={errors.status}
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
                    onClick={handleSubmit}
                    variant="contained"
                    className="!bg-[#17c2af] !rounded-full !text-white !font-bold !text-sm !px-6 !py-2 !shadow-none"
                >
                    {isEdit ? "Update" : "Add"}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default WorkOrderDialog
