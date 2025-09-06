import { StyleSheet, TextInput } from "react-native";

export type InputProps = {
    value: string;
    onChange: (value: string) => void;
};

export function Input({ value, onChange }: InputProps) {
    return (
        <TextInput
            style={style.input}
            value={value}
            onChangeText={(text) => onChange(text)}
        />
    );
}

const style = StyleSheet.create({
    input: {
        width: "100%",
        fontSize: 18,
        borderWidth: 2,
        borderColor: "#223",
        borderRadius: 32,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
});
