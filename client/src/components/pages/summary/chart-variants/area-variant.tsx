import {
  AreaChart,
  CartesianGrid,
  Area,
  XAxis,
  YAxis
} from "recharts"
import { chartConfig } from "@/components/pages/summary/data-chart-card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";

export const AreaVariant = ({ data }: { data: DailySummary[] }) => {
  return (
    <ChartContainer config={chartConfig} className="w-full min-h-[200px]">
      <AreaChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="day"
          tickMargin={10}
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `S/ ${value}`}
        />
        <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Area
          dataKey="totalRevenue"
          type="natural"
          fill="var(--color-totalRevenue)"
          fillOpacity={0.4}
          stroke="var(--color-totalRevenue)"
          stackId="totalRevenue"
        />
        <Area
          dataKey="totalExpenses"
          type="natural"
          fill="var(--color-totalExpenses)"
          fillOpacity={0.4}
          stroke="var(--color-totalExpenses)"
          stackId="totalExpenses"
        />
      </AreaChart>
    </ChartContainer>
  )
}