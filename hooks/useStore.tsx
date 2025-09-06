import { SQLiteDatabase } from "expo-sqlite";
import { create } from "zustand";

export type ReminderType = {
    id: number;
    content: string;
};

export type SummaryType = {
    id: number;
    name: string;
};

export type GradeType = {
    id: number;
    grade: number;
    summary_id: number;
    date: Date;
};

export type StoreType = {
    db: SQLiteDatabase | null;
    loading: boolean;
    grades: GradeType[];
    summaries: SummaryType[];
    reminders: ReminderType[];
    updateStore: (state: Partial<StoreType>) => void;
};

export const useStore = create<StoreType>((set) => ({
    db: null,
    loading: false,
    grades: [],
    summaries: [],
    reminders: [],
    updateStore: (state) => set((prev) => ({ ...prev, ...state })),
}));
