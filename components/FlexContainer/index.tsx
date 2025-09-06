import { ReactNode } from "react";
import { StyleSheet, StyleSheetProperties, View } from "react-native";

export type FlexContainerProps = {
    children?: ReactNode;
    style?: StyleSheetProperties;
};

export function FlexContainer({
    children,
    style: customStyle,
}: FlexContainerProps) {
    return (
        <View style={{ ...style.container, ...customStyle }}>{children}</View>
    );
}

const style = StyleSheet.create({
    container: {
        flexDirection: "column",
        gap: 8,
        paddingVertical: 8,
    },
});
