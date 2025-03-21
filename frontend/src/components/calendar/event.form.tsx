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
    lieu: "",
    date_deb: "",
    date_fin: "",
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
                lieu: event.lieu|| "",
                date_deb: format(event.date_deb, "yyyy-MM-dd"),
                date_fin: format(event.date_fin, "yyyy-MM-dd"),
            });
        } else if (selectedDate) {
            const date_deb= format(selectedDate, "yyyy-MM-dd");
            const date_fin= selectedEndDate
                ? format(selectedEndDate, "yyyy-MM-dd")
                : date_deb;

            setFormData({
                ...defaultFormData,
                date_deb,
                date_fin,
            });
        }
    }, [event, open, selectedDate, selectedEndDate]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const date_deb = new Date(`${formData.date_deb}`);
        const date_fin = new Date(`${formData.date_fin}`);

        onSave({
            title: formData.title,
            description: formData.description,
            lieu: formData.lieu,
            date_deb,
            date_fin,
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
                                    value={formData.date_deb}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            date_deb: e.target.value,
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
                                    value={formData.date_fin}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            date_fin: e.target.value,
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
                            value={formData.lieu}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    lieu: e.target.value,
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
