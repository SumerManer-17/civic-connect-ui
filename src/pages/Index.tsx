import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, BarChart3, Users, ArrowRight, CheckCircle, MapPin, Clock } from "lucide-react";
import Header from "@/components/Header";

const stats = [
  { label: "Issues Reported", value: "12,450+", icon: AlertTriangle },
  { label: "Issues Resolved", value: "9,800+", icon: CheckCircle },
  { label: "Active Citizens", value: "35,000+", icon: Users },
  { label: "Avg. Resolution", value: "4.2 days", icon: Clock },
];

const features = [
  {
    icon: MapPin,
    title: "Location-Based Reporting",
    description: "Pinpoint civic issues on a map for precise reporting and faster resolution by local authorities.",
  },
  {
    icon: BarChart3,
    title: "AI-Powered Prioritization",
    description: "Machine learning algorithms analyze and prioritize issues based on severity and community impact.",
  },
  {
    icon: Users,
    title: "Community Engagement",
    description: "Citizens can upvote issues, track progress, and collaborate with neighbors for collective impact.",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-primary py-20 md:py-28">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(210_50%_40%),transparent_70%)]" />
        </div>
        <div className="container relative text-center">
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-primary-foreground mb-4 max-w-3xl mx-auto leading-tight">
            Report Civic Issues.<br />Drive Real Change.
          </h1>
          <p className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            An AI-powered platform connecting citizens with local authorities to identify, prioritize, and resolve community issues faster.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/citizen/login">
              <Button size="lg" variant="secondary" className="gap-2 font-semibold">
                Report an Issue <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/authority/login">
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                Authority Portal
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="text-center">
              <CardContent className="pt-6">
                <stat.icon className="h-8 w-8 mx-auto mb-2 text-accent" />
                <p className="text-2xl font-bold font-heading text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="container py-12 pb-20">
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-center mb-2">How It Works</h2>
        <p className="text-muted-foreground text-center mb-10 max-w-xl mx-auto">
          A simple three-step process to make your community better.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f) => (
            <Card key={f.title} className="border bg-card hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card py-8">
        <div className="container text-center text-sm text-muted-foreground">
          © 2026 CivicPulse. Built for better communities.
        </div>
      </footer>
    </div>
  );
};

export default Index;
