import Key from "./components/Key";
import qwertyLayout from "./qwerty/qwertyLayout";
import { useEffect, useState } from "react";

function App() {
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

    return () => {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <>
      <h1>Keyboard</h1>
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
}

export default App;
