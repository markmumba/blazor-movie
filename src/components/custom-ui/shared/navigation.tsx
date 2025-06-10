'use client';

import { BookmarkPlus, Search } from "lucide-react";

export default function Navigation() {
    return (
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center space-x-2">
                    <h1 className="text-xl font-bold">MovieApp</h1>
                </div>

                <div className="flex items-center space-x-2">
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3">
                        <Search className="h-4 w-4 mr-2" />
                        Search
                    </button>
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3">
                        <BookmarkPlus className="h-4 w-4 mr-2" />
                        Watchlist
                    </button>
                </div>
            </div>
        </header>
    );
} 