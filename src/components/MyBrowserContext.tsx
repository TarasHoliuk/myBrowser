import { createContext } from "react";

export interface MyBrowserContextValue {
  expandedFolders: string[];
  searchedFilesFolders: string[];
}

const initialValue = {
  expandedFolders: [],
  searchedFilesFolders: [],
};

export const MyBrowserContext = createContext<MyBrowserContextValue>(initialValue);
