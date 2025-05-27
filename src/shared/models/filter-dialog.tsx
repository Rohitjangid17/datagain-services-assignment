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
import { useFormik } from "formik"
import * as Yup from "yup"
import { FilterDialogProps } from "../interfaces/common.type"

const FilterDialog: React.FC<FilterDialogProps> = ({
    open,
    onClose,
    onFilter,
    filterData,
    setFilterData,
}) => {
    const validationSchema = Yup.object().shape({
        startDate: Yup.string()
            .required("Start Date is required")
            .test(
                "is-valid-date",
                "Start Date must be a valid date",
                (value) => Boolean(value && !isNaN(Date.parse(value)))
            ),
        endDate: Yup.string()
            .required("End Date is required")
            .test(
                "is-valid-date",
                "End Date must be a valid date",
                (value) => Boolean(value && !isNaN(Date.parse(value)))
            )
            .test(
                "is-after-start",
                "End Date cannot be before Start Date",
                function (value) {
                    const { startDate } = this.parent
                    if (!startDate || !value) return true // skip if either is missing (required will handle)
                    return new Date(value) >= new Date(startDate)
                }
            ),
    })

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            startDate: filterData.startDate || "",
            endDate: filterData.endDate || "",
        },
        validationSchema,
        onSubmit: (values) => {
            setFilterData(values)
            onFilter(values)
        },
    })

    // Helper for required label with red asterisk
    const requiredLabel = (labelText: string) => (
        <>
            {labelText} <span style={{ color: "red" }}>*</span>
        </>
    )

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Filter</DialogTitle>
            <form onSubmit={formik.handleSubmit}>
                <DialogContent>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <TextField
                            label={requiredLabel("Start Date")}
                            type="date"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            name="startDate"
                            value={formik.values.startDate}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.startDate && Boolean(formik.errors.startDate)}
                            helperText={formik.touched.startDate && formik.errors.startDate}
                        />
                        <TextField
                            label={requiredLabel("End Date")}
                            type="date"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            name="endDate"
                            value={formik.values.endDate}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.endDate && Boolean(formik.errors.endDate)}
                            helperText={formik.touched.endDate && formik.errors.endDate}
                        />
                    </div>
                </DialogContent>
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
                        Apply Filter
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default FilterDialog