import React, { useState, useEffect, useCallback, useMemo } from "react";
import "./MyBrowser.css";
import data from "../../../data.json";
import Folder from "../Folder";
import { FilePathInfo, FolderType } from "../../types";
import { getFolderPath, getNestedFilesPaths } from "../../helpers";
import { MyBrowserContext } from "../MyBrowserContext";
import { debounce } from "lodash";

interface MyBrowserProps {
  expandedFolders?: string[];
}

const allFilesPathsInfo = (data as FolderType[]).reduce(
  (acc, folder) => acc.concat(getNestedFilesPaths(folder)),
  [] as FilePathInfo[]
);

const MyBrowser: React.FC<MyBrowserProps> = ({ expandedFolders = [] }) => {
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState("");
  const [searchedFilesFolders, setSearchedFilesFolders] = useState<string[]>(
    []
  );

  const debouncedHandler = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedSearchText(value);
      }, 200),
    [setSearchedFilesFolders]
  );

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setSearchText(value);
      debouncedHandler(value);
    },
    []
  );

  useEffect(() => {
    if (debouncedSearchText.length >= 3) {
      const expandedBySearchFolders = allFilesPathsInfo.reduce(
        (acc, { file, folderPath }) => {
          if (file.toLowerCase().includes(debouncedSearchText.toLowerCase())) {
            acc.push(folderPath);
          }
          return acc;
        },
        [] as string[]
      );

      setSearchedFilesFolders(expandedBySearchFolders);
    } else {
      setSearchedFilesFolders([]);
    }

    return () => {
      debouncedHandler.cancel();
    };
  }, [debouncedSearchText]);

  return (
    <>
      <input
        className="search"
        value={searchText}
        onChange={handleInputChange}
        placeholder="Type at least 3 letters to find file..."
      />

      <MyBrowserContext.Provider
        value={{
          expandedFolders,
          searchedFilesFolders,
        }}
      >
        <ul className="folders-list">
          {(data as FolderType[]).map((folder) => (
            <Folder
              folder={folder}
              path={getFolderPath(folder.name)}
              key={folder.name}
            />
          ))}
        </ul>
      </MyBrowserContext.Provider>
    </>
  );
};

export default MyBrowser;
