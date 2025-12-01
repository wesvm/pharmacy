import { Link, useLocation } from '@tanstack/react-router'
import { ChevronRight, type LucideIcon } from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/ui/sidebar'

interface NavProps {
  title: string
  url: string
  icon: LucideIcon
  subItems?: {
    title: string
    url: string
  }[]
}

export function NavMain({ items }: { items: NavProps[] }) {
  const location = useLocation()
  const { setOpenMobile } = useSidebar()

  return (
    <SidebarMenu>
      {items.map((item) =>
        item.subItems ? (
          <Collapsible
            key={item.title}
            defaultOpen={item.subItems.some((subItem) => location.pathname.startsWith(subItem.url))}
            asChild
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  tooltip={item.title}
                  isActive={item.subItems.some((subItem) =>
                    location.pathname.startsWith(subItem.url)
                  )}
                  asChild
                >
                  <button type="button">
                    <item.icon />
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </button>
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.subItems.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton isActive={location.pathname === subItem.url} asChild>
                        <Link to={subItem.url} onClick={() => setOpenMobile(false)}>
                          <span>{subItem.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ) : (
          <SidebarMenuButton
            key={item.title}
            isActive={
              item.url === '/'
                ? location.pathname === item.url
                : location.pathname.startsWith(item.url)
            }
            tooltip={item.title}
            asChild
          >
            <Link to={item.url} onClick={() => setOpenMobile(false)}>
              <item.icon />
              <span>{item.title}</span>
              {item.subItems && (
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              )}
            </Link>
          </SidebarMenuButton>
        )
      )}
    </SidebarMenu>
  )
}
