import type { Feeding } from "@/types/feeding";

import { Ionicons } from "@expo/vector-icons";

import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface Props {
    feeding: Feeding;
    babyName?: string;
    onDelete: () => void;
}

const FeedingCard = ({
    feeding,
    babyName,
    onDelete,
}: Props) => {

    return (
        <View style={styles.card}>

            {/* 🍼 Header */}
            <View style={styles.header}>

                <View style={styles.iconContainer}>

                    <Ionicons
                        name="water-outline"
                        size={24}
                        color="#4A90E2"
                    />

                </View>

                <View style={{ flex: 1 }}>

                    {babyName && (
                        <Text style={styles.babyName}>
                            {babyName}
                        </Text>
                    )}

                    <Text style={styles.side}>
                        Lado {feeding.side}
                    </Text>

                    <Text style={styles.time}>
                        {feeding.startTime}
                    </Text>

                </View>

                <TouchableOpacity
                    onPress={onDelete}
                >

                    <Ionicons
                        name="trash-outline"
                        size={22}
                        color="#FF6B81"
                    />

                </TouchableOpacity>

            </View>

            {/* ⏱️ duración */}
            <View style={styles.durationBox}>

                <Ionicons
                    name="time-outline"
                    size={18}
                    color="#6EC6FF"
                />

                <Text style={styles.duration}>
                    {feeding.duration} minutos
                </Text>

            </View>

        </View>
    );
};

export default FeedingCard;

const styles = StyleSheet.create({

    card: {
        backgroundColor: "#fff",

        borderRadius: 20,

        padding: 18,

        marginBottom: 14,

        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 10,
        fontFamily: "Poppins_400Regular",
        elevation: 4,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
    },

    iconContainer: {
        width: 50,
        height: 50,

        borderRadius: 25,

        backgroundColor: "#EAF6FF",

        justifyContent: "center",
        alignItems: "center",

        marginRight: 12,
    },

    babyName: {
        fontSize: 14,
        color: "#666",
        fontFamily: "Poppins_400Regular",
        marginBottom: 2,
    },

    side: {
        fontSize: 16,
        color: "#333",
        fontFamily: "Poppins_400Regular",
    },

    time: {
        color: "#888",
        marginTop: 4,
        fontFamily: "Poppins_400Regular",
    },

    durationBox: {
        flexDirection: "row",
        alignItems: "center",

        marginTop: 18,

        backgroundColor: "#F4FBFF",

        padding: 12,

        borderRadius: 12,

        gap: 6,
    },

    duration: {
        color: "#555",
        fontFamily: "Poppins_400Regular",
    },
});