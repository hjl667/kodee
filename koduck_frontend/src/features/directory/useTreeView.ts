import React, { useState, useEffect } from "react";
import useData from "../../hooks/useTopics";
import { Topic, TreeItem } from "@/types/tree";

const useTreeView = () => {
  const { handleUpdate } = useData();

  const convertToTreeData = (data: Topic[]) => {
    if (!data || data.length === 0) return [];

    const nodeMap = new Map();

    data.forEach((item) => {
      nodeMap.set(item.id, {
        title: item.name,
        text: item.text,
        key: item.id,
        audioUrl: item.audioUrl,
        dateCreated: item.dateCreated,
        public: item.public,
        children: [],
      });
    });

    const result: TreeItem[] = [];

    data.forEach((item) => {
      const node = nodeMap.get(item.id);

      if (item.parent === null) {
        result.push(node);
      } else {
        const parentNode = nodeMap.get(item.parent);
        if (parentNode) {
          parentNode.children.push(node);
        } else {
          result.push(node);
        }
      }
    });

    const cleanTree = (node: TreeItem) => {
      if (node.children && node.children.length === 0) {
        delete node.children;
      } else if (node.children) {
        node.children.forEach(cleanTree);
      }
      return node;
    };

    result.forEach(cleanTree);

    return result;
  };

  const updateTreeView = (node: TreeItem, parent: string) => {
    handleUpdate(node._key, node.text, parent);
  };

  return { convertToTreeData, updateTreeView };
};

export default useTreeView;
