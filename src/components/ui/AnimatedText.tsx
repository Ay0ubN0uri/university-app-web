import FancyText from "@carefully-coded/react-text-gradient";
import React from "react";

const AnimatedText = ({ children }: React.PropsWithChildren) => {
  return (
    <FancyText
      gradient={{ from: "#F858E0", to: "#77156C", type: "linear" }}
      animateTo={{ from: "#6DEDD0", to: "#7AE23A" }}
      animateDuration={20000}
    >
      {children}
    </FancyText>
  );
};

export default AnimatedText;
