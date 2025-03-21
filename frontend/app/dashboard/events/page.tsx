// import Calendar from "@/features/calendar/calendar";
import { Suspense } from "react";

export default function CalendarPage() {
    return (
        <div>
            <Suspense fallback="Loading...">
                Hello World
            </Suspense>
        </div>
    );
}
