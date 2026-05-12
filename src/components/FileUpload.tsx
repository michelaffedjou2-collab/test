"use client";

import { motion } from "framer-motion";
import { useCallback, useState } from "react";

interface FileUploadProps {
  onFileSelected: (file: File) => void;
  isProcessing: boolean;
}

export default function FileUpload({
  onFileSelected,
  isProcessing,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFile = useCallback(
    (file: File) => {
      if (file.type !== "application/pdf") {
        alert("Please upload a PDF file");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        alert("File must be under 10MB");
        return;
      }
      setFileName(file.name);
      onFileSelected(file);
    },
    [onFileSelected]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleClick = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".pdf";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) handleFile(file);
    };
    input.click();
  }, [handleFile]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="w-full max-w-xl mx-auto"
    >
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={isProcessing ? undefined : handleClick}
        className={`relative rounded-2xl p-8 cursor-pointer transition-all duration-300 ${
          isDragging ? "drop-zone-active" : "glass"
        } ${isProcessing ? "opacity-50 cursor-not-allowed" : "hover:border-purple-500/50"}`}
      >
        <div className="flex flex-col items-center gap-4 text-center">
          <motion.div
            animate={isDragging ? { scale: 1.1 } : { scale: 1 }}
            className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center"
          >
            <svg
              className="w-8 h-8 text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </motion.div>

          {fileName ? (
            <div>
              <p className="text-white font-medium">{fileName}</p>
              <p className="text-sm text-gray-400 mt-1">
                {isProcessing ? "Processing..." : "Click to change file"}
              </p>
            </div>
          ) : (
            <div>
              <p className="text-white font-medium">
                Drop your CV here or click to browse
              </p>
              <p className="text-sm text-gray-400 mt-1">
                PDF files only, up to 10MB
              </p>
            </div>
          )}
        </div>

        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 via-transparent to-pink-500/10 opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
      </div>
    </motion.div>
  );
}
