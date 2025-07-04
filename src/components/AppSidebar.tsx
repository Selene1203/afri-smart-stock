
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Home, ShoppingCart, Package, TrendingUp, Bot, LogOut, Settings } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { useUser } from "@/context/UserContext";

const menuItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Sales Entry", url: "/sales", icon: ShoppingCart },
  { title: "Restock Suggestions", url: "/restock", icon: Package },
  { title: "Sales Insights", url: "/insights", icon: TrendingUp },
  { title: "AI Assistant", url: "/assistant", icon: Bot },
];

export function AppSidebar() {
  const location = useLocation();
  const { user, logout } = useUser();
  const { state } = useSidebar();

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <div className="p-4">
          <h2 className="text-lg font-semibold">Yarona Pharmacy</h2>
          <p className="text-sm text-gray-600">{user?.businessName}</p>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url}
                  >
                    <Link to={item.url}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={logout}>
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
