import { BookmarkPlus } from "lucide-react";
import { useState } from "react";
import SparklingStar from "./stars";

// Main button component
const SparklingButton = () => {
    const [isAdded, setIsAdded] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [stars, setStars] = useState<{ id: number; key: string }[]>([]);
    const [starCounter, setStarCounter] = useState(0);

    const handleClick = () => {
        // Your existing localStorage logic
        const stored = localStorage.getItem('watchlist');
        const watchlist = stored ? JSON.parse(stored) : [];
        const movieId = 123; // Replace with your actual movie ID

        if (!watchlist.includes(movieId)) {
            watchlist.push(movieId);
            localStorage.setItem('watchlist', JSON.stringify(watchlist));
        }

        // Trigger animations
        setIsAdded(true);
        setIsAnimating(true);

        // Create multiple stars
        const newStars = [];
        for (let i = 0; i < 8; i++) {
            newStars.push({
                id: starCounter + i,
                key: `star-${starCounter + i}-${Date.now()}`
            });
        }
        setStars(newStars);
        setStarCounter(prev => prev + newStars.length);

        // Reset button state
        setTimeout(() => setIsAdded(false), 300);

        // Stop animation after all stars are done
        setTimeout(() => {
            setIsAnimating(false);
            setStars([]);
        }, 2500);
    };

    const removeStar = (starId: number) => {
        setStars(prev => prev.filter(star => star.id !== starId));
    };

    return (
        <div className="p-8 flex flex-col items-center gap-8">
            <style jsx>{`
          @keyframes sparkle {
            0% {
              opacity: 0;
              transform: translateY(0) scale(0) rotate(0deg);
            }
            15% {
              opacity: 1;
              transform: translateY(-10px) scale(1) rotate(180deg);
            }
            100% {
              opacity: 0;
              transform: translateY(-50px) scale(0) rotate(360deg);
            }
          }
          
          @keyframes pulse-glow {
            0%, 100% {
              box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
            }
            50% {
              box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
            }
          }
          
          .sparkle-container {
            overflow: visible;
          }
          
          .animate-pulse-glow {
            animation: pulse-glow 0.6s ease-out;
          }
        `}</style>

            <div className="relative sparkle-container">
                <button
                    className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 relative ${isAdded ? 'scale-110 animate-pulse-glow' : 'scale-100'
                        } ${isAnimating ? 'bg-blue-50 border-blue-300' : ''}`}
                    onClick={handleClick}
                >
                    <BookmarkPlus className="h-4 w-4 mr-2" />
                    {isAdded ? "Added!" : "Add to Watchlist"}
                </button>

                {/* Sparkling stars */}
                {stars.map((star) => (
                    <SparklingStar
                        key={star.key}
                        id={star.id}
                        onComplete={removeStar}
                    />
                ))}
            </div>

            <div className="text-sm text-gray-600 text-center max-w-md">
                <p>The first button uses React state to manage individual star components.</p>
                <p className="mt-2">The second button uses pure CSS animations for a lighter implementation.</p>
            </div>
        </div>
    );
};


export default SparklingButton;