import { useEffect, useState } from "react";
import type KeyProps from "../types/KeyProps";
import PolyglowContainer from "./PolyglowContainer";

const Key = ({ display, size, isActive, displayVisible }: KeyProps) => {
  const [emKeySize, setEmKeySize] = useState<number>(3.5);

  useEffect(() => {
    // placeholder for a future movement system
    setEmKeySize(3.5);
  }, []);

  return (
    <div
      style={{
        height: `${emKeySize}em`,
        width: `${size * emKeySize}em`,
        position: "relative",
      }}
    >
      {/* Glow effect inside polyglow component */}
      <PolyglowContainer
        emKeySize={emKeySize}
        keySize={size}
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
