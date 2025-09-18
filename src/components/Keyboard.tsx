import Key from "./Key";
import qwertyLayout from "../qwerty/qwertyLayout";
import { useState, useEffect } from "react";
import type KeyboardProps from "../types/KeyboardProps";

const Keyboard = ({polyglowColor, keySizeAdjust}: KeyboardProps) => {
  const displayVisible = false;
  const [activeKeys, setActiveKeys] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.code;
      setActiveKeys((prev) => (prev.includes(key) ? prev : [...prev, key]));
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.code;
      setActiveKeys((prev) => prev.filter((k) => k !== key));
    };
    const handleBlur = () => {
      setActiveKeys([]);
    };

    return () => {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("keyup", handleKeyUp);
      document.addEventListener("blur", handleBlur);
      document.addEventListener("click", handleBlur);
    };
  }, []);

  return (
    <>
      {qwertyLayout.map((row, i) => (
        <div key={i} className={"keyboard-row"}>
          {row.map((key, j) => (
            <Key
              key={`${i}-${j}`}
              val={key.val}
              display={key.display}
              width={key.size}
              sizeAdjust={keySizeAdjust}
              isActive={activeKeys?.includes(key.code)}
              displayVisible={displayVisible}
              polyglowColor={polyglowColor}
            />
          ))}
        </div>
      ))}
    </>
  );
};

export default Keyboard;
