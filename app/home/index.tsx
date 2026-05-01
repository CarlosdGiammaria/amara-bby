import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import MessageModal from "../../components/Message";

const HomePage = () => {

  const [showModal, setShowModal] = useState(false);

  const checkMother = async () => {
    const mother = await AsyncStorage.getItem("mother");
    const skipped = await AsyncStorage.getItem("skipOnboarding");

    if (!mother && !skipped) {
      setShowModal(true);
    }
  };

  useEffect(() => {
    checkMother();
  }, []);

  const handleContinue = () => {
    setShowModal(false);
    router.push("/Mother");
  };

  const handleLater = async () => {
    await AsyncStorage.setItem("skipOnboarding", "true");
    setShowModal(false);
  };

  return (
    <View style={{ flex: 1, justifyContent:"center", alignItems:"center" }}>
      <Text>Holaaa</Text>
      <MessageModal
        visible={showModal}
        onContinue={handleContinue}
        onLater={handleLater}
      />
    </View>
  );
};

export default HomePage;