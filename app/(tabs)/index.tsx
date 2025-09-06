import { CardMenu } from "@/components/CardMenu";
import { ReminderCard } from "@/components/ReminderCard";
import { Scroll } from "@/components/Scroll";
import { useSQL } from "@/hooks/useSQL";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
    const router = useRouter();
    const { db, reminders, getReminders, removeReminder } = useSQL();

    useEffect(() => {
        if (db) {
            getReminders();
        }
    }, [db]);

    return (
        <Scroll>
            <View style={styles.sectionContainer}>
                <Text style={styles.menuTitle}>Menu</Text>

                <View style={styles.menuStyle}>
                    <CardMenu
                        label="Notas"
                        color="#E41852"
                        onClick={() => router.push("/(tabs)/grades")}
                    />
                    <CardMenu
                        label="Lembretes"
                        color="#EE900E"
                        onClick={() => router.push("/(tabs)/reminders")}
                    />
                </View>
            </View>

            <View style={styles.sectionContainer}>
                <Text style={styles.menuTitle}>Não se esqueça</Text>

                <ScrollView
                    contentContainerStyle={{ flexDirection: "column", gap: 8 }}
                >
                    {reminders.length > 0 ? (
                        reminders.map((reminder) => (
                            <ReminderCard
                                key={reminder.id}
                                content={reminder.content}
                                onCheck={() => removeReminder(reminder.id)}
                            />
                        ))
                    ) : (
                        <Text>
                            Vá para a aba de lembretes e adicione novos para não
                            se esquecer de nada!
                        </Text>
                    )}
                </ScrollView>
            </View>
        </Scroll>
    );
}

const styles = StyleSheet.create({
    menuStyle: {
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 24,
    },

    menuTitle: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#222",
        marginBottom: 24,
    },

    sectionContainer: {
        paddingBottom: 48,
    },
});
