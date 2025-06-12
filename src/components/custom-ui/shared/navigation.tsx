'use client';
import { BookmarkPlus, Film, Home, LogOut, Menu, Search, User } from "lucide-react";
import Link from "next/link";
import SearchComponent from "./search";
import { GenresPopover } from "./genres-popover";
import { useUser } from "@auth0/nextjs-auth0";

export default function Navigation() {
    const { user, isLoading } = useUser();

    return (
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="container mx-auto max-w-7xl px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <Film className="h-6 w-6 text-primary" />
                        <h1 className="text-xl font-bold">Blazor Movies</h1>
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
                        <GenresPopover />
                        <Link
                            href="/watchlist"
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                        >
                            <BookmarkPlus className="h-4 w-4 mr-2" />
                            Watchlist
                        </Link>
                    </nav>

                    {/* Search Bar - Desktop */}
                    <SearchComponent className="hidden md:flex flex-1 max-w-md mx-8" />

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2">
                        {/* Mobile Search Button */}
                        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 md:hidden">
                            <Search className="h-4 w-4" />
                        </button>

                        {/* User Profile */}
                        {!isLoading && (
                            <>
                                {user ? (
                                    <div className="flex items-center space-x-2">
                                        <Link
                                            href="/profile"
                                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                                        >
                                            <User className="h-4 w-4 mr-2" />
                                            Profile
                                        </Link>
                                        <a
                                            href="/auth/logout"
                                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                                        >
                                            <LogOut className="h-4 w-4 mr-2" />
                                            Logout
                                        </a>
                                    </div>
                                ) : (
                                    <a
                                        href="/auth/login?returnTo=/home"
                                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                                    >
                                        <User className="h-4 w-4 mr-2" />
                                        Login
                                    </a>
                                )}
                            </>
                        )}

                        {/* Mobile Menu */}
                        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 w-9 md:hidden">
                            <Menu className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                {/* Mobile Search Bar */}
                <div className="md:hidden pb-3">
                    <SearchComponent className="w-full" />
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
                    {user ? (
                        <>
                            <Link
                                href="/profile"
                                className="flex flex-col items-center space-y-1 p-2 text-xs hover:bg-accent rounded-md transition-colors"
                            >
                                <User className="h-4 w-4" />
                                <span>Profile</span>
                            </Link>
                            <a
                                href="/api/auth/logout"
                                className="flex flex-col items-center space-y-1 p-2 text-xs hover:bg-accent rounded-md transition-colors"
                            >
                                <LogOut className="h-4 w-4" />
                                <span>Logout</span>
                            </a>
                        </>
                    ) : (
                        <a
                            href="/auth/login?returnTo=/home"
                            className="flex flex-col items-center space-y-1 p-2 text-xs hover:bg-accent rounded-md transition-colors"
                        >
                            <User className="h-4 w-4" />
                            <span>Login</span>
                        </a>
                    )}
                </nav>
            </div>
        </header>
    );
}