import React from "react";

interface TextBoxProps {
  text: string | undefined;
  setText?: (text: string) => void;
  topicId?: string;
  handleUpdate?: (
    topicId: string | undefined,
    text: string,
    parent: string | null
  ) => void;
  parent?: string | null;
}

const TextBox: React.FC<TextBoxProps> = ({
  text,
  setText,
  topicId,
  handleUpdate,
  parent = null,
}) => {

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <textarea
        style={{
          boxSizing: "border-box",
          width: "100%",
          height: "100%",
          flex: "1 1 auto",
          padding: "5px",
          fontSize: "0.9rem",
        }}
        value={text}
        onChange={() => {}}
        onBlur={() =>
          handleUpdate && topicId
            ? handleUpdate(topicId, text, parent)
            : undefined
        }
      />
    </div>
  );
};

export default TextBox;
