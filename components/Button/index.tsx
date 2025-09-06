import { StyleSheet, Text, TouchableOpacity } from "react-native";

type ButtonProps = {
    label?: String;
    color?: string;
    onPress?: () => void;
};

export function Button({ label, color, onPress }: ButtonProps) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                ...style.container,
                backgroundColor: color || style.container.backgroundColor,
            }}
        >
            <Text style={{ ...style.text }}>{label}</Text>
        </TouchableOpacity>
    );
}

const style = StyleSheet.create({
    container: {
        backgroundColor: "#222",
        color: "white",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 8,
        borderRadius: 32,
    },

    text: {
        color: "white",
        fontWeight: "bold",
    },
});
