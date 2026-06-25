"use client";
import { useState } from "react";
import DateAvailable, { DateAvailableValue } from "../date-available";
import NextStepButton from "../next-step-button";

const WhenStep = () => {
  const [dateAvailable, setDateAvailable] = useState<DateAvailableValue>({
    date: "",
    time: "",
  });
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold">When are you free?</h2>
      <DateAvailable
        value={dateAvailable}
        onChange={(value: DateAvailableValue) => {}}
        showTime
      />
      <NextStepButton />
    </div>
  );
};

export default WhenStep;
