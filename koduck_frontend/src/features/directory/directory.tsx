import { useEffect, useRef, useState } from "react";
import { Tree } from "@arco-design/web-react";
import { TreeItem, DirectoryProps } from "@/types/tree";
import React from "react";
import "./directory.css";
import { useNavigate } from "react-router-dom";

const generatorTreeNodes = (treeData: TreeItem[]): React.ReactNode => {
  if (!treeData) return;
  return treeData.map((item) => {
    const { children, key, ...rest } = item;
    return (
      <Tree.Node key={key} {...rest} dataRef={item}>
        {children ? generatorTreeNodes(children) : null}
      </Tree.Node>
    );
  });
};

const Directory: React.FC<DirectoryProps> = ({
  defaultData,
  updateTreeView,
  articles,
  setFilteredArticles,
  isModal,
}) => {
  const [treeData, setTreeData] = useState<TreeItem[]>([]);
  const navigate = useNavigate();
  const [containerHeight, setContainerHeight] = useState<string>("100%");
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSelect = (keys: string[], extra: any): void => {
    const displayKeys = [
      ...keys,
      ...extra.node.props.childrenData.map((item: TreeItem) => item.key),
    ];
    setFilteredArticles &&
      setFilteredArticles(
        articles.filter((article) => displayKeys.includes(article.id))
      );
    if (!extra.node.props.childrenData.length) navigate(`/editor/${keys[0]}`);
  };

  useEffect(() => {
    if (!defaultData) return;
    setTreeData(defaultData);
  }, [defaultData]);

  useEffect(() => {
    if (isModal) {
      return;
    }
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const parentHeight = entry.contentRect.height;
        setContainerHeight(`${parentHeight}px`);
      }
    });

    const parentElement = containerRef.current.parentElement;
    if (parentElement) {
      resizeObserver.observe(parentElement);
    }

    return () => {
      if (parentElement) {
        resizeObserver.unobserve(parentElement);
      }
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-full w-full overflow-auto"
      style={{ maxHeight: containerHeight }}
    >
      <Tree
        autoExpandParent={true}
        draggable
        blockNode
        showLine={true}
        onSelect={(keys, extra) => handleSelect(keys, extra)}
        onDrop={({ dragNode, dropNode, dropPosition }) => {
          const loop = (
            data: TreeItem[],
            key: string,
            callback: (item: TreeItem, index: number, arr: TreeItem[]) => void
          ) => {
            data.some((item, index, arr) => {
              if (item.key === key) {
                callback(item, index, arr);
                return true;
              }

              if (item.children) {
                return loop(item.children, key, callback);
              }
            });
          };

          if (!dragNode || !dropNode) {
            return;
          }

          const data = [...treeData];
          let dragItem: TreeItem;
          loop(data, dragNode.props._key as string, (item, index, arr) => {
            arr.splice(index, 1);
            dragItem = item;
            dragItem.className = "tree-node-dropover";
          });

          if (dropPosition === 0) {
            loop(data, dropNode.props._key as string, (item, index, arr) => {
              item.children = item.children || [];
              item.children.push(dragItem);
            });
          } else {
            loop(data, dropNode.props._key as string, (item, index, arr) => {
              arr.splice(dropPosition < 0 ? index : index + 1, 0, dragItem);
            });
          }
          updateTreeView(dragNode.props, dropNode?.props._key as string);

          setTreeData([...data]);
          setTimeout(() => {
            dragItem.className = "";
            setTreeData([...data]);
          }, 1000);
        }}
      >
        {generatorTreeNodes(treeData)}
      </Tree>
    </div>
  );
};

export default Directory;
