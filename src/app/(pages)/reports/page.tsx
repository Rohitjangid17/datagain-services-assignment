"use client"

import { useState } from "react"
import { Paper, Typography, FormControl, InputLabel, Select, MenuItem, TextField, Button, Radio, RadioGroup, FormControlLabel, } from "@mui/material";
import PageTitle from "@/shared/components/page-title";

export default function ReportsPage() {
  const [reportType, setReportType] = useState("")
  const [startDate, setStartDate] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [agency, setAgency] = useState("")
  const [format, setFormat] = useState("")
  const [useDate, setUseDate] = useState("collected")

  const handleSubmit = () => {
    console.log({
      reportType,
      startDate,
      dueDate,
      agency,
      format,
      useDate,
    })
  }

  return (
    <div className="">
      <PageTitle title="Add Work Order" />

      <Paper className="p-6">
        <div className="grid grid-cols-1 gap-6">
          <div className="w-full">
            <FormControl fullWidth>
              <InputLabel>Select Report Type</InputLabel>
              <Select value={reportType} label="Select Report Type" onChange={(e) => setReportType(e.target.value)}>
                <MenuItem value="daily">Daily Report</MenuItem>
                <MenuItem value="weekly">Weekly Report</MenuItem>
                <MenuItem value="monthly">Monthly Report</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="w-full">
              <TextField
                label="Start Date"
                type="date"
                fullWidth
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </div>

            <div className="w-full">
              <TextField
                label="Due Date"
                type="date"
                fullWidth
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="w-full">
              <FormControl fullWidth>
                <InputLabel>Agency</InputLabel>
                <Select value={agency} label="Agency" onChange={(e) => setAgency(e.target.value)}>
                  <MenuItem value="agency1">Agency 1</MenuItem>
                  <MenuItem value="agency2">Agency 2</MenuItem>
                  <MenuItem value="agency3">Agency 3</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="w-full">
              <FormControl fullWidth>
                <InputLabel>Select Format</InputLabel>
                <Select value={format} label="Select Format" onChange={(e) => setFormat(e.target.value)}>
                  <MenuItem value="pdf">PDF</MenuItem>
                  <MenuItem value="excel">Excel</MenuItem>
                  <MenuItem value="csv">CSV</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>

          <div className="w-full">
            <Typography variant="subtitle1" gutterBottom>
              Use Date
            </Typography>
            <RadioGroup row value={useDate} onChange={(e) => setUseDate(e.target.value)}>
              <FormControlLabel value="collected" control={<Radio color="primary" />} label="Collected" />
            </RadioGroup>
          </div>

          <div className="w-full flex justify-end">
            <Button variant="contained" color="primary" onClick={handleSubmit} size="large">
              Submit
            </Button>
          </div>
        </div>
      </Paper>
    </div>
  )
}
