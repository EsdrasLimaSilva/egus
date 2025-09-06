import { FlexContainer } from "@/components/FlexContainer";
import { MainTemplate } from "@/components/MainTemplate";
import { useModal } from "@/hooks/useModal";
import { useSQL } from "@/hooks/useSQL";
import { useTarget } from "@/hooks/useTarget";
import { Button } from "../Button";
import { GradeCard } from "../GradeCard";
import { Loading } from "../Loading";
import { Modal } from "../Modal";

export type GradesDetailsProps = {
    summaryId: number;
    summaryName: string;
    onGoBack: () => void;
};

export function GradesDetails({
    summaryName,
    summaryId,
    onGoBack,
}: GradesDetailsProps) {
    const {
        isOpen: isOpenAddModal,
        openModal: openAddModal,
        closeModal: closeAddModal,
    } = useModal();
    const {
        isOpen: isOpenRemoveModal,
        openModal: openRemoveModal,
        closeModal: closeRemoveModal,
    } = useModal();

    const { set, target } = useTarget<number>();
    const { loading, createGrade, removeGrade, grades } = useSQL();

    if (loading) return <Loading />;

    return (
        <>
            <MainTemplate title={summaryName} onGoBack={onGoBack}>
                <FlexContainer>
                    {grades.map((grade) => (
                        <GradeCard
                            key={grade.id}
                            date={grade.date.toLocaleDateString("pt-BR")}
                            grade={grade.grade}
                            onRemove={() => {
                                set(grade.id);
                                openRemoveModal();
                            }}
                        />
                    ))}
                </FlexContainer>

                <Button label="Nova nota" onPress={openAddModal} />
            </MainTemplate>

            <Modal
                isOpen={isOpenRemoveModal}
                label="Tem certeza que deseja remover?"
                onClose={closeRemoveModal}
                onConfirm={() => removeGrade(target || 0, summaryId)}
                onCancel={() => {}}
            />

            <Modal
                isOpen={isOpenAddModal}
                label="Qual a nota?"
                onClose={closeAddModal}
                onConfirm={(grade) => createGrade(Number(grade), summaryId)}
                onCancel={() => {}}
                input
            />
        </>
    );
}
