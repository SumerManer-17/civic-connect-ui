import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, MapPin, Loader2, CheckCircle, XCircle, Bot } from "lucide-react";
import Header from "@/components/Header";
import CameraCapture from "@/components/CameraCapture";
import LocationMap from "@/components/LocationMap";

const issueTypes = [
  { value: "pothole", label: "Pothole" },
  { value: "garbage", label: "Garbage" },
  { value: "drainage", label: "Drainage" },
  { value: "water_leakage", label: "Water Leakage" },
  { value: "other", label: "Other" },
];

type SubmitStatus = "idle" | "verifying" | "success" | "failure";

const ReportIssue = () => {
  const navigate = useNavigate();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [position, setPosition] = useState<[number, number]>([28.6139, 77.209]);
  const [locating, setLocating] = useState(false);
  const [locationLabel, setLocationLabel] = useState("Fetching location…");
  const [issueType, setIssueType] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");

  // Auto-detect location on mount
  useEffect(() => {
    setLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords: [number, number] = [pos.coords.latitude, pos.coords.longitude];
          setPosition(coords);
          setLocationLabel(`${coords[0].toFixed(5)}, ${coords[1].toFixed(5)}`);
          setLocating(false);
        },
        () => {
          setLocationLabel("28.61390, 77.20900 (default)");
          setLocating(false);
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      setLocationLabel("28.61390, 77.20900 (default)");
      setLocating(false);
    }
  }, []);

  const handlePositionChange = (pos: [number, number]) => {
    setPosition(pos);
    setLocationLabel(`${pos[0].toFixed(5)}, ${pos[1].toFixed(5)}`);
  };

  const handleSubmit = () => {
    setStatus("verifying");
    // Mock AI verification delay
    setTimeout(() => {
      setStatus(Math.random() > 0.2 ? "success" : "failure");
    }, 3000);
  };

  const canSubmit = capturedImage && issueType && status === "idle";

  if (status === "success" || status === "failure") {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container flex items-center justify-center py-20">
          <Card className="w-full max-w-md text-center">
            <CardContent className="pt-8 pb-8 space-y-4">
              {status === "success" ? (
                <>
                  <CheckCircle className="h-16 w-16 mx-auto text-accent" />
                  <h2 className="text-xl font-heading font-bold">Issue Reported Successfully</h2>
                  <p className="text-muted-foreground text-sm">
                    Your report has been verified by AI and submitted to the local authorities. You'll receive updates on your dashboard.
                  </p>
                </>
              ) : (
                <>
                  <XCircle className="h-16 w-16 mx-auto text-destructive" />
                  <h2 className="text-xl font-heading font-bold">Verification Failed</h2>
                  <p className="text-muted-foreground text-sm">
                    AI could not verify the issue from the provided image. Please try again with a clearer photo.
                  </p>
                </>
              )}
              <div className="flex gap-2 justify-center pt-2">
                <Button variant="outline" onClick={() => navigate("/citizen/dashboard")}>
                  Back to Dashboard
                </Button>
                {status === "failure" && (
                  <Button onClick={() => setStatus("idle")}>Try Again</Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container max-w-2xl py-6 space-y-6">
        {/* Back */}
        <Button variant="ghost" className="gap-2" onClick={() => navigate("/citizen/dashboard")}>
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Button>

        <h1 className="text-2xl font-heading font-bold">Report an Issue</h1>

        {/* Camera */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-heading">1. Capture Photo</CardTitle>
          </CardHeader>
          <CardContent>
            <CameraCapture
              capturedImage={capturedImage}
              onCapture={setCapturedImage}
              onClear={() => setCapturedImage(null)}
            />
          </CardContent>
        </Card>

        {/* Location */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-heading">2. Confirm Location</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {locating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <MapPin className="h-4 w-4 text-primary" />
              )}
              <span>{locationLabel}</span>
            </div>
            {!locating && (
              <>
                <LocationMap position={position} onPositionChange={handlePositionChange} />
                <p className="text-xs text-muted-foreground">Drag the marker or tap the map to adjust location.</p>
              </>
            )}
          </CardContent>
        </Card>

        {/* Issue Type */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-heading">3. Issue Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Issue Type</Label>
              <Select value={issueType} onValueChange={setIssueType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select issue type" />
                </SelectTrigger>
                <SelectContent>
                  {issueTypes.map((t) => (
                    <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Description (optional)</Label>
              <Textarea
                placeholder="Briefly describe the issue…"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        {status === "verifying" ? (
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="pt-6 flex items-center gap-3">
              <Bot className="h-5 w-5 text-primary animate-pulse" />
              <div>
                <p className="font-medium text-sm">AI Verification in Progress</p>
                <p className="text-xs text-muted-foreground">Analyzing image and validating issue…</p>
              </div>
              <Loader2 className="h-4 w-4 animate-spin ml-auto text-primary" />
            </CardContent>
          </Card>
        ) : (
          <Button className="w-full" size="lg" disabled={!canSubmit} onClick={handleSubmit}>
            Submit Report
          </Button>
        )}

        <div className="h-8" />
      </div>
    </div>
  );
};

export default ReportIssue;
