import { FontAwesome5 } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type GradeCardType = {
    grade: number;
    date: string;
    onRemove: () => void;
};

export function GradeCard({ grade, date, onRemove }: GradeCardType) {
    return (
        <>
            <View style={style.container}>
                <View style={style.labelContainer}>
                    <Text style={style.grade}>{grade}</Text>
                    <Text style={style.label}>{date}</Text>
                </View>
                <TouchableOpacity onPress={onRemove}>
                    <FontAwesome5 name="trash" size={20} color="#222" />
                </TouchableOpacity>
            </View>
        </>
    );
}

const style = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: "100%",
        paddingHorizontal: 24,
        paddingVertical: 20,
        backgroundColor: "white",
        borderRadius: 8,
        boxShadow: "0px 2px 2px #22222230",
        alignItems: "center",
        justifyContent: "space-between",
    },
    labelContainer: {},
    grade: {
        fontSize: 32,
        fontWeight: "bold",
    },
    label: {},
});
