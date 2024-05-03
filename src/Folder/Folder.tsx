import { Component } from "react";
import { FolderType } from "../types";
import { ArrowDown } from "../ArrowDown";
import File from "../File";

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

  render() {
    const {
      folder: { name, children },
    } = this.props;
    const { isOpen } = this.state;

    return (
      <div
        onClick={(e) => {
          e.stopPropagation();
          this.setState(({ isOpen }) => ({ isOpen: !isOpen }));
        }}
        style={{ marginLeft: "10px" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <ArrowDown
            color="#eee"
            style={{
              rotate: isOpen ? "0deg" : "-90deg",
              transition: "rotate .3s",
            }}
          />

          <span>{name}</span>
        </div>

        <div>
          {isOpen &&
            children.map((child) =>
              child.type === "FOLDER" ? (
                <Folder folder={child} />
              ) : child.type === "FILE" ? (
                <File file={child} />
              ) : null
            )}
        </div>
      </div>
    );
  }
}
