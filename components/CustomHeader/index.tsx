import { Ionicons } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
    title: string;
}

const CustomHeader = ({ title }: Props) => {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>

            <TouchableOpacity
                onPress={() =>
                    navigation.dispatch(DrawerActions.toggleDrawer())
                }
            >
                <Ionicons
                    name="menu-outline"
                    size={30}
                    color="#4A90E2"
                />
            </TouchableOpacity>

            <Text style={styles.title}>
                {title}
            </Text>

            <View style={{ width: 30 }} />

        </View>
    );
};

export default CustomHeader;

const styles = StyleSheet.create({

    container: {
        height: 110,
        paddingTop: 50,
        paddingHorizontal: 20,

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#F4FBFF",

        shadowOpacity: 0.06,
        shadowRadius: 10,

    },

    title: {
        fontSize: 24,
        color: "#4A90E2",
        fontFamily: "Pacifico_400Regular",
    },

});