import { useRef, useState, useEffect } from "react";

interface SwipeHandlers {
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: (e: React.TouchEvent) => void;
}

interface SwipeOptions {
  threshold?: number;
  preventDefaultTouchmove?: boolean;
  passive?: boolean;
}

interface SwipeState {
  swiping: boolean;
  direction: "left" | "right" | "up" | "down" | null;
  percentage: number;
  offset: { x: number; y: number };
}

const useSwipe = (
  onSwipe: (
    direction: "left" | "right" | "up" | "down",
    percentage: number
  ) => void,
  options: SwipeOptions = {}
): [SwipeHandlers, SwipeState] => {
  const {
    threshold = 50,
    preventDefaultTouchmove = true,
    passive = false,
  } = options;

  const [state, setState] = useState<SwipeState>({
    swiping: false,
    direction: null,
    percentage: 0,
    offset: { x: 0, y: 0 },
  });

  const startPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });

  const onTouchStart = (e: React.TouchEvent) => {
    startPos.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
    currentPos.current = { ...startPos.current };

    setState({
      swiping: true,
      direction: null,
      percentage: 0,
      offset: { x: 0, y: 0 },
    });
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!state.swiping) return;

    if (preventDefaultTouchmove) {
      e.preventDefault();
    }

    currentPos.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };

    const deltaX = currentPos.current.x - startPos.current.x;
    const deltaY = currentPos.current.y - startPos.current.y;

    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    let direction: "left" | "right" | "up" | "down" | null = null;
    let percentage = 0;

    if (absX > absY) {
      direction = deltaX > 0 ? "right" : "left";
      percentage = Math.min(100, (absX / threshold) * 100);
    } else {
      direction = deltaY > 0 ? "down" : "up";
      percentage = Math.min(100, (absY / threshold) * 100);
    }

    setState({
      swiping: true,
      direction,
      percentage,
      offset: { x: deltaX, y: deltaY },
    });
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!state.swiping) return;

    const { direction, percentage } = state;

    if (direction && percentage >= 100) {
      onSwipe(direction, percentage);
    }

    setState({
      swiping: false,
      direction: null,
      percentage: 0,
      offset: { x: 0, y: 0 },
    });
  };

  const handlers = {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };

  return [handlers, state];
};

export default useSwipe;
