import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const SingInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleLogin = async () => {
    //validación basica
    if (!email || !password) {
      Alert.alert("Error", "Completa todos los campos");
      return;
    }
    try {
      //Obtener usuario guardado
      const storedUser = await AsyncStorage.getItem("user")
      if (!storedUser) {
        Alert.alert("Error", "No existe usario registrado")
        return;
      }
      // Convertir a objeto
      const user = JSON.parse(storedUser);

      //validamos credenciales
      if (user.email === email && user.password === password) {
        await AsyncStorage.setItem("isLogged", "true")
        Alert.alert("Bienvenida 💙", "Inicio de sesión exitoso");
        router.replace("/home");
      } else {
        Alert.alert("Error", "Credenciales incorrectas");
      }
    } catch (error) {
      Alert.alert("Error", "Algo salio mal")
    }

  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Iniciar sesión</Text>

      <TextInput
        placeholder="Correo"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Contraseña"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          style={styles.passwordInput}
        />

        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={22}
            color="#4A90E2"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>

    </View>
  );
};

export default SingInForm;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 20,
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },

  title: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 15,
    color: "#4A90E2",
    fontFamily: "Poppins_400Regular",
  },

  input: {
    backgroundColor: "#F9FCFF",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#D6ECFF",
    fontFamily: "Poppins_400Regular",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FCFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D6ECFF",
    marginBottom: 12,
    paddingHorizontal: 10,
  },

  passwordInput: {
    flex: 1,
    padding: 14,
    fontFamily: "Poppins_400Regular",
  },

  showText: {
    color: "#4A90E2",
    fontFamily: "Poppins_400Regular",
    fontWeight: "bold",
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