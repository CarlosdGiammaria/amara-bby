import { Ionicons } from '@expo/vector-icons';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  visible: boolean;
  onContinue: () => void;
  onLater: () => void;
}


interface Props {
  visible: boolean;
  onContinue: () => void;
  onLater: () => void;
}

const MessageModal = ({ visible, onContinue, onLater }: Props) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={() => {}}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>

          <View style={styles.iconContainer}>
            <Ionicons name="information-circle-outline" size={50} color="#4A90E2" />
          </View>

          <Text style={styles.title}>¡Bienvenido!</Text>

          <Text style={styles.text}>
            Para ofrecerte una mejor experiencia, por favor completa tus datos.
          </Text>

          <View style={styles.buttons}>

            <TouchableOpacity style={styles.primary} onPress={onContinue}>
              <Text style={styles.primaryText}>Completar ahora</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity style={styles.secondary} onPress={onLater}>
              <Text style={styles.secondaryText}>Más tarde</Text>
            </TouchableOpacity> */}

          </View>

        </View>
      </View>
    </Modal>
  );
};

export default MessageModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
  },
  iconContainer: {
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 10,
    fontFamily: "Poppins_400Regular",
  },
  text: {
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
    fontFamily: "Poppins_400Regular",
  },
  buttons: {
    width: "100%",
  },
  primary: {
    backgroundColor: "#4A90E2",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  primaryText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    fontFamily: "Poppins_400Regular",
  },
  secondary: {
    backgroundColor: "#EAEAEA",
    padding: 12,
    borderRadius: 10,
  },
  secondaryText: {
    textAlign: "center",
    color: "#555",
    fontFamily: "Poppins_400Regular",
  },
});