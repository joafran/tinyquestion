"use client";

import Image from "next/image";
import { useCallback, useMemo, useRef, useState } from "react";
import NextStepButton from "../next-step-button";

const getExcitementMessage = (value: number): string => {
  if (value === 0) return "Slide the heart... don't leave me hanging 💔";
  if (value < 15) return "That's it? My cat is more excited than this 🐱";
  if (value < 30) return "Hmm... lukewarm tea vibes ☕";
  if (value < 45) return "Are you sure you're clicking the right button?";
  if (value < 60) return "Okay okay, we're getting somewhere!";
  if (value < 75) return "Now we're talking! 🔥";
  if (value < 90) return "My heart can't take this!!! 💓";
  if (value < 100) return "Almost at full chaos mode...";
  return "MAXIMUM EXCITEMENT ACHIEVED 🚨😍😍😍";
};

type ExcitedSliderProps = {
  value: number;
  onChange: (value: number) => void;
};

const ExcitedSlider = ({ value, onChange }: ExcitedSliderProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const emojiScale = 1 + value * 0.0012;
  const emojiRotation = value * 0.3 - 15;

  const updateFromPointer = useCallback(
    (clientX: number) => {
      const track = trackRef.current;
      if (!track) return;

      const rect = track.getBoundingClientRect();
      const percent = ((clientX - rect.left) / rect.width) * 100;
      onChange(Math.round(Math.max(0, Math.min(100, percent))));
    },
    [onChange],
  );

  const startDrag = useCallback(
    (event: React.PointerEvent) => {
      event.preventDefault();
      setIsDragging(true);
      updateFromPointer(event.clientX);

      const handleMove = (moveEvent: PointerEvent) => {
        updateFromPointer(moveEvent.clientX);
      };

      const handleUp = () => {
        setIsDragging(false);
        window.removeEventListener("pointermove", handleMove);
        window.removeEventListener("pointerup", handleUp);
      };

      window.addEventListener("pointermove", handleMove);
      window.addEventListener("pointerup", handleUp);
    },
    [updateFromPointer],
  );

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault();
      onChange(Math.min(100, value + 5));
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      event.preventDefault();
      onChange(Math.max(0, value - 5));
    }
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="relative mx-auto w-full max-w-md px-4">
        <div
          ref={trackRef}
          className="relative h-24 touch-none select-none"
          onPointerDown={startDrag}
        >
          <div className="absolute bottom-3 left-0 right-0 h-5 rounded-full bg-gray-200 shadow-inner" />
          <div
            className="absolute bottom-3 left-0 h-5 rounded-full bg-linear-to-r from-pink-300 via-pink-500 to-red-500"
            style={{ width: `${value}%` }}
          />

          <div
            role="slider"
            tabIndex={0}
            aria-label="How excited are you?"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={value}
            aria-valuetext={getExcitementMessage(value)}
            onPointerDown={(event) => {
              event.stopPropagation();
              startDrag(event);
            }}
            onKeyDown={handleKeyDown}
            className={`absolute bottom-1 z-10 cursor-grab touch-none active:cursor-grabbing ${
              isDragging ? "" : "transition-[left,transform] duration-100"
            } ${isDragging ? "animate-pulse" : ""}`}
            style={{
              left: `${value}%`,
              transform: `translateX(-50%) scale(${emojiScale}) rotate(${emojiRotation}deg)`,
              transformOrigin: "bottom center",
              fontSize: "2.25rem",
              filter:
                value > 80
                  ? "drop-shadow(0 0 8px rgba(236,72,153,0.8))"
                  : undefined,
            }}
          >
            😍
          </div>
        </div>
      </div>

      <div className="flex justify-between px-2 text-sm text-gray-500">
        <span>😴 Not at all</span>
        <span>MARRY ME 💍</span>
      </div>

      <p className="min-h-12 text-center text-lg font-medium text-pink-600">
        {getExcitementMessage(value)}
      </p>
    </div>
  );
};

type ExcitedSliderStepProps = {
  onContinue?: (value: number) => void;
};

const ExcitedSliderStep = ({ onContinue }: ExcitedSliderStepProps) => {
  const [excitement, setExcitement] = useState(0);

  const canContinue = useMemo(() => excitement > 0, [excitement]);

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-6">
      <h2 className="text-center text-2xl font-bold">How excited are you?</h2>
      <Image
        src="https://media1.tenor.com/m/okLblt2eu1oAAAAC/happy-dance.gif"
        alt="Happy Cat GIF"
        width={200}
        height={200}
      />
      <ExcitedSlider value={excitement} onChange={setExcitement} />
      <NextStepButton disabled={!canContinue} />
    </div>
  );
};

export default ExcitedSliderStep;
