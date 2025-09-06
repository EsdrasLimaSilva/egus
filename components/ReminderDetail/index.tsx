import { StyleSheet, Text, View } from "react-native";
import { TrashIcon } from "../TrashIcon";

export type ReminderDetailType = {
    label: string;
    onRemove: () => void;
};

export function ReminderDetail({ label, onRemove }: ReminderDetailType) {
    return (
        <View style={style.container}>
            <Text style={style.label}>{label}</Text>

            <TrashIcon color="white" onClick={onRemove} size={24} />
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        backgroundColor: "#EE900E",
        boxShadow: "0 2px 2px #22222230",
        paddingHorizontal: 20,
        paddingVertical: 18,
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    label: {
        color: "white",
        fontWeight: "bold",
        fontSize: 18,
    },
});
