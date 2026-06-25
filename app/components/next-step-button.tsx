import useFormStore from "../stores/form.store";
import type { ButtonHTMLAttributes } from "react";

const NextStepButton = ({
  text = "Continue",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { text?: string }) => {
  const { nextStep } = useFormStore();
  return (
    <button
      {...props}
      type="button"
      onClick={nextStep}
      className="w-full rounded-md bg-blue-500 px-12 py-4 text-white"
    >
      {text}
    </button>
  );
};

export default NextStepButton;
