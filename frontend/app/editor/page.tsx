import { PlateEditor } from "@/components/editor/plate-editor";
import { Suspense } from "react";

export default function Page() {
    return (
        <div className="h-screen w-full" data-registry="plate">
            <Suspense fallback={<div>Loading...</div>}>
                <PlateEditor />
            </Suspense>
        </div>
    );
}
