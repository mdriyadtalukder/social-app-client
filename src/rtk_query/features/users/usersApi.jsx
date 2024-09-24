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
        getFollowingsPost: builder.query({
            query: (email) => ({
                url: `/followingsposts?email=${email}`,
                method: "GET",
            }),
            providesTags: ["followingPost"]
        }),
        getRequest: builder.query({
            query: (email) => ({
                url: `/requests?email=${email}`,
                method: "GET",
            }),
            providesTags: ["requests"]
        }),
        getAPost: builder.query({
            query: (id) => ({
                url: `/posts/${id}`,
                method: "GET",
            }),
            providesTags: ["apost"]
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
            invalidatesTags: ["posts", "post", "followingPost", "apost"]
        }),
        editUserInfo: builder.mutation({
            query: ({ id, data }) => ({
                url: `/user/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ['users', 'user', "Oneuser"]

        }),
        updatePostNumber: builder.mutation({
            query: ({ id, data }) => ({
                url: `/postnumber/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ['users', 'user', "Oneuser"]

        }),
        updateFollowing: builder.mutation({
            query: ({ id, data }) => ({
                url: `/following/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ['users', 'user', "Oneuser"]

        }),
        updateFollowers: builder.mutation({
            query: ({ id, data }) => ({
                url: `/followers/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ['users', 'user', "Oneuser"]

        }),
        addRequest: builder.mutation({
            query: (data) => ({
                url: "/requests",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["requests"]
        }),
        deleteRequest: builder.mutation({
            query: (id) => ({
                url: `/request/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["requests"]

        }),
        updateLike: builder.mutation({
            query: ({ id, data }) => ({
                url: `/updatelike/${id}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ["posts", "post", "followingPost", "apost"]
        }),
        updateComment: builder.mutation({
            query: ({ id, data }) => ({
                url: `/updatecomment/${id}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ["posts", "post", "followingPost", "apost"]
        }),
        deletePost: builder.mutation({
            query: (id) => ({
                url: `/dpost/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["posts", "post", "followingPost", "apost"]

        }),

    })
})
export const { useGetUsersQuery, useGetUserQuery, useGetAUserQuery, useGetRequestQuery, useGetAPostQuery, useAddUserMutation, useEditUserInfoMutation, useGetPostsQuery, useGetPostQuery, useAddPostMutation, useUpdatePostNumberMutation, useUpdateFollowingMutation, useUpdateFollowersMutation, useAddRequestMutation, useDeleteRequestMutation, useGetFollowingsPostQuery, useUpdateLikeMutation, useUpdateCommentMutation, useDeletePostMutation } = usersApi