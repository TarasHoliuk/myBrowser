import { CSSProperties } from "react";

interface ArrowDownProps {
  color?: string;
  style?: CSSProperties;
}

export const ArrowDown = ({ color = "black", style }: ArrowDownProps) => {
  return (
    <svg
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 -960 960 960"
      width="24"
      fill={color}
    >
      <path d="M480-360 280-560h400L480-360Z" />
    </svg>
  );
};
