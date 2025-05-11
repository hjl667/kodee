import { Dispatch } from "react";

export interface TreeItem {
  key: string;
  children?: TreeItem[];
  [key: string]: any;
}

export interface Topic {
  id: string;
  [key: string]: any;
}

export interface Feedback {
  speech: Topic;
  feedback: string;
  [key: string]: any;
}

export interface DirectoryProps {
  defaultData: TreeItem[] | undefined;
  updateTreeView: (dragNode: any, dropNodekey: string) => void;
  articles: Topic[];
  setFilteredArticles?: Dispatch<React.SetStateAction<Topic[]>>;
  isModal?: Boolean;
}
