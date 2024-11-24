import { getSummary } from "@/api/summary/queries";
import { DataCard } from "@/components/pages/summary/data-card";
import { DataCardLoading } from "@/components/pages/summary/data-card/loading";
import { DateFilter } from "@/components/pages/summary/date-filter";
import { SimpleCard } from "@/components/simple-card";
import { useDateFilters } from "@/hooks/use-date-filters";
import { useQuery } from "@tanstack/react-query";
import SEO from "@/setup/seo";
import { DataChartCard } from "@/components/pages/summary/data-chart-card";
import { RecentSalesCard } from "@/components/pages/summary/recent-sales-card";
import { DataChartLoading } from "@/components/pages/summary/data-chart-loading";

export default function SummaryPage() {
  const { from, to } = useDateFilters();
  const { status, data } = useQuery({
    queryKey: ['summary', from.toString(), to.toString],
    queryFn: () => getSummary(from.toISOString(), to.toISOString()),
    enabled: !!from && !!to
  });

  return (
    <SEO
      title="Pharmacy"
      description="Visualiza el resumen de compras, ventas, etc."
    >
      <SimpleCard className="mb-4 flex items-center justify-between">
        <h1 className="font-bold text-2xl">Reportes</h1>
        <DateFilter />
      </SimpleCard>
      {status === 'pending' && (
        <>
          <DataCardLoading />
          <DataChartLoading />
        </>
      )}
      {status === 'success' && (
        <>
          <DataCard summary={data} />
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
            <DataChartCard summary={data.daily} />
            <RecentSalesCard summary={data.salesByUser} />
          </div>
        </>
      )}
    </SEO>
  )
}