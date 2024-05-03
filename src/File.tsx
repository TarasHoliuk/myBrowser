import {
  Component,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { FileType } from "./types";

interface FileProps {
  file: FileType;
}

interface Coords {
  x: number;
  y: number;
}

interface TooltipProps {
  title: string;
  coords: Coords;
}

interface FileState {
  coords: Coords | null;
}

const Tooltip = ({ title, coords: { x, y } }: TooltipProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [opacity, setOpacity] = useState(0);

  const tooltipWidth = ref.current?.clientWidth || 0;
  const xOffset = tooltipWidth / 2;

  useEffect(() => {
    const interval = setInterval(() => {
      setOpacity((opacity) => (opacity < 0.8 ? opacity + 0.1 : opacity));
    }, 30);

    if (opacity >= 0.8) {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <span
      ref={ref}
      style={{
        opacity,
        position: "absolute",
        top: y + 8,
        left: x - xOffset,
        padding: "5px",
        backgroundColor: "#eee",
        zIndex: 2,
        color: "black",
      }}
    >
      {title}
    </span>
  );
};

export default class File extends Component<FileProps, FileState> {
  state = {
    coords: null,
  };

  handleMouseEvent = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    this.setState({ coords: { x: e.clientX, y: e.clientY } });
  };

  render(): ReactNode {
    const {
      file: { name, mime },
    } = this.props;

    const { coords } = this.state;

    return (
      <div
        onMouseEnter={this.handleMouseEvent}
        onMouseMove={this.handleMouseEvent}
        onMouseLeave={() => {
          this.setState({ coords: null });
        }}
        style={{
          display: "flex",
          marginLeft: "24px",
          width: "min-content",
          cursor: "default",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {name}

        {coords && <Tooltip title={mime} coords={coords} />}
      </div>
    );
  }
}
