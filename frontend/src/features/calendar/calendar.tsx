"use client";
import { MyEvent } from "@/components/calendar/calendar.type";
import { EventDialog } from "@/components/calendar/event.dialog";
import { EventForm } from "@/components/calendar/event.form";
import { Button } from "@/components/ui/button";
import { format, getDay, parse, startOfWeek } from "date-fns";
import { enUS } from "date-fns/locale";
import { Plus } from "lucide-react";
import { FC, useEffect, useState } from "react";
import {
    Calendar as BigCalendar,
    dateFnsLocalizer,
    SlotInfo,
    ToolbarProps,
    View,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendar-styles.css";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "sonner";

const locales = {
    "en-US": enUS,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

export default function Calendar() {
    const [events, setEvents] = useState<MyEvent[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<MyEvent | null>(null);
    const [showEventDialog, setShowEventDialog] = useState(false);
    const [showEventForm, setShowEventForm] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState<Date | null>(null);
    const [selectedEndDate, setSelectedEndDate] = useState<Date | undefined>();

    const handleSelectEvent = (event: MyEvent) => {
        setSelectedEvent(event);
        setShowEventDialog(true);
    };

    const handleSelectSlot = (slotInfo: SlotInfo) => {
        setSelectedSlot(slotInfo.start);
        setSelectedEvent(null);
        setShowEventForm(true);
        if (slotInfo.end) {
            const endDate = new Date(slotInfo.end);
            endDate.setDate(endDate.getDate() - 1);
            setSelectedEndDate(endDate);
        } else {
            setSelectedEndDate(undefined);
        }
    };

    const handleAddEvent = () => {
        setSelectedEvent(null);
        setSelectedSlot(new Date());
        setShowEventForm(true);
    };

    const handleSaveEvent = async (eventData: Omit<MyEvent, "id">) => {
        try {
            if (selectedEvent) {
                await axiosInstance.put(`/Events/${selectedEvent.id_event}`, eventData)
            }
            else {
                await axiosInstance.post("/Events", eventData)
            }
            fetchEvents();
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'événement:", error);
            toast.error("Erreur lors de la mise à jour de l'événement")
        }
    };

    const handleDeleteEvent = async () => {
        if (selectedEvent) {
            try {
                await axiosInstance.delete(`/Events/${selectedEvent.id_event}` )
            } catch (error) {
                console.error("Erreur lors de la suppression de l'événement", error);
                toast.error("Erreur lors de la suppression de l'événement")
            }
        }
        setShowEventDialog(false);
    };

    const handleEditEvent = () => {
        setShowEventDialog(false);
        setShowEventForm(true);
    };

    const fetchEvents = async () => {
        try {
            const response = await axiosInstance.get("/Events");
            setEvents(response.data.data);
        } catch (error) {
            console.error("Erreur lors du chargement des événements", error);
            toast.error("Erreur lors du chargement des événements")
        }
    }

    useEffect(() => {
        fetchEvents();
    }, [])

    const CustomToolbar: FC<ToolbarProps<MyEvent>> = (props) => {
        const { label, onNavigate, onView } = props;
        return (
            <div className="flex items-center justify-between py-4 border-b">
                <div className="flex items-center space-x-4">
                    <Button
                        variant="outline"
                        onClick={() => onNavigate("TODAY")}
                    >
                        Today
                    </Button>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            onClick={() => onNavigate("PREV")}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => onNavigate("NEXT")}
                        >
                            Next
                        </Button>
                    </div>
                    <h2 className="text-xl font-semibold">{label}</h2>
                </div>
                <div className="flex items-center space-x-4">
                    <Button
                        onClick={handleAddEvent}
                        className="flex items-center space-x-2"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Add Event</span>
                    </Button>
                    <div className="flex space-x-2">
                        {["month", "week", "day"].map((viewType) => (
                            <Button
                                key={viewType}
                                variant="outline"
                                onClick={() => onView(viewType as View)}
                            >
                                {viewType.charAt(0).toUpperCase() +
                                    viewType.slice(1)}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="h-full w-full px-4">
            <div className="h-[calc(85vh-3rem)] rounded-lg shadow-sm">
                <BigCalendar
                    localizer={localizer}
                    events={events}
                    defaultView="month"
                    views={["month", "week", "day"]}
                    onSelectEvent={handleSelectEvent}
                    onSelectSlot={handleSelectSlot}
                    selectable
                    components={{
                        toolbar: CustomToolbar,
                    }}
                />
            </div>

            <EventDialog
                event={selectedEvent}
                open={showEventDialog}
                onClose={() => setShowEventDialog(false)}
                onEdit={handleEditEvent}
                onDelete={handleDeleteEvent}
            />

            <EventForm
                event={selectedEvent}
                open={showEventForm}
                onClose={() => {
                    setShowEventForm(false);
                    setSelectedEndDate(undefined);
                }}
                onSave={handleSaveEvent}
                selectedDate={selectedSlot ?? undefined}
                selectedEndDate={selectedEndDate}
            />
        </div>
    );
}
