"use client"

import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, FormControl, InputLabel, Button } from "@mui/material"
import { CalendarEvent, EventDialogProps } from "@/shared/interfaces/common.type"



const EventDialog: React.FC<EventDialogProps> = ({
    open,
    onClose,
    onSubmit,
    formData,
    setFormData,
    currentEvent,
}) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                {currentEvent ? "Edit" : "Add"} {formData.type === "event" ? "Event" : "Reminder"}
            </DialogTitle>
            <DialogContent>
                <div className="w-96 pt-4">
                    <TextField
                        label="Title"
                        fullWidth
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        margin="normal"
                    />
                    <TextField
                        label="Date"
                        type="date"
                        fullWidth
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Type</InputLabel>
                        <Select
                            value={formData.type}
                            label="Type"
                            onChange={(e) =>
                                setFormData({ ...formData, type: e.target.value as "event" | "reminder" })
                            }
                        >
                            <MenuItem value="event">Event</MenuItem>
                            <MenuItem value="reminder">Reminder</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Color</InputLabel>
                        <Select
                            value={formData.color}
                            label="Color"
                            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                        >
                            <MenuItem value="blue">Blue</MenuItem>
                            <MenuItem value="orange">Orange</MenuItem>
                            <MenuItem value="black">Black</MenuItem>
                        </Select>
                    </FormControl>
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
                    onClick={onSubmit}
                    className="!bg-[#17c2af] !rounded-full !text-white !font-bold !text-sm !px-6 !py-2 !shadow-none"
                >
                    {currentEvent ? "Update" : "Add"}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default EventDialog
