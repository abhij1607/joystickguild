import Picker from "emoji-picker-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { addNewPost, fetchAllPosts } from "../../firebase/firestore-requests";
import { addUserPost } from "features/user/userSlice";
import {
  Stack,
  Button,
  Box,
  Avatar,
  TextField,
  IconButton,
} from "@mui/material";

import PhotoCameraBackIcon from "@mui/icons-material/PhotoCameraBack";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

const initialPostImageState = { url: "", fileName: "" };

export const AddPost = ({}) => {
  const {
    userDetails: {
      userData: { profilePicture },
    },
  } = useSelector((store) => store.userDetails);

  const { token } = useSelector((store) => store.authDetails);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [postText, setPostText] = useState("");

  const [postImage, setPostImage] = useState(initialPostImageState);

  const [chosenEmoji, setChosenEmoji] = useState(false);

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
      setPostImage({ url: data.url, fileName: data.original_filename });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitPost = async () => {
    if (!postText && !postImage.url) return;
    try {
      const postId = await addNewPost(token, postText, postImage);
      dispatch(addUserPost(postId));
      dispatch(fetchAllPosts());
      setPostText("");
      setPostImage(initialPostImageState);
      setChosenEmoji(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack direction="row">
      <Button disableRipple onClick={() => navigate("/profile")}>
        <Avatar
          sx={{
            bgcolor: "#1565C0",
            width: 60,
            height: 60,
            fontSize: "3rem",
            mx: "auto",
            objectFit: "contain",
            border: 1,
          }}
          src={profilePicture}
        />
      </Button>

      <Box style={{ width: "100%" }}>
        <TextField
          aria-label="empty textarea"
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
            alt={postImage.fileName}
            loading="lazy"
            height="auto"
            width="100%"
          />
        )}
        <Stack direction="row" justifyContent="space-between" mt={2}>
          <Box>
            <label htmlFor="icon-button-file">
              <input
                hidden
                accept="image/*"
                id="icon-button-file"
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
            <IconButton
              color="primary"
              aria-label="add to shopping cart"
              onClick={() => setChosenEmoji((prev) => !prev)}
              sx={{
                ml: 1,
              }}
            >
              <EmojiEmotionsIcon />
            </IconButton>
          </Box>

          <Button
            variant="contained"
            disableRipple
            onClick={() => handleSubmitPost()}
          >
            Post
          </Button>
        </Stack>
        {chosenEmoji && (
          <Box>
            <Picker
              pickerStyle={{ width: "100%", zIndex: 1 }}
              onEmojiClick={onEmojiClick}
            />
          </Box>
        )}
      </Box>
    </Stack>
  );
};
