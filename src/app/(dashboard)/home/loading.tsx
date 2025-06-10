import HomeLoadingSkeleton from "@/components/custom-ui/home/homeloading";


export default function Loading() {
    return (
        <div className="min-h-screen bg-background">
            <HomeLoadingSkeleton />
        </div>
    )
}