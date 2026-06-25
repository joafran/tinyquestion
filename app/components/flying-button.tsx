"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type FlyingButtonProps = React.ComponentProps<"button">;

const HOVER_PADDING = 24;
const MIN_CURSOR_DISTANCE = 120;

const FlyingButton = ({
  className,
  style,
  children,
  ...props
}: FlyingButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const cursorRef = useRef({ x: 0, y: 0 });
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null,
  );

  const getRandomPosition = useCallback((width: number, height: number) => {
    const maxX = Math.max(0, window.innerWidth - width);
    const maxY = Math.max(0, window.innerHeight - height);

    return {
      x: Math.random() * maxX,
      y: Math.random() * maxY,
    };
  }, []);

  const moveAway = useCallback(() => {
    const button = buttonRef.current;
    if (!button) return;

    const { width, height } = button.getBoundingClientRect();
    const { x: cursorX, y: cursorY } = cursorRef.current;

    let nextPosition = getRandomPosition(width, height);
    let attempts = 0;

    while (attempts < 40) {
      const centerX = nextPosition.x + width / 2;
      const centerY = nextPosition.y + height / 2;
      const distance = Math.hypot(centerX - cursorX, centerY - cursorY);

      if (distance >= MIN_CURSOR_DISTANCE) break;

      nextPosition = getRandomPosition(width, height);
      attempts++;
    }

    setPosition(nextPosition);
  }, [getRandomPosition]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      cursorRef.current = { x: event.clientX, y: event.clientY };

      const button = buttonRef.current;
      if (!button) return;

      const rect = button.getBoundingClientRect();
      const isHovering =
        event.clientX >= rect.left - HOVER_PADDING &&
        event.clientX <= rect.right + HOVER_PADDING &&
        event.clientY >= rect.top - HOVER_PADDING &&
        event.clientY <= rect.bottom + HOVER_PADDING;

      if (isHovering) {
        moveAway();
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [moveAway]);

  return (
    <button
      ref={buttonRef}
      type="button"
      className={className}
      style={{
        ...style,
        pointerEvents: "none",
        position: position ? "fixed" : undefined,
        left: position?.x,
        top: position?.y,
        transition: position ? "left 0.2s ease-out, top 0.2s ease-out" : undefined,
        zIndex: position ? 50 : undefined,
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default FlyingButton;
