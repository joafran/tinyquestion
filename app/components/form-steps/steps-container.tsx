"use client";
import useFormStore from "@/app/stores/form.store";
import ExcitedSliderStep from "./excited-slider-step";
import WhenStep from "./when-step";
import SeeYouStep from "./see-you-step";
import QuestionStep from "./question-step";
import YayMessage from "./yay-message-step";

const StepsContainer = () => {
  const { step } = useFormStore();
  return (
    <div className="flex h-screen items-center justify-center p-8">
      {step === 1 && <QuestionStep />}
      {step === 2 && <YayMessage />}
      {step === 3 && <WhenStep />}
      {step === 4 && <ExcitedSliderStep />}
      {step === 5 && (
        <SeeYouStep
          date={new Date().toLocaleDateString()}
          time={new Date().toLocaleTimeString()}
        />
      )}
    </div>
  );
};

export default StepsContainer;
