import SignUpForm from "@/components/SignUpForm";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,View,
  TouchableOpacity
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const RegisterPage = () => {


  return (
    <SafeAreaView style={styles.Container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableOpacity
            onPress={() => router.replace("/login")}
            style={styles.buttonBack}
          >
            <View style={{
              flexDirection: "row",
              alignItems: "center",
            }}>
              <Ionicons name="arrow-back" size={20} color="#4A90E2" />

              <Text style={{
                color: "#4A90E2",
                fontFamily: "Poppins_400Regular",
                marginLeft: 6,
              }}>
                Volver al inicio
              </Text>
            </View>
          </TouchableOpacity>
          <SignUpForm />

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterPage;


const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#EAF6FF",
    width: "100%"
  },
  textTitle: {
    color: "#4A90E2",
    fontFamily: "Poppins_400Regular",
    marginLeft: 6,
  },
  buttonBack:{
     position: "absolute",
    top: 10,
    left: 20,
    zIndex: 10,
  }
})