import React, { createContext, Dispatch, useReducer } from "react";
import { Topic, Feedback } from "@/types/tree";

interface TopicsState {
  topics: Topic[];
  feedbacks: Feedback[];
  expandedTopics: Topic[];
  selectedTopics: Topic[];
}

type TopicsAction =
  | { type: "SET_TOPICS"; payload: Topic[] }
  | { type: "SET_FEEDBACKS"; payload: Feedback[] };

interface TopicsContextType {
  state: TopicsState;
  dispatch: Dispatch<TopicsAction>;
}

const initialState: TopicsState = {
  topics: [],
  feedbacks: [],
  expandedTopics: [],
  selectedTopics: [],
};

const topicsReducer = (state: TopicsState, action: TopicsAction) => {
  switch (action.type) {
    case "SET_TOPICS":
      return {
        ...state,
        topics: action.payload,
      };
    case "SET_FEEDBACKS":
      return {
        ...state,
        feedbacks: action.payload,
      };
    default:
      return state;
  }
};

const TopicsContext = createContext<TopicsContextType>({} as TopicsContextType);

interface TopicsProviderProps {
  children: React.ReactNode;
}

const TopicsProvider: React.FC<TopicsProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(topicsReducer, initialState);
  return (
    <TopicsContext.Provider value={{ state, dispatch }}>
      {children}
    </TopicsContext.Provider>
  );
};

export { TopicsProvider, TopicsContext };
