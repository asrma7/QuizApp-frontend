import { apiSlice } from "./apiSlice";

export const uploadApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadFile: builder.mutation({
      query: (data) => ({
        url: "/api/upload",
        method: "POST",
        body: data,
      }),
    }),
    deleteUploadedFile: builder.mutation({
      query: (imageName) => ({
        url: "/api/upload/" + imageName,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useUploadFileMutation, useDeleteUploadedFileMutation } =
  uploadApiSlice;
