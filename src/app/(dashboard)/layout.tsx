import Navigation from "@/components/custom-ui/shared/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Navigation />
            {children}
        </div>
    )
}