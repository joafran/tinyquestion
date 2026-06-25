import Image from "next/image";
import NextStepButton from "../next-step-button";

const YayMessage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 px-4">
      <Image
        src="https://media1.tenor.com/m/WsWej1C3ePYAAAAC/yippee-cat-kitty.gif"
        alt="Cute Cat GIF"
        width={300}
        height={300}
      />
      <h1 className="text-2xl md:text-4xl font-bold">
        Yeayyyyyyyy!!!!!! Don&apos;t go anywhere yet!!
      </h1>
      <NextStepButton />
    </div>
  );
};

export default YayMessage;
