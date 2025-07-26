import "./App.css";
import Key from "./components/Key";
import qwertyLayout from "./qwerty/qwertyLayout";
import { useEffect, useState } from "react";

function App() {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const keysToUseCode = ["Shift", "Control", "Meta", "Alt", "ContextMenu"];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setActiveKey(keysToUseCode.includes(e.key) ? e.code : e.key);
    };
    const handleKeyUp = () => {
      setActiveKey(null);
    };

    return () => {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("keyup", handleKeyUp);
    };
  });

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
              isActive={activeKey?.toUpperCase() === key.val.toUpperCase()}
            />
          ))}
        </div>
      ))}
    </>
  );
}

export default App;
