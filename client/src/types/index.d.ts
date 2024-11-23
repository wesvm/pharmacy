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
  from?: Date;
  to?: Date;
}

type Summary = {
  sales: SaleSummary;
  purchases: PurchaseSummary;
}

type SaleSummary = {
  totalRevenue: number;
  total: number;
}

type PurchaseSummary = {
  totalExpenses: number;
  total: number;
}