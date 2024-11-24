import { SimpleCard } from "@/components/simple-card"
import { Avatar } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"

export const DataChartLoading = () => {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
      <SimpleCard className="col-span-4 rounded-lg bg-card shadow-sm p-6">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <Skeleton className="h-8 w-28" />
          <Skeleton className="md:w-44 max-w-[200px] h-9" />
        </div>
        <Skeleton className="shrink-0 h-96 w-full my-2" />
      </SimpleCard>
      <SimpleCard className="col-span-3 rounded-lg bg-card shadow-sm p-6">
        <Skeleton className="h-8 w-44 mb-2" />
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-center py-2">
            <Avatar className="size-9">
              <Skeleton className="h-9 w-9 rounded-full" />
            </Avatar>
            <div className="ml-4 space-y-1 flex-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
            <div className="ml-auto text-right">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-3 w-12" />
            </div>
          </div>
        ))}
      </SimpleCard>
    </div>
  )
}