export interface Feeding {

    id: string;

    babyId: string;

    side: "Izquierdo" | "Derecho";

    startTime: string;

    duration: number;

    createdAt: string;
}