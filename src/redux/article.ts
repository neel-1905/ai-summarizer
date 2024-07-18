import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type GetSummaryParams = {
  articleUrl: string;
};

type SummaryResponse = {
  summary: string;
};

export const articleApi = createApi({
  reducerPath: "articleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_RAPID_API_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set(`x-rapidapi-key`, import.meta.env.VITE_RAPID_API_KEY);
      headers.set(`x-rapidapi-host`, import.meta.env.VITE_RAPID_API_HOST);

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSummary: builder.query<SummaryResponse, GetSummaryParams>({
      query: (params) =>
        `/summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`,
    }),
  }),
});
