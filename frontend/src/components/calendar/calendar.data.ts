import { MyEvent } from "./calendar.type";

export const dummyEvents: MyEvent[] = [
    {
        id_event: 1,
        title: "IA",
        description: "Un événement explorant les impacts et les innovations en intelligence artificielle.",
        content: "Des experts discuteront des dernières avancées en IA et de leur application dans différents secteurs.",
        date_deb: new Date("2025-03-20 08:30:00"),
        date_fin: new Date("2025-03-20 16:30:00"),
        lieu: "Centre Technologique - Port Toamasina",
        organisateur_id: 3,
    }
   
];
