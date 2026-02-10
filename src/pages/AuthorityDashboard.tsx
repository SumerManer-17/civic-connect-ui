import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard, AlertTriangle, CheckCircle, Clock, MapPin,
  BarChart3, Settings, LogOut, Menu, X
} from "lucide-react";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Overview", active: true },
  { icon: AlertTriangle, label: "Open Issues" },
  { icon: CheckCircle, label: "Resolved" },
  { icon: MapPin, label: "Map View" },
  { icon: BarChart3, label: "Analytics" },
  { icon: Settings, label: "Settings" },
];

const recentIssues = [
  { id: 1, title: "Water main break on Elm Street", priority: "High", status: "Open", area: "Ward 3", date: "2026-02-10" },
  { id: 2, title: "Pothole cluster near City Hall", priority: "Medium", status: "Assigned", area: "Ward 1", date: "2026-02-09" },
  { id: 3, title: "Illegal dumping at River Park", priority: "High", status: "Open", area: "Ward 5", date: "2026-02-09" },
  { id: 4, title: "Traffic signal malfunction", priority: "Critical", status: "In Progress", area: "Ward 2", date: "2026-02-08" },
  { id: 5, title: "Sidewalk repair needed", priority: "Low", status: "Open", area: "Ward 4", date: "2026-02-07" },
];

const priorityVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  Critical: "destructive",
  High: "default",
  Medium: "secondary",
  Low: "outline",
};

const AuthorityDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Overview");

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-sidebar text-sidebar-foreground
          transform transition-transform duration-200 md:relative md:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
          <span className="font-heading font-bold text-lg text-sidebar-primary">CivicPulse Admin</span>
          <Button variant="ghost" size="icon" className="md:hidden text-sidebar-foreground hover:bg-sidebar-accent" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="p-3 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.label}
              onClick={() => { setActiveItem(item.label); setSidebarOpen(false); }}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors
                ${activeItem === item.label
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                }
              `}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-4 left-3 right-3">
          <Link to="/">
            <Button variant="ghost" className="w-full justify-start gap-2 text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground">
              <LogOut className="h-4 w-4" /> Sign Out
            </Button>
          </Link>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-foreground/20 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b bg-card flex items-center px-4 gap-4">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="font-heading font-semibold text-lg">{activeItem}</h1>
        </header>

        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {/* Summary */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Open Issues", value: "47", icon: AlertTriangle, color: "text-destructive" },
              { label: "In Progress", value: "23", icon: Clock, color: "text-warning" },
              { label: "Resolved (Month)", value: "156", icon: CheckCircle, color: "text-accent" },
              { label: "Avg. Response", value: "2.1 days", icon: BarChart3, color: "text-primary" },
            ].map((stat) => (
              <Card key={stat.label}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    <div>
                      <p className="text-xl font-bold">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Issues table */}
          <Card>
            <CardHeader>
              <CardTitle className="font-heading text-lg">Recent Submissions</CardTitle>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left px-6 py-3 font-medium text-muted-foreground">Issue</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">Area</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Priority</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Status</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {recentIssues.map((issue) => (
                    <tr key={issue.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-3 font-medium">{issue.title}</td>
                      <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{issue.area}</td>
                      <td className="px-4 py-3">
                        <Badge variant={priorityVariant[issue.priority]}>{issue.priority}</Badge>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{issue.status}</td>
                      <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell">{issue.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default AuthorityDashboard;
