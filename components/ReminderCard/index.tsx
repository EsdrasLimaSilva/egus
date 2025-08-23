import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export function ReminderCard() {
    return (
        <View style={style.container}>
            <View style={style.textContainer}>
                {" "}
                <Text style={style.text}>Isto é um lembrete</Text>
            </View>
            <TouchableOpacity style={style.checkButton}>
                <AntDesign name="checkcircle" size={32} color="green" />
            </TouchableOpacity>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        backgroundColor: "white",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 48,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        overflow: "hidden",
    },
    textContainer: {
        width: "80%",
    },
    text: {
        fontSize: 18,
        padding: 12,
    },

    checkButton: {
        width: "20%",
        alignItems: "center",
        justifyContent: "center",
    },
});
