import { Ionicons } from "@expo/vector-icons";
import { ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Scroll } from "../Scroll";

export type MainTemplate = {
    title?: string;
    children?: ReactNode;
    color?: string;
    onGoBack?: () => void;
};

export function MainTemplate({
    title,
    children,
    color,
    onGoBack,
}: MainTemplate) {
    return (
        <>
            <Scroll>
                <View style={{ ...style.header, borderColor: color }}>
                    {onGoBack && (
                        <TouchableOpacity onPress={onGoBack}>
                            <Ionicons name="chevron-back-outline" size={32} />
                        </TouchableOpacity>
                    )}
                    {title && <Text style={style.title}>{title}</Text>}
                </View>
                {children}
            </Scroll>
            <Text style={style.footer}>egus</Text>
        </>
    );
}

const style = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        paddingBottom: 8,
        borderBottomWidth: 4,
        gap: 12,
        marginBottom: 16,
    },
    headerButton: {},
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    footer: {
        fontSize: 18,
        fontWeight: "bold",
        opacity: 0.4,
        position: "fixed",
        bottom: 8,
        right: 0,
        textAlign: "center",
    },
});
