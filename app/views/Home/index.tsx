import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
const HomePage = () => {
  const [savedData, setSavedData] = useState<string | null>(null);

  const loadData = async () => {
    const data = await AsyncStorage.getItem("user");
    setSavedData(data);
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <View>
      <Text>
        Home Page
      </Text>


      {/*  <View style={{ marginTop: 20 }}>
            <Text style={{ textAlign: "center", color: "#777" }}>
              Datos guardados:
            </Text>

            <Text style={{ fontSize: 12, marginTop: 10 }}>
              {savedData
                ? JSON.stringify(JSON.parse(savedData), null, 2)
                : "No hay datos"}
            </Text>
          </View> */}
    </View>
  )
}

export default HomePage;