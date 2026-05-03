import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import MessageModal from "../../../components/Message";

const HomeScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [dataMother, setDataMother] = useState("");

  const checkMother = async () => {
    const mother = await AsyncStorage.getItem("mother");
    console.log("mother:", mother);
    // 🔥 SOLO validamos mother (más limpio y correcto)
    if (!mother) {
      setShowModal(true);
    }

    //consulta el nombre de la madre
    if (!mother) return
    const motherName = JSON.parse(mother)
    setDataMother(motherName.name)

  };

  useEffect(() => {
    checkMother();
  }, []);

  // 👉 Ir al formulario
  const handleContinue = () => {
    setShowModal(false);
   /*  router.push("/Mother"); */ // ajusta si tu ruta es diferente
  };

  // 👉 "Más tarde" solo cierra el modal (sin guardar nada)
  const handleLater = () => {
    setShowModal(false);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

      <Text>Home Page</Text>
      <Text>Hola, bienvanida {dataMother}</Text>
      <Text>¿Deseas Registrar a tus bebes?</Text>

      <TouchableOpacity onPress={() => alert('hola')}>
        <Text>Registrar Bebes</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => AsyncStorage.clear()}>
        <Text>Eliminar Data</Text>
      </TouchableOpacity>

      <MessageModal
        visible={showModal}
        onContinue={handleContinue}
        onLater={handleLater}
      />
    </View>
  );
};

export default HomeScreen;