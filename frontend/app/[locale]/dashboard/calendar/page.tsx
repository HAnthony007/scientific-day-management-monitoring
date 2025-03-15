import Calendar from "@/features/calendar/calendar";
import { Suspense } from "react";
import Loading from "../loading";

export default function CalendarPage() {
    return (
        <div>
            <Suspense fallback={<Loading />}>
                <Calendar />
            </Suspense>
        </div>
    );
}
