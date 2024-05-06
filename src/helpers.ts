import { FilePathInfo, FileType, FolderType } from "./types";

export const getFolderPath = (path: string, basePath: string = "") => {
  return basePath + "/" + path;
};

const checkIsFile = (unit: FolderType | FileType): unit is FileType =>
  unit.type === "FILE";

export const checkIsFolder = (
  unit: FolderType | FileType
): unit is FolderType => unit.type === "FOLDER";

export const getNestedFilesPaths = (
  currentFolder: FolderType,
  basePath: string = "",
  filePathInfos: FilePathInfo[] = []
) => {
  const currentFolderPath = getFolderPath(currentFolder.name, basePath);

  const foldersFiles = currentFolder.children.filter(checkIsFile);

  if (foldersFiles.length) {
    filePathInfos.push(
      ...foldersFiles.map(({ name }) => ({
        file: name,
        folderPath: currentFolderPath,
      }))
    );
  }

  const nestedFolders = currentFolder.children.filter(checkIsFolder);

  nestedFolders.forEach((folder) =>
    getNestedFilesPaths(folder, currentFolderPath, filePathInfos)
  );

  return filePathInfos;
};
