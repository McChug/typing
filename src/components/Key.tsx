import { useEffect, useState } from "react";
import type KeyProps from "../types/KeyProps";
import PolyglowContainer from "./PolyglowContainer";

const Key = ({
  display,
  width,
  sizeAdjust,
  isActive,
  displayVisible,
  polyglowColor,
}: KeyProps) => {
  const [emKeySize, setEmKeySize] = useState<number>(3.5);

  useEffect(() => {
    // placeholder for a future movement system
    setEmKeySize(3.5);
  }, []);

  return (
    <div
      style={{
        height: `${emKeySize * sizeAdjust}em`,
        width: `${width * emKeySize * sizeAdjust}em`,
        position: "relative",
      }}
    >
      {/* Glow effect inside polyglow component */}
      <PolyglowContainer
        emKeySize={emKeySize * sizeAdjust}
        color={polyglowColor}
        keyWidth={width}
        isActive={isActive}
      />

      {/* Key */}
      <div className={isActive ? "key key-active" : "key"}>
        {displayVisible ? display : ""}
      </div>
    </div>
  );
};

export default Key;
