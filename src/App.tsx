import { Component } from "react";
import "./App.css";
import data from "../data.json";
import Folder from "./components/Folder";
import { FolderType } from "./types";

class App extends Component<{}, {}> {
  render() {
    return (
      <ul className="folders-list">
        {(data as Array<FolderType>).map((folder) => (
          <Folder folder={folder} />
        ))}
      </ul>
    );
  }
}

export default App;
