import { useDispatch } from "react-redux";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";

import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import { followUser, unfollowUser } from "../../firebase/firestore-requests";
import {
  updateUserFollowing,
  updateUserUnfollow,
} from "features/user/userSlice";

export const SuggestedUserCard = ({ user, token, isFollowing = false }) => {
  const { firstName, profilePicture } = user.data;

  const dispatch = useDispatch();

  const handleFollow = async () => {
    try {
      await followUser(user.id, token);
      dispatch(updateUserFollowing(user.id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnfollow = async () => {
    try {
      await unfollowUser(user.id, token);
      dispatch(updateUserUnfollow(user.id));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ListItem
      secondaryAction={
        !isFollowing ? (
          <Button edge="end" aria-label="follow" onClick={handleFollow}>
            Follow
          </Button>
        ) : (
          <Button edge="end" aria-label="unfollow" onClick={handleUnfollow}>
            Unfollow
          </Button>
        )
      }
    >
      <ListItemAvatar>
        <Avatar src={profilePicture} />
      </ListItemAvatar>
      <ListItemText primary={firstName} />
    </ListItem>
  );
};
