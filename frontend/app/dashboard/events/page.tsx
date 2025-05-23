// import Calendar from "@/features/calendar/calendar";
import { Main } from "@/components/layout/main";
import CalendarDemo from "@/features/event/calendar-demo";
import { Suspense } from "react";

export default function EventsPage() {
    return (
        <Main>
            <Suspense fallback="Loading...">
                <CalendarDemo />
            </Suspense>
        </Main>
    );
}
