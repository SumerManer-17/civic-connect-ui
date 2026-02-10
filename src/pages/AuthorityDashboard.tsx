import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  LayoutDashboard, AlertTriangle, CheckCircle, Clock, MapPin,
  BarChart3, Settings, LogOut, Menu, X, Filter, Bot
} from "lucide-react";
import { mockComplaints, issueTypeLabels } from "@/data/mockComplaints";
import ComplaintList from "@/components/ComplaintList";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Overview" },
  { icon: AlertTriangle, label: "Open Issues" },
  { icon: CheckCircle, label: "Resolved" },
  { icon: MapPin, label: "Map View" },
  { icon: BarChart3, label: "Analytics" },
  { icon: Settings, label: "Settings" },
];

const AuthorityDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Overview");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [issueTypeFilter, setIssueTypeFilter] = useState("all");

  const filtered = useMemo(() => {
    return mockComplaints.filter((c) => {
      if (severityFilter !== "all" && c.severity !== severityFilter) return false;
      if (issueTypeFilter !== "all" && c.issueType !== issueTypeFilter) return false;
      return true;
    });
  }, [severityFilter, issueTypeFilter]);

  const stats = useMemo(() => ({
    open: mockComplaints.filter((c) => c.status === "Open").length,
    inProgress: mockComplaints.filter((c) => c.status === "In Progress" || c.status === "Assigned").length,
    resolved: mockComplaints.filter((c) => c.status === "Resolved").length,
    totalDuplicates: mockComplaints.reduce((sum, c) => sum + c.duplicateCount, 0),
  }), []);

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
          <Badge variant="secondary" className="ml-auto gap-1 text-xs">
            <Bot className="h-3 w-3" /> AI Processing Active
          </Badge>
        </header>

        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {/* Summary */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Open Issues", value: String(stats.open), icon: AlertTriangle, color: "text-destructive" },
              { label: "In Progress", value: String(stats.inProgress), icon: Clock, color: "text-warning" },
              { label: "Resolved", value: String(stats.resolved), icon: CheckCircle, color: "text-accent" },
              { label: "Total Reports", value: String(stats.totalDuplicates), icon: BarChart3, color: "text-primary" },
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

          {/* Filters */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Filter className="h-4 w-4" /> Filters
            </div>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severity</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={issueTypeFilter} onValueChange={setIssueTypeFilter}>
              <SelectTrigger className="w-44">
                <SelectValue placeholder="Issue Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {Object.entries(issueTypeLabels).map(([key, label]) => (
                  <SelectItem key={key} value={key}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {(severityFilter !== "all" || issueTypeFilter !== "all") && (
              <Button variant="ghost" size="sm" onClick={() => { setSeverityFilter("all"); setIssueTypeFilter("all"); }}>
                Clear
              </Button>
            )}
            <span className="text-xs text-muted-foreground ml-auto">
              {filtered.length} of {mockComplaints.length} complaints
            </span>
          </div>

          {/* Complaint list */}
          <ComplaintList complaints={filtered} />
        </main>
      </div>
    </div>
  );
};

export default AuthorityDashboard;
