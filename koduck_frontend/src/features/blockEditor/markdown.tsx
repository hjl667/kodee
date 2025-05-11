import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Table from "@editorjs/table";
import CodeTool from "@editorjs/code";

const SimpleEditor = ({ initialData, handleUpdate, topicId, parent }) => {
  const editorContainerRef = useRef(null);
  const instanceRef = useRef(null);

  const textareaClasses = `
        w-full
        h-full
        p-10
        overflow-auto
        text-base
        font-sans
        border
        border-gray-300
        border-d-0
        rounded-t
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
        focus:border-transparent
    `.trim();

  useEffect(() => {
    if (!editorContainerRef.current) {
      return;
    }

    const initEditor = async () => {
      try {
        if (instanceRef.current) {
          instanceRef.current.destroy();
        }

        instanceRef.current = new EditorJS({
          holder: editorContainerRef.current,
          tools: {
            header: Header,
            list: List,
            table: {
              class: Table,
              inlineToolbar: true,
              config: {
                rows: 2,
                cols: 3,
              },
            },
            code: {
              class: CodeTool,
              config: {
                placeholder: "Write code",
                actions: ["copy"],
              },
            },
          },
          data: initialData,
          onChange: async () => {
            if (instanceRef.current) {
              const savedData = await instanceRef.current.save();
              handleUpdate(
                topicId,
                JSON.stringify(JSON.stringify(savedData)),
                parent
              );
            }
          },
          onReady: () => {
            console.log("Editor.js 已准备就绪");
          },
        });
      } catch (error) {
        console.error("初始化编辑器失败:", error);
      }
    };

    initEditor();

    return () => {
      if (instanceRef.current) {
        const holder = editorContainerRef.current;
        if (holder) {
          holder.innerHTML = "";
        }
        instanceRef.current = null;
      }
    };
  }, []);

  return (
    <div style={{ height: "100%" }}>
      <div className={textareaClasses}>
        <div ref={editorContainerRef} style={{ height: "300px" }}></div>
      </div>
    </div>
  );
};

export default SimpleEditor;
