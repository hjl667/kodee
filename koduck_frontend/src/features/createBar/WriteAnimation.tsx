import Lottie from "lottie-react";
import animationData from "../../assets/WriteAnimation.json";
import { memo } from "react";

const WriteAnimation = memo(() => {
  return (
    <div className="">
      <div className="w-16 h-16">
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

export default WriteAnimation;
