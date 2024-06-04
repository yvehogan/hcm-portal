"use client";

import React, { useState, useRef } from "react";
import { BsCloudUpload } from "react-icons/bs";
// import { useCookies } from 'react-cookie';

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
}

const MAX_FILE_SIZE_MB = 30;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024; // 30 MB in bytes

const FileUpload: React.FC<FileUploadProps> = ({
  onFilesSelected,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<
    File[]
  >([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (
    e: React.DragEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDropFile = (
    e: React.DragEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    const acceptedFiles = droppedFiles.filter(isFileValid);
    setSelectedFiles(acceptedFiles);
    onFilesSelected(acceptedFiles);
  };

  const handleFileSelect = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      const acceptedFiles =
        selectedFiles.filter(isFileValid);
      setSelectedFiles(acceptedFiles);
      onFilesSelected(acceptedFiles);
    }
  };

  const handleClickInput = () => {
    fileInputRef.current?.click();
  };

  const isFileValid = (file: File) => {
    const acceptedFileTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    return (
      acceptedFileTypes.includes(file.type) &&
      file.size <= MAX_FILE_SIZE_BYTES
    );
  };

  const acceptedFileTypesString = ".xls, .xlsx";

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDropFile}
      onClick={handleClickInput}
      style={{
        padding: "0px 20px",
        textAlign: "center",
        cursor: "pointer",
      }}
    >
      <input
        type="file"
        multiple
        onChange={handleFileSelect}
        style={{ display: "none" }}
        ref={fileInputRef}
        accept={acceptedFileTypesString}
      />
      {selectedFiles.length > 0 ? (
        <div>
          <p>Selected files:</p>
          <ul>
            {selectedFiles.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="pt-4 flex flex-col gap-y-4 justify-center items-center">
          <BsCloudUpload
            size={30}
            color="#6B7280"
          />
          <p className="text-[#737373] font-bold">
            Click to upload{" "}
            <span className="font-normal">
              or drag and drop Excel File
            </span>
          </p>
          <p className="text-[#737373] font-bold">
            Max. File Size: {MAX_FILE_SIZE_MB} MB
          </p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
