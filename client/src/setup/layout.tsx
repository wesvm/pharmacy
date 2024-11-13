import {
  Outlet
} from "react-router-dom"
import { ModeToggle } from "@/components/mode-toggle"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { SidebarToggle } from "@/components/sidebar/sidebar-toggle"
import { UserNav } from "@/components/sidebar/user-nav"
import {
  SidebarInset,
  SidebarProvider
} from "@/components/ui/sidebar"

const Layout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary px-4 z-50">
          <SidebarToggle />
          <div className="flex flex-1 items-center justify-end space-x-2 sm:mx-8">
            <ModeToggle />
            <UserNav />
          </div>
        </header>
        <div className="container contain-size mx-auto py-4 px-10 space-y-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default Layout