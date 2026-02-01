"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FileUpload from "../components/FileUpload";

export default function UploadPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!videoUrl || !thumbnailUrl) {
      setError("Please upload both video and thumbnail");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const res = await fetch("/api/video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          videoUrl,
          thumbnailUrl,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to upload video");
      }

      router.push("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-semibold text-slate-900 tracking-tight">
            Upload Video
          </h1>
          <p className="text-slate-600 mt-2">
            Share your content with the world
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium text-slate-700">
                Video Title
              </label>
              <input
                id="title"
                type="text"
                placeholder="Enter a descriptive title"
                className="w-full px-4 py-2.5 border text-black border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none disabled:bg-slate-50 disabled:cursor-not-allowed hover:border-slate-400"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                disabled={uploading}
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium text-slate-700">
                Description
              </label>
              <textarea
                id="description"
                placeholder="Tell viewers about your video"
                className="w-full px-4  py-2.5 border text-black border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none disabled:bg-slate-50 disabled:cursor-not-allowed hover:border-slate-400 resize-none"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                disabled={uploading}
              />
            </div>

            {/* Video Upload */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-slate-700">
                Video File
              </label>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-gray-500 hover:border-blue-400 transition-colors bg-slate-50">
                <FileUpload
                  fileType="video"
                  onSuccess={(res) => {
                    setVideoUrl(res.url);
                  }}
                />
              </div>
              {videoUrl && (
                <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-2 rounded-lg border border-green-200">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Video uploaded successfully
                </div>
              )}
            </div>

            {/* Thumbnail Upload */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-slate-700">
                Thumbnail Image
              </label>
              <div className="border-2 text-gray-500 border-dashed border-slate-300 rounded-lg p-6 hover:border-blue-400 transition-colors bg-slate-50">
                <FileUpload
                  fileType="image"
                  onSuccess={(res) => {
                    setThumbnailUrl(res.url);
                  }}
                />
              </div>
              {thumbnailUrl && (
                <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-2 rounded-lg border border-green-200">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Thumbnail uploaded successfully
                </div>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm flex items-start gap-2">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => router.push("/")}
                className="px-6 py-2.5 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={uploading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={uploading || !videoUrl || !thumbnailUrl}
                className="flex-1 px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-all disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
              >
                {uploading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Publishing...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    Publish Video
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Helper Text */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex gap-3">
            <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-sm text-blue-900">
              <p className="font-medium mb-1">Upload Tips</p>
              <ul className="space-y-1 text-blue-800">
                <li>• Choose a clear, engaging thumbnail that represents your video</li>
                <li>• Write a descriptive title to help viewers find your content</li>
                <li>• Add a detailed description to provide context</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}