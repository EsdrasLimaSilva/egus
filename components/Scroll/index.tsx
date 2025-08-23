import { ReactNode } from "react";
import { ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export function Scroll({ children }: { children: ReactNode }) {
    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <ScrollView contentContainerStyle={{ padding: 12 }}>
                    {children}
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
