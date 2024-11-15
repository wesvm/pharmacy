import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "@/setup/auth-context"
import {
  Hospital,
  IdCard,
  LogOut,
  Package,
  ShoppingBag,
  ShoppingCart,
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
    {
      title: 'Roles',
      url: '/roles',
      icon: IdCard
    },
  ],
  'store': [
    {
      title: 'Almacén',
      url: '#',
      icon: Package,
      subItems: [
        {
          title: 'Productos',
          url: '/store/products',
        },
        {
          title: 'Categorias',
          url: '/store/categories',
        },
        {
          title: 'Proveedores',
          url: '/store/suppliers',
        }
      ]
    },
    {
      title: 'Ventas',
      url: '#',
      icon: ShoppingCart,
      subItems: [
        {
          title: 'Nueva venta',
          url: '/sales/new',
        },
        {
          title: 'Entregas',
          url: '/sales/delivery',
        },
      ]
    },
    {
      title: 'Compras',
      url: '/purchases',
      icon: ShoppingBag,
    }
  ],
}

export function AppSidebar() {
  const { logout, user } = useAuth();
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
        {user?.role === 'administrador' && (
          <>
            <SidebarGroup>
              <NavMain items={items.main} />
            </SidebarGroup>
            <SidebarSeparator className="mx-0" />
          </>
        )}
        <NavSecondary label="Tienda" items={items.store} />
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
