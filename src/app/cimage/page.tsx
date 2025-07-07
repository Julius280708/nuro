"use client";
import { useEffect, useState } from 'react';

export default function UploadPage() {
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function loadImages() {
      try {
        const res = await fetch('/api/images');
        if (!res.ok) throw new Error('Failed to load images');
        const data = await res.json();
        if (Array.isArray(data)) {
          setImages(data);
        } else {
          console.error('API returned non-array:', data);
          setImages([]);
        }
      } catch (error) {
        console.error(error);
        setImages([]);
      }
    }
    loadImages();
  }, []);

  const handleUpload = async (file: File) => {
    if (!file) return;

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    setUploading(true);
    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Cloudinary upload failed');
      const data = await res.json();

      if (data.secure_url) {
        // Save new URL to backend
        const saveRes = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: data.secure_url }),
        });

        if (!saveRes.ok) throw new Error('Failed to save image');

        setImages((prev) => [data.secure_url, ...prev]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center text-darkblue">Upload Image</h1>

      <div className="flex items-center gap-4 mb-10">
        <label
          htmlFor="file-upload"
          className="cursor-pointer bg-darkblue px-5 py-3 rounded-md hover:bg-blue-700 transition"
          aria-disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Select Image to Upload'}
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          className="hidden"
          disabled={uploading}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleUpload(file);
            e.target.value = '';
          }}
        />
      </div>

      <h2 className="text-2xl font-semibold mb-6 border-b border-darkblue pb-2">Gallery</h2>
      {images.length === 0 ? (
        <p className="text-gray-400 text-center">No images uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {images.map((url, idx) => (
            <div key={idx} className="bg-white text-black rounded-lg shadow-lg overflow-hidden flex flex-col items-center p-3">
              <img src={url} alt={`Uploaded ${idx + 1}`} className="w-full h-auto rounded mb-3" />
              <a
                href={url}
                download
                className="bg-darkblue text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Download
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}