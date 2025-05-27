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
import { useFormik } from "formik"
import * as Yup from "yup"

const WorkOrderDialog: React.FC<WorkOrderDialogProps> = ({
    open,
    onClose,
    onSubmit,
    formData,
    setFormData,
    isEdit,
}) => {
    // Yup validation schema
    const validationSchema = Yup.object({
        donor: Yup.string().required("Donor is required"),
        panels: Yup.string().required("Panels is required"),
        barcode: Yup.string().required("Barcode is required"),
        source: Yup.string().required("Source is required"),
        date: Yup.string().required("Date is required"),
        amount: Yup.number()
            .typeError("Amount must be a valid number")
            .required("Amount is required"),
        observedBy: Yup.string().required("Observed By is required"),
        status: Yup.string().required("Status is required"),
    })

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: formData,
        validationSchema,
        onSubmit: (values) => {
            console.log(values)
            setFormData(values)
            onSubmit(values)
        },
    })

    // Helper for required label with red asterisk
    const requiredLabel = (labelText: string) => (
        <>
            {labelText} <span style={{ color: "red" }}>*</span>
        </>
    )

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>{isEdit ? "Edit Work Order" : "Add Work Order"}</DialogTitle>
            <DialogContent>
                <form onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <TextField
                            label={requiredLabel("Donor")}
                            fullWidth
                            name="donor"
                            value={formik.values.donor}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.donor && Boolean(formik.errors.donor)}
                            helperText={formik.touched.donor && formik.errors.donor}
                        />
                        <TextField
                            label={requiredLabel("Panels")}
                            fullWidth
                            name="panels"
                            value={formik.values.panels}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.panels && Boolean(formik.errors.panels)}
                            helperText={formik.touched.panels && formik.errors.panels}
                        />
                        <TextField
                            label={requiredLabel("Barcode")}
                            fullWidth
                            name="barcode"
                            value={formik.values.barcode}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.barcode && Boolean(formik.errors.barcode)}
                            helperText={formik.touched.barcode && formik.errors.barcode}
                        />
                        <TextField
                            label={requiredLabel("Source")}
                            fullWidth
                            name="source"
                            value={formik.values.source}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.source && Boolean(formik.errors.source)}
                            helperText={formik.touched.source && formik.errors.source}
                        />
                        <TextField
                            label={requiredLabel("Date")}
                            type="date"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            name="date"
                            value={formik.values.date}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.date && Boolean(formik.errors.date)}
                            helperText={formik.touched.date && formik.errors.date}
                        />
                        <TextField
                            label={requiredLabel("Amount")}
                            fullWidth
                            name="amount"
                            type="number"
                            inputProps={{ inputMode: "decimal", pattern: "[0-9]*" }}
                            value={formik.values.amount}
                            onChange={(e) => {
                                // Allow only numbers and decimal point
                                const value = e.target.value
                                if (/^\d*\.?\d*$/.test(value)) {
                                    formik.handleChange(e)
                                }
                            }}
                            onBlur={formik.handleBlur}
                            error={formik.touched.amount && Boolean(formik.errors.amount)}
                            helperText={formik.touched.amount && formik.errors.amount}
                        />
                        <TextField
                            label={requiredLabel("Observed By")}
                            fullWidth
                            name="observedBy"
                            value={formik.values.observedBy}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.observedBy && Boolean(formik.errors.observedBy)}
                            helperText={formik.touched.observedBy && formik.errors.observedBy}
                        />
                        <TextField
                            label={requiredLabel("Status")}
                            fullWidth
                            name="status"
                            value={formik.values.status}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.status && Boolean(formik.errors.status)}
                            helperText={formik.touched.status && formik.errors.status}
                        />
                    </div>

                    <DialogActions>
                        <Button
                            onClick={onClose}
                            variant="outlined"
                            className="!bg-[#f4f6f5] !rounded-full !text-black !font-bold !border-black !text-sm !px-6 !py-2 !shadow-none"
                            type="button"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            className="!bg-[#17c2af] !rounded-full !text-white !font-bold !text-sm !px-6 !py-2 !shadow-none"
                            type="submit"
                        >
                            {isEdit ? "Update" : "Add"}
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default WorkOrderDialog
