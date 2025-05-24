"use client"
import { useAppSelector } from "@/lib/redux/hooks"
import { Card, CardContent, Typography } from "@mui/material"

export default function Home() {
  const { isExpanded } = useAppSelector((state) => state.sidebar)

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Home</h1>
      </div>

      <div className="flex flex-wrap gap-4">
        <Card sx={{ minWidth: 275, maxWidth: 400 }}>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              Welcome to LIMS
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Laboratory Information Management System
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 275, maxWidth: 400 }}>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              Quick Stats
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Work Orders: 6
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Calendar Events: 7
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
