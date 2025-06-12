"use client";
import { Play, User } from 'lucide-react';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';


const HeroSection = () => {
    const { user } = useUser();
    return (
        <section className="relative min-h-screen flex items-center justify-center bg-black">
            <video
                className="absolute inset-0 w-full h-full object-cover z-0"
                src="/hero-2.mov"

                autoPlay
                loop
                muted
                playsInline
                preload="auto"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black z-10" />

            <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 w-full">
                <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg">
                    Blazor Movies
                </h1>
                <p className="text-lg md:text-2xl text-white/90 mb-10 max-w-2xl">
                    Dive into a world of movies. Discover, search, and get recommendations tailored just for you.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-10">
                    <Link href="/home">
                        <button className="bg-white text-black px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:bg-gray-200 transition flex items-center justify-center">
                            <Play className="w-5 h-5 mr-2" />
                            Start Exploring
                        </button>
                    </Link>
                    {user ? (
                        <Link href="/profile">
                            <button className="bg-black/70 text-white px-8 py-3 text-lg font-semibold rounded-full border border-white shadow-lg hover:bg-black/90 transition flex items-center justify-center">
                                <User className="w-5 h-5 mr-2" />
                                Profile
                            </button>
                        </Link>
                    ) : (
                        <a
                            href="/auth/login?returnTo=/home"
                            className="bg-black/70 text-white px-8 py-3 text-lg font-semibold rounded-full border border-white shadow-lg hover:bg-black/90 transition flex items-center justify-center"
                        >
                            <User className="w-5 h-5 mr-2" />
                            Login
                        </a>
                    )}
                </div>
            </div>
            <p className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-base md:text-lg text-white/90 max-w-2xl px-4 w-full text-center z-30 font-medium">
                &quot;Perhaps the whole of life is an act of letting go, but what always hurts the most is not taking a moment to say goodbye.&quot;
            </p>
        </section>
    );
};

export default HeroSection;