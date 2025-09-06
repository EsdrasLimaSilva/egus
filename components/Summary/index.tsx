import { FontAwesome5 } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type SummaryProps = {
    label: string;
    onClick: () => void;
    onRemove: () => void;
};

export function Summary({ label, onClick, onRemove }: SummaryProps) {
    return (
        <TouchableOpacity onPress={onClick}>
            <View style={style.container}>
                <Text style={style.label}>{label}</Text>

                <TouchableOpacity onPress={onRemove}>
                    <FontAwesome5 name="trash" size={20} color="white" />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
}

const style = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 18,
        backgroundColor: "#E41852",
        borderRadius: 8,
        boxShadow: "0px 2px 2px #22222230",
    },

    label: {
        width: "80%",
        fontSize: 18,
        color: "white",
        fontWeight: "bold",
    },
});
