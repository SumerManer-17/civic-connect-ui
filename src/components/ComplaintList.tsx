import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Bot } from "lucide-react";
import { MockComplaint, issueTypeLabels } from "@/data/mockComplaints";

const severityColor: Record<string, string> = {
  Low: "bg-muted text-muted-foreground",
  Medium: "bg-warning/15 text-warning border-warning/30",
  High: "bg-destructive/10 text-destructive border-destructive/30",
};

const priorityVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  Critical: "destructive",
  High: "default",
  Medium: "secondary",
  Low: "outline",
};

interface Props {
  complaints: MockComplaint[];
}

const ComplaintList = ({ complaints }: Props) => {
  if (complaints.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center text-muted-foreground">
          No complaints match the selected filters.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {complaints.map((c) => (
        <Card key={c.id} className="overflow-hidden hover:shadow-md transition-shadow">
          <CardContent className="p-0">
            <div className="flex flex-col sm:flex-row">
              {/* Image */}
              <div className="sm:w-40 md:w-48 h-36 sm:h-auto flex-shrink-0">
                <img
                  src={c.imageUrl}
                  alt={c.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="flex-1 p-4 flex flex-col gap-2 min-w-0">
                {/* Top row: title + priority */}
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-medium text-sm leading-snug line-clamp-2">{c.title}</h3>
                  <Badge variant={priorityVariant[c.priority]} className="flex-shrink-0 text-xs">
                    {c.priority}
                  </Badge>
                </div>

                {/* Description */}
                <p className="text-xs text-muted-foreground line-clamp-2">{c.description}</p>

                {/* Tags row */}
                <div className="flex flex-wrap items-center gap-1.5 mt-auto">
                  {/* Issue type */}
                  <span className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium bg-primary/8 text-primary border-primary/20">
                    {issueTypeLabels[c.issueType]}
                  </span>

                  {/* Severity */}
                  <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium ${severityColor[c.severity]}`}>
                    {c.severity}
                  </span>

                  {/* Duplicate cluster */}
                  {c.duplicateCount > 1 && (
                    <span className="inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs text-muted-foreground">
                      <Users className="h-3 w-3" />
                      {c.duplicateCount} reports
                    </span>
                  )}

                  {/* AI confidence */}
                  <span className="inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs text-muted-foreground ml-auto">
                    <Bot className="h-3 w-3" />
                    {c.aiConfidence}% AI
                  </span>
                </div>

                {/* Bottom row: area + date + status */}
                <div className="flex items-center gap-3 text-xs text-muted-foreground pt-1 border-t">
                  <span>{c.area}</span>
                  <span>{c.date}</span>
                  <span className="ml-auto font-medium text-foreground">{c.status}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ComplaintList;
