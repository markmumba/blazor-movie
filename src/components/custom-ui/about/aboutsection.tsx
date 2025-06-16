import React from "react";

const quotes = [
    "May the Force be with you.",
    "Here's looking at you, kid.",
    "I'm gonna make him an offer he can't refuse.",
    "You talking to me?",
    "To infinity and beyond!",
    "I'll be back.",
    "Why so serious?",
    "Houston, we have a problem.",
    "Keep your friends close, but your enemies closer.",
    "Just keep swimming."
];

// Helper to get a consistent position for each quote
const getQuotePosition = (idx: number) => {
    const top = 10 + (idx * 13) % 70; // spread vertically
    const left = 5 + (idx * 23) % 85; // spread horizontally
    const delay = (idx * 2) % 6; // stagger animation
    return { top: `${top}%`, left: `${left}%`, delay: `${delay}s` };
};

function AboutSection() {
    return (
        <section className="relative bg-white py-20 overflow-hidden">
            {/* Floating Quotes */}
            {quotes.map((quote, idx) => {
                const { top, left, delay } = getQuotePosition(idx);
                return (
                    <span
                        key={idx}
                        className="pointer-events-none select-none text-gray-400 text-xs md:text-base opacity-50 font-medium absolute animate-float"
                        style={{
                            top,
                            left,
                            animationDelay: delay,
                            zIndex: 1,
                            whiteSpace: "nowrap"
                        }}
                        aria-hidden="true"
                    >
                        {quote}
                    </span>
                );
            })}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <div className="container relative mx-auto px-4">
                <div className="flex flex-col items-center justify-center space-y-12">
                    <div className="max-w-2xl text-center">
                        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">About Us</h2>
                        <p className="text-gray-600 text-lg mb-8">
                            We are a team of developers who are passionate about creating the best movies.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h3 className="text-xl font-bold text-gray-800 mb-3">Our Mission</h3>
                            <p className="text-gray-600">
                                To provide movie enthusiasts with a curated selection of the finest films, making it easier to discover and enjoy quality cinema.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h3 className="text-xl font-bold text-gray-800 mb-3">What We Offer</h3>
                            <p className="text-gray-600">
                                A carefully selected collection of movies across all genres, complete with detailed reviews, ratings, and recommendations.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h3 className="text-xl font-bold text-gray-800 mb-3">Join Us</h3>
                            <p className="text-gray-600">
                                Become part of our growing community of movie lovers. Share your thoughts, rate films, and connect with fellow enthusiasts.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutSection;