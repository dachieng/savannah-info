"use client";

import { Play, Star, Film, Tv } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  isLogin?: boolean;
}

const AuthWrapper = ({ children, isLogin = false }: Props) => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex">
      {/* Left Column - Simple Hero */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-black relative">
        <div className="flex flex-col justify-center px-12 text-white">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-light mb-2">TMDB</h1>
            <div className="w-12 h-1 bg-destructive-dark"></div>
          </div>

          <h2 className="text-3xl font-bold mb-4">
            Unlimited movies,
            <br />
            TV shows, and more
          </h2>

          <p className="text-lg text-gray-200 mb-8">
            Watch anywhere. Cancel anytime.
          </p>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Play className="h-5 w-5 text-destructive" />
              <span>Stream on any device</span>
            </div>
            <div className="flex items-center space-x-3">
              <Film className="h-5 w-5 text-destructive" />
              <span>Thousands of movies</span>
            </div>
            <div className="flex items-center space-x-3">
              <Tv className="h-5 w-5 text-destructive" />
              <span>Popular TV series</span>
            </div>
            <div className="flex items-center space-x-3">
              <Star className="h-5 w-5 text-destructive" />
              <span>Award-winning originals</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 bg-black flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-3xl font-bold text-destructive mb-2">TMDB</h1>
            <p className="text-gray-400">Sign in to your account</p>
          </div>

          <div className="bg-gray-900 rounded-lg p-8">
            <div className="text-gray-400 text-center py-8">{children}</div>
          </div>

          <div className="text-center mt-6">
            <p className="text-gray-400 text-sm">
              {isLogin ? "New to TMDB?" : "Already have an account?"}
              <Link
                href={isLogin ? "/signup" : "/login"}
                className="ml-1 cursor-pointer hover:underline  text-danger"
              >
                {isLogin ? "Sign up now" : "Sign in now"}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthWrapper;
