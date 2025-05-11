import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Topic } from "@/types/tree";

export const cn = (...inputs: any[]) => {
  return twMerge(clsx(inputs));
};

export const getToken = () => localStorage.getItem("token");

export const isLogin = () => !!localStorage.getItem("token");

const convertText2Json = (text) => {
  const timestamp = Date.now();
  const lines = text.split("\n").filter((line) => line.trim() !== "");

  const blocks = lines.map((line, index) => {
    return {
      id: generateUniqueId(),
      type: "paragraph",
      data: {
        text: line,
      },
    };
  });

  return {
    time: timestamp,
    blocks: blocks,
    version: "2.31.0-rc.7",
  };
};

export const formatJsonData = (topics: Topic[], topicId) => {
  const currTopic: Topic | undefined = topics.find(
    (topic) => topic.id === topicId
  );
  if (!currTopic) return;

  let json;
  const trimmedText = currTopic.text.trim();
  if (trimmedText.includes("blocks")) {
    json = JSON.parse(JSON.parse(currTopic.text));
  } else {
    json = convertText2Json(currTopic.text);
  }
  return json;
};

function generateUniqueId() {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 9; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
