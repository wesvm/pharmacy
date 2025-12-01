import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { getSummary } from '@/api/summary/queries'
import { DataCard } from '@/components/pages/summary/data-card'
import { DataCardLoading } from '@/components/pages/summary/data-card/loading'
import { DataChartCard } from '@/components/pages/summary/data-chart-card'
import { DataChartLoading } from '@/components/pages/summary/data-chart-loading'
import { DateFilter } from '@/components/pages/summary/date-filter'
import { RecentSalesCard } from '@/components/pages/summary/recent-sales-card'
import { SimpleCard } from '@/components/simple-card'
import { useDateFilters } from '@/hooks/use-date-filters'

export const Route = createFileRoute('/_layout/')({
  component: Index,
  validateSearch: (search: Record<string, unknown>): {
    from?: string
    to?: string
  } => {
    return {
      from: (search.from as string) || undefined,
      to: (search.to as string) || undefined,
    }
  },
  head: () => {
    return {
      meta: [
        { title: 'Pharmacy' },
        {
          name: 'description',
          content: 'Visualiza el resumen de compras, ventas, etc.',
        },
      ],
    }
  },
})

function Index() {
  const { from, to } = useDateFilters()
  const dateFrom = from.toISOString().split('T')[0]
  const dateTo = to.toISOString().split('T')[0]
  const { status, data } = useQuery({
    queryKey: ['summary', { dateFrom, dateTo }],
    queryFn: () => getSummary({ from: from.toISOString(), to: to.toISOString() }),
    enabled: !!dateFrom && !!dateTo,
  })

  return (
    <>
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
    </>
  )
}
