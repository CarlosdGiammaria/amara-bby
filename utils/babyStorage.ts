import type { Baby } from '@/types/baby';
import AsyncStorage from "@react-native-async-storage/async-storage";


// 🔹 Obtener todos
export const getBabies = async (): Promise<Baby[]> => {
  const data = await AsyncStorage.getItem("babies");
  return data ? JSON.parse(data) : [];
};

// 🔹 Guardar bebé
export const addBaby = async (baby: Baby) => {
  const babies = await getBabies();

  // 🔥 importante: evitar null
  const updated = [...babies, baby];

  await AsyncStorage.setItem("babies", JSON.stringify(updated));
};

// 🔹 Eliminar
export const deleteBaby = async (id: string) => {
  const babies = await getBabies();
  const updated = babies.filter((b) => b.id !== id);
  await AsyncStorage.setItem("babies", JSON.stringify(updated));
};

// 🔹 Seleccionar activo
export const setActiveBaby = async (baby: Baby) => {
  await AsyncStorage.setItem("activeBaby", JSON.stringify(baby));
};

// 🔹 Obtener activo
export const getActiveBaby = async (): Promise<Baby | null> => {
  const data = await AsyncStorage.getItem("activeBaby");
  return data ? JSON.parse(data) : null;
};