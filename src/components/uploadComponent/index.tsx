"use client";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { useCookies } from 'react-cookie';
import handleFetch from "@/services/handleFetch";
import FileUpload from "@/components/commons/FileUpload";

interface UploadProps {
  setIsUploaded: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSucess: React.Dispatch<React.SetStateAction<boolean>>;
}

const UploadComponent: React.FC<UploadProps> = ({
  setIsUploaded,
  setShowSucess
}) => {
  const [selectedFile, setSelectedFile] = useState<File[]>([]);
  const [cookies, setCookies] = useCookies(['data', 'uploadedList']);

  const handleFileUpload = (files: File[]) => {
    setSelectedFile(files);
  };

  const fileUploadMutation = useMutation(handleFetch, {
    onSuccess: (data) => {
      setCookies('uploadedList', data?.responseData);
      setIsUploaded(false);
      setShowSucess(true);
    },
  });

  const handleSubmit = () => {
    if (selectedFile.length > 0) {
      const formData = new FormData();
      formData.append("ExcelFile", selectedFile[0]);
      fileUploadMutation.mutate({
        endpoint: 'qrcodes/upload-data',
        method: 'POST',
        body: formData,
        auth: true,
        multipart: true
      });
    }
  };

  return (
    <div className="bg-white w-[600px] flex flex-col justify-center items-center h-[350px] rounded-[13px]">
      <FileUpload onFilesSelected={handleFileUpload} />
      <button
        onClick={handleSubmit} 
        disabled={selectedFile.length === 0 || fileUploadMutation.isLoading}
        className={`${
          selectedFile.length === 0
            ? "bg-[#c17ca8] cursor-not-allowed"
            : "bg-primary"
        }  text-white mt-4 rounded-[13px] p-3 font-medium`}
      >
        {fileUploadMutation.isLoading ? "Uploading..." : "Upload File"}
      </button>
    </div>
  );
};

export default UploadComponent;
