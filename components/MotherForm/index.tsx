import type { Mother } from '@/types/mother';
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

const MotherForm = ({ onSuccess }: { onSuccess?: () => void }) => {

  // 🧾 Estado inicial
  const initialForm: Mother = {
    id: "",
    name: "",
    lastName: "",
    yearOfBirth: "",
    phone: "",
  };

  // 📌 Estado del formulario
  const [form, setForm] = useState<Mother>(initialForm);

  // ❌ Estado de errores (para validación visual)
  const [errors, setErrors] = useState<Partial<Mother>>({});


  // 📅 Control del date picker
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());

  // ✏️ Manejo de cambios + limpiar errores en tiempo real
  const handleChange = (key: keyof Mother, value: string) => {
    setForm({ ...form, [key]: value });

    // 🔥 Limpia el error del campo mientras escribe
    if (errors[key]) {
      setErrors({ ...errors, [key]: "" });
    }
  };

  // ✅ Validación completa
  const validate = () => {
    const newErrors: Partial<Mother> = {};

    if (!form.name) newErrors.name = "El nombre es obligatorio";
    if (!form.lastName) newErrors.lastName = "El apellido es obligatorio";
    if (!form.yearOfBirth) newErrors.yearOfBirth = "Fecha obligatoria";
    if (!form.phone) newErrors.phone = "Teléfono obligatorio";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // 🔢 Solo números
  const onlyNumbers = (text: string) => text.replace(/[^0-9]/g, "");

  // 📅 Manejo del calendario
  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);

    if (selectedDate) {
      setDate(selectedDate);

      const formatted = selectedDate.toISOString().split("T")[0];

      handleChange("yearOfBirth", formatted);
    }
  };

  // 🚀 Registro
  const handleRegister = async () => {

    // ❗ Usa SOLO validate (no duplicar lógica)
    if (!validate()) return;

    try {
      const newMother: Mother = {
        ...form,
        id: Date.now().toString(), // 🔥 AQUÍ CREAS EL ID
      };

      await AsyncStorage.setItem("mother", JSON.stringify(newMother));

      Alert.alert("💙 Registro exitoso", "Bienvenida a Amara Baby");

      setForm(initialForm);
      setErrors({});

      onSuccess?.();

    } catch (error) {
      Alert.alert("Error", "No se pudo guardar el usuario");
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Registrar Datos</Text>

      {/* 🔹 Nombre */}
      <View style={[styles.inputContainer, errors.name && styles.inputError]}>
        <Ionicons name="person-outline" size={20} color="#4A90E2" />
        <TextInput
          placeholder="Nombre"
          value={form.name}
          onChangeText={(text) => handleChange("name", text)}
          style={styles.input}
        />
      </View>
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

      {/* 🔹 Apellido */}
      <View style={[styles.inputContainer, errors.lastName && styles.inputError]}>
        <Ionicons name="person-outline" size={20} color="#4A90E2" />
        <TextInput
          placeholder="Apellido"
          value={form.lastName}
          onChangeText={(text) => handleChange("lastName", text)}
          style={styles.input}
        />
      </View>
      {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}

      {/* 🔹 Fecha */}
      <View style={[styles.inputContainer, errors.yearOfBirth && styles.inputError]}>
        <Ionicons name="calendar-outline" size={20} color="#4A90E2" />

        <TouchableOpacity style={{ flex: 1, padding: 12 }} onPress={() => setShowDatePicker(true)}>
          <Text style={{ color: form.yearOfBirth ? "#000" : "#999" }}>
            {form.yearOfBirth || "Fecha de nacimiento"}
          </Text>
        </TouchableOpacity>
      </View>
      {errors.yearOfBirth && <Text style={styles.errorText}>{errors.yearOfBirth}</Text>}

      {/* 🔹 Teléfono */}
      <View style={[styles.inputContainer, errors.phone && styles.inputError]}>
        <Ionicons name="call-outline" size={20} color="#4A90E2" />
        <TextInput
          placeholder="Teléfono"
          keyboardType="numeric"
          value={form.phone}
          onChangeText={(text) => handleChange("phone", onlyNumbers(text))}
          style={styles.input}
        />
      </View>
      {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}


      {/* 🔘 Botón */}
      <TouchableOpacity onPress={handleRegister} style={styles.button}>
        <Text style={styles.buttonText}>Registrarme</Text>
      </TouchableOpacity>

      {/* 📅 DatePicker */}
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onChangeDate}
          maximumDate={new Date()}
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
  },

  title: {
    fontSize: 26,
    color: "#4A90E2",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Pacifico_400Regular",

  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D6ECFF",
    marginBottom: 5,
    paddingHorizontal: 10,
  },

  // 🔥 borde rojo
  inputError: {
    borderColor: "#FF4D4D",
  },

  input: {
    flex: 1,
    padding: 12,
  },

  // 🔥 texto de error
  errorText: {
    color: "#FF4D4D",
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 5,
    fontFamily: "Poppins_400Regular",
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
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
  },
});