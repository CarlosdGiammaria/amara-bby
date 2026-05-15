import CustomHeader from "@/components/CustomHeader";

import FeedingCard from "@/components/FeedingCard";

import type { Feeding } from "@/types/feeding";

import {
    deleteFeeding,
    getFeedings,
} from "@/utils/feedingStorage";

import { useFocusEffect } from "expo-router";

import {
    useCallback,
    useState,
} from "react";

import {
    FlatList,
    StyleSheet,
    Text,
    View,
} from "react-native";

const FeedingHistoryScreen = () => {

    const [feedings, setFeedings] =
        useState<Feeding[]>([]);

    const loadFeedings = async () => {

        const data = await getFeedings();

        setFeedings(data);
    };

    useFocusEffect(
        useCallback(() => {

            loadFeedings();

        }, [])
    );

    const handleDelete = async (
        id: string
    ) => {

        await deleteFeeding(id);

        loadFeedings();
    };

    // 🔥 agrupar por fecha
    const grouped = feedings.reduce(
        (acc: any, item) => {

            const date =
                new Date(
                    item.createdAt
                ).toLocaleDateString();

            if (!acc[date]) {
                acc[date] = [];
            }

            acc[date].push(item);

            return acc;

        },
        {}
    );

    return (
        <View style={styles.container}>

            <CustomHeader
                title="Historial de Lactancias"
            />

            <FlatList
                data={Object.entries(grouped)}
                keyExtractor={(item) => item[0]}
                contentContainerStyle={{
                    padding: 20,
                    paddingBottom: 100,
                }}
                renderItem={({ item }) => {

                    const [date, items] =
                        item as [string, Feeding[]];

                    return (
                        <View>

                            {/* 📅 fecha */}
                            <Text style={styles.date}>
                                {date}
                            </Text>

                            {/* 🍼 cards */}
                            {items.map((feeding) => (

                                <FeedingCard
                                    key={feeding.id}
                                    feeding={feeding}
                                    onDelete={() =>
                                        handleDelete(feeding.id)
                                    }
                                />

                            ))}

                        </View>
                    );
                }}
                ListEmptyComponent={
                    <View style={styles.empty}>

                        <Text style={styles.emptyText}>
                            No hay lactancias registradas
                        </Text>

                    </View>
                }
            />

        </View>
    );
};

export default FeedingHistoryScreen;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#F4FBFF",
    },

    date: {
        fontSize: 20,
        color: "#4A90E2",

        marginBottom: 14,
        marginTop: 10,

        fontFamily: "Poppins_600SemiBold",
    },

    empty: {
        alignItems: "center",
        marginTop: 100,
    },

    emptyText: {
        color: "#777",
        fontSize: 16,
        fontFamily: "Poppins_400Regular",
    },
});