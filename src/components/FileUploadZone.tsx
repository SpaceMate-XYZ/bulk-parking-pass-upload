import React from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileText, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface FileUploadZoneProps {
  onFileAccepted?: (file: File) => void;
  onFileRejected?: () => void;
  isLoading?: boolean;
  error?: string;
}

const FileUploadZone = ({
  onFileAccepted = () => {},
  onFileRejected = () => {},
  isLoading = false,
  error = "",
}: FileUploadZoneProps) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "text/csv": [".csv"],
    },
    maxFiles: 1,
    onDropAccepted: (files) => onFileAccepted(files[0]),
    onDropRejected: () => onFileRejected(),
  });

  return (
    <Card className="w-full max-w-[600px] h-[200px] bg-white">
      <div
        {...getRootProps()}
        className={cn(
          "h-full w-full rounded-lg border-2 border-dashed border-gray-300",
          "flex flex-col items-center justify-center p-6 text-center",
          "transition-colors duration-200 ease-in-out",
          isDragActive ? "border-primary bg-primary/5" : "hover:border-primary",
          isLoading && "opacity-50 cursor-not-allowed",
        )}
      >
        <input {...getInputProps()} disabled={isLoading} />

        <div className="flex flex-col items-center gap-4">
          {error ? (
            <>
              <AlertCircle className="h-10 w-10 text-destructive" />
              <p className="text-destructive">{error}</p>
            </>
          ) : isDragActive ? (
            <>
              <Upload className="h-10 w-10 text-primary animate-bounce" />
              <p className="text-primary">Drop your CSV file here</p>
            </>
          ) : (
            <>
              <FileText className="h-10 w-10 text-muted-foreground" />
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Drag and drop your CSV file here, or
                </p>
                <Button type="button" variant="secondary" disabled={isLoading}>
                  Browse Files
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Only CSV files are supported
              </p>
            </>
          )}
        </div>
      </div>
    </Card>
  );
};

export default FileUploadZone;
