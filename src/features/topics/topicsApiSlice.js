import { apiSlice } from "../../api/apiSlice";

export const topicsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTopics: builder.query({
      query: () => "/topics",
      keepUnusedDataFor: 5,
    }),
    getSingleTopic: builder.query({
      query: (topicId) => "/topics/" + topicId,
      keepUnusedDataFor: 5,
    }),
    createTopic: builder.mutation({
      query: (newTopic) => ({
        url: "/topics",
        method: "POST",
        body: { ...newTopic },
      }),
    }),
    updateTopic: builder.mutation({
      query: ({ topicId, ...updatedTopic }) => ({
        url: "/topics/" + topicId,
        method: "PUT",
        body: { ...updatedTopic },
      }),
    }),
    deleteTopic: builder.mutation({
      query: (topicId) => ({
        url: "/topics/" + topicId,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetTopicsQuery,
  useGetSingleTopicQuery,
  useCreateTopicMutation,
  useUpdateTopicMutation,
  useDeleteTopicMutation,
} = topicsApiSlice;
