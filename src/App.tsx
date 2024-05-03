import { Component } from "react";
import "./App.css";
import data from "../data.json";
import Folder from "./Folder";
import { FolderType } from "./types";

class App extends Component<{}, {}> {
  render() {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        {(data as Array<FolderType>).map((folder) => (
          <Folder folder={folder} />
        ))}
      </div>
    );
  }
}

export default App;
