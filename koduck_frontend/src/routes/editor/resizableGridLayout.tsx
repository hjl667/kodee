import React, { useState, useRef, useEffect } from "react";
import useSwipe from "@/hooks/useSwipe";
import { isMobile, useBreakpoint } from "@/hooks/breakpoint";

interface Layout {
  horizontal: number;
  rightVertical: number;
}

interface ResizableGridLayoutProps {
  children: React.ReactNode;
  initialLayout?: Layout;
  handleSwipeDown?: () => void;
}

type DraggingType = "horizontal" | "rightVertical" | null;

const ResizableGridLayout: React.FC<ResizableGridLayoutProps> = ({
  children,
  handleSwipeDown,
  initialLayout = { horizontal: 80, rightVertical: 80 },
}) => {
  const [isLeft, setIsLeft] = useState(true);
  const breakpoint = useBreakpoint();
  const isMobileView = isMobile(breakpoint);
  const childrenArray = React.Children.toArray(children);

  if (childrenArray.length !== 3) {
    console.warn("ThreePanelLayout expects exactly 3 children components");
  }

  const left = childrenArray[0] || (
    <div className="bg-gray-100 h-full w-full flex items-center justify-center text-gray-400">
      Left Panel
    </div>
  );
  const topRight = childrenArray[1] || (
    <div className="bg-gray-100 h-full w-full flex items-center justify-center text-gray-400">
      Top Right
    </div>
  );
  const bottomRight = childrenArray[2] || (
    <div className="bg-gray-100 h-full w-full flex items-center justify-center text-gray-400">
      Bottom Right
    </div>
  );

  const [layout, setLayout] = useState({
    horizontalSplit: initialLayout.horizontal,
    rightVerticalSplit: initialLayout.rightVertical,
  });

  const [dragging, setDragging] = useState<DraggingType>(null);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [currentView, setCurrentView] = useState<boolean>(isLeft);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSwipe = (
    direction: "left" | "right" | "up" | "down",
    percentage: number
  ) => {
    if (direction === "left" && currentView) {
      setIsTransitioning(true);
      setCurrentView(false);
    } else if (direction === "right" && !currentView) {
      setIsTransitioning(true);
      setCurrentView(true);
    } else if (direction === "up" && percentage >= 100) {
      if (handleSwipeDown) {
        handleSwipeDown();
      }
    }
  };

  const [swipeHandlers, swipeState] = useSwipe(handleSwipe, {
    threshold: 80,
    preventDefaultTouchmove: false,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent): void => {
      if (!dragging || !containerRef.current) return;

      const container = containerRef.current.getBoundingClientRect();
      const deltaX = e.clientX - startPos.x;
      const deltaY = e.clientY - startPos.y;

      setLayout((prevLayout) => {
        const newLayout = { ...prevLayout };

        if (dragging === "horizontal") {
          const containerWidth = container.width;
          const newSplit =
            prevLayout.horizontalSplit + (deltaX / containerWidth) * 100;
          newLayout.horizontalSplit = Math.max(20, Math.min(80, newSplit));
        } else if (dragging === "rightVertical") {
          const containerHeight = container.height;
          const newSplit =
            prevLayout.rightVerticalSplit + (deltaY / containerHeight) * 100;
          newLayout.rightVerticalSplit = Math.max(20, Math.min(80, newSplit));
        }

        return newLayout;
      });

      setStartPos({
        x: e.clientX,
        y: e.clientY,
      });
    };

    const handleMouseUp = () => {
      if (dragging) {
        setDragging(null);
      }
    };

    if (dragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, startPos]);

  const handleDragStart = (e: React.MouseEvent, direction: DraggingType) => {
    e.preventDefault();
    setDragging(direction);
    setStartPos({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
  };

  if (isMobileView) {
    return (
      <div
        ref={containerRef}
        className="h-full w-full overflow-hidden"
        {...swipeHandlers}
      >
        <div className="h-full w-full relative">
          <div
            className={`absolute inset-0 w-full h-full transition-transform duration-300 ease-in-out ${
              currentView ? "translate-x-0" : "-translate-x-full"
            }`}
            onTransitionEnd={handleTransitionEnd}
          >
            <div className="h-full p-1 overflow-auto">{left}</div>
          </div>

          <div
            className={`absolute inset-0 w-full h-full transition-transform duration-300 ease-in-out ${
              currentView ? "translate-x-full" : "translate-x-0"
            }`}
            onTransitionEnd={handleTransitionEnd}
          >
            <div className="h-full w-full flex flex-col">
              <div
                className="flex-1 w-full min-h-0"
                style={{ flex: `${layout.rightVerticalSplit}` }}
              >
                <div className="h-full p-1 overflow-auto">{topRight}</div>
              </div>

              <div
                className={`w-full h-1 cursor-ns-resize z-20 ${
                  dragging === "rightVertical"
                    ? "bg-blue-300 opacity-50"
                    : "bg-transparent"
                }`}
                onMouseDown={(e) => handleDragStart(e, "rightVertical")}
              />

              <div
                className="flex-1 w-full min-h-0"
                style={{ flex: `${100 - layout.rightVerticalSplit}` }}
              >
                <div className="h-full p-1 overflow-auto">{bottomRight}</div>
              </div>
            </div>
          </div>

          {/* 滑动指示器 */}
          {swipeState.swiping && (
            <div
              className="absolute inset-0 pointer-events-none flex items-center justify-center"
              style={{ opacity: Math.min(0.5, swipeState.percentage / 200) }}
            >
              <div
                className={`text-2xl text-white bg-black bg-opacity-50 rounded-full p-4 ${
                  swipeState.direction === "left"
                    ? "transform -translate-x-4"
                    : swipeState.direction === "right"
                    ? "transform translate-x-4"
                    : swipeState.direction === "down"
                    ? "transform translate-y-4"
                    : swipeState.direction === "up"
                    ? "transform -translate-y-4"
                    : ""
                }`}
              >
                {swipeState.direction === "left"
                  ? "→"
                  : swipeState.direction === "right"
                  ? "←"
                  : swipeState.direction === "down"
                  ? "↓"
                  : swipeState.direction === "up"
                  ? "↑"
                  : ""}
              </div>
            </div>
          )}

          {/* 页面指示器 */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center pointer-events-none">
            <div className="flex space-x-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  currentView ? "bg-blue-500" : "bg-gray-300"
                }`}
              ></div>
              <div
                className={`w-2 h-2 rounded-full ${
                  !currentView ? "bg-blue-500" : "bg-gray-300"
                }`}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 桌面版布局
  return (
    <div ref={containerRef} className="flex h-full w-full relative">
      <div
        className="flex-1 h-full max-height: 100vh"
        style={{ flex: `${layout.horizontalSplit}` }}
      >
        <div className="h-full overflow-auto">{left}</div>
      </div>
      <div
        className={`h-full w-1 cursor-ew-resize z-20 ${
          dragging === "horizontal"
            ? "bg-blue-300 opacity-50"
            : "bg-transparent"
        }`}
        style={{
          left: `calc(${layout.horizontalSplit}% - 2px)`,
          cursor: "ew-resize",
        }}
        onMouseDown={(e) => handleDragStart(e, "horizontal")}
      />
      <div
        className="flex-1 flex flex-col min-h-0 relative"
        style={{ flex: `${100 - layout.horizontalSplit}` }}
      >
        <div
          className="flex-1 min-h-0"
          style={{ flex: `${layout.rightVerticalSplit}` }}
        >
          <div className="h-full overflow-auto">{topRight}</div>
        </div>
        <div
          className={`w-full h-1 cursor-ns-resize z-20 ${
            dragging === "rightVertical"
              ? "bg-blue-300 opacity-50"
              : "bg-transparent"
          }`}
          onMouseDown={(e) => handleDragStart(e, "rightVertical")}
        />

        <div
          className="flex-1 w-full min-h-0 max-h-screen"
          style={{ flex: `${100 - layout.rightVerticalSplit}` }}
        >
          <div className="h-full overflow-auto">{bottomRight}</div>
        </div>
      </div>

      {dragging === "horizontal" && (
        <div
          className="absolute h-full w-0.1 bg-blue-500 z-30 pointer-events-none"
          style={{ left: `${layout.horizontalSplit}%` }}
        />
      )}

      {dragging === "rightVertical" && (
        <div
          className="absolute w-full h-0.1 bg-blue-500 z-30 pointer-events-none"
          style={{
            left: `${layout.horizontalSplit}%`,
            top: `${layout.rightVerticalSplit}%`,
            width: `${100 - layout.horizontalSplit}%`,
          }}
        />
      )}
    </div>
  );
};

export default ResizableGridLayout;
