import {
    DrawerContentScrollView,
    DrawerItemList,
} from "@react-navigation/drawer";


import {
    StyleSheet,
    Text,
    View,
} from "react-native";

const CustomDrawer = (props: any) => {

    return (
        <DrawerContentScrollView
            {...props}
            contentContainerStyle={styles.container}
        >

            {/* 🔹 TOP */}
            <View style={styles.topSection}>

                {/* <View style={styles.avatar}>
                    <Ionicons
                        name="person-outline"
                        size={42}
                        color="#5BA9FF"
                    />
                </View> */}

                <Text style={styles.title}>
                    Amara Baby
                </Text>

                <Text style={styles.subtitle}>
                    Bienvenida mamá 💙
                </Text>

            </View>

            {/* 🔹 MENU */}
            <View style={styles.menuContainer}>
                <DrawerItemList {...props} />
            </View>

            {/* 🔹 FOOTER */}
            <View style={styles.footer}>

                <Text style={styles.footerText}>
                    Hecho con 💙 para mamás
                </Text>

            </View>

        </DrawerContentScrollView>
    );
};

export default CustomDrawer;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#F4FBFF",
        paddingTop: 20,
    },

    topSection: {
        paddingHorizontal: 25,
        paddingBottom: 35,
        paddingTop: 40,
    },

    /* avatar: {
        width: 85,
        height: 85,
        borderRadius: 999,

        backgroundColor: "#EAF4FF",

        justifyContent: "center",
        alignItems: "center",

        marginBottom: 20,
    }, */

    title: {
        fontSize: 34,
        color: "#4A90E2",
        fontFamily: "Pacifico_400Regular",
    },

    subtitle: {
        marginTop: 8,
        color: "#7B8BA1",
        fontSize: 15,
        fontFamily: "Poppins_400Regular",
    },

    menuContainer: {
        flex: 1,

        backgroundColor: "#FFFFFF",

        marginHorizontal: 15,

        borderRadius: 30,

        paddingVertical: 10,

        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 12,

        elevation: 3,
    },

    footer: {
        padding: 25,
    },

    footerText: {
        color: "#9AA8B8",
        textAlign: "center",
        fontFamily: "Poppins_400Regular",
    },

});