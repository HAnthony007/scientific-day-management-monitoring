
import { format } from "date-fns";
import { Edit2, Trash2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useCalendarContext } from "../calendar-context";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function CalendarDescriptionEventDialog() {
    const {
        descriptionEventDialogOpen,
        setDescriptionEventDialogOpen,
        setManageEventDialogOpen,
        selectedEvent,
        setSelectedEvent,
    } = useCalendarContext()


    function handleClose() {
        setDescriptionEventDialogOpen(false)
        setSelectedEvent(null)
    }

    function handleDelete() {
        toast.success('Event deleted')
    }

    return (
        <Dialog open={descriptionEventDialogOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">
                        {selectedEvent?.title}
                    </DialogTitle>
                </DialogHeader>
                <div className="mt-4 space-y-4">
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-500">
                            Date & Time
                        </p>
                        <p className="text-sm">
                            {selectedEvent && format(selectedEvent.date_deb, "yyyy-MM-dd'T'HH:mm")}
                            <br />
                            {selectedEvent && format(selectedEvent.date_deb, "p")} -{" "}
                            {selectedEvent && format(selectedEvent.date_fin, "p")}
                        </p>
                    </div>
                    {selectedEvent?.location && (
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500">
                                Location
                            </p>
                            <p className="text-sm">{selectedEvent.location}</p>
                        </div>
                    )}
                </div>
                <DialogFooter className="mt-6">
                    <div className="flex space-x-2">

                        <Button type="button" variant="secondary">View</Button>
                        <Button
                            variant="outline"
                            onClick={(e) => {
                                e.stopPropagation()
                                setManageEventDialogOpen(true)
                            }}
                            className="flex items-center space-x-2"
                        >
                            <Edit2 className="w-4 h-4" />
                            <span>Edit</span>
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            className="flex items-center space-x-2"
                        >
                            <Trash2 className="w-4 h-4" />
                            <span>Delete</span>
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
