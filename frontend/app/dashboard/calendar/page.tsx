// import Calendar from "@/features/calendar/calendar";
import { Main } from "@/components/layout/main";
import Calendar from "@/features/calendar/calendar";
import { Suspense } from "react";

export default function CalendarPage() {
    return (
        <Main>
            <Suspense fallback="Loading...">
                <Calendar />
            </Suspense>
        </Main>
    );
}
