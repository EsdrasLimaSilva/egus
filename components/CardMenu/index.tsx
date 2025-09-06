import { Text, TouchableOpacity, View } from "react-native";

export type CardMenuProps = {
    label: string;
    color: string;
    onClick: () => void;
};

export function CardMenu({ label, color, onClick }: CardMenuProps) {
    return (
        <TouchableOpacity
            style={{
                backgroundColor: color,
                width: "45%",
                height: 230,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 24,
                boxShadow: "0px 2px 2px #22222230",
            }}
            onPress={onClick}
        >
            <View>
                <Text
                    style={{ fontSize: 24, color: "white", fontWeight: "bold" }}
                >
                    {label}
                </Text>
            </View>
        </TouchableOpacity>
    );
}
