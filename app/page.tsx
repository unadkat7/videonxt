export const runtime = "nodejs"; // 🔥 REQUIRED for mongoose

import Image from "next/image";
import { connectDB } from "@/lib/db";
import Video from "@/models/Video";

type VideoType = {
  _id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  createdAt: string;
  controls: boolean;
};

async function getVideos(): Promise<VideoType[]> {
  await connectDB();

  const videos = await Video.find({})
    .sort({ createdAt: -1 })
    .lean();

  return JSON.parse(JSON.stringify(videos));
}

export default async function HomePage() {
  const videos = await getVideos();

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-semibold text-slate-900 tracking-tight">
            Latest Videos
          </h1>
          <p className="text-slate-600 mt-2">
            Discover and watch our latest content
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {videos.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="bg-white rounded-xl shadow-sm p-12 text-center max-w-md">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg 
                  className="w-8 h-8 text-slate-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" 
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                No videos yet
              </h3>
              <p className="text-slate-600">
                No videos have been uploaded yet. Check back later!
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div
              key={video._id}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
            >
              {/* Thumbnail */}
              <div className="relative overflow-hidden bg-slate-100">
                <Image
                  src={video.thumbnailUrl}
                  alt={video.title}
                  width={400}
                  height={240}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <svg 
                      className="w-8 h-8 text-slate-900 ml-1" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Video Info */}
              <div className="p-5">
                <h2 className="font-semibold text-lg text-slate-900 truncate mb-2 group-hover:text-blue-600 transition-colors">
                  {video.title}
                </h2>
                <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                  {video.description}
                </p>
                
                {/* Metadata */}
                <div className="flex items-center gap-2 mt-4 text-xs text-slate-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>
                    {new Date(video.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </div>

              {/* Video Player */}
              <div className="border-t border-slate-100">
                <video
                  src={video.videoUrl}
                  controls={video.controls}
                  className="w-full"
                  preload="metadata"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}