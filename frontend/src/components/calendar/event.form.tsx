"use client";

import { format } from "date-fns";
import { FormEvent, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { MyEvent } from "./calendar.type";

export type EventFormProps = {
    event?: MyEvent | null;
    open: boolean;
    onClose: () => void;
    onSave: (event: Omit<MyEvent, "id">) => void;
    selectedDate?: Date;
    selectedEndDate?: Date;
};

const defaultFormData = {
    title: "",
    description: "",
    location: "",
    startDate: "",
    startTime: "00:00",
    endDate: "",
    endTime: "23:59",
};

export const EventForm = ({
    event,
    open,
    onClose,
    onSave,
    selectedDate,
    selectedEndDate,
}: EventFormProps) => {
    const [formData, setFormData] = useState(defaultFormData);

    useEffect(() => {
        if (!open) {
            setFormData(defaultFormData);
            return;
        }

        if (event) {
            setFormData({
                title: event.title,
                description: event.description || "",
                location: event.location || "",
                startDate: format(event.start, "yyyy-MM-dd"),
                startTime: format(event.start, "HH:mm"),
                endDate: format(event.end, "yyyy-MM-dd"),
                endTime: format(event.end, "HH:mm"),
            });
        } else if (selectedDate) {
            const startDate = format(selectedDate, "yyyy-MM-dd");
            const endDate = selectedEndDate
                ? format(selectedEndDate, "yyyy-MM-dd")
                : startDate;

            setFormData({
                ...defaultFormData,
                startDate,
                endDate,
                startTime: "00:00",
                endTime: selectedEndDate ? "23:59" : "23:59",
            });
        }
    }, [event, open, selectedDate, selectedEndDate]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const start = new Date(`${formData.startDate}T${formData.startTime}`);
        const end = new Date(`${formData.endDate}T${formData.endTime}`);

        onSave({
            title: formData.title,
            description: formData.description,
            location: formData.location,
            start,
            end,
        });

        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-xl">
                        {event ? "Edit Event" : "Create New Event"}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Event Title</Label>
                        <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    title: e.target.value,
                                })
                            }
                            className="w-full"
                            placeholder="Enter event title"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Start Date</Label>
                            <div className="space-y-2">
                                <Input
                                    type="date"
                                    value={formData.startDate}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            startDate: e.target.value,
                                        })
                                    }
                                    required
                                />
                                <Input
                                    type="time"
                                    value={formData.startTime}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            startTime: e.target.value,
                                        })
                                    }
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>End Date</Label>
                            <div className="space-y-2">
                                <Input
                                    type="date"
                                    value={formData.endDate}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            endDate: e.target.value,
                                        })
                                    }
                                    required
                                />
                                <Input
                                    type="time"
                                    value={formData.endTime}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            endTime: e.target.value,
                                        })
                                    }
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="location">Location (Optional)</Label>
                        <Input
                            id="location"
                            value={formData.location}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    location: e.target.value,
                                })
                            }
                            placeholder="Enter location"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">
                            Description (Optional)
                        </Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    description: e.target.value,
                                })
                            }
                            rows={3}
                            placeholder="Add description"
                        />
                    </div>

                    <div className="flex justify-end space-x-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button type="submit">
                            {event ? "Update Event" : "Create Event"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};
