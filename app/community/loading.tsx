import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function CommunityLoading() {
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
            <Skeleton className="h-10 w-32 bg-gray-700" />
          </div>
          <Skeleton className="h-10 w-64 bg-gray-700" />
        </div>

        {/* Tabs Skeleton */}
        <div className="space-y-6">
          <Skeleton className="h-12 w-full bg-gray-700" />

          {/* Feed Posts Skeleton */}
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <Skeleton className="w-10 h-10 rounded-full bg-gray-700" />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-24 bg-gray-700" />
                        <Skeleton className="h-5 w-16 bg-gray-700" />
                        <Skeleton className="h-4 w-16 bg-gray-700" />
                      </div>
                      <Skeleton className="h-4 w-full bg-gray-700" />
                      <Skeleton className="h-4 w-3/4 bg-gray-700" />
                      <div className="flex gap-2">
                        <Skeleton className="h-5 w-16 bg-gray-700" />
                        <Skeleton className="h-5 w-20 bg-gray-700" />
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-6 pt-2 border-t border-gray-700">
                    <Skeleton className="h-8 w-16 bg-gray-700" />
                    <Skeleton className="h-8 w-16 bg-gray-700" />
                    <Skeleton className="h-8 w-16 bg-gray-700" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
