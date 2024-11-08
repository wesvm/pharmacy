import { Link, useLocation } from "react-router-dom"
import { ChevronRight, LucideIcon } from "lucide-react"
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";

interface NavProps {
  title: string;
  url: string;
  icon: LucideIcon;
  subItems?: {
    title: string;
    url: string;
  }[];
}

export function NavMain({
  items,
}: {
  items: NavProps[]
}) {
  const location = useLocation();

  return (
    <SidebarMenu>
      {items.map((item) => (
        <Collapsible
          key={item.title}
          asChild
          className="group/collapsible"
        >
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton
                isActive={item.url === '/' ? location.pathname === item.url : location.pathname.startsWith(item.url)}
                tooltip={item.title}
                asChild
              >
                <Link to={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                  {item.subItems && (
                    <ChevronRight
                      className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  )
                  }
                </Link>
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {item.subItems?.map((subItem) => (
                  <SidebarMenuSubItem key={subItem.title}>
                    <SidebarMenuSubButton asChild>
                      <Link to={subItem.url}>
                        <span>{subItem.title}</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      ))
      }
    </SidebarMenu >
  )
}