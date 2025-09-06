import { useInput } from "@/hooks/useInput";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Button } from "../Button";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (inputValue?: string) => void;
    onCancel: () => void;
    label: string;
    input?: boolean;
};

export function Modal({
    isOpen,
    onClose,
    onConfirm,
    onCancel,
    label,
    input,
}: ModalProps) {
    const { Input, inputValue } = useInput();

    if (!isOpen) return null;

    return (
        <View style={style.container}>
            <View style={style.contentContainer}>
                <Text style={style.text}>{label}</Text>

                {input && Input}

                <View style={style.buttonsContainer}>
                    <Button
                        label="confirmar"
                        color="#222222"
                        onPress={() => {
                            onClose();
                            onConfirm(inputValue);
                        }}
                    />
                    <Button
                        label="cancelar"
                        color="#707070ff"
                        onPress={() => {
                            onClose();
                            onCancel();
                        }}
                    />
                </View>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#22222270",
    },

    contentContainer: {
        backgroundColor: "white",
        padding: 32,
        borderRadius: 12,
        flexDirection: "column",
        gap: 12,
        width: "90%",
        alignItems: "center",
    },

    buttonsContainer: {
        flexDirection: "column",
        gap: 8,
        width: "100%",
    },

    text: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
});
