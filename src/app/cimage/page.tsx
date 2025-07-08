"use client";
import { useEffect, useState } from "react";

export default function UploadPage() {
  const [images, setImages] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);

  const [name, setName] = useState("");
  const [usertag, setUsertag] = useState("");
  const [date, setDate] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    async function loadImages() {
      try {
        const res = await fetch("/api/images");
        if (!res.ok) throw new Error("Failed to fetch images");
        const data = await res.json();
        setImages(data);
      } catch (error) {
        console.error(error);
      }
    }
    loadImages();
  }, []);

  const handleUpload = async (file: File) => {
    if (!file || !name || !usertag || !date) {
      alert("Please fill in all fields before uploading.");
      return;
    }

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    setUploading(true);
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (!res.ok) throw new Error("Cloudinary upload failed");
      const data = await res.json();

      if (data.secure_url) {
        const saveRes = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            url: data.secure_url,
            name,
            usertag,
            date,
          }),
        });

        if (!saveRes.ok) throw new Error("Failed to save image");

        const savedImage = await saveRes.json();
        setImages((prev) => [savedImage, ...prev]);

        // Reset form
        setName("");
        setUsertag("");
        setDate("");
        setShowForm(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  console.log("Images:", images);

  return (
    <div className="min-h-screen bg-black text-white p-8 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center text-darkblue">
        Upload Image
      </h1>

      <div className="mb-10">
        <button
          className="bg-darkblue px-5 py-3 rounded-md hover:bg-blue-700 transition"
          onClick={() => setShowForm(true)}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Select Image to Upload"}
        </button>

        {showForm && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Image Name"
              className="p-3 rounded bg-gray-800 text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Your Usertag"
              className="p-3 rounded bg-gray-800 text-white"
              value={usertag}
              onChange={(e) => setUsertag(e.target.value)}
            />
            <input
              type="date"
              className="p-3 rounded bg-gray-800 text-white"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              className="p-3 bg-gray-800 text-white rounded"
              disabled={uploading}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleUpload(file);
                e.target.value = "";
              }}
            />
          </div>
        )}
      </div>
{images.length > 0 && (
  <button
    onClick={async () => {
      const confirmed = confirm("Are you sure you want to delete ALL images?");
      if (!confirmed) return;

      try {
        const res = await fetch('/api/delete-all', {
          method: 'DELETE',
        });
        if (!res.ok) throw new Error('Failed to delete all');

        setImages([]); // Clear frontend state
      } catch (err) {
        console.error('Delete all failed:', err);
        alert('Failed to delete all images');
      }
    }}
    className="mb-6 bg-red-700 hover:bg-red-800 transition px-5 py-3 rounded-md text-white"
  >
    🗑 Delete All Images
  </button>
)}
      <h2 className="text-2xl font-semibold mb-6 border-b border-darkblue pb-2">
        Gallery
      </h2>

      {images.length === 0 ? (
        <p className="text-gray-400 text-center">No images uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="relative group bg-white text-black rounded-lg shadow-lg overflow-hidden flex flex-col items-center p-3"
            >
              <img
                src={img.url}
                alt={img.name || `Uploaded ${idx + 1}`}
                className="w-full h-auto rounded"
              />
              <a
                href={img.url}
                download
                className="mt-3 bg-darkblue text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Download
              </a>
              
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-80 text-white opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center transition-opacity text-center p-4">
                <p className="font-semibold text-lg mb-1">
                  {img.name || "Untitled"}
                </p>
                <p className="text-sm">@{img.usertag || "unknown"}</p>
                <p className="text-xs text-gray-300">{img.date || ""}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}