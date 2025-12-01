import type { LucideIcon } from 'lucide-react'
import { NavMain } from '@/components/sidebar/nav-main'
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel } from '@/components/ui/sidebar'

export function NavSecondary({
  label,
  items,
  ...props
}: {
  label: string
  items: {
    title: string
    url: string
    icon: LucideIcon
    badge?: React.ReactNode
  }[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <NavMain items={items} />
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
