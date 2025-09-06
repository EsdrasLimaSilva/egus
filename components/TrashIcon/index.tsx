import { FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export type TrashIconType = {
    size: number;
    color: string;
    onClick: () => void;
};

export function TrashIcon({ size, color, onClick }: TrashIconType) {
    return (
        <TouchableOpacity onPress={onClick}>
            <FontAwesome5 name="trash" size={size} color={color} />
        </TouchableOpacity>
    );
}
