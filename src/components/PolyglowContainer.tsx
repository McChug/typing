import { useState, useEffect } from "react";
import type Polyglow from "../types/Polyglow";
import type PolyglowContainerProps from "../types/PolyglowContainerProps";

const PolyglowContainer = ({
  emKeySize,
  keySize,
  isActive,
}: PolyglowContainerProps) => {
  const dimension = emKeySize * 35;
  const baseRadius = dimension / 2;

  const [polyglows, setPolyglows] = useState<Polyglow[]>([]);

  useEffect(() => {
    if (isActive) {
      const sides = Math.floor(Math.random() * 6) + 6; // both numbers represent # of sides
      const centerX = dimension / 2;
      const centerY = dimension / 2;
      const angleStep = (2 * Math.PI) / sides;
      const radiusVariation = baseRadius * (Math.random() * 0.4 + 0.8);

      const points = [];
      for (let i = 0; i < sides; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const skew = Math.random() * 0.3 + 0.85;
        const r = radiusVariation * skew;
        const x = centerX + r * Math.cos(angle);
        const y = centerY + r * Math.sin(angle);
        points.push(`${x},${y}`);
      }

      const hue = Math.floor(Math.random() * 360);
      const fill = `hsla(${hue}, 70%, 60%, 50%)`;
      //const fill = `rgba(0,0,0,0.1)`;
      const maxOffset = (keySize * emKeySize * 10) / 2;
      const offsetX = (Math.random() - 0.5) * maxOffset;
      const rotate = Math.random() * 360;

      const id = crypto.randomUUID();
      const newPolyglow = {
        points: points.join(" "),
        fill,
        offsetX,
        rotate,
        id,
      };

      setPolyglows((prev) => [...prev, newPolyglow]);

      // Wait until after css animation to remove the svg
      setTimeout(() => {
        setPolyglows((prev) => prev.filter((poly) => poly.id !== id));
      }, 1200);
    }
  }, [isActive]);

  return (
    <div className="polyglow-container">
      {polyglows.map(({ points, fill, offsetX, id, rotate }) => (
        <svg
          key={id}
          width={dimension}
          height={dimension}
          className="polyglow fade"
          style={
            {
              "--offset-x": `${offsetX}px`,
              "--rotate": `${rotate}deg`,
            } as React.CSSProperties
          }
        >
          <polygon points={points} fill={fill} />
        </svg>
      ))}
    </div>
  );
};

export default PolyglowContainer;
