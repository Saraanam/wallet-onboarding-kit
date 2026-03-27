import { FC, ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { NavLink } from "@/components/NavLink";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { LogOut, type LucideIcon } from "lucide-react";

interface NavItem {
  title: string;
  url: string;
  icon: LucideIcon;
}

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  navItems: NavItem[];
  roleColor: string;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children, title, navItems, roleColor }) => {
  const { publicKey } = useWallet();
  const location = useLocation();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar collapsible="icon">
          <SidebarContent>
            <div className="p-4 border-b border-border">
              <Link to="/" className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg flex items-center justify-center text-primary-foreground text-xs font-bold" style={{ background: "var(--gradient-primary)" }}>
                  KW
                </div>
                <span className="font-display font-bold text-foreground">KetchWeave</span>
              </Link>
            </div>
            <SidebarGroup>
              <SidebarGroupLabel>{title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={location.pathname === item.url}>
                        <NavLink to={item.url} end activeClassName="bg-primary/10 text-primary font-medium">
                          <item.icon className="mr-2 h-4 w-4" />
                          <span>{item.title}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <div className="mt-auto p-4 border-t border-border">
              <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <LogOut className="h-4 w-4" />
                <span>Back to Home</span>
              </Link>
            </div>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 flex flex-col min-h-screen">
          <header className="h-14 flex items-center justify-between border-b border-border px-4 bg-card">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <h1 className="font-display font-semibold text-foreground">{title}</h1>
            </div>
            <div className="flex items-center gap-3">
              {publicKey && (
                <span className="text-xs text-muted-foreground font-mono">
                  {publicKey.toBase58().slice(0, 4)}...{publicKey.toBase58().slice(-4)}
                </span>
              )}
              <WalletMultiButton style={{ height: 36, fontSize: 13 }} />
            </div>
          </header>
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
