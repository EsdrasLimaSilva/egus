import { CardMenu } from "@/components/CardMenu";
import { ReminderCard } from "@/components/ReminderCard";
import { Scroll } from "@/components/Scroll";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
    return (
        <Scroll>
            <View style={styles.sectionContainer}>
                <Text style={styles.menuTitle}>Menu</Text>

                <View style={styles.menuStyle}>
                    <CardMenu label="Notas" color="#E41852" />
                    <CardMenu label="Cartões" color="#269DE8" />
                    <CardMenu label="Lembretes" color="#EE900E" />
                </View>
            </View>

            <View style={styles.sectionContainer}>
                <Text style={styles.menuTitle}>Não se esqueça</Text>

                <ScrollView
                    contentContainerStyle={{ flexDirection: "column", gap: 8 }}
                >
                    <ReminderCard />
                    <ReminderCard />
                    <ReminderCard />
                    <ReminderCard />
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
