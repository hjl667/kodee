import Lottie from "lottie-react";
import animationData from "../assets/LoadingAnimation.json";
import { memo } from "react";

const LoadingSpinner = memo(() => {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="w-32 h-32">
        <Lottie
          animationData={animationData}
          loop={true}
          autoplay={true}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
});

export default LoadingSpinner;
