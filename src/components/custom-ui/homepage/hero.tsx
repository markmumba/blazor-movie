import React from 'react';
import { Play, Search } from 'lucide-react';

const HeroSection = () => {
    return (
        <div className="relative min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden">
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.15) 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                }}
            />

            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-900" />

            <div className="relative z-10 container mx-auto px-4 flex flex-col items-center justify-center min-h-screen text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                    Discover Your Next
                    <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent block mt-2">
                        Favorite Movie
                    </span>
                </h1>

                <p className="text-xl text-slate-300 mb-12 max-w-2xl">
                    Explore thousands of movies and get personalized recommendations
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 flex items-center justify-center"
                    >
                        <Play className="w-5 h-5 mr-2" />
                        Start Exploring
                    </button>

                    <button
                        className="border border-purple-400 text-purple-300 hover:bg-purple-400 hover:text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 flex items-center justify-center"
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