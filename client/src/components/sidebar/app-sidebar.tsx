import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "@/setup/auth-context"
import {
  Hospital,
  LogOut,
  Settings,
  Users
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { LogoutModal } from "@/components/auth/logout-modal.tsx"
import { NavMain } from "./nav-main.tsx"
import { NavSecondary } from "./nav-secondary"

const items = {
  'main': [
    {
      title: 'Usuarios',
      url: '/users',
      icon: Users,
    },
  ],
  'settings': [
    {
      title: 'Account',
      url: '/',
      icon: Settings
    }
  ]
}

export function AppSidebar() {
  const { logout } = useAuth();
  const [open, setOpen] = useState(false)

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size='lg' asChild>
              <Link to='/' className="justify-center">
                <Hospital />
                {/* <span>Logo</span> */}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <NavMain items={items.main} />
        </SidebarGroup>
        <SidebarSeparator className="mx-0" />
        <NavSecondary label="Settings" items={items.settings} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              variant="outline"
              onClick={() => setOpen(true)}
              className="justify-center h-10"
            >
              <LogOut className="size-4" aria-hidden="true" />
              <span className="group-data-[collapsible=icon]:hidden">Cerrar sesión</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <LogoutModal open={open} onOpenChange={setOpen} logout={logout} />
    </Sidebar>
  )
}
