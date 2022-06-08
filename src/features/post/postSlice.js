import { createSlice } from "@reduxjs/toolkit";
import { fetchAllPosts } from "../../firebase/firestore-requests";

const initialState = {
  posts: [],
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    updateLikedPost: (state, action) => {
      state.posts = state.posts.map((post) => {
        if (post.id === action.payload.id) {
          return {
            ...post,
            data: {
              ...post.data,
              likes: post.data.likes + action.payload.count,
            },
          };
        }
        return post;
      });
    },

    updateCommentInPost: (state, action) => {
      state.posts = state.posts.map((post) => {
        if (post.id === action.payload.id) {
          return {
            ...post,
            data: {
              ...post.data,
              comments: [...post.data.comments, action.payload.comment],
            },
          };
        }
        return post;
      });
    },

    deleteCommentInPost: (state, action) => {
      state.posts = state.posts.map((post) => {
        if (post.id === action.payload.id) {
          return {
            ...post,
            data: {
              ...post.data,
              comments: post.data.comments.filter(
                (_comment) => _comment.commentId !== action.payload.commentId
              ),
            },
          };
        }
        return post;
      });
    },
    updateDataInPost: (state, action) => {
      state.posts = state.posts.map((post) => {
        if (post.id === action.payload.id) {
          return {
            ...post,
            data: {
              ...post.data,
              postText: action.payload.postText,
              postImageUrl: action.payload.postImage.url,
              postImageName: action.payload.postImage.postImageName,
            },
          };
        }

        return post;
      });
    },
    updatePostsForDelete: (state, action) => {
      state.posts = state.posts.filter((_post) => _post.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
  },
});

export const {
  updateLikedPost,
  updateCommentInPost,
  deleteCommentInPost,
  updateDataInPost,
  updatePostsForDelete,
} = postSlice.actions;

export default postSlice.reducer;
