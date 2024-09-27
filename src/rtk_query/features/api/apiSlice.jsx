import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "socialApp",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://social-app-server-8wdw.onrender.com/"
    }),
    tagTypes: ['users', 'user', 'posts', 'Oneuser', 'post', "allrequests", 'requests', 'followingPost', "apost", 'story', 'stories', 'block'],
    endpoints: (builder) => ({})
})