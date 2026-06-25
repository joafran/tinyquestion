import { create } from "zustand";

type FormStore = {
    step: number;
    totalSteps: number;
    selectedAnswers: (string | null)[];
    initForm: (totalSteps: number) => void;
    setSelectedAnswer: (answer: string) => void;
    nextStep: () => void;
    prevStep: () => void;
    reset: () => void;
};

const useFormStore = create<FormStore>((set, get) => ({
    step: 1,
    totalSteps: 5,
    selectedAnswers: [null, null, null],
    initForm: (totalSteps) =>
        set({
            step: 1,
            totalSteps,
            selectedAnswers: Array<string | null>(totalSteps).fill(null),
        }),
    setSelectedAnswer: (answer) => {
        const { step, selectedAnswers } = get();
        const updated = [...selectedAnswers];
        updated[step - 1] = answer;
        set({ selectedAnswers: updated });
    },
    nextStep: () => {
        const { step, totalSteps } = get();
        if (step < totalSteps) set({ step: step + 1 });
    },
    prevStep: () => {
        const { step } = get();
        if (step > 1) set({ step: step - 1 });
    },
    reset: () =>
        set({
            step: 1,
            totalSteps: 5,
            selectedAnswers: [null, null, null],
        }),
}));

export default useFormStore;
