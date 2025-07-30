import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function SessionsLoading() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header Skeleton */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-8 w-64 bg-gray-700" />
              <Skeleton className="h-4 w-96 bg-gray-700" />
            </div>
            <Skeleton className="h-10 w-40 bg-gray-700" />
          </div>

          {/* Search and Filters Skeleton */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Skeleton className="h-10 flex-1 bg-gray-700" />
            <Skeleton className="h-10 w-[180px] bg-gray-700" />
          </div>
        </div>

        {/* Tabs Skeleton */}
        <div className="space-y-6">
          <Skeleton className="h-12 w-full bg-gray-700" />

          {/* Session Cards Skeleton */}
          <div className="grid gap-4 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-3/4 bg-gray-700" />
                    <Skeleton className="h-4 w-full bg-gray-700" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-4 w-16 bg-gray-700" />
                      <Skeleton className="h-6 w-20 bg-gray-700" />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-16 bg-gray-700" />
                    <Skeleton className="h-6 w-20 bg-gray-700" />
                    <Skeleton className="h-6 w-18 bg-gray-700" />
                  </div>
                  <Skeleton className="h-10 w-full bg-gray-700" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
