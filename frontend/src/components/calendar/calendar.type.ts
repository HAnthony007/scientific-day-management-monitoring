export interface MyEvent {
    id_event: number; // Correspond à la clé primaire
    title: string;
    description: string;
    content: string;
    date_deb: Date;
    date_fin: Date;
    lieu: string;
    organisateur_id: number;
}
