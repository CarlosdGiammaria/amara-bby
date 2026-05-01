import { Ionicons } from '@expo/vector-icons';
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

//estructura del usuario (modelo de datos)
interface Mother {
  name: string;
  lastName: string;
  yearOfBirth: string;
  phone: string;
  email: string;
  password: string;
}

const MotherForm = ({ onSuccess }: { onSuccess?: () => void }) => {

  //Estado inicial del formulario, todos los campos vacios
  const initialForm: Mother = {
    name: "",
    lastName: "",
    yearOfBirth: "",
    phone: "",
    email: "",
    password: "",
  };
  //estado principal del formulario
  const [form, setForm] = useState<Mother>(initialForm);
  

  //controla si se muestra u oculta la contraseña
  const [showPassword, setShowPassword] = useState(false);

  //controla la visibilidad del calendario
  const [showDatePicker, setShowDatePicker] = useState(false);

  //guarda temporalmente la fecha seleccionada
  const [date, setDate] = useState(new Date());

  //toma los cambios y los almacena en el estado
  const handleChange = (key: keyof Mother, value: string) => {
    setForm({ ...form, [key]: value });
  };

  //convierte a numero los campos como telefono
  const onlyNumbers = (text: string) => text.replace(/[^0-9]/g, "");

  //maneja el cambio de fecha desde el calendario
  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false); //cierra el calendario

    if (selectedDate) {
      setDate(selectedDate);

      //formatea la fecha a YYYY-MM-DD
      const formatted = selectedDate.toISOString().split("T")[0];

      //guarda la fecha en el formulario
      handleChange("yearOfBirth", formatted);
    }
  };

  const handleRegister = async () => {

    //valida que los campos obligatorios no estén vacíos
    if (!form.name || !form.email || !form.password) {
      Alert.alert("Error", "Completa los campos obligatorios");
      return;
    }

    //maneja el guardado de datos en AsyncStorage
    try {
      await AsyncStorage.setItem("user", JSON.stringify(form));

      Alert.alert("💙 Registro exitoso", "Bienvenida a Amara Baby");
      setForm(initialForm)

      //callback opcional para refrescar datos en la pantalla padre
      onSuccess?.();

    } catch (error) {
      Alert.alert("Error", "No se pudo guardar el usuario");
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Crear cuenta</Text>

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

      {/* Apellido */}
      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={20} color="#4A90E2" />
        <TextInput
          placeholder="Apellido"
          value={form.lastName}
          onChangeText={(text) => handleChange("lastName", text)}
          style={styles.input}
        />
      </View>

      {/* Fecha con calendario */}
      <View style={styles.inputContainer}>
        <Ionicons name="calendar-outline" size={20} color="#4A90E2" />

        {/* este Touchable abre el calendario */}
        <TouchableOpacity
          style={{ flex: 1, padding: 12 }}
          onPress={() => setShowDatePicker(true)}
        >
          <Text
            style={{
              fontFamily: "Poppins_400Regular",
              color: form.yearOfBirth ? "#000" : "#999",
            }}
          >
            {form.yearOfBirth || "Fecha de nacimiento"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Teléfono */}
      <View style={styles.inputContainer}>
        <Ionicons name="call-outline" size={20} color="#4A90E2" />
        <TextInput
          placeholder="Teléfono"
          keyboardType="numeric"
          value={form.phone}
          onChangeText={(text) => handleChange("phone", onlyNumbers(text))}
          style={styles.input}
        />
      </View>

      {/* Email */}
      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={20} color="#4A90E2" />
        <TextInput
          placeholder="Correo"
          value={form.email}
          onChangeText={(text) => handleChange("email", text)}
          style={styles.input}
        />
      </View>

      {/* Password */}
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="#4A90E2" />

        <TextInput
          placeholder="Contraseña"
          secureTextEntry={!showPassword}
          value={form.password}
          onChangeText={(text) => handleChange("password", text)}
          style={styles.input}
        />

        {/* botón para mostrar/ocultar contraseña */}
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={20}
            color="#4A90E2"
          />
        </TouchableOpacity>
      </View>

      {/* Botón de registro */}
      <TouchableOpacity onPress={handleRegister} style={styles.button}>
        <Text style={styles.buttonText}>Registrarme</Text>
      </TouchableOpacity>

      {/* componente de calendario */}
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onChangeDate}
          maximumDate={new Date()} //evita fechas futuras
        />
      )}

    </View>
  );
};

export default MotherForm;

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