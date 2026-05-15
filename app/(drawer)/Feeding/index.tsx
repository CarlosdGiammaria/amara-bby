import CustomHeader from "@/components/CustomHeader";

import FeedingForm from "@/components/FeedingForm";

import {
    SafeAreaView,
    StyleSheet,
} from "react-native";

const FeedingScreen = () => {

    return (
        <SafeAreaView style={styles.container}>

            <CustomHeader title="Lactancia" />

            <FeedingForm />

        </SafeAreaView>
    );
};

export default FeedingScreen;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#F4FBFF",
    },

});