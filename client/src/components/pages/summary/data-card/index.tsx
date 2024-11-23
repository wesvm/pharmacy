import { formatter } from "@/lib/utils"
import { SummaryCard } from "./summary-card"
import {
  CreditCard,
  DollarSign,
  Package,
  ShoppingCart
} from "lucide-react"
import CountUp from "react-countup"

export const DataCard = ({ summary }: { summary: Summary }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <SummaryCard
        title="Total Ingresos"
        total={
          <CountUp
            preserveValue
            start={0}
            end={summary.sales.totalRevenue}
            decimals={2}
            formattingFn={(value) => formatter.format(value)}
          />
        }
        icon={DollarSign}
        variant='success'
      />
      <SummaryCard
        title="Ventas"
        total={
          <CountUp
            preserveValue
            start={0}
            end={summary.sales.total}
            prefix="+"
          />
        }
        icon={CreditCard}
        variant='success'
      />
      <SummaryCard
        title="Total Gastos"
        total={
          <CountUp
            preserveValue
            start={0}
            end={summary.purchases.totalExpenses}
            decimals={2}
            formattingFn={(value) => formatter.format(value)}
          />
        }
        icon={ShoppingCart}
        variant='danger'
      />
      <SummaryCard
        title="Compras"
        total={
          <CountUp
            preserveValue
            start={0}
            end={summary.purchases.total}
            prefix="+"
          />
        }
        icon={Package}
        variant='danger'
      />
    </div>
  )
}