import { LayoutDashboard, Plus, FileText, Download, Settings } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Create Task", url: "/create", icon: Plus },
  { title: "Task History", url: "/history", icon: FileText },
  { title: "Exports", url: "/exports", icon: Download },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary text-primary-foreground font-medium" : "hover:bg-accent/50 text-muted-foreground hover:text-foreground";

  return (
    <Sidebar className={isCollapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-card border-r">
        <div className="p-4 border-b">
          <h2 className={`font-semibold text-lg text-foreground ${isCollapsed ? 'hidden' : 'block'}`}>
            Admin Dashboard
          </h2>
          {isCollapsed && <div className="w-6 h-6 bg-primary rounded-md"></div>}
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? 'hidden' : 'block'}>
            Main Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="w-full">
                    <NavLink 
                      to={item.url} 
                      end 
                      className={({ isActive }) => 
                        `flex items-center px-3 py-2 rounded-md transition-colors ${getNavCls({ isActive })}`
                      }
                    >
                      <item.icon className={`h-4 w-4 ${isCollapsed ? '' : 'mr-3'}`} />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}