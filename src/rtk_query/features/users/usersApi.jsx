import { apiSlice } from "../api/apiSlice";

export const usersApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => ({
                url: "/users",
                method: "GET"
            }),
            providesTags: ["users"]

        }),
        getAUser: builder.query({
            query: (id) => ({
                url: `/user/${id}`,
                method: "GET",
            }),
            providesTags: ["Oneuser"]
        }),
        getUser: builder.query({
            query: (email) => ({
                url: `/user?email=${email}`,
                method: "GET",
            }),
            providesTags: ["user"]
        }),
        getPosts: builder.query({
            query: () => ({
                url: "/posts",
                method: "GET"
            }),
            providesTags: ["posts"]

        }),
        getPost: builder.query({
            query: (email) => ({
                url: `/post?email=${email}`,
                method: "GET",
            }),
            providesTags: ["post"]
        }),
        addUser: builder.mutation({
            query: (data) => ({
                url: "/users",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["users"]
        }),
        addPost: builder.mutation({
            query: (data) => ({
                url: "/posts",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["posts", "post"]
        }),
        editUserInfo: builder.mutation({
            query: ({ id, data }) => ({
                url: `/user/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ['users', 'user', "Oneuser"]

        }),
    })
})
export const { useGetUsersQuery, useGetUserQuery, useGetAUserQuery, useAddUserMutation, useEditUserInfoMutation, useGetPostsQuery, useGetPostQuery, useAddPostMutation } = usersApi