import {
  Typography,
  Stack,
  IconButton,
  Avatar,
  Button,
  TextField,
  Box,
  List,
} from "@mui/material";
import ListItem from "@mui/material/ListItem";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import CardMedia from "@mui/material/CardMedia";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import {
  updateLikedPost,
  updateCommentInPost,
  deleteCommentInPost,
} from "features/post/postSlice";
import {
  requestLikePost,
  requestUnlikePost,
  requestPostBookmark,
  requestRemovePostFromBookmark,
  requestAddComment,
  requestDeleteComment,
} from "../../firebase/firestore-requests";
import { useSelector, useDispatch } from "react-redux";

import {
  updateUserLikedPost,
  updateUserUnlikedPost,
  updateUserBookmarkedPost,
  updateUserRemoveBookmarkedPost,
} from "features/user/userSlice";
import { useState } from "react";
import { v4 as uuid } from "uuid";

export const Post = ({ post }) => {
  const [isCommentsActive, setIsCommentsActive] = useState(false);
  const [commentText, setCommentText] = useState("");

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

  const toggleComments = () => {
    setIsCommentsActive((prev) => !prev);
  };

  const handleReply = async () => {
    try {
      const comment = {
        commentId: uuid(),
        commentBy: token,
        commentText,
      };
      await requestAddComment(post.id, comment, post?.data.postBy);
      dispatch(updateCommentInPost({ id: post.id, comment }));
      setCommentText("");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(postBy);
  return (
    <Box mt={2}>
      <Stack direction="row">
        <Button style={{ alignItems: "baseline" }}>
          <Avatar src={postBy?.data?.profilePicture} />
        </Button>

        <Stack width="100%">
          <Typography variant="caption">{postBy?.data?.email}</Typography>
          <Typography variant="body1" component="p">
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
            <IconButton onClick={toggleComments}>
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
      {isCommentsActive && (
        <Box>
          <Stack direction="row">
            <Button>
              <Avatar src={postBy?.data?.profilePicture} />
            </Button>
            <Box width="100%">
              <Typography variant="caption">{postBy?.data?.email}</Typography>
              <TextField
                value={commentText}
                variant="standard"
                onChange={(e) => setCommentText(e.target.value)}
                fullWidth
              />
            </Box>

            <Button onClick={handleReply}>Reply</Button>
          </Stack>

          <Stack>
            {post?.data?.comments.map((comment) => {
              const commentByUser = users.find(
                (user) => user.id === comment.commentBy
              );
              return (
                <ListItem direction="row" key={comment.commentId}>
                  <Button>
                    <Avatar src={commentByUser.data.profilePicture} />
                  </Button>

                  <Box>
                    <Typography variant="caption">
                      {commentByUser.data.email}
                    </Typography>
                    <Typography variant="body1">
                      {comment.commentText}
                    </Typography>
                  </Box>
                </ListItem>
              );
            })}
          </Stack>
        </Box>
      )}
    </Box>
  );
};
