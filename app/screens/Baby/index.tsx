import BabyForm from "@/components/BabyForm";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Modal, StyleSheet, View } from "react-native";

const BabyScreen = () => {

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const checkBaby = async () => {
      const baby = await AsyncStorage.getItem("baby");

      if (!baby) {
        setVisible(true); // 🔒 abre el modal obligatorio
      }
    };

    checkBaby();
  }, []);

  return (
    <View style={{ flex: 1 }}>

      {/* Aquí va tu app normal detrás */}
      
      <Modal
        visible={visible}
        animationType="slide"
        transparent
      >
        <View style={styles.overlay}>
          <View style={styles.modalContent}>
            <BabyForm onSuccess={() => setVisible(false)} />
          </View>
        </View>
      </Modal>

    </View>
  );
};

export default BabyScreen;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", // fondo oscuro
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    borderRadius: 20,
    overflow: "hidden",
  },
});