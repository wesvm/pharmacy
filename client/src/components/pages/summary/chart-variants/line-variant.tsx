import {
  CartesianGrid,
  Line,
  LineChart,
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

export const LineVariant = ({ data }: { data: DailySummary[] }) => {
  return (
    <ChartContainer config={chartConfig} className="w-full min-h-[200px]">
      <LineChart accessibilityLayer data={data}>
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
        <Line
          dot={false}
          dataKey="totalRevenue"
          type="monotone"
          stroke="var(--color-totalRevenue)"
          strokeWidth={2}
        />
        <Line
          dot={false}
          dataKey="totalExpenses"
          type="monotone"
          stroke="var(--color-totalExpenses)"
          strokeWidth={2}
        />
      </LineChart>
    </ChartContainer>
  )
}