import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: true,
      }}
    >
      <Drawer.Screen name="home" options={{ title: "Inicio" }} />
      <Drawer.Screen name="Mother/index" options={{ title: "Mamá" }} />
      <Drawer.Screen name="Baby/index" options={{ title: "Registrar Bebé" }} />
      <Drawer.Screen name="BabyList/index" options={{ title: "Mis Bebés" }} />
    </Drawer>
  );
}