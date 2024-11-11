type DataTableRowAction<TData> = {
  row: Row<TData>
  type: "update" | "delete"
}

type DataTableFilterField<TData> = {
  id: StringKeyOf<TData>
  label: string
  placeholder?: string
  options?: Option[]
}

type Option = {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
  count?: number
}

