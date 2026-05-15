import MotherProfile from "@/app/Profile";
import CustomHeader from "@/components/CustomHeader";
import { View } from "react-native";

const MotherProfileScreen = () => {
    return (
        <View>
            <CustomHeader
                title="Perfil de la Madre"
            />
            <MotherProfile />
        </View>
    );
};

export default MotherProfileScreen;