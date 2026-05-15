import BabyForm from "@/components/BabyForm";
import { Baby } from "@/types/baby";
import { getBabies } from "@/utils/babyStorage";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";

const BabyEdit = () => {

    const { id } = useLocalSearchParams();

    const [baby, setBaby] = useState<Baby | null>(null);

    useEffect(() => {

        const loadBaby = async () => {

            const babies = await getBabies();

            const found = babies.find(
                (b) => b.id === id
            );

            if (found) {
                setBaby(found);
            }
        };

        loadBaby();

    }, [id]);

    if (!baby) {
        return <View />;
    }

    return (
        <BabyForm
            initialData={baby}
            onSuccess={() => {
                router.back();
            }}
        />
    );
};

export default BabyEdit;