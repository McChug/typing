import { useState } from "react";
import Keyboard from "./components/Keyboard";
import Timer from "./components/Timer";

function App() {
  const [polyglowColor, setPolyglowColor] = useState("color");
  const [keySizeAdjust, setKeySizeAdjust] = useState(1);

  return (
    <>
      <Timer />
      {/* temp settings for testing */}
      <fieldset>
        <legend>Set ployglow color</legend>
        <input
          type="radio"
          name="ployglowColor"
          id="color"
          value="color"
          checked={polyglowColor === "color"}
          onChange={(e) => setPolyglowColor(e.target.value)}
        />
        <label htmlFor="color">Color</label>
        <input
          type="radio"
          name="ployglowColor"
          id="grayscale"
          value="grayscale"
          checked={polyglowColor === "grayscale"}
          onChange={(e) => setPolyglowColor(e.target.value)}
        />
        <label htmlFor="grayscale">Grayscale</label>
      </fieldset>
      <label htmlFor="keySizeAdjust">Key Size</label>
      <input
        type="number"
        name="keySizeAdjust"
        id="keySizeAdjust"
        value={keySizeAdjust}
        step="0.1"
        onChange={(e) => setKeySizeAdjust(parseFloat(e.target.value))}
      />
      <h1>Keyboard</h1>
      <Keyboard polyglowColor={polyglowColor} keySizeAdjust={keySizeAdjust} />
    </>
  );
}

export default App;
