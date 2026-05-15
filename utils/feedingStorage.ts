import AsyncStorage from "@react-native-async-storage/async-storage";

import type { Feeding } from "@/types/feeding";

// 🔹 obtener
export const getFeedings = async (): Promise<Feeding[]> => {

    const data = await AsyncStorage.getItem("feedings");

    return data ? JSON.parse(data) : [];
};

// 🔹 agregar
export const addFeeding = async (
    feeding: Feeding
) => {

    const feedings = await getFeedings();

    const updated = [
        feeding,
        ...feedings,
    ];

    await AsyncStorage.setItem(
        "feedings",
        JSON.stringify(updated)
    );
};

// 🔹 eliminar
export const deleteFeeding = async (
    id: string
) => {

    const feedings = await getFeedings();

    const updated = feedings.filter(
        (f) => f.id !== id
    );

    await AsyncStorage.setItem(
        "feedings",
        JSON.stringify(updated)
    );
};