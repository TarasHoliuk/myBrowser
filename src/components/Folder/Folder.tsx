import { Component, Context } from "react";
import { FolderType } from "../../types";
import { ArrowRight } from "../ArrowRight";
import File from "../File";
import cn from "classnames";
import "./Folder.css";
import { checkIsFolder, getFolderPath } from "../../helpers";
import { MyBrowserContext, MyBrowserContextValue } from "../MyBrowserContext";
import { isEqual } from "lodash";

interface FolderState {
  isOpen: boolean;
  shouldRender: boolean;
}

interface FolderProps {
  folder: FolderType;
  path: string;
}

export default class Folder extends Component<FolderProps, FolderState> {
  declare context: React.ContextType<typeof MyBrowserContext>;

  static contextType: Context<MyBrowserContextValue> = MyBrowserContext;

  state = {
    isOpen: false,
    shouldRender: true,
  };

  handleToggleOpen = () => {
    this.setState(({ isOpen }) => ({ isOpen: !isOpen }));
  };

  componentDidMount() {
    const { expandedFolders } = this.context;
    const { path } = this.props;
    
    const isParentOrExpandedFolder = expandedFolders.some((folderPath) =>
      folderPath.includes(path)
    );

    this.setState({
      isOpen: isParentOrExpandedFolder,
    });
  }

  componentDidUpdate({ path }: Readonly<FolderProps>, prevState: Readonly<FolderState>) {
    const { expandedFolders, searchedFilesFolders } = this.context;
    
    const isParentOrExpandedFolder = expandedFolders.some((folderPath) =>
      folderPath.includes(path)
    );
    const isSearchedFolder =
      searchedFilesFolders.some((folderPath) => folderPath.includes(path));

    const shouldRender = searchedFilesFolders.length ? isSearchedFolder : true;
    const updatedState = {
      isOpen: isParentOrExpandedFolder || isSearchedFolder,
      shouldRender,
    }

    if (!isEqual(prevState, updatedState))
    this.setState(updatedState);
  }

  render() {
    const {
      folder: { name, children },
      path,
    } = this.props;
    const { isOpen, shouldRender } = this.state;

    return shouldRender && (
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
              checkIsFolder(child) ? (
                <Folder
                  folder={child}
                  path={getFolderPath(child.name, path)}
                  key={child.name}
                />
              ) : (
                <File file={child} key={child.name} />
              )
            )}
        </ul>
      </li>
    );
  }
}
