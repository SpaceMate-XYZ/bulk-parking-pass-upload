import React from "react";
import CSVUploadForm from "./CSVUploadForm";

const Home = () => {
  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-[800px]">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Parking Pass Management
          </h1>
          <p className="text-muted-foreground mt-2">
            Generate multiple parking passes by uploading vehicle and owner
            information
          </p>
        </div>
        <CSVUploadForm />
      </div>
    </div>
  );
};

export default Home;
