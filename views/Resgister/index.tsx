import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from "react";
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

interface User {
  name: string;
  lastName: string;
  yearOfBirth: string;
  age: string;
  phone: string;
  email: string;
  password: string;
}

const SignUpForm = ({ onSuccess }: { onSuccess?: () => void }) => {

  const [form, setForm] = useState<User>({
    name: "",
    lastName: "",
    yearOfBirth: "",
    age: "",
    phone: "",
    email: "",
    password: "",
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());

  const handleChange = (key: keyof User, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const onlyNumbers = (text: string) => text.replace(/[^0-9]/g, "");

  // 🔥 calcular edad automáticamente
  const calculateAge = (birthDate: Date) => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age.toString();
  };

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);

    if (selectedDate) {
      setDate(selectedDate);

      const formatted = selectedDate.toISOString().split("T")[0];

      handleChange("yearOfBirth", formatted);
      handleChange("age", calculateAge(selectedDate)); // 🔥 auto edad
    }
  };

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) {
      Alert.alert("Error", "Completa los campos obligatorios");
      return;
    }

    try {
      await AsyncStorage.setItem("user", JSON.stringify(form));

      Alert.alert("💙 Registro exitoso", "Bienvenida a Amara Baby");

      onSuccess?.();

    } catch (error) {
      Alert.alert("Error", "No se pudo guardar el usuario");
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Amara Baby</Text>
      <Text style={styles.subtitle}>Crea tu cuenta 💙</Text>

      <TextInput
        placeholder="Nombre"
        value={form.name}
        onChangeText={(text) => handleChange("name", text)}
        style={styles.input}
      />

      <TextInput
        placeholder="Apellido"
        value={form.lastName}
        onChangeText={(text) => handleChange("lastName", text)}
        style={styles.input}
      />

      {/* 📅 DATE PICKER */}
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={{
          fontFamily: "Poppins_400Regular",
          color: form.yearOfBirth ? "#000" : "#999"
        }}>
          {form.yearOfBirth || "Fecha de nacimiento"}
        </Text>
      </TouchableOpacity>

      {/* 👇 Mostrar calendario */}
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onChangeDate}
          maximumDate={new Date()}
        />
      )}

      {/* Edad (automática) */}
      <TextInput
        placeholder="Edad"
        value={form.age}
        editable={false} // 🔥 bloqueado
        style={[styles.input, { backgroundColor: "#F0F4F8" }]}
      />

      <TextInput
        placeholder="Teléfono"
        keyboardType="numeric"
        value={form.phone}
        onChangeText={(text) => handleChange("phone", onlyNumbers(text))}
        style={styles.input}
      />

      <TextInput
        placeholder="Correo"
        value={form.email}
        onChangeText={(text) => handleChange("email", text)}
        style={styles.input}
      />

      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        value={form.password}
        onChangeText={(text) => handleChange("password", text)}
        style={styles.input}
      />

      <TouchableOpacity onPress={handleRegister} style={styles.button}>
        <Text style={styles.buttonText}>Registrarme</Text>
      </TouchableOpacity>

    </View>
  );
};

export default SignUpForm;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F4FBFF",
    padding: 20,
    borderRadius: 20,
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
  },

  title: {
    fontSize: 26,
    color: "#4A90E2",
    marginBottom: 5,
    textAlign: "center",
    fontFamily: "Pacifico_400Regular",
  },

  subtitle: {
    textAlign: "center",
    color: "#7A8A99",
    marginBottom: 15,
    fontFamily: "Poppins_400Regular",
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#D6ECFF",
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
  },

  button: {
    backgroundColor: "#6EC6FF",
    padding: 15,
    borderRadius: 15,
    marginTop: 10,
  },

  buttonText: {
    color: "white",
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
  },
});