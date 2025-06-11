

function GenreSkeleton() {
    return (
        <div className="min-h-screen bg-background p-8">
            <div className="container mx-auto max-w-7xl">
                <div className="animate-pulse space-y-8">
                    <div className="h-8 w-48 bg-muted rounded" />
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                        {[...Array(12)].map((_, i) => (
                            <div key={i} className="space-y-4">
                                <div className="aspect-[2/3] bg-muted rounded-lg" />
                                <div className="space-y-2">
                                    <div className="h-4 bg-muted rounded w-3/4" />
                                    <div className="h-3 bg-muted rounded w-1/2" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GenreSkeleton;