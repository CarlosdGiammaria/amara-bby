import type { Baby } from '@/types/baby';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { addBaby, updateBaby } from "../../utils/babyStorage";

interface Props {
  onSuccess?: () => void;
  initialData?: Baby | null;
}

// 🧾 modelo del formulario (UI)
type BabyFormType = Omit<Baby, "id" | "motherId">;

const BabyForm = ({
  onSuccess,
  initialData,
}: Props) => {

  // 🧩 estado inicial (solo UI)
  const initialForm: BabyFormType = {
    name: "",
    ageValue: "",
    ageUnit: "mes(es)",
    weightValue: "",
    weightUnit: "kg",
  };

  const [form, setForm] = useState<BabyFormType>(
    initialData
      ? {
        name: initialData.name,
        ageValue: initialData.ageValue,
        ageUnit: initialData.ageUnit,
        weightValue: initialData.weightValue,
        weightUnit: initialData.weightUnit,
      }
      : initialForm
  );

  // 🔢 solo números
  const onlyNumbers = (text: string) => text.replace(/[^0-9.]/g, "");

  // 🔄 cambios
  const handleChange = (key: keyof BabyFormType, value: string) => {
    setForm({ ...form, [key]: value });
  };

  // 💾 guardar bebé
  const handleRegister = async () => {

    if (!form.name || !form.ageValue || !form.weightValue) {

      Alert.alert(
        "Error",
        "Completa los campos obligatorios"
      );

      return false;
    }

    const motherData = await AsyncStorage.getItem("mother");

    if (!motherData) {

      Alert.alert(
        "Error",
        "No hay madre registrada"
      );

      return false;
    }

    const mother = JSON.parse(motherData);

    try {

      // 🔥 EDITAR
      if (initialData) {

        const updatedBaby: Baby = {
          ...initialData,
          ...form,
        };

        await updateBaby(updatedBaby);

        Alert.alert(
          "💙 Actualizado",
          "Información actualizada"
        );

      } else {

        // 🔥 CREAR
        const newBaby: Baby = {
          ...form,
          id: Date.now().toString(),
          motherId: mother.id,
        };

        await addBaby(newBaby);

        Alert.alert(
          "💙 Bebé registrado"
        );
      }

      setForm(initialForm);

      onSuccess?.();

      return true;

    } catch (error) {

      Alert.alert(
        "Error",
        "No se pudo guardar"
      );

      return false;
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Registro de Bebé</Text>

      {/* 🍼 Nombre */}
      <View style={styles.inputContainer}>
        <FontAwesome5 name="baby" size={20} color="#4A90E2" />
        <TextInput
          placeholder="Nombre"
          value={form.name}
          onChangeText={(text) => handleChange("name", text)}
          style={styles.input}
        />
      </View>

      {/* 📅 Edad */}
      <View style={styles.inputContainer}>
        <FontAwesome name="calendar" size={20} color="#4A90E2" />

        <TextInput
          placeholder="Edad"
          value={form.ageValue}
          keyboardType="numeric"
          onChangeText={(text) => handleChange("ageValue", onlyNumbers(text))}
          style={styles.input}
        />

        <TouchableOpacity
          onPress={() => {
            const next = {
              "dia(s)": "semana(s)",
              "semana(s)": "mes(es)",
              "mes(es)": "año(s)",
              "año(s)": "dia(s)",
            }[form.ageUnit];

            handleChange("ageUnit", next as BabyFormType["ageUnit"]);
          }}
        >
          <Text style={styles.unit}>{form.ageUnit}</Text>
        </TouchableOpacity>

      </View>

      {/* ⚖️ Peso */}
      <View style={styles.inputContainer}>
        <FontAwesome5 name="weight" size={20} color="#4A90E2" />

        <TextInput
          placeholder="Peso"
          value={form.weightValue}
          keyboardType="numeric"
          onChangeText={(text) => handleChange("weightValue", onlyNumbers(text))}
          style={styles.input}
        />

        <TouchableOpacity
          onPress={() => {
            const next = form.weightUnit === "kg" ? "lb" : "kg";
            handleChange("weightUnit", next);
          }}
        >
          <Text style={styles.unit}>{form.weightUnit}</Text>
        </TouchableOpacity>
      </View>

      {/* 🚀 Botón */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleRegister}
      >

        <Text style={styles.buttonText}>
          {initialData
            ? "Actualizar bebé"
            : "Guardar bebé"}
        </Text>

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
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D6ECFF",
    marginBottom: 12,
    paddingHorizontal: 10,
  },

  input: {
    flex: 1,
    padding: 12,
    fontFamily: "Poppins_400Regular",
  },

  unit: {
    marginLeft: 10,
    fontWeight: "bold",
    color: "#4A90E2",
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