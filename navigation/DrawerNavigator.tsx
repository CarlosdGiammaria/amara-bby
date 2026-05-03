import { createDrawerNavigator } from "@react-navigation/drawer";
import BabyFormScreen from "../app/screens/Baby";
import BabyListScreen from "../app/screens/BabyList";
import HomeScreen from "../app/screens/home";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator>

      <Drawer.Screen 
        name="Home" 
        component={HomeScreen} 
      />

      <Drawer.Screen 
        name="Mis Bebés" 
        component={BabyListScreen} 
      />

      <Drawer.Screen 
        name="Registrar Bebé" 
        component={BabyFormScreen} 
      />

    </Drawer.Navigator>
  );
}