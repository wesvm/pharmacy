import { useState } from "react";
import { AreaChart, BarChart, FileSearch, LineChart } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { BarVariant } from "@/components/pages/summary/chart-variants/bar-variant"
import { LineVariant } from "@/components/pages/summary/chart-variants/line-variant";
import { AreaVariant } from "@/components/pages/summary/chart-variants/area-variant";
import { type ChartConfig } from "@/components/ui/chart"

export const chartConfig = {
  totalRevenue: {
    label: "Ventas",
    color: "hsl(var(--chart-1))",
  },
  totalExpenses: {
    label: "Compras",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export const DataChartCard = ({ summary }: { summary: DailySummary[] }) => {
  const [chartType, setChartType] = useState("bar");
  const onTypeChange = (type: string) => {
    setChartType(type);
  }

  return (
    <Card className="col-span-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Resumen</CardTitle>
        <Select
          defaultValue={chartType}
          onValueChange={onTypeChange}
        >
          <SelectTrigger className="md:w-auto max-w-[200px] h-9 rounded-md px-3">
            <SelectValue placeholder="Tipo de grafico" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bar">
              <div className="flex items-center">
                <BarChart className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">Gráfico de barras</p>
              </div>
            </SelectItem>
            <SelectItem value="line">
              <div className="flex items-center">
                <LineChart className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">Gráfico de lineas</p>
              </div>
            </SelectItem>
            <SelectItem value="area">
              <div className="flex items-center">
                <AreaChart className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">Gráfico de area</p>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="pl-2">
        {summary.length === 0 ? (
          <div className="flex flex-col gap-y-4 items-center justify-center h-[350px] w-full">
            <FileSearch className="size-6 text-muted-foreground" />
            <p className="text-muted-foreground text-sm">No hay reportes para este periodo.</p>
          </div>
        ) : (
          <>
            {chartType === 'bar' && (<BarVariant data={summary} />)}
            {chartType === 'line' && (<LineVariant data={summary} />)}
            {chartType === 'area' && (<AreaVariant data={summary} />)}
          </>
        )}
      </CardContent>
    </Card>
  )
}