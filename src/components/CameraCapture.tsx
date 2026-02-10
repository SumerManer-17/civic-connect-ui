import { useRef, useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Camera, X } from "lucide-react";

interface CameraCaptureProps {
  onCapture: (imageData: string) => void;
  capturedImage: string | null;
  onClear: () => void;
}

const CameraCapture = ({ onCapture, capturedImage, onClear }: CameraCaptureProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [pendingStream, setPendingStream] = useState<MediaStream | null>(null);

  const startCamera = useCallback(async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });
      streamRef.current = stream;
      setPendingStream(stream);
      setStreaming(true);
    } catch (err) {
      console.error("Camera error:", err);
      setError("Camera access denied or unavailable. Please check permissions.");
    }
  }, []);

  // Attach stream to video element after it renders
  useEffect(() => {
    if (pendingStream && videoRef.current) {
      videoRef.current.srcObject = pendingStream;
      setPendingStream(null);
    }
  }, [pendingStream, streaming]);

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setPendingStream(null);
    setStreaming(false);
  }, []);

  const takePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    canvas.getContext("2d")?.drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
    onCapture(dataUrl);
    stopCamera();
  }, [onCapture, stopCamera]);

  if (capturedImage) {
    return (
      <div className="relative">
        <img src={capturedImage} alt="Captured" className="w-full rounded-lg border object-cover max-h-64" />
        <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-8 w-8" onClick={onClear}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {streaming ? (
        <div className="relative">
          <video ref={videoRef} autoPlay playsInline muted className="w-full rounded-lg border object-cover" style={{ maxHeight: 256 }} />
          <div className="flex gap-2 mt-3">
            <Button onClick={takePhoto} className="flex-1 gap-2">
              <Camera className="h-4 w-4" /> Capture Photo
            </Button>
            <Button variant="outline" onClick={stopCamera}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <Button variant="outline" onClick={startCamera} className="w-full gap-2 h-32 border-dashed flex-col">
            <Camera className="h-8 w-8 text-muted-foreground" />
            <span className="text-muted-foreground">Open Camera</span>
          </Button>
          {error && <p className="text-sm text-destructive mt-2">{error}</p>}
        </div>
      )}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default CameraCapture;
