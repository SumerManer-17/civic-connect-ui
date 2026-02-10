import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, AlertTriangle, CheckCircle, Clock, LogOut } from "lucide-react";
import Header from "@/components/Header";

const mockIssues = [
  { id: 1, title: "Pothole on Main Street", status: "In Progress", category: "Roads", date: "2026-02-08" },
  { id: 2, title: "Broken streetlight near Park Ave", status: "Submitted", category: "Lighting", date: "2026-02-06" },
  { id: 3, title: "Overflowing drain on 5th Avenue", status: "Resolved", category: "Drainage", date: "2026-01-28" },
];

const statusConfig: Record<string, { variant: "default" | "secondary" | "outline"; icon: typeof Clock }> = {
  "Submitted": { variant: "secondary", icon: Clock },
  "In Progress": { variant: "default", icon: AlertTriangle },
  "Resolved": { variant: "outline", icon: CheckCircle },
};

const CitizenDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-8">
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-heading font-bold">My Dashboard</h1>
            <p className="text-muted-foreground text-sm">Track and manage your reported issues</p>
          </div>
          <div className="flex gap-2">
            <Link to="/citizen/report">
              <Button className="gap-2">
                <PlusCircle className="h-4 w-4" /> Report Issue
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" size="icon">
                <LogOut className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-muted-foreground">Total Reports</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">1</p>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">1</p>
                <p className="text-sm text-muted-foreground">Resolved</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Issues list */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-lg">Recent Reports</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {mockIssues.map((issue) => {
                const config = statusConfig[issue.status];
                const StatusIcon = config.icon;
                return (
                  <div key={issue.id} className="flex items-center justify-between px-6 py-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <StatusIcon className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-sm">{issue.title}</p>
                        <p className="text-xs text-muted-foreground">{issue.category} · {issue.date}</p>
                      </div>
                    </div>
                    <Badge variant={config.variant}>{issue.status}</Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CitizenDashboard;
