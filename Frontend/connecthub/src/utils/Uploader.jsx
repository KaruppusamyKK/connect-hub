import React from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";

const Uploader = ({ onFileSelect, accept = "image/*", className = "" }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length && onFileSelect) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`cursor-pointer flex items-center justify-center ${className}`}
    >
      <input {...getInputProps()} />
      <UploadCloud className="w-8 h-8 text-white" />
    </div>
  );
};

export default Uploader;
