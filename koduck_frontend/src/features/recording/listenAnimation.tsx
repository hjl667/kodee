import React, { useRef } from "react";
import Lottie from "lottie-react";
import animationData from "../../../public/listen_animation.json";

const Animation = () => {
  const lottieRef = useRef();

  return (
    <div className="flex justify-center items-center">
      <div className="flex w-16 h-16">
        {" "}
        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
          loop={true}
          autoplay={true}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
};

const ListenAnimation = () => {
  return (
    <div className="">
      <div className="flex w-10 h-10 mr-100 justify-center items-center">
        <Animation />
        <Animation />
      </div>
    </div>
  );
};

export default ListenAnimation;
