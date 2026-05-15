import type { Feeding } from "@/types/feeding";

import { addFeeding } from "@/utils/feedingStorage";

import { getActiveBaby } from "@/utils/babyStorage";

import {
    Alert,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { useState } from "react";
import FeedingTimer from "../FeedingTimer";

const FeedingForm = () => {

    const [side, setSide] = useState<
        "Izquierdo" | "Derecho"
    >("Izquierdo");

    const [duration, setDuration] =
        useState(10);

    const handleSave = async () => {

        const baby = await getActiveBaby();

        if (!baby) {

            Alert.alert(
                "Error",
                "Selecciona un bebé"
            );

            return;
        }

        const feeding: Feeding = {

            id: Date.now().toString(),

            babyId: baby.id,

            side,

            duration,

            startTime:
                new Date().toLocaleTimeString(),

            createdAt:
                new Date().toISOString(),
        };

        await addFeeding(feeding);

        Alert.alert(
            "💙 Lactancia registrada"
        );
    };

    return (
        <View style={styles.container}>


            {/* 🍼 lado */}
            <View style={styles.row}>

                <TouchableOpacity
                    style={[
                        styles.sideButton,
                        side === "Izquierdo" &&
                        styles.active,
                    ]}
                    onPress={() =>
                        setSide("Izquierdo")
                    }
                >
                    <Text>
                        Izquierdo
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.sideButton,
                        side === "Derecho" &&
                        styles.active,
                    ]}
                    onPress={() =>
                        setSide("Derecho")
                    }
                >
                    <Text>
                        Derecho
                    </Text>
                </TouchableOpacity>

            </View>

            {/* ⏱️ duración */}
            <View style={styles.durationRow}>

                <TouchableOpacity
                    onPress={() =>
                        setDuration(
                            Math.max(1, duration - 1)
                        )
                    }
                >
                    <Text style={styles.counter}>
                        -
                    </Text>
                </TouchableOpacity>

                <Text style={styles.duration}>
                    {duration} min
                </Text>

                <TouchableOpacity
                    onPress={() =>
                        setDuration(duration + 1)
                    }
                >
                    <Text style={styles.counter}>
                        +
                    </Text>
                </TouchableOpacity>

            </View>

            <FeedingTimer
                onChange={(seconds) =>
                    setDuration(seconds)
                }
            />

            {/* 💾 guardar */}
            <TouchableOpacity
                style={styles.button}
                onPress={handleSave}
            >
                <Text style={styles.buttonText}>
                    Guardar lactancia
                </Text>
            </TouchableOpacity>

        </View>
    );
};

export default FeedingForm;

const styles = StyleSheet.create({

    container: {
        padding: 20,
    },

    title: {
        fontSize: 26,
        color: "#4A90E2",
        textAlign: "center",
        marginBottom: 20,
        fontFamily: "Pacifico_400Regular",
    },

    row: {
        flexDirection: "row",
        gap: 10,
        marginBottom: 20,
    },

    sideButton: {
        flex: 1,
        padding: 15,
        backgroundColor: "#EAF6FF",
        borderRadius: 14,
        alignItems: "center",
    },

    active: {
        backgroundColor: "#6EC6FF",
    },

    durationRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 30,
        marginBottom: 25,
    },

    counter: {
        fontSize: 30,
        color: "#4A90E2",
    },

    duration: {
        fontSize: 22,
        fontFamily: "Poppins_500Medium",
    },

    button: {
        backgroundColor: "#4A90E2",
        padding: 15,
        borderRadius: 16,
    },

    buttonText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 16,
    },
});