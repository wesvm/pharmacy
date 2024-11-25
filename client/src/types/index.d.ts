type DataTableRowAction<TData> = {
  row: Row<TData>
  type: "update" | "delete"
}

type DataTableFilterField<TData> = {
  id: StringKeyOf<TData>
  label: string,
  status?: "error" | "success" | "pending"
  placeholder?: string
  options?: Option[]
}

type Option = {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
  count?: number
}

type DateFilters = {
  from?: Date | string;
  to?: Date | string;
}

type Summary = {
  sales: SaleSummary;
  purchases: PurchaseSummary;
  daily: DailySummary[];
  salesByUser: UserSummary[];
}

type DailySummary = {
  day: string;
  totalExpenses: number;
  totalRevenue: number;
}

type UserSummary = User & {
  totalSales: number;
  totalRevenue: number;
}