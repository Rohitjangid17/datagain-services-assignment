"use client"
import PageTitle from "@/shared/components/page-title"
import { Card, CardContent, Typography } from "@mui/material"

export default function Home() {
  return (
    <>
      <PageTitle title="Home" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="w-full">
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              Welcome to LIMS
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Laboratory Information Management System
            </Typography>
          </CardContent>
        </Card>

        <Card className="w-full">
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
      </div >
    </>
  )
}
