import React from "react";

interface BlockProps {
  children: React.ReactNode;
}

const Block: React.FC<BlockProps> = ({ children }) => {
  const childrenArray = React.Children.toArray(children);
  return (
    <div className="flex flex-col w-full h-full gap-1">
      <div className="flex-grow-[100]">{childrenArray[0]}</div>
      <div className="flex-grow-[1]">{childrenArray[1]}</div>
      <div className="flex-grow-[1]">{childrenArray[2]}</div>
    </div>
  );
};

export default Block;
