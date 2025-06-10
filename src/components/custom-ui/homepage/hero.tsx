import React from 'react';
import { Play, Search } from 'lucide-react';
import Link from 'next/link';
import AnimatedPosters from './animated-posters';

const HeroSection = () => {
    return (
        <div className="relative min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-100 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
            </div>

            {/* Animated Movie Posters */}
            <AnimatedPosters />

            {/* Light Background Gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-3/4 bg-gradient-to-t from-transparent via-white/95 to-transparent" />

            <div className="relative z-50 container mx-auto px-4 flex flex-col items-center justify-end min-h-screen pb-48 text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-black mb-6 animate-fade-in drop-shadow-lg">
                    Discover Your Next
                    <span className="text-black bg-clip-text block mt-2 animate-gradient drop-shadow-md">
                        Favorite Movie
                    </span>
                </h1>

                <p className="text-xl text-gray-800 mb-12 max-w-2xl animate-fade-in-delay drop-shadow-sm">
                    Explore thousands of movies and get personalized recommendations
                </p>

                <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-delay-2">
                    <Link href="/home">
                        <button
                            className="bg-gradient-to-r from-gray-900 to-gray-800 hover:from-black hover:to-gray-900 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 flex items-center justify-center hover:scale-105 shadow-xl shadow-gray-500/40"
                        >
                            <Play className="w-5 h-5 mr-2" />
                            Start Exploring
                        </button>
                    </Link>

                    <button
                        className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900/10 px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 flex items-center justify-center hover:scale-105 shadow-lg"
                    >
                        <Search className="w-5 h-5 mr-2" />
                        Search Movies
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;