'use client';

import Navigation from "@/components/custom-ui/shared/navigation";
import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user, isLoading } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/auth/login?returnTo=/home');
        }
    }, [user, isLoading, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
        );
    }

    if (!user) {
        return null; // Will redirect in useEffect
    }

    return (
        <div>
            <Navigation />
            {children}
        </div>
    );
}