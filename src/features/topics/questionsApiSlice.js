import { apiSlice } from "../../api/apiSlice";

export const questionsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSingleQuestion: builder.query({
      query: (questionId) => "/questions/" + questionId,
      keepUnusedDataFor: 5,
    }),
    getTopicQuestions: builder.query({
      query: (topicId) => "/topics/questions/" + topicId,
      keepUnusedDataFor: 5,
    }),
    createQuestion: builder.mutation({
      query: (newQuestion) => ({
        url: "/questions",
        method: "POST",
        body: { ...newQuestion },
      }),
    }),
    updateQuestion: builder.mutation({
      query: ({ questionId, ...updatedQuestion }) => ({
        url: "/questions/" + questionId,
        method: "PUT",
        body: { ...updatedQuestion },
      }),
    }),
    deleteQuestion: builder.mutation({
      query: (questionId) => ({
        url: "/questions/" + questionId,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetSingleQuestionQuery,
  useGetTopicQuestionsQuery,
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
} = questionsApiSlice;
