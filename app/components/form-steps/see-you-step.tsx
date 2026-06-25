import Image from "next/image";

type SeeYouStepProps = {
  date: string;
  time: string;
};
const SeeYouStep = ({ date, time }: SeeYouStepProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold">See you soon!</h2>
      <Image
        src="https://media.tenor.com/9Nr32cJWZ8oAAAAM/catto.gif"
        alt="Happy Cat GIF"
        width={300}
        height={300}
      />
      <p className="text-lg text-center text-gray-600">
        Don&apos;t forget on {date} at {time}!
      </p>
    </div>
  );
};

export default SeeYouStep;
