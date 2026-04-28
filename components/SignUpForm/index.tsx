import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from "react";
import {
  Alert,
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

  const handleChange = (key: keyof User, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const onlyNumbers = (text: string) => text.replace(/[^0-9]/g, "");

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

      <Text style={styles.title}>Crear cuenta</Text>

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

      <TextInput
        placeholder="Fecha de nacimiento (YYYY-MM-DD)"
        value={form.yearOfBirth}
        onChangeText={(text) => handleChange("yearOfBirth", text)}
        style={styles.input}
      />

      <TextInput
        placeholder="Edad"
        keyboardType="numeric"
        value={form.age}
        onChangeText={(text) => handleChange("age", onlyNumbers(text))}
        style={styles.input}
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
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4A90E2",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#D6ECFF",
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
    fontWeight: "bold",
  },
});