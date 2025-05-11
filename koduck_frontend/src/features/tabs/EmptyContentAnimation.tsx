import Lottie from "lottie-react";
import animationData from "../../assets/EmptyContent.json";
import { memo, useRef, useEffect } from "react";

const EmptyContentAnimation = memo(() => {
  const lottieRef = useRef<any>(null);

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(0.3);
    }
  }, []);

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
          loop={true}
          autoplay={true}
          style={{ width: "50%", height: "100%", marginTop: "60px" }}
        />
        <span style={{ marginTop: "20px", fontSize: "0.8rem" }}>
          {"Nothing here yet..."}
        </span>
      </div>
    </div>
  );
});

export default EmptyContentAnimation;
