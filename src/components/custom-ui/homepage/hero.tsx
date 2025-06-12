"use client";
import { Play, User } from 'lucide-react';
import Link from 'next/link';
import AnimatedPosters from './animated-posters';
import { useUser } from '@auth0/nextjs-auth0';

const HeroSection = () => {
    const { user } = useUser();
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Animated Posters as background with dark overlay */}
            <div className="absolute inset-0 z-0">
                <div className="grid grid-cols-3 gap-4 p-4">
                    <AnimatedPosters />
                </div>
                <div className="absolute inset-0 bg-black/60" />
            </div>

            {/* Minimal centered content */}
            <div className="relative z-10 max-w-2xl w-full mx-auto px-8 py-16 text-center space-y-6 bg-black/40 backdrop-blur-sm rounded-xl border border-white/20 shadow-2xl">
                <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg">
                    Welcome to <span className="text-primary-400">Blazor Movies</span>
                </h1>
                <p className="text-lg md:text-2xl text-white/80 font-medium drop-shadow">
                    Dive into a world of movies. Discover, search, and get recommendations tailored just for you.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                    <Link href="/home">
                        <button className="bg-gradient-to-r from-primary-600 to-primary-400 hover:from-primary-700 hover:to-primary-500 border text-white px-10 py-4 text-xl font-bold rounded-lg transition-all duration-200 flex items-center justify-center hover:scale-105 shadow-xl w-full sm:w-auto">
                            <Play className="w-6 h-6 mr-2" />
                            Start Exploring
                        </button>
                    </Link>
                    {user ? (
                        <Link href="/profile">
                            <button className="bg-white/20 text-white px-10 py-4 text-lg font-bold rounded-lg transition-all duration-200 flex items-center justify-center hover:scale-105 shadow-xl w-full sm:w-auto">
                                <User className="w-5 h-5 mr-2" />
                                Profile
                            </button>
                        </Link>
                    ) : (
                        <a
                            href="/auth/login?returnTo=/home"
                            className="bg-white/20 text-white px-10 py-4 text-lg font-bold rounded-lg transition-all duration-200 flex items-center justify-center hover:scale-105 shadow-xl w-full sm:w-auto"
                        >
                            <User className="w-5 h-5 mr-2" />
                            Login
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HeroSection;