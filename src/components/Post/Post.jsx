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
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import CardMedia from "@mui/material/CardMedia";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  updateLikedPost,
  updateCommentInPost,
  deleteCommentInPost,
  updatePostsForDelete,
} from "features/post/postSlice";
import {
  requestLikePost,
  requestUnlikePost,
  requestPostBookmark,
  requestRemovePostFromBookmark,
  requestAddComment,
  requestDeleteComment,
  requestDeletePost,
} from "../../firebase/firestore-requests";
import { useSelector, useDispatch } from "react-redux";

import {
  updateUserLikedPost,
  updateUserUnlikedPost,
  updateUserBookmarkedPost,
  updateUserRemoveBookmarkedPost,
  deleteUserPost,
} from "features/user/userSlice";
import { useState } from "react";
import { v4 as uuid } from "uuid";

import { EditPost } from "components/EditPost/EditPost";

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

  const handleDeletePost = async () => {
    try {
      await requestDeletePost(post.id, token);
      dispatch(deleteUserPost(post.id));
      dispatch(updatePostsForDelete(post.id));
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
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Typography variant="caption">{postBy?.data?.email}</Typography>
            {postBy?.id === token && (
              <MenuPanel post={post} handleDeletePost={handleDeletePost} />
            )}
          </Box>

          <Typography variant="body1" component="p">
            {post?.data?.postText}
          </Typography>
          {post?.data?.postImageUrl && (
            <CardMedia
              component="img"
              height="auto"
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
                <FavoriteIcon color="error" />
                <Typography variant="subtitle1">
                  {" "}
                  {post?.data?.likes}
                </Typography>
              </IconButton>
            ) : (
              <IconButton onClick={handleLike}>
                <FavoriteBorderIcon />

                {post?.data?.likes > 0 && (
                  <Typography variant="subtitle1">
                    {" "}
                    {post?.data?.likes}{" "}
                  </Typography>
                )}
              </IconButton>
            )}
            <IconButton onClick={toggleComments}>
              <CommentIcon />{" "}
              {post?.data?.comments.length > 0 && (
                <Typography variant="subtitle1">
                  {" "}
                  {post?.data?.comments.length}
                </Typography>
              )}
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

const MenuPanel = ({ post, handleDeletePost }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = () => {
    handleClose();
    handleDeletePost();
  };
  return (
    <div>
      <IconButton
        size="small"
        sx={{ alignItems: "flex-start" }}
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem>
          <EditPostModal post={post} handleMenuClose={handleClose} />
        </MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </div>
  );
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const EditPostModal = ({ handleMenuClose, post }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    handleMenuClose();
    setOpen(false);
  };

  return (
    <div>
      <div onClick={handleOpen}>Edit</div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <EditPost post={post} />
        </Box>
      </Modal>
    </div>
  );
};
