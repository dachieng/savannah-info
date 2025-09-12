"use client";

import { Play, Info, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

export default function Hero() {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <section className="relative h-[calc(100vh-4rem)] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/7234456/pexels-photo-7234456.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
          alt="Hero background"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="px-4 md:px-16 max-w-2xl">
          {/* Netflix Series Badge */}
          <div className="flex items-center space-x-2 mb-4">
            <div className="bg-red-600 text-white px-2 py-1 text-sm font-bold">
              N
            </div>
            <span className="text-gray-300 text-sm font-medium">SERIES</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
            Stranger Things
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-xl">
            When a young boy vanishes, a small town uncovers a mystery involving
            secret experiments, terrifying supernatural forces, and one strange
            little girl.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-200 font-semibold px-8 py-3 text-lg flex items-center space-x-2"
            >
              <Play className="h-6 w-6 fill-current" />
              <span>Play</span>
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="bg-gray-600/80 text-white hover:bg-gray-600/60 font-semibold px-8 py-3 text-lg flex items-center space-x-2 backdrop-blur-sm"
            >
              <Info className="h-6 w-6" />
              <span>More Info</span>
            </Button>
          </div>

          {/* Movie Info */}
          <div className="flex items-center space-x-4 text-sm text-gray-300">
            <span className="bg-gray-800/80 px-2 py-1 rounded">2016</span>
            <span className="bg-gray-800/80 px-2 py-1 rounded">TV-14</span>
            <span className="bg-gray-800/80 px-2 py-1 rounded">4 Seasons</span>
            <div className="flex items-center space-x-1">
              <span>HD</span>
              <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
              <span>5.1</span>
            </div>
          </div>
        </div>

        {/* Volume Control */}
        <div className="absolute bottom-32 right-4 md:right-16">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMuted(!isMuted)}
            className="rounded-full w-10 h-10 p-0 bg-gray-800/60 hover:bg-gray-700/60 backdrop-blur-sm border border-gray-600"
          >
            {isMuted ? (
              <VolumeX className="h-5 w-5 text-white" />
            ) : (
              <Volume2 className="h-5 w-5 text-white" />
            )}
          </Button>
        </div>
      </div>
    </section>
  );
}
