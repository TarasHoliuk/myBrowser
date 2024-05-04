import { Component } from "react";
import { FolderType } from "../../types";
import { ArrowRight } from "../ArrowRight";
import File from "../File";
import cn from "classnames";
import "./Folder.css";

interface FolderState {
  isOpen: boolean;
}

interface FolderProps {
  folder: FolderType;
}

export default class Folder extends Component<FolderProps, FolderState> {
  state = {
    isOpen: false,
  };

  handleToggleOpen = () => {
    this.setState(({ isOpen }) => ({ isOpen: !isOpen }));
  };

  render() {
    const {
      folder: { name, children },
    } = this.props;
    const { isOpen } = this.state;

    return (
      <li className="folder">
        <div className="folder-name" onClick={this.handleToggleOpen}>
          <span
            className={cn("arrow-wrapper", {
              "arrow-wrapper--is-open": isOpen,
            })}
          >
            <ArrowRight color="#eee" />
          </span>

          <p>{name}</p>
        </div>

        <ul className="folders-list">
          {isOpen &&
            children.map((child) =>
              child.type === "FOLDER" ? (
                <Folder folder={child} />
              ) : (
                <File file={child} />
              )
            )}
        </ul>
      </li>
    );
  }
}
