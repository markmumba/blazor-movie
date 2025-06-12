'use client';

import { useUser } from '@auth0/nextjs-auth0';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
    const { user, error, isLoading } = useUser();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="text-center space-y-4">
                    <h2 className="text-2xl font-bold tracking-tight">Something went wrong</h2>
                    <p className="text-muted-foreground">{error.message}</p>
                    <Link
                        href="/home"
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="text-center space-y-4">
                    <h2 className="text-2xl font-bold tracking-tight">Not logged in</h2>
                    <p className="text-muted-foreground">Please log in to view your profile</p>
                    <Link
                        href="/auth/login?returnTo=/profile"
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                    >
                        Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto max-w-7xl px-4 py-8">
                <div className="flex items-center gap-4 mb-8">
                    <Link
                        href="/home"
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10"
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
                </div>

                <div className="grid gap-8 md:grid-cols-[300px_1fr]">
                    {/* Profile Sidebar */}
                    <div className="space-y-6">
                        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                            <div className="flex flex-col items-center space-y-4">
                                <div className="relative h-24 w-24 overflow-hidden rounded-full">
                                    {user.picture ? (
                                        <img
                                            src={user.picture}
                                            alt={user.name || 'Profile picture'}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                                            <span className="text-2xl font-semibold">
                                                {user.name?.[0]?.toUpperCase() || 'U'}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="text-center">
                                    <h2 className="text-xl font-semibold">{user.name}</h2>
                                    <p className="text-sm text-muted-foreground">{user.email}</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                            <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
                            <div className="space-y-2">
                                <a
                                    href="/auth/logout"
                                    className="inline-flex w-full items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-9 px-4 py-2"
                                >
                                    Logout
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="space-y-6">
                        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                            <h3 className="text-lg font-semibold mb-4">Account Information</h3>
                            <dl className="space-y-4">
                                <div>
                                    <dt className="text-sm font-medium text-muted-foreground">Name</dt>
                                    <dd className="mt-1 text-sm">{user.name}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-muted-foreground">Email</dt>
                                    <dd className="mt-1 text-sm">{user.email}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-muted-foreground">Email Verified</dt>
                                    <dd className="mt-1 text-sm">
                                        {user.email_verified ? 'Yes' : 'No'}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-muted-foreground">Last Updated</dt>
                                    <dd className="mt-1 text-sm">
                                        {user.updated_at
                                            ? new Date(user.updated_at).toLocaleDateString()
                                            : 'N/A'}
                                    </dd>
                                </div>
                            </dl>
                        </div>

                        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                            <h3 className="text-lg font-semibold mb-4">Your Watchlist</h3>
                            <p className="text-sm text-muted-foreground">
                                Your watchlist is empty. Start adding movies to keep track of what you want to watch!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 