import CustomDrawer from "@/components/CustomDrawer";
import { AntDesign, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {

  return (
    <Drawer

      drawerContent={(props) => (
        <CustomDrawer {...props} />
      )}

      screenOptions={{

        headerShown: false,

        drawerType: "slide",

        overlayColor: "rgba(0,0,0,0.15)",

        sceneStyle: {
          backgroundColor: "#F4FBFF",
        },

        drawerStyle: {
          width: 290,
          backgroundColor: "#F4FBFF",
        },

        drawerActiveTintColor: "#4A90E2",

        drawerInactiveTintColor: "#7B8BA1",

        drawerLabelStyle: {
          fontSize: 14,
          fontFamily: "Poppins_400Regular",
          marginLeft: 0,
        },

        drawerItemStyle: {
          borderRadius: 18,
          marginHorizontal: 10,
          paddingLeft: 0,
        },

      }}
    >

      <Drawer.Screen
        name="home/index"
        options={{
          drawerLabel: "Inicio",

          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="home-outline"
              size={18}
              color={color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="MotherProfile/index"
        options={{
          drawerLabel: "Perfil",

          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="person-outline"
              size={18}
              color={color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Baby/index"
        options={{
          drawerLabel: "Registrar Bebé",

          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="add-circle-outline"
              size={18}
              color={color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="BabyList/index"
        options={{
          drawerLabel: "Mis Bebés",

          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="happy-outline"
              size={18}
              color={color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Feeding/index"
        options={{
          title: "Lactancia",
          drawerIcon: ({ color, size }) => (
            <FontAwesome6 name="person-breastfeeding" size={18}
              color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="FeedingHistorial/index"
        options={{
          title: "Historial Lactancia",
          drawerIcon: ({ color, size }) => (
            <AntDesign name="history" size={18} color={color} />
          ),

        }}
      />

    </Drawer>
  );
}