'use client';
import FileUploader from "../../../../../../../components/FileUploader";
import TextUploader from "../../../../../../../components/TextUploader";
import TshirtSelector from "../../../../../../../components/TshirtSelector";

export default function UploadPage() {
  return (
    <main className="min-h-screen bg-black text-white px-4 py-8 flex justify-center">
      <div className="flex flex-col items-center gap-12 w-full max-w-7xl">
        <TshirtSelector />
         <FileUploader /> 
         <TextUploader /> 
      </div>
    </main>
  );
}