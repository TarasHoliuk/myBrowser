interface ArrowDownProps {
  color?: string;
}

export const ArrowRight = ({ color }: ArrowDownProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 -960 960 960"
      width="24"
      fill={color}
    >
      <path d="M400-280v-400l200 200-200 200Z" />
    </svg>
  );
};
