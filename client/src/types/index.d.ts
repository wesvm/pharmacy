type LoginResponse = {
  user: User;
  token: string;
  message?: string;
}

type ApiResonse = {
  error?: string;
  message?: string;
}

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
}

type Role = {
  id: number;
  name: string;
}

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

