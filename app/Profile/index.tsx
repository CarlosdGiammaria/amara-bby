import type { Mother } from "@/types/mother";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const MotherProfile = () => {

    const [mother, setMother] = useState<Mother>({
        id: "",
        name: "",
        lastName: "",
        yearOfBirth: "",
        phone: "",
    });

    const loadMother = async () => {

        try {

            const data = await AsyncStorage.getItem("mother");

            if (!data) return;

            const parsed = JSON.parse(data);

            setMother(parsed);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadMother();
    }, []);

    const handleChange = (key: keyof Mother, value: string) => {
        setMother({
            ...mother,
            [key]: value,
        });
    };

    const handleUpdate = async () => {

        try {

            await AsyncStorage.setItem(
                "mother",
                JSON.stringify(mother)
            );

            Alert.alert(
                "Actualizado",
                "La información fue actualizada correctamente 💙"
            );

        } catch (error) {

            Alert.alert(
                "Error",
                "No se pudo actualizar la información"
            );
        }
    };

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
        >

            {/* 👩 Avatar */}
            <View style={styles.avatarContainer}>

                <View style={styles.avatar}>
                    <Ionicons
                        name="person-outline"
                        size={60}
                        color="#4A90E2"
                    />
                </View>

                <Text style={styles.name}>
                    {mother.name} {mother.lastName}
                </Text>

                <Text style={styles.subtitle}>
                    Perfil de mamá
                </Text>

            </View>

            {/* 🔹 Nombre */}
            <View style={styles.inputContainer}>
                <Ionicons
                    name="person-outline"
                    size={20}
                    color="#4A90E2"
                />

                <TextInput
                    placeholder="Nombre"
                    value={mother.name}
                    onChangeText={(text) =>
                        handleChange("name", text)
                    }
                    style={styles.input}
                />
            </View>

            {/* 🔹 Apellido */}
            <View style={styles.inputContainer}>
                <Ionicons
                    name="person-outline"
                    size={20}
                    color="#4A90E2"
                />

                <TextInput
                    placeholder="Apellido"
                    value={mother.lastName}
                    onChangeText={(text) =>
                        handleChange("lastName", text)
                    }
                    style={styles.input}
                />
            </View>

            {/* 🔹 Fecha */}
            <View style={styles.inputContainer}>
                <Ionicons
                    name="calendar-outline"
                    size={20}
                    color="#4A90E2"
                />

                <TextInput
                    placeholder="Fecha de nacimiento"
                    value={mother.yearOfBirth}
                    onChangeText={(text) =>
                        handleChange("yearOfBirth", text)
                    }
                    style={styles.input}
                />
            </View>

            {/* 🔹 Teléfono */}
            <View style={styles.inputContainer}>
                <Ionicons
                    name="call-outline"
                    size={20}
                    color="#4A90E2"
                />

                <TextInput
                    placeholder="Teléfono"
                    keyboardType="numeric"
                    value={mother.phone}
                    onChangeText={(text) =>
                        handleChange("phone", text)
                    }
                    style={styles.input}
                />
            </View>

            {/* 🔘 Botón */}
            <TouchableOpacity
                style={styles.button}
                onPress={handleUpdate}
            >
                <Ionicons
                    name="save-outline"
                    size={20}
                    color="#fff"
                />

                <Text style={styles.buttonText}>
                    Actualizar Información
                </Text>
            </TouchableOpacity>

        </ScrollView>
    );
};

export default MotherProfile;

const styles = StyleSheet.create({

    container: {
        padding: 20,
        backgroundColor: "#F4FBFF",
        flexGrow: 1,
    },

    avatarContainer: {
        alignItems: "center",
        marginBottom: 30,
        marginTop: 10,
    },

    avatar: {
        width: 120,
        height: 120,
        borderRadius: 999,
        backgroundColor: "#EAF6FF",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 15,
    },

    name: {
        fontSize: 24,
        color: "#333",
        fontFamily: "Poppins_600SemiBold",
    },

    subtitle: {
        color: "#7A7A7A",
        marginTop: 5,
        fontFamily: "Poppins_400Regular",
    },

    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 16,
        paddingHorizontal: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#DDEFFF",
    },

    input: {
        flex: 1,
        padding: 15,
        fontFamily: "Poppins_400Regular",
    },

    button: {
        backgroundColor: "#6EC6FF",
        borderRadius: 18,
        padding: 18,
        marginTop: 20,

        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
    },

    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontFamily: "Poppins_600SemiBold",
    },

});