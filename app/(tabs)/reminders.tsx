import { Button } from "@/components/Button";
import { FlexContainer } from "@/components/FlexContainer";
import { MainTemplate } from "@/components/MainTemplate";
import { Modal } from "@/components/Modal";
import { ReminderDetail } from "@/components/ReminderDetail";
import { useModal } from "@/hooks/useModal";
import { useSQL } from "@/hooks/useSQL";
import { useTarget } from "@/hooks/useTarget";
import { useEffect } from "react";
import { Text } from "react-native";

export default function RemindersScreen() {
    const {
        isOpen: isOpenRemoveModal,
        closeModal: closeRemoveModal,
        openModal: openRemoveModal,
    } = useModal();
    const {
        isOpen: isOpenNewModal,
        closeModal: closeNewModal,
        openModal: openNewModal,
    } = useModal();

    const { target, set } = useTarget<number>();
    const { reminders, getReminders, createReminder, removeReminder } =
        useSQL();

    useEffect(() => {
        getReminders();
    }, []);

    return (
        <>
            <MainTemplate title="Lembretes" color="#EE900E">
                <FlexContainer>
                    {reminders.length > 0 ? (
                        reminders.map((reminder) => (
                            <ReminderDetail
                                key={reminder.id}
                                label={reminder.content}
                                onRemove={() => {
                                    set(reminder.id);
                                    openRemoveModal();
                                }}
                            />
                        ))
                    ) : (
                        <Text>Comece adicionando novos lembretes</Text>
                    )}
                </FlexContainer>

                <Button label="Novo lembrete" onPress={openNewModal} />
            </MainTemplate>

            <Modal
                isOpen={isOpenRemoveModal}
                onClose={closeRemoveModal}
                onConfirm={() => removeReminder(target || -0)}
                onCancel={() => {}}
                label="tem certeza?"
            />

            <Modal
                isOpen={isOpenNewModal}
                onClose={closeNewModal}
                onConfirm={(content) => {
                    createReminder(content || "");
                }}
                onCancel={() => {}}
                label="Do que precisa se lembrar?"
                input
            />
        </>
    );
}
