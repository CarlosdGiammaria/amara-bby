import SignUpForm from "@/components/SignUpForm";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const RegisterPage = () => {
  const [savedData, setSavedData] = useState<string | null>(null);

  const loadData = async () => {
    const data = await AsyncStorage.getItem("user");
    setSavedData(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#EAF6FF" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            padding: 20,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <Text
            style={{
              fontSize: 28,
              textAlign: "center",
              color: "#4A90E2",
              marginBottom: 20,
              fontWeight: "bold",
            }}
          >
            💙 Bienvenida
          </Text>

          <SignUpForm onSuccess={loadData} />

          <View style={{ marginTop: 20 }}>
            <Text style={{ textAlign: "center", color: "#777" }}>
              Datos guardados:
            </Text>

            <Text style={{ fontSize: 12, marginTop: 10 }}>
              {savedData
                ? JSON.stringify(JSON.parse(savedData), null, 2)
                : "No hay datos"}
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterPage;