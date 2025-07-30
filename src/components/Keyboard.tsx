import Key from "./Key";
import qwertyLayout from "../qwerty/qwertyLayout";
import { useState, useEffect } from "react";

const Keyboard = () => {
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
              size={key.size}
              isActive={activeKeys?.includes(key.code)}
              displayVisible={displayVisible}
            />
          ))}
        </div>
      ))}
    </>
  );
};

export default Keyboard;
