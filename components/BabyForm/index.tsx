import { Ionicons } from '@expo/vector-icons';
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

//estructura del usuario (modelo de datos)
interface Baby {
  name: string;
  age: string
  weight?: string;
}

const BabyForm = ({ onSuccess }: { onSuccess?: () => void }) => {

  //Estado inicial del formulario, todos los campos vacios
  const initialForm: Baby = {
    name: "",
    age: "",
    weight: ""
  };

  //estado principal del formulario
  const [form, setForm] = useState<Baby>(initialForm);


  //toma los cambios y los almacena en el estado
  const handleChange = (key: keyof Baby, value: string) => {
    setForm({ ...form, [key]: value });
  };

  //convierte a numero los campos como telefono
  const onlyNumbers = (text: string) => text.replace(/[^0-9]/g, "");


  const handleRegister = async () => {

    //valida que los campos obligatorios no estén vacíos
    if (!form.name || !form.age || !form.weight) {
      Alert.alert("Error", "Completa los campos obligatorios");
      return;
    }

    //maneja el guardado de datos en AsyncStorage
    try {
      await AsyncStorage.setItem("baby", JSON.stringify(form));

      Alert.alert("💙 Registro exitoso");
      setForm(initialForm)

      //callback opcional para refrescar datos en la pantalla padre
      onSuccess?.();

    } catch (error) {
      Alert.alert("Error", "No se pudo guardar el los datos del bebé");
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Registro de Bebé</Text>

      {/* Nombre */}
      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={20} color="#4A90E2" />
        <TextInput
          placeholder="Nombre"
          value={form.name}
          onChangeText={(text) => handleChange("name", text)}
          style={styles.input}
        />
      </View>

      {/* Edad */}
      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={20} color="#4A90E2" />
        <TextInput
          placeholder="Edad"
          value={form.age}
          onChangeText={(text) => handleChange("age", text)}
          style={styles.input}
        />
      </View>

        {/* peso */}
      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={20} color="#4A90E2" />
        <TextInput
          placeholder="Peso"
          value={form.weight}
          onChangeText={(text) => handleChange("weight", text)}
          style={styles.input}
        />
      </View>


      {/* Botón de registro */}
      <TouchableOpacity onPress={handleRegister} style={styles.button}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>


    </View>
  );
};

export default BabyForm;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F4FBFF",
    padding: 20,
    borderRadius: 20,
    width: "100%",
    alignSelf: "center",
  },

  //titulo principal
  title: {
    fontSize: 26,
    color: "#4A90E2",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Pacifico_400Regular",
  },

  //contenedor de cada input con icono
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D6ECFF",
    marginBottom: 12,
    paddingHorizontal: 10,
  },

  //input de texto
  input: {
    flex: 1,
    padding: 12,
    fontFamily: "Poppins_400Regular",
  },

  //botón principal
  button: {
    backgroundColor: "#6EC6FF",
    padding: 15,
    borderRadius: 15,
    marginTop: 10,
  },

  //texto del botón
  buttonText: {
    color: "white",
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
  },
});