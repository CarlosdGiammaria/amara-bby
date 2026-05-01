import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

import BabyPage from "./Baby";
import HomePage from "./home";
import MotherPage from "./Mother";

const ContainerApp = () => {

  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState<"mother" | "baby" | "home">("home");

  useEffect(() => {
    const checkData = async () => {

      const mother = await AsyncStorage.getItem("mother");
      const baby = await AsyncStorage.getItem("baby");

      if (!mother) {
        setStep("mother");
      } else if (!baby) {
        setStep("baby");
      } else {
        setStep("home");
      }

      setLoading(false);
    };

    checkData();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>

      {step === "mother" && <MotherPage />}
      {step === "baby" && <BabyPage />}
      {step === "home" && <HomePage />}

    </View>
  );
};

export default ContainerApp;