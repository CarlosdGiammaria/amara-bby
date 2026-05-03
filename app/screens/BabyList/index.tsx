import type { Baby } from '@/types/baby';
import { deleteBaby, getBabies, setActiveBaby } from "@/utils/babyStorage";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
const BabyListScreen = () => {

  const [babies, setBabies] = useState<Baby[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  const loadBabies = async () => {
    const data = await getBabies();
    setBabies(data);
  };

  useEffect(() => {
    loadBabies();
  }, []);

  const handleSelect = async (baby: Baby) => {
    await setActiveBaby(baby);
    setActiveId(baby.id);
  };

  const handleDelete = async (id: string) => {
    await deleteBaby(id);
    loadBabies();
  };

  const renderItem = ({ item }: { item: Baby }) => (
    <View style={[styles.card, activeId === item.id && styles.active]}>

      <Text style={styles.name}>{item.name}</Text>
      <Text>Edad: {item.ageValue} {item.ageUnit}</Text>
      <Text>Peso: {item.weightValue} {item.weightUnit}</Text>

      <View style={styles.actions}>

        <TouchableOpacity onPress={() => handleSelect(item)}>
          <Text style={styles.select}>Seleccionar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Text style={styles.delete}>Eliminar</Text>
        </TouchableOpacity>

      </View>

    </View>
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={styles.title}>Mis Bebés</Text>

      <FlatList
        data={babies}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default BabyListScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  active: {
    borderWidth: 2,
    borderColor: "#4A90E2",
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  actions: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
  },
  select: {
    color: "green",
  },
  delete: {
    color: "red",
  },
});