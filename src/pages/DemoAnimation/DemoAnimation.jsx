// rfc
import React, { useEffect } from "react";
import { useSprings, animated } from "@react-spring/web";

export default function DemoAnimation() {
  const [springs, api] = useSprings(
    1,
    () => ({
      from: { opacity: 0, color: "black" },
      to: { opacity: 1, color: "orange" },
    }),
    []
  );

  useEffect (() =>{

    return () =>{
        api.stop();
    }
  })
  return (
    <div className="container mt-3">
      {springs.map((props) => (
        <animated.div style={props}>
          <h3>Demo Animation</h3>
        </animated.div>
      ))}
    </div>
  );
}

// custom hook
// animation : react-spring
