import CustomHeader from "@/components/CustomHeader";
import type { Baby } from "@/types/baby";
import {
  deleteBaby,
  getBabies,
  setActiveBaby,
} from "@/utils/babyStorage";

import { Ionicons } from "@expo/vector-icons";

import { router, useFocusEffect } from "expo-router";

import { useCallback, useState } from "react";

import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const BabyListScreen = () => {

  const [babies, setBabies] = useState<Baby[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  // 🔄 cargar bebés
  const loadBabies = async () => {

    const data = await getBabies();

    setBabies(data);
  };

  // 🔥 recargar al volver a pantalla
  useFocusEffect(
    useCallback(() => {

      loadBabies();

    }, [])
  );

  // ✅ seleccionar bebé activo
  const handleSelect = async (baby: Baby) => {

    await setActiveBaby(baby);

    setActiveId(baby.id);
  };

  // 🗑️ eliminar bebé
  const handleDelete = async (id: string) => {

    await deleteBaby(id);

    loadBabies();
  };

  // 👶 render bebé
  const renderItem = ({ item }: { item: Baby }) => (

    <View
      style={[
        styles.card,
        activeId === item.id && styles.activeCard,
      ]}
    >

      {/* 👶 HEADER */}
      <View style={styles.headerCard}>

        <View style={styles.avatar}>
          <Ionicons
            name="happy-outline"
            size={28}
            color="#4A90E2"
          />
        </View>

        <View>

          <Text style={styles.name}>
            {item.name}
          </Text>

          <Text style={styles.info}>
            {item.ageValue} {item.ageUnit}
          </Text>

        </View>

      </View>

      {/* 📋 INFO */}
      <View style={styles.infoContainer}>

        <View style={styles.infoBox}>

          <Ionicons
            name="barbell-outline"
            size={18}
            color="#6EC6FF"
          />

          <Text style={styles.infoText}>
            {item.weightValue} {item.weightUnit}
          </Text>

        </View>

        <View style={styles.infoBox}>

          <Ionicons
            name="calendar-outline"
            size={18}
            color="#6EC6FF"
          />

          <Text style={styles.infoText}>
            {item.ageValue} {item.ageUnit}
          </Text>

        </View>

      </View>

      {/* 🔘 ACCIONES */}
      <View style={styles.actions}>

        {/* ✅ Seleccionar */}
        <TouchableOpacity
          style={styles.selectButton}
          onPress={() => handleSelect(item)}
        >

          <Ionicons
            name="checkmark-circle-outline"
            size={18}
            color="#fff"
          />

          <Text style={styles.buttonText}>
            Seleccionar
          </Text>

        </TouchableOpacity>

        {/* ✏️ Editar */}
        <TouchableOpacity
          style={styles.editButton}
          onPress={() =>
            router.push({
              pathname: "/BabyEdit",
              params: {
                id: item.id,
              },
            })
          }
        >

          <Ionicons
            name="create-outline"
            size={18}
            color="#fff"
          />

          <Text style={styles.buttonText}>
            Editar
          </Text>

        </TouchableOpacity>

        {/* 🗑️ Eliminar */}
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}
        >

          <Ionicons
            name="trash-outline"
            size={18}
            color="#fff"
          />

          <Text style={styles.buttonText}>
            Eliminar
          </Text>

        </TouchableOpacity>

      </View>

    </View>
  );

  return (
    <View style={styles.container}>

      {/* 🔹 HEADER */}
      <CustomHeader title="Mis Bebés" />

      {/* 🔹 TÍTULO */}
      <View style={styles.header}>

        <Text style={styles.title}>
          Mis Bebés
        </Text>

        <Text style={styles.subtitle}>
          Gestiona la información de tus pequeños 💙
        </Text>

      </View>

      {/* 🔹 LISTA */}
      <FlatList
        data={babies}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 120,
          paddingHorizontal: 20,
        }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>

            <Ionicons
              name="happy-outline"
              size={70}
              color="#B7DFFF"
            />

            <Text style={styles.emptyText}>
              No hay bebés registrados
            </Text>

          </View>
        }
      />

      {/* ➕ AÑADIR */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/Baby")}
      >

        <Ionicons
          name="add-circle-outline"
          size={22}
          color="#fff"
        />

        <Text style={styles.addButtonText}>
          Añadir otro bebé
        </Text>

      </TouchableOpacity>

    </View>
  );
};

export default BabyListScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F4FBFF",
  },

  header: {
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop: 10,
  },

  title: {
    fontSize: 28,
    color: "#4A90E2",
    fontFamily: "Pacifico_400Regular",
  },

  subtitle: {
    fontSize: 14,
    color: "#7A7A7A",
    marginTop: 5,
    fontFamily: "Poppins_400Regular",
  },

  card: {
    backgroundColor: "#FFFFFF",

    borderRadius: 20,

    padding: 18,

    marginBottom: 16,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,

    elevation: 4,
  },

  activeCard: {
    borderWidth: 2,
    borderColor: "#6EC6FF",
  },

  headerCard: {
    flexDirection: "row",
    alignItems: "center",

    marginBottom: 15,
  },

  avatar: {
    width: 55,
    height: 55,

    borderRadius: 30,

    backgroundColor: "#EAF6FF",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 12,
  },

  name: {
    fontSize: 18,
    color: "#333",
    fontFamily: "Poppins_600SemiBold",
  },

  info: {
    fontSize: 13,
    color: "#888",

    marginTop: 3,

    fontFamily: "Poppins_400Regular",
  },

  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",

    marginBottom: 18,
  },

  infoBox: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#F4FBFF",

    paddingVertical: 10,
    paddingHorizontal: 14,

    borderRadius: 12,

    gap: 6,
  },

  infoText: {
    color: "#555",
    fontFamily: "Poppins_400Regular",
  },

  actions: {
    flexDirection: "row",
    gap: 8,
  },

  selectButton: {
    flex: 1,

    backgroundColor: "#6EC6FF",

    paddingVertical: 12,

    borderRadius: 14,

    flexDirection: "row",

    justifyContent: "center",
    alignItems: "center",

    gap: 6,
  },

  editButton: {
    flex: 1,

    backgroundColor: "#FFB84D",

    paddingVertical: 12,

    borderRadius: 14,

    flexDirection: "row",

    justifyContent: "center",
    alignItems: "center",

    gap: 6,
  },

  deleteButton: {
    flex: 1,

    backgroundColor: "#FF6B81",

    paddingVertical: 12,

    borderRadius: 14,

    flexDirection: "row",

    justifyContent: "center",
    alignItems: "center",

    gap: 6,
  },

  buttonText: {
    color: "#fff",
    fontSize: 13,
    fontFamily: "Poppins_500Medium",
  },

  addButton: {
    position: "absolute",

    bottom: 25,
    left: 20,
    right: 20,

    backgroundColor: "#4A90E2",

    paddingVertical: 16,

    borderRadius: 18,

    flexDirection: "row",

    justifyContent: "center",
    alignItems: "center",

    gap: 8,

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,

    elevation: 5,
  },

  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },

  emptyContainer: {
    alignItems: "center",
    marginTop: 80,
  },

  emptyText: {
    marginTop: 15,

    color: "#7A7A7A",

    fontSize: 16,

    fontFamily: "Poppins_400Regular",
  },

});