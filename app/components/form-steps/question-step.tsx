import Image from "next/image";
import FlyingButton from "../flying-button";
import NextStepButton from "../next-step-button";

const QuestionStep = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-xl md:text-4xl font-bold">
        Would you go on a date with me?
      </h1>
      <Image
        className="max-h-64"
        src="https://media.tenor.com/lfDATg4Bhc0AAAAM/happy-cat.gif"
        alt="Happy Dance GIF"
        width={400}
        height={200}
      />
      <div className="flex items-center justify-between gap-4">
        <NextStepButton text="Yes" />
        <FlyingButton className="w-24 rounded-md bg-red-500 p-2 text-white">
          No
        </FlyingButton>
      </div>
    </div>
  );
};

export default QuestionStep;
