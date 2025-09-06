import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import TabBarBackground from "@/components/ui/TabBarBackground";
import { Entypo, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#E31751",
                headerShown: false,
                tabBarBackground: TabBarBackground,
                tabBarStyle: Platform.select({
                    ios: {
                        // Use a transparent background on iOS to show the blur effect
                        position: "absolute",
                    },
                    default: {},
                }),
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Início",
                    tabBarIcon: ({ color }) => (
                        <Entypo name="home" size={32} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="grades"
                options={{
                    title: "Notas",
                    tabBarIcon: ({ color }) => (
                        <Octicons size={28} name="number" color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="reminders"
                options={{
                    title: "Lembretes",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            size={28}
                            name="reminder"
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
