import { Button } from "@/components/Button";
import { FlexContainer } from "@/components/FlexContainer";
import { GradesDetails } from "@/components/GradesDetails";
import { Loading } from "@/components/Loading";
import { MainTemplate } from "@/components/MainTemplate";
import { Modal } from "@/components/Modal";
import { Summary } from "@/components/Summary";
import { useModal } from "@/hooks/useModal";
import { useSQL } from "@/hooks/useSQL";
import { SummaryType } from "@/hooks/useStore";
import { useTarget } from "@/hooks/useTarget";
import { useEffect, useState } from "react";
import { Text } from "react-native";

export default function GradesScreen() {
    const {
        isOpen: isOpenRemoveGradeModal,
        closeModal: closeRemoveGradeModal,
        openModal: openRemoveGradeModal,
    } = useModal();
    const {
        isOpen: isOpenNewGradeModal,
        closeModal: closeNewGradeModal,
        openModal: openNewGradeModal,
    } = useModal();
    const [selectedSummary, setSelectedSummary] = useState<
        SummaryType | undefined
    >(undefined);

    const {
        summaries,
        loading,
        createSummary,
        getGrades,
        getSummaries,
        removeSummary,
    } = useSQL();
    const { set, target } = useTarget<number>();

    useEffect(() => {
        getSummaries();
    }, []);

    if (loading) return <Loading />;

    if (selectedSummary)
        return (
            <GradesDetails
                summaryName={selectedSummary.name}
                summaryId={selectedSummary.id}
                onGoBack={() => setSelectedSummary(undefined)}
            />
        );

    return (
        <>
            <MainTemplate title="Notas" color="#E41852">
                <FlexContainer>
                    {summaries.length > 0 ? (
                        summaries.map((summary) => (
                            <Summary
                                key={summary.id}
                                label={summary.name}
                                onClick={() => {
                                    getGrades(summary.id);
                                    setSelectedSummary(summary);
                                }}
                                onRemove={() => {
                                    set(summary.id);
                                    openRemoveGradeModal();
                                }}
                            />
                        ))
                    ) : (
                        <Text>Comece adicionando novas disciplinas</Text>
                    )}
                </FlexContainer>

                <Button label="Nova disciplina" onPress={openNewGradeModal} />
            </MainTemplate>
            <Modal
                isOpen={isOpenRemoveGradeModal}
                onClose={closeRemoveGradeModal}
                onConfirm={() => removeSummary(target || 0)}
                onCancel={() => {}}
                label="tem certeza?"
            />

            <Modal
                isOpen={isOpenNewGradeModal}
                onClose={closeNewGradeModal}
                onConfirm={(gradeName) => createSummary(gradeName || "")}
                onCancel={() => {}}
                label="Qual o nome da nova disciplina?"
                input
            />
        </>
    );
}
