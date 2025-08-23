import { Text, View } from "react-native";

export type CardMenuProps = {
    label: string;
    color: string;
};

export function CardMenu({ label, color }: CardMenuProps) {
    return (
        <View
            style={{
                backgroundColor: color,
                width: "45%",
                height: 230,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 24,
                boxShadow: "0px 2px 2px #22222230",
            }}
        >
            <Text style={{ fontSize: 24, color: "white", fontWeight: "bold" }}>
                {label}
            </Text>
        </View>
    );
}
