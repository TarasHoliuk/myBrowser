import { Component, ReactNode } from "react";
import { Coords, FileType } from "../../types";
import Tooltip from "../Tooltip";
import './File.css';

interface FileProps {
  file: FileType;
}

interface FileState {
  coords: Coords | null;
}

export default class File extends Component<FileProps, FileState> {
  state = {
    coords: null,
  };

  handleMouseEvent = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    this.setState({ coords: { x: e.clientX, y: e.clientY } });
  };

  handleMouseLeave = () => {
    this.setState({ coords: null });
  };

  render(): ReactNode {
    const {
      file: { name, mime },
    } = this.props;

    const { coords } = this.state;

    return (
      <li
        className="file"
        onMouseEnter={this.handleMouseEvent}
        onMouseMove={this.handleMouseEvent}
        onMouseLeave={this.handleMouseLeave}
      >
        {name}

        {coords && <Tooltip title={mime} coords={coords} />}
      </li>
    );
  }
}
