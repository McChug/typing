import type { Key as KeyProps } from "../types/Key";

const Key = ({ display, size, isActive, displayVisible }: KeyProps) => {
  const keySize = 3.5;
  return (
    <div style={{ height: `${keySize}em`, width: `${size * keySize}em` }}>
      <div className={isActive ? "key key-active" : "key"}>
        {displayVisible ? display : ""}
      </div>
    </div>
  );
};

export default Key;
