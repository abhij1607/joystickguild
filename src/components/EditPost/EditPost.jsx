import Picker from "emoji-picker-react";
import { useState } from "react";
import { useDispatch } from "react-redux";

import {
  Stack,
  Button,
  Box,
  TextField,
  IconButton,
  Container,
} from "@mui/material";

import PhotoCameraBackIcon from "@mui/icons-material/PhotoCameraBack";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { requestPostUpdate } from "../../firebase/firestore-requests";
import { updateDataInPost } from "features/post/postSlice";

export const EditPost = ({ post }) => {
  const [postText, setPostText] = useState(post?.data.postText);
  const [postImage, setPostImage] = useState({
    url: post.data.postImageUrl,
    postImageName: post.data.postImageName,
  });
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    setPostText((prevInput) => prevInput + emojiObject.emoji);
  };

  const handleImageUpload = async (e) => {
    try {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      formData.append("upload_preset", "ml_default");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dj3kfin8l/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      setPostImage({ url: data.url, postImageName: data.original_filename });
    } catch (error) {
      console.log(error);
    }
  };

  const dispatch = useDispatch();
  const handlePostUpdate = async () => {
    if (!postText && !postImage.url) return;
    try {
      await requestPostUpdate(post.id, postText, postImage);
      dispatch(updateDataInPost({ id: post.id, postText, postImage }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <TextField
        placeholder="Write here"
        variant="filled"
        value={postText}
        onChange={(e) => setPostText(e.target.value)}
        fullWidth
        multiline
      />
      {postImage.url && (
        <img
          src={postImage.url}
          alt={postImage.postImageName}
          height="auto"
          width="100%"
        />
      )}
      <Stack direction="row" mt={2}>
        <Container>
          <label htmlFor="icon-image-edit">
            <input
              hidden
              accept="image/*"
              id="icon-image-edit"
              type="file"
              onChange={(e) => handleImageUpload(e)}
            />
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCameraBackIcon />
            </IconButton>
          </label>
          <IconButton onClick={() => setShowEmojiPicker((prev) => !prev)}>
            <EmojiEmotionsIcon />
          </IconButton>
        </Container>
        <Button
          variant="contained"
          onClick={() => handlePostUpdate()}
          disableRipple
        >
          Post
        </Button>
      </Stack>
      {showEmojiPicker && (
        <Box
          style={{
            position: "absolute",
            bottom: "15%",
          }}
        >
          <Picker
            pickerStyle={{ width: "90%", zIndex: 1 }}
            onEmojiClick={onEmojiClick}
          />
        </Box>
      )}
    </Box>
  );
};
