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
        getFollowingsstory: builder.query({
            query: (email) => ({
                url: `/followingsstories?email=${email}`,
                method: "GET",
            }),
            providesTags: ["stories"]
        }),
        getAllRequests: builder.query({
            query: () => ({
                url: "/allrequests",
                method: "GET"
            }),
            providesTags: ["allrequests"]

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
        getStory: builder.query({
            query: (email) => ({
                url: `/story?email=${email}`,
                method: "GET",
            }),
            providesTags: ["story"]
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
            invalidatesTags: ["story",'followingPost']
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
            invalidatesTags: ['users', 'user', "Oneuser", 'stories', 'followingPost', 'story']

        }),
        updateFollowers: builder.mutation({
            query: ({ id, data }) => ({
                url: `/followers/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ['users', 'user', "Oneuser", 'stories', 'followingPost', 'story']

        }),
        addRequest: builder.mutation({
            query: (data) => ({
                url: "/requests",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["requests", 'allrequests']
        }),
        addStory: builder.mutation({
            query: (data) => ({
                url: "/stories",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["story", 'stories']
        }),
        deleteRequest: builder.mutation({
            query: (id) => ({
                url: `/request/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["requests", 'allrequests']

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
        updateShare: builder.mutation({
            query: ({ id, data }) => ({
                url: `/updateshare/${id}`,
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
        updateStory: builder.mutation({
            query: ({ id, data }) => ({
                url: `/storiesupdate/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["story", "stories"]

        }),
        getBlocks: builder.query({
            query: (email) => ({
                url: `/block?email=${email}`,
                method: "GET",
            }),
            providesTags: ["block"]
        }),
        addBlock: builder.mutation({
            query: (data) => ({
                url: "/block",
                method: "POST",
                body: data
            }),
            invalidatesTags: ['users', 'user', 'posts', 'Oneuser', 'post', "allrequests", 'requests', 'followingPost', "apost", 'story', 'stories', 'block']
        }),
        deleteBlock: builder.mutation({
            query: (id) => ({
                url: `/block/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['users', 'user', 'posts', 'Oneuser', 'post', "allrequests", 'requests', 'followingPost', "apost", 'story', 'stories', 'block']

        }),

    })
})
export const { useGetUsersQuery, useGetUserQuery, useGetAUserQuery, useGetRequestQuery, useGetAPostQuery, useGetStoryQuery, useGetAllRequestsQuery, useGetFollowingsstoryQuery, useAddUserMutation, useEditUserInfoMutation, useGetPostsQuery, useGetPostQuery, useAddPostMutation, useUpdatePostNumberMutation, useUpdateFollowingMutation, useUpdateFollowersMutation, useAddRequestMutation, useDeleteRequestMutation, useGetFollowingsPostQuery, useUpdateLikeMutation, useUpdateCommentMutation, useDeletePostMutation, useUpdateShareMutation, useAddStoryMutation, useUpdateStoryMutation, useGetBlocksQuery, useAddBlockMutation, useDeleteBlockMutation } = usersApi