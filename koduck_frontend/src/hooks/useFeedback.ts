import React, { useState, useEffect, useContext } from "react";
import { graphqlPost } from "../service/api";
import { Feedback } from "@/types/tree.js";
import { TopicsContext } from "@/providers/topicsProvider";
import { useQuery } from "@tanstack/react-query";

const useFeedback = () => {
  const { dispatch } = useContext(TopicsContext);
  const fetchPractices = async () => {
    const query = `
              {
                practicesByUser {
                  id
                  dateCreated
                  translation
                  feedback
                  terms
                  speech {
                    id
                    name
                    audioUrl
                  }
                }
              }
            `;

    const response = await graphqlPost(query);
    const { data: result } = response;

    if (result.data && result.data.practicesByUser) {
      const practices = result.data.practicesByUser;
      dispatch({ type: "SET_FEEDBACKS", payload: practices });
      return practices;
    }

    throw new Error("Failed to fetch feedbacks" + result.errors);
  };

  const { data, isPending, error } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: fetchPractices,
  });

  return { feedbacks: data, isLoadingFeedback: isPending, error };
};

export default useFeedback;
