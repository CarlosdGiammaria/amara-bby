import CustomHeader from "@/components/CustomHeader";
import MessageModal from "@/components/Message";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { Ionicons } from "@expo/vector-icons";

import { router, useFocusEffect } from "expo-router";

import { useCallback, useState } from "react";

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const HomeScreen = () => {

  const [showModal, setShowModal] =
    useState(false);

  const [dataMother, setDataMother] =
    useState("");

  // 🔍 verificar madre
  const checkMother = async () => {

    try {

      const mother =
        await AsyncStorage.getItem("mother");

      if (!mother) {

        setShowModal(true);

        return;
      }

      const motherData =
        JSON.parse(mother);

      setDataMother(
        motherData.name || ""
      );

    } catch (error) {

      console.log(
        "Error obteniendo mother:",
        error
      );
    }
  };

  useFocusEffect(
    useCallback(() => {

      checkMother();

    }, [])
  );

  // ➡️ completar info
  const handleContinue = () => {

    setShowModal(false);

    router.push("/Mother");
  };

  const handleLater = () => {
    setShowModal(false);
  };

  return (
    <View style={styles.container}>

      <CustomHeader title="Inicio" />

      <ScrollView
        showsVerticalScrollIndicator={false}
      >

        {/* 👋 Bienvenida */}
        <View style={styles.heroCard}>

          <View style={styles.heroContent}>

            <Text style={styles.greeting}>
              Hola 👋
            </Text>

            <Text style={styles.name}>
              {dataMother || "Mamá"}
            </Text>

            <Text style={styles.subtitle}>
              Bienvenida nuevamente a tu
              espacio de cuidado y
              lactancia 💙
            </Text>

          </View>

          <View style={styles.iconCircle}>

            <Ionicons
              name="heart"
              size={40}
              color="#fff"
            />

          </View>

        </View>

        {/* 🍼 Card Bebés */}
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            router.push("/BabyList")
          }
        >

          <View style={styles.cardIcon}>

            <Ionicons
              name="happy-outline"
              size={30}
              color="#4A90E2"
            />

          </View>

          <View style={{ flex: 1 }}>

            <Text style={styles.cardTitle}>
              Mis Bebés
            </Text>

            <Text style={styles.cardText}>
              Gestiona la información de
              tus pequeños
            </Text>

          </View>

          <Ionicons
            name="chevron-forward"
            size={24}
            color="#A0A0A0"
          />

        </TouchableOpacity>

        {/* 🍼 Lactancia */}
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            router.push("/Feeding")
          }
        >

          <View style={styles.cardIconPink}>

            <Ionicons
              name="water-outline"
              size={30}
              color="#FF7DAE"
            />

          </View>

          <View style={{ flex: 1 }}>

            <Text style={styles.cardTitle}>
              Lactancia
            </Text>

            <Text style={styles.cardText}>
              Registra y controla las
              tomas de leche
            </Text>

          </View>

          <Ionicons
            name="chevron-forward"
            size={24}
            color="#A0A0A0"
          />

        </TouchableOpacity>

        {/* 📋 Historial */}
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            router.push("/FeedingHistorial")
          }
        >

          <View style={styles.cardIconPurple}>

            <Ionicons
              name="time-outline"
              size={30}
              color="#9B7BFF"
            />

          </View>

          <View style={{ flex: 1 }}>

            <Text style={styles.cardTitle}>
              Historial
            </Text>

            <Text style={styles.cardText}>
              Visualiza todas las sesiones
              registradas
            </Text>

          </View>

          <Ionicons
            name="chevron-forward"
            size={24}
            color="#A0A0A0"
          />

        </TouchableOpacity>

      </ScrollView>

      {/* 🔔 Modal */}
      <MessageModal
        visible={showModal}
        onContinue={handleContinue}
        onLater={handleLater}
      />

    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F4FBFF",
  },

  heroCard: {
    margin: 20,
    backgroundColor: "#6EC6FF",
    borderRadius: 28,
    padding: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    shadowColor: "#000",

    shadowOpacity: 0.1,

    shadowRadius: 10,

    elevation: 5,
  },

  heroContent: {
    flex: 1,
  },

  greeting: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Poppins_400Regular",
  },

  name: {
    color: "#fff",
    fontSize: 32,
    marginTop: 5,
    fontFamily: "Pacifico_400Regular",
  },

  subtitle: {
    color: "#F4FBFF",
    fontSize: 14,
    marginTop: 10,
    lineHeight: 22,
    fontFamily: "Poppins_400Regular",
  },

  iconCircle: {
    width: 70,
    height: 70,

    borderRadius: 40,

    backgroundColor: "rgba(255,255,255,0.25)",

    justifyContent: "center",

    alignItems: "center",
  },

  card: {
    backgroundColor: "#fff",

    marginHorizontal: 20,
    marginBottom: 16,

    borderRadius: 22,

    padding: 18,

    flexDirection: "row",

    alignItems: "center",

    gap: 15,

    shadowColor: "#000",

    shadowOpacity: 0.05,

    shadowRadius: 8,

    elevation: 3,
  },

  cardIcon: {
    width: 60,
    height: 60,

    borderRadius: 18,

    backgroundColor: "#EAF6FF",

    justifyContent: "center",

    alignItems: "center",
  },

  cardIconPink: {
    width: 60,
    height: 60,

    borderRadius: 18,

    backgroundColor: "#FFEAF2",

    justifyContent: "center",

    alignItems: "center",
  },

  cardIconPurple: {
    width: 60,
    height: 60,

    borderRadius: 18,

    backgroundColor: "#F0EAFF",

    justifyContent: "center",

    alignItems: "center",
  },

  cardTitle: {
    fontSize: 18,
    color: "#333",
    marginBottom: 4,
    fontFamily: "Poppins_600SemiBold",
  },

  cardText: {
    fontSize: 13,
    color: "#7A7A7A",
    lineHeight: 20,
    fontFamily: "Poppins_400Regular",
  },

});
{/*  <TouchableOpacity
           onPress={async () => {
             await AsyncStorage.clear();
           }}
         >
           <Text>Eliminar Data</Text>
         </TouchableOpacity> */}