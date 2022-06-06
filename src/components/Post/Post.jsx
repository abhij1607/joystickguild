import {
  Typography,
  Stack,
  IconButton,
  Avatar,
  Button,
  Box,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import CardMedia from "@mui/material/CardMedia";

export const Post = ({ post }) => {
  console.log(post);
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
          <IconButton>
            <FavoriteBorderIcon />
          </IconButton>
          <IconButton>
            <CommentIcon />
          </IconButton>
          <IconButton>
            <BookmarkBorderIcon />
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  );
};
