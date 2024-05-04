import { useEffect, useRef, useState } from "react";
import { Coords } from "../../types";
import './Tooltip.css';

interface TooltipProps {
  title: string;
  coords: Coords;
}

const TOOLTIP_OPACITY = 0.8;
const Y_OFFSET = 8;

function Tooltip({ title, coords: { x, y } }: TooltipProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [opacity, setOpacity] = useState(0);

  const tooltipWidth = ref.current?.clientWidth || 0;
  const xOffset = tooltipWidth / 2;

  useEffect(() => {
    const interval = setInterval(() => {
      setOpacity((opacity) =>
        opacity < TOOLTIP_OPACITY ? opacity + 0.1 : opacity
      );
    }, 30);

    if (opacity >= TOOLTIP_OPACITY) {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <span
      ref={ref}
      className="tooltip"
      style={{
        opacity,
        top: y + Y_OFFSET,
        left: x - xOffset,
      }}
    >
      {title}
    </span>
  );
}

export default Tooltip;
