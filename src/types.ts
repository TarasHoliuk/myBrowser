type UnitType = 'FILE' | 'FOLDER';

interface UnitBase<TUnitType extends UnitType> {
  type: TUnitType;
  name: string;
}

export interface FileType extends UnitBase<'FILE'> {
  mime: string;
}

export interface FolderType extends UnitBase<'FOLDER'> {
  children: Array<FolderType | FileType>;
}

export interface Coords {
  x: number;
  y: number;
}
