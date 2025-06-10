'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface MoviePoster {
    src: string;
    alt: string;
    delay: number;
    position: {
        top: string;
        left: string;
        rotate: string;
        scale: string;
    };
}

const posters: MoviePoster[] = [
    {
        src: '/homepage/movie-1.jpg',
        alt: 'Movie 1',
        delay: 0,
        position: {
            top: '15%',
            left: '10%',
            rotate: '-5deg',
            scale: '1.2'
        }
    },
    {
        src: '/homepage/movie-2.jpg',
        alt: 'Movie 2',
        delay: 0.5,
        position: {
            top: '45%',
            left: '75%',
            rotate: '8deg',
            scale: '1.4'
        }
    },
    {
        src: '/homepage/movie-3.jpg',
        alt: 'Movie 3',
        delay: 1,
        position: {
            top: '70%',
            left: '20%',
            rotate: '-12deg',
            scale: '1.3'
        }
    },
    {
        src: '/homepage/movie-4.jpg',
        alt: 'Movie 4',
        delay: 1.5,
        position: {
            top: '25%',
            left: '60%',
            rotate: '15deg',
            scale: '1.1'
        }
    },
    {
        src: '/homepage/movie-5.jpg',
        alt: 'Movie 5',
        delay: 2,
        position: {
            top: '60%',
            left: '85%',
            rotate: '-8deg',
            scale: '1.25'
        }
    },
];

const AnimatedPosters = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {posters.map((poster, index) => (
                <div
                    key={index}
                    className={`absolute w-64 h-96 transform transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0 -translate-x-full'
                        }`}
                    style={{
                        top: poster.position.top,
                        left: poster.position.left,
                        transform: isLoaded
                            ? `translateX(0) rotate(${poster.position.rotate}) scale(${poster.position.scale})`
                            : 'translateX(-100vw)',
                        animation: isLoaded
                            ? `float 6s ease-in-out ${index * 0.5}s infinite`
                            : 'none',
                        zIndex: 20,
                    }}
                >
                    <div className="relative w-full h-full rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                        <Image
                            src={poster.src}
                            alt={poster.alt}
                            fill
                            className="object-cover rounded-lg shadow-2xl"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AnimatedPosters; 