import SignUpForm from "@/components/MotherForm";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MotherScreen = () => {

  const handleBack = async () => {
    const mother = await AsyncStorage.getItem("mother");
    if (mother) {
      router.replace("/home");
    } else {
      Alert.alert(
        "Acción requerida",
        "Por favor, completa tus datos antes de volver al inicio."
      );
    }
  };

  return (
    <SafeAreaView style={styles.Container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >

          {/* Botón volver */}
          <TouchableOpacity
            onPress={handleBack}
            style={styles.buttonBack}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="arrow-back" size={20} color="#4A90E2" />
              <Text style={styles.textBack}>
                Volver al inicio
              </Text>
            </View>
          </TouchableOpacity>

          {/* 🔥 FORMULARIO DENTRO */}
          <SignUpForm />

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MotherScreen;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#EAF6FF",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  buttonBack: {
    position: "absolute",
    top: 10,
    left: 20,
    zIndex: 10,
  },
  textBack: {
    color: "#4A90E2",
    fontFamily: "Poppins_400Regular",
    marginLeft: 6,
  },
});