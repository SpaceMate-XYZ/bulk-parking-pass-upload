import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import FileUploadZone from "./FileUploadZone";
import PreviewTable from "./PreviewTable";
import ProcessingStatus from "./ProcessingStatus";

interface CSVUploadFormProps {
  onSubmit?: (file: File) => void;
  isProcessing?: boolean;
  totalRecords?: number;
  processedRecords?: number;
  successCount?: number;
  errorCount?: number;
}

const CSVUploadForm = ({
  onSubmit = () => {},
  isProcessing = false,
  totalRecords = 0,
  processedRecords = 0,
  successCount = 0,
  errorCount = 0,
}: CSVUploadFormProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string>("");

  const handleFileAccepted = (file: File) => {
    setSelectedFile(file);
    setUploadError("");
  };

  const handleFileRejected = () => {
    setUploadError("Please upload a valid CSV file");
    setSelectedFile(null);
  };

  const handleSubmit = () => {
    if (selectedFile) {
      onSubmit(selectedFile);
    }
  };

  return (
    <Card className="w-full max-w-[800px] p-6 space-y-6 bg-white">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">
          Bulk Upload Parking Passes
        </h2>
        <p className="text-sm text-muted-foreground">
          Upload a CSV file containing vehicle and owner information to generate
          multiple parking passes.
        </p>
      </div>

      <FileUploadZone
        onFileAccepted={handleFileAccepted}
        onFileRejected={handleFileRejected}
        isLoading={isProcessing}
        error={uploadError}
      />

      {selectedFile && (
        <div className="space-y-4">
          <PreviewTable />

          <ProcessingStatus
            totalRecords={totalRecords}
            processedRecords={processedRecords}
            successCount={successCount}
            errorCount={errorCount}
            isProcessing={isProcessing}
          />

          <div className="flex justify-end space-x-4">
            <Button
              variant="outline"
              onClick={() => setSelectedFile(null)}
              disabled={isProcessing}
            >
              Clear
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isProcessing || !selectedFile}
            >
              Process File
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default CSVUploadForm;
