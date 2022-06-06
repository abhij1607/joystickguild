import { Typography, Stack, IconButton, Avatar, Button } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import CardMedia from "@mui/material/CardMedia";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { updateLikedPost } from "features/post/postSlice";
import {
  requestLikePost,
  requestUnlikePost,
  requestPostBookmark,
  requestRemovePostFromBookmark,
} from "../../firebase/firestore-requests";
import { useSelector, useDispatch } from "react-redux";

import {
  updateUserLikedPost,
  updateUserUnlikedPost,
  updateUserBookmarkedPost,
  updateUserRemoveBookmarkedPost,
} from "features/user/userSlice";

export const Post = ({ post }) => {
  const {
    userDetails: { likedPost, bookmarks },
  } = useSelector((store) => store.userDetails);
  const { token } = useSelector((store) => store.authDetails);
  const { users } = useSelector((store) => store.allUsers);

  const dispatch = useDispatch();

  const postBy = users.find((user) => user.id === post?.data.postBy);
  const isLiked = likedPost?.likedPost?.some((_id) => _id === post?.id);
  const isBookmarked = bookmarks?.bookmarks?.some((_id) => _id === post?.id);

  const handleLike = async (e) => {
    try {
      await requestLikePost(post.id, token, postBy.id);
      dispatch(updateLikedPost({ id: post.id, count: 1 }));
      dispatch(updateUserLikedPost(post.id));
    } catch (error) {
      console.log(error);
    }
  };
  const handleUnLike = async (e) => {
    try {
      await requestUnlikePost(post.id, token, postBy.id);
      dispatch(updateLikedPost({ id: post.id, count: -1 }));
      dispatch(updateUserUnlikedPost(post.id));
    } catch (error) {
      console.log(error);
    }
  };
  const handleBookmarkPost = async (e) => {
    try {
      await requestPostBookmark(post.id, token, postBy.id);
      dispatch(updateUserBookmarkedPost(post.id));
    } catch (error) {
      console.log(error);
    }
  };
  const handleRemoveFromBookmarksPost = async (e) => {
    try {
      await requestRemovePostFromBookmark(post.id, token, postBy.id);
      dispatch(updateUserRemoveBookmarkedPost(post.id));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Stack direction="row">
      <Button style={{ alignItems: "baseline" }}>
        <Avatar />
      </Button>

      <Stack width="100%">
        <Typography variant="h6" component="p" mt={1}>
          {post?.data?.postText}
        </Typography>
        {post?.data?.postImageUrl && (
          <CardMedia
            component="img"
            height="160"
            image={post?.data?.postImageUrl}
            alt="cover picture"
            style={{ maxWidth: "100%" }}
          />
        )}

        <Stack
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          spacing={2}
        >
          {isLiked ? (
            <IconButton onClick={handleUnLike}>
              <FavoriteIcon />
            </IconButton>
          ) : (
            <IconButton onClick={handleLike}>
              <FavoriteBorderIcon />
            </IconButton>
          )}
          <IconButton>
            <CommentIcon />
          </IconButton>
          {isBookmarked ? (
            <IconButton onClick={handleRemoveFromBookmarksPost}>
              <BookmarkIcon />
            </IconButton>
          ) : (
            <IconButton onClick={handleBookmarkPost}>
              <BookmarkBorderIcon />
            </IconButton>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};
