import * as SQLite from "expo-sqlite";
import { useEffect } from "react";
import { GradeType, ReminderType, SummaryType, useStore } from "./useStore";

export function useSQL() {
    const { db, loading, grades, reminders, summaries, updateStore } =
        useStore();

    async function openDatabase() {
        const db = await SQLite.openDatabaseAsync("egus");
        await db.execAsync(`
            PRAGMA journal_mode = WAL; 

            CREATE TABLE IF NOT EXISTS reminder (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                content TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS summary (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL
            ); 
            
            CREATE TABLE IF NOT EXISTS grade (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                summary_id INTEGER NOT NULL,
                value REAL NOT NULL,
                dt DATE DEFAULT (DATE('now'))
            ); 
        `);

        updateStore({ db });
    }
    async function dropTables() {
        await db?.execAsync(`
            DROP TABLE reminder;    
            DROP TABLE summary;    
            DROP TABLE grade;    
        `);
    }

    async function createReminder(content: string) {
        if (!db) return;

        const statement = await db.prepareAsync(
            "INSERT INTO reminder (content) VALUES ($value)"
        );
        try {
            await statement.executeAsync({ $value: content });
        } finally {
            await statement.finalizeAsync();
        }

        await getReminders();
    }
    async function removeReminder(id: number) {
        if (!db) return;

        const statement = await db.prepareAsync(
            "DELETE FROM reminder WHERE id = $value"
        );

        try {
            await statement.executeAsync({ $value: id });
        } finally {
            await statement.finalizeAsync();
        }

        await getReminders();
    }

    async function createSummary(name: string) {
        if (!db) return;

        const statement = await db.prepareAsync(
            "INSERT INTO summary (name) VALUES ($value)"
        );
        try {
            await statement.executeAsync({ $value: name });
        } finally {
            await statement.finalizeAsync();
        }

        await getSummaries();
    }
    async function removeSummary(id: number) {
        if (!db) return;

        const statement = await db.prepareAsync(
            `
        DELETE FROM summary WHERE id = $value;
        DELETE FROM grade WHERE summary_id = $summary_id;
        `
        );

        try {
            await statement.executeAsync({ $value: id, $summary_id: id });
        } finally {
            await statement.finalizeAsync();
        }

        await getSummaries();
    }

    async function createGrade(grade: number, summaryId: number) {
        if (!db) return;

        const statement = await db.prepareAsync(
            "INSERT INTO grade (value, summary_id) VALUES ($grade, $summary_id)"
        );
        try {
            await statement.executeAsync({
                $grade: grade,
                $summary_id: summaryId,
            });
        } finally {
            await statement.finalizeAsync();
        }

        await getGrades(summaryId);
    }
    async function removeGrade(id: number, summaryId: number) {
        if (!db) return;

        const statement = await db.prepareAsync(
            "DELETE FROM grade WHERE id = $value"
        );

        try {
            await statement.executeAsync({ $value: id });
        } finally {
            await statement.finalizeAsync();
        }

        await getGrades(summaryId);
    }

    async function getSummaries() {
        if (!db) return [];

        const allRows: { id: number; name: string }[] = await db.getAllAsync(
            "SELECT * FROM summary"
        );
        const summaries: SummaryType[] = [];

        for (const row of allRows) {
            summaries.push({ id: row.id, name: row.name });
        }

        updateStore({ summaries });
    }
    async function getGrades(summaryId: number) {
        if (!db) return [];

        updateStore({ loading: true });

        const statement = await db.prepareAsync(
            "SELECT * FROM grade WHERE summary_id = $summary_id"
        );

        const result = await statement.executeAsync<{
            id: number;
            value: number;
            summary_id: number;
            dt: string;
        }>({ $summary_id: summaryId });
        const allRows = await result.getAllAsync();

        const grades: GradeType[] = [];

        for (const row of allRows) {
            grades.push({
                id: row.id,
                grade: row.value,
                summary_id: row.summary_id,
                date: new Date(row.dt),
            });
        }

        updateStore({ grades, loading: false });
    }
    async function getReminders() {
        if (!db) return [];

        const allRows: { id: number; content: string }[] = await db.getAllAsync(
            "SELECT * FROM reminder"
        );
        const reminders: ReminderType[] = [];

        for (const row of allRows) {
            reminders.push({ id: row.id, content: row.content });
        }

        updateStore({ reminders });
    }

    useEffect(() => {
        if (!db) {
            openDatabase();
        }
    }, []);

    return {
        db,
        loading,
        reminders,
        grades,
        summaries,
        dropTables,
        createReminder,
        removeReminder,
        createSummary,
        removeSummary,
        createGrade,
        removeGrade,
        getSummaries,
        getGrades,
        getReminders,
    };
}
