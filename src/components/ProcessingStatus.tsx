import React from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

interface ProcessingStatusProps {
  totalRecords?: number;
  processedRecords?: number;
  successCount?: number;
  errorCount?: number;
  isProcessing?: boolean;
}

const ProcessingStatus = ({
  totalRecords = 10,
  processedRecords = 5,
  successCount = 3,
  errorCount = 2,
  isProcessing = true,
}: ProcessingStatusProps) => {
  const progress =
    totalRecords > 0 ? (processedRecords / totalRecords) * 100 : 0;

  return (
    <div className="w-full p-4 bg-white border rounded-lg shadow-sm">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Processing Status</h3>
          {isProcessing && (
            <div className="flex items-center text-muted-foreground">
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              <span className="text-sm">Processing...</span>
            </div>
          )}
        </div>

        <Progress value={progress} className="w-full" />

        <div className="flex items-center justify-between text-sm">
          <div className="flex space-x-4">
            <Badge variant="outline" className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>{successCount} Successful</span>
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <XCircle className="w-4 h-4 text-red-500" />
              <span>{errorCount} Failed</span>
            </Badge>
          </div>
          <div className="text-muted-foreground">
            {processedRecords} of {totalRecords} records processed
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingStatus;
