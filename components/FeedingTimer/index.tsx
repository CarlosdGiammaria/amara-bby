import useFeedingTimer from "@/hooks/useFeedingTimer";

import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface Props {
    onChange?: (minutes: number) => void;
}

const FeedingTimer = ({
    onChange,
}: Props) => {

    const {
        formattedTime,
        running,
        toggleTimer,
        resetTimer,
    } = useFeedingTimer(onChange);

    return (
        <View style={styles.container}>

            <Text style={styles.label}>
                Tiempo de lactancia
            </Text>

            <View style={styles.circle}>

                <Text style={styles.time}>
                    {formattedTime}
                </Text>

            </View>

            <View style={styles.buttons}>

                <TouchableOpacity
                    style={styles.startButton}
                    onPress={toggleTimer}
                >

                    <Text style={styles.buttonText}>
                        {running ? "Pausar" : "Iniciar"}
                    </Text>

                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.resetButton}
                    onPress={resetTimer}
                >

                    <Text style={styles.buttonText}>
                        Reset
                    </Text>

                </TouchableOpacity>

            </View>

        </View>
    );
};

export default FeedingTimer;

const styles = StyleSheet.create({

    container: {
        alignItems: "center",
        marginBottom: 30,
    },

    label: {
        fontSize: 18,
        color: "#4A90E2",
        marginBottom: 20,
        fontFamily: "Poppins_500Medium",
    },

    circle: {
        width: 180,
        height: 180,
        borderRadius: 100,

        backgroundColor: "#EAF6FF",

        justifyContent: "center",
        alignItems: "center",

        marginBottom: 25,

        borderWidth: 6,
        borderColor: "#6EC6FF",
    },

    time: {
        fontSize: 42,
        color: "#4A90E2",
        fontFamily: "Poppins_600SemiBold",
    },

    buttons: {
        flexDirection: "row",
        gap: 12,
    },

    startButton: {
        backgroundColor: "#4A90E2",
        paddingVertical: 14,
        paddingHorizontal: 25,
        borderRadius: 14,
    },

    resetButton: {
        backgroundColor: "#FF6B81",
        paddingVertical: 14,
        paddingHorizontal: 25,
        borderRadius: 14,
    },

    buttonText: {
        color: "#fff",
        fontSize: 15,
        fontFamily: "Poppins_500Medium",
    },

});