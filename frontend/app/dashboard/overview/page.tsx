import { Skeleton } from "@/components/ui/skeleton";
import { users } from "@/features/users/data/users";

export default async function OverviewPage() {
    const user = await users();
    console.log(user);
    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <Skeleton className="aspect-video rounded-xl" />
                <Skeleton className="aspect-video rounded-xl" />
                <Skeleton className="aspect-video rounded-xl" />
            </div>
            <Skeleton className="min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
        </div>
    );
}
