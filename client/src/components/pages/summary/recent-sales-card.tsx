import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { formatter } from "@/lib/utils";
import { FileSearch } from "lucide-react";

export const RecentSalesCard = ({ summary }: { summary: UserSummary[] }) => {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Ventas recientes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 overflow-y-auto h-80">
          {summary.length === 0 ? (
            <div className="flex flex-col gap-y-4 items-center justify-center h-full w-full">
              <FileSearch className="size-6 text-muted-foreground" />
              <p className="text-muted-foreground text-sm">No hay reportes para este periodo.</p>
            </div>
          ) : (
            summary.map((user) => (
              <div key={user.id} className="flex items-center">
                <Avatar className="size-9">
                  <AvatarImage src="/avatars/01.png" alt="Avatar" />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
                <div className="ml-auto font-medium">
                  <p className="text-sm">+${formatter.format(user.totalRevenue)}</p>
                  <p className="text-xs text-muted-foreground">{user.totalSales} ventas</p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>

  )
}