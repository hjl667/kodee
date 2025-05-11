import { useContext } from "react";
import { useNavigate } from "react-router";
import { graphqlPost, topicCreationPost, updateTopic } from "../service/api";
import { Topic } from "@/types/tree";
import { TopicsContext } from "@/providers/topicsProvider";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";

interface UpdateTopicParams {
  speech?: string;
  text: string;
  parent: string | null;
}

const useTopics = () => {
  const { dispatch } = useContext(TopicsContext);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const updateMutation = useMutation({
    mutationFn: (params: UpdateTopicParams) => updateTopic(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["topics"] });
    },
  });

  const handleUpdate = (
    topicId: string | undefined,
    text: string,
    parent: string | null
  ): void => {
    updateMutation.mutate({
      speech: topicId,
      text: text,
      parent: parent,
    });
  };

  const createTopicMutation = useMutation({
    mutationFn: (params) => createTopic(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["topics"] });
      enqueueSnackbar(
        "🤖 : Click to navigate to the Repository page to find your speech.",
        { variant: "info" }
      );
      navigate("/repository");
    },
  });

  const handleTopicCreation = (prompt, extraPrompt, enableAI) => {
    createTopicMutation.mutate({
      prompt,
      extraPrompt,
      enableAI,
    });
  };

  const createTopic = async ({ prompt, extraPrompt, enableAI }) => {
    const response = await topicCreationPost({
      topic: prompt,
      name: extraPrompt,
      shouldOptimized: enableAI,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to create topic");
    }
  };

  const fetchSpeeches = async () => {
    const query = `
        {
          speeches {
            id
            name
            text
            public
            dateCreated
            parent
          }
        }
      `;

    const response = await graphqlPost(query);
    const { data: result } = response;

    if (result.data && result.data.speeches) {
      const speeches: Topic[] = result.data.speeches;
      const filterSpeeches = speeches.filter((speech) => !speech.public);
      dispatch({ type: "SET_TOPICS", payload: filterSpeeches });
      return filterSpeeches;
    }

    throw new Error("Failed to fetch topics: " + JSON.stringify(result.errors));
  };

  const { data, isPending, error } = useQuery({
    queryKey: ["topics"],
    queryFn: fetchSpeeches,
  });

  return {
    topics: data,
    isLoading: isPending,
    error,
    handleUpdate,
    handleTopicCreation,
    isUpdating: updateMutation.isPending,
    updateError: updateMutation.error,
  };
};

export default useTopics;
