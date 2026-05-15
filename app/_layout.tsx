import * as NavigationBar from 'expo-navigation-bar';
import { Stack } from "expo-router"; // 🔥 CAMBIO CLAVE
import { StatusBar } from 'expo-status-bar';
import { useEffect } from "react";
import { Platform, Text, View } from "react-native";

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
      NavigationBar.setBackgroundColorAsync('#F4FBFF');
      NavigationBar.setButtonStyleAsync("dark");
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
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade_from_bottom",
        }}
      />
      <StatusBar style="dark" />
    </>
  );
};

export default RootLayout;