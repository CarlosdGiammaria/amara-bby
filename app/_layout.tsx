import * as NavigationBar from 'expo-navigation-bar';
import { Slot } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { Platform, Text, View } from "react-native";


import { useEffect } from "react";

// 🔤 Fonts
import { Pacifico_400Regular } from "@expo-google-fonts/pacifico";
import { Poppins_400Regular, useFonts } from "@expo-google-fonts/poppins";

const isAndroid = Platform.OS === 'android';

const RootLayout = () => {

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Pacifico_400Regular,
  });

  useEffect(() => {
    if (isAndroid) {
      NavigationBar.setBackgroundColorAsync('#000');
    }
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    
      <View style={{ flex: 1 }}>
        <Slot />
        <StatusBar style="dark" />
      </View>
   
  );
};

export default RootLayout;