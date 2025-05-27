"use client"

import React from "react"
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button,
} from "@mui/material"
import { useFormik } from "formik"
import * as Yup from "yup"
import { EventDialogProps } from "@/shared/interfaces/common.type"

const EventDialog: React.FC<EventDialogProps> = ({
    open,
    onClose,
    onSubmit,
    formData,
    setFormData,
    currentEvent,
}) => {
    const validationSchema = Yup.object({
        title: Yup.string().required("Title is required"),
        date: Yup.string()
            .required("Date is required")
            .test(
                "is-valid-date",
                "Date must be a valid date",
                (value) => Boolean(value && !isNaN(Date.parse(value)))
            ),
        type: Yup.string()
            .oneOf(["event", "reminder"])
            .required("Type is required"),
        color: Yup.string()
            .oneOf(["blue", "orange", "black"])
            .required("Color is required"),
    })

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: formData.title || "",
            date: formData.date || "",
            type: formData.type || "event",
            color: formData.color || "blue",
        },
        validationSchema,
        onSubmit: (values) => {
            setFormData(values)
            onSubmit()
        },
    })

    // Helper for required label with red asterisk
    const requiredLabel = (labelText: string) => (
        <>
            {labelText} <span style={{ color: "red" }}>*</span>
        </>
    )

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                {currentEvent ? "Edit" : "Add"} {formik.values.type === "event" ? "Event" : "Reminder"}
            </DialogTitle>
            <form onSubmit={formik.handleSubmit}>
                <DialogContent>
                    <div className="w-96 pt-4">
                        <TextField
                            label={requiredLabel("Title")}
                            fullWidth
                            margin="normal"
                            name="title"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.title && Boolean(formik.errors.title)}
                            helperText={formik.touched.title && formik.errors.title}
                        />
                        <TextField
                            label={requiredLabel("Date")}
                            type="date"
                            fullWidth
                            margin="normal"
                            name="date"
                            InputLabelProps={{ shrink: true }}
                            value={formik.values.date}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.date && Boolean(formik.errors.date)}
                            helperText={formik.touched.date && formik.errors.date}
                        />
                        <FormControl
                            fullWidth
                            margin="normal"
                            error={formik.touched.type && Boolean(formik.errors.type)}
                        >
                            <InputLabel>Type</InputLabel>
                            <Select
                                name="type"
                                value={formik.values.type}
                                label={requiredLabel("Type")}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                                <MenuItem value="event">Event</MenuItem>
                                <MenuItem value="reminder">Reminder</MenuItem>
                            </Select>
                            {formik.touched.type && formik.errors.type && (
                                <p style={{ color: "#d32f2f", fontSize: "0.75rem", marginTop: 3 }}>
                                    {formik.errors.type}
                                </p>
                            )}
                        </FormControl>
                        <FormControl
                            fullWidth
                            margin="normal"
                            error={formik.touched.color && Boolean(formik.errors.color)}
                        >
                            <InputLabel>Color</InputLabel>
                            <Select
                                name="color"
                                value={formik.values.color}
                                label={requiredLabel("Color")}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                                <MenuItem value="blue">Blue</MenuItem>
                                <MenuItem value="orange">Orange</MenuItem>
                                <MenuItem value="black">Black</MenuItem>
                            </Select>
                            {formik.touched.color && formik.errors.color && (
                                <p style={{ color: "#d32f2f", fontSize: "0.75rem", marginTop: 3 }}>
                                    {formik.errors.color}
                                </p>
                            )}
                        </FormControl>
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
                        type="submit"
                        variant="contained"
                        className="!bg-[#17c2af] !rounded-full !text-white !font-bold !text-sm !px-6 !py-2 !shadow-none"
                    >
                        {currentEvent ? "Update" : "Add"}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default EventDialog
