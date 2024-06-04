"use client";
import React, { useState } from "react";
import Success from "@/components/commons/Success";
import UploadComponent from "@/components/uploadComponent";

const Page = () => {
  const [isUploaded, setIsUploaded] = useState(true);
  const [showSuccess, setShowSucess] = useState(false);

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex py-16 flex-col w-full justify-center items-center">
        {isUploaded && (
          <UploadComponent
            setIsUploaded={setIsUploaded}
            setShowSucess={setShowSucess}
          />
        )}

        {showSuccess && (
          <Success setShowSucess={setShowSucess} />
        )}
      </div>
    </div>
  );
};

export default Page;
