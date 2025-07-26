import type { Key as KeyProps } from "../types/Key";

const Key = ({ display, size, isActive }: KeyProps) => {
  return (
    <div
      className={isActive ? "key key-active" : "key"}
      style={{ height: "3em", width: `${size * 3}em` }}
    >
      {display}
    </div>
  );
};

export default Key;
