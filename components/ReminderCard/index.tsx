import { AntDesign } from "@expo/vector-icons";
import { useRef, useState } from "react";
import {
    Animated,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export type ReminderCardType = {
    content: string;
    onCheck: () => void;
};

export function ReminderCard({ content, onCheck }: ReminderCardType) {
    const [isChecked, setIsChecked] = useState(false);
    const slideAnimation = useRef(new Animated.Value(0)).current;

    const slideOut = () => {
        Animated.timing(slideAnimation, {
            toValue: 500, // Slide to original position
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    return (
        <Animated.View
            style={[
                style.container,
                { transform: [{ translateX: slideAnimation }] },
            ]}
        >
            <View style={style.textContainer}>
                <Text style={style.text}>{content}</Text>
            </View>
            <TouchableOpacity
                style={style.checkButton}
                onPress={() => {
                    setIsChecked(true);
                    slideOut();
                    setTimeout(() => {
                        onCheck();
                    }, 500);
                }}
            >
                <AntDesign
                    name="checkcircle"
                    size={32}
                    color={isChecked ? "green" : "#22222240"}
                />
            </TouchableOpacity>
        </Animated.View>
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
        transitionDuration: "0.5s",
        transitionProperty: "all",
        transform: "translateX(0)",
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
