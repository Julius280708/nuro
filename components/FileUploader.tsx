"use client";
import { useState, useCallback, useRef, useEffect, ChangeEvent, DragEvent } from "react";
import Image from "next/image";

export default function FileUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreviewUrl(null);
    }
  }, [file]);

  const handleDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const uploadedFile = e.dataTransfer.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => e.preventDefault();
  const handleFileButtonClick = () => fileInputRef.current?.click();
  const handleDelete = () => setFile(null);
  const handleSave = () => {
    if (file) alert(`Saving file: ${file.name}`);
  };

  return (
    <div className="flex flex-col items-center gap-3 text-white mx-[10px]">
      {/* Drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="w-full min-w-[700px] max-w-6xl min-h-[150px] p-5 border-2 border-dashed border-white rounded-md text-center flex justify-center items-center"
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Preview"
            className="mx-auto max-h-64 object-contain"
          />
        ) : (
          <p className="text-gray-400">Drag & drop your file here or click below</p>
        )}
      </div>

      {/* File name + thumbnail shown BELOW the dashed box */}
      {file && previewUrl && (
        <div className="flex items-center gap-3 text-sm text-white">
          <Image
            src={previewUrl}
            alt="Preview icon"
            width={32}
            height={32}
            className="object-cover rounded"
          />
          <span>{file.name}</span>
        </div>
      )}

      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*,.svg"
        onChange={handleChange}
        ref={fileInputRef}
        className="hidden"
      />

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleFileButtonClick}
          className="px-4 py-2 bg-white text-black rounded hover:bg-gray-300 transition"
        >
          Choose from Files
        </button>
        <button
          onClick={handleSave}
          disabled={!file}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition disabled:opacity-50"
        >
          Save
        </button>
        <button
          onClick={handleDelete}
          disabled={!file}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition disabled:opacity-50"
        >
          Delete
        </button>
      </div>
    </div>
  );
}