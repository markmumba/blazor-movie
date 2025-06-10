'use client';
import { BookmarkPlus, Film, Home, Menu, Search, User } from "lucide-react";
import Link from "next/link";

export default function Navigation() {
    return (
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="container mx-auto max-w-7xl px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <Film className="h-6 w-6 text-primary" />
                        <h1 className="text-xl font-bold">MovieApp</h1>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-1">
                        <Link
                            href="/home"
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                        >
                            <Home className="h-4 w-4 mr-2" />
                            Home
                        </Link>
                        <Link
                            href="/movies"
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                        >
                            <Film className="h-4 w-4 mr-2" />
                            Movies
                        </Link>
                        <Link
                            href="/watchlist"
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                        >
                            <BookmarkPlus className="h-4 w-4 mr-2" />
                            Watchlist
                        </Link>
                    </nav>

                    {/* Search Bar */}
                    <div className="hidden md:flex flex-1 max-w-md mx-8">
                        <div className="relative w-full">
                            <input
                                type="search"
                                placeholder="Search movies..."
                                className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            />
                            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2">
                        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3">
                            <Search className="h-4 w-4 md:hidden" />
                            <span className="hidden md:inline-block">Search</span>
                        </button>
                        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 w-9">
                            <User className="h-4 w-4" />
                        </button>
                        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 w-9 md:hidden">
                            <Menu className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden border-t bg-background/95 backdrop-blur">
                <nav className="container flex items-center justify-around py-2">
                    <Link
                        href="/home"
                        className="flex flex-col items-center space-y-1 p-2 text-xs hover:bg-accent rounded-md transition-colors"
                    >
                        <Home className="h-4 w-4" />
                        <span>Home</span>
                    </Link>
                    <Link
                        href="/movies"
                        className="flex flex-col items-center space-y-1 p-2 text-xs hover:bg-accent rounded-md transition-colors"
                    >
                        <Film className="h-4 w-4" />
                        <span>Movies</span>
                    </Link>
                    <Link
                        href="/watchlist"
                        className="flex flex-col items-center space-y-1 p-2 text-xs hover:bg-accent rounded-md transition-colors"
                    >
                        <BookmarkPlus className="h-4 w-4" />
                        <span>Watchlist</span>
                    </Link>
                    <Link
                        href="/profile"
                        className="flex flex-col items-center space-y-1 p-2 text-xs hover:bg-accent rounded-md transition-colors"
                    >
                        <User className="h-4 w-4" />
                        <span>Profile</span>
                    </Link>
                </nav>
            </div>
        </header>
    );
} 