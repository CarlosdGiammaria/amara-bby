import { Text, TouchableOpacity, View } from "react-native";

interface User {
  email: string,
  password: string
}

const SingInForm = () => {
  return (
    <View>
      <View>
        <Text>Correo</Text>
        <input type="text" name="email" id="email" />
      </View>
      <View>
        <Text>Contraseña</Text>
        <input type="password" name="password" id="password" />
      </View>
      <TouchableOpacity onPress={() => alert('ingreso')}>Iniciar sesión</TouchableOpacity>


    </View>
  );
}

export default SingInForm