import SingInForm from "@/components/SignInForm";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const LoginPage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.logo}>Amara Baby</Text>
          <Text style={styles.subtitle}>
            Tu espacio de cuidado y amor 💙
          </Text>

          <SingInForm />

          <Text style={styles.footer}>
            ¿Aún no tienes cuenta?
          </Text>
          <TouchableOpacity onPress={() => router.push("/register")}>
            <Text style={styles.link}>
              Crear cuenta{" "}
              <MaterialCommunityIcons name="mother-heart" size={20} color="#4A90E2" />
            </Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAF6FF",
    width: "100%"
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    fontSize: 32,
    fontFamily: "Pacifico_400Regular",
    color: "#4A90E2",
    marginBottom: 5,
  },
  subtitle: {
    fontFamily: "Poppins_400Regular",
    color: "#7A8A99",
    marginBottom: 25,
    textAlign: "center",
  },
  footer: {
    marginTop: 20,
    color: "#7A8A99",
    fontFamily: "Poppins_400Regular",
  },
  link: {
    color: "#4A90E2",
    fontFamily: "Poppins_400Regular",
    fontWeight: "bold",
    marginTop: 5,
  },
});