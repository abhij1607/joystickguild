import { useSelector, useDispatch } from "react-redux";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListSubheader from "@mui/material/ListSubheader";

import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import { followUser, unfollowUser } from "../../firebase/firestore-requests";
import {
  updateUserFollowing,
  updateUserUnfollow,
} from "features/user/userSlice";

const SuggestedUserCard = ({ user, token }) => {
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
        <Button edge="end" aria-label="follow" onClick={handleFollow}>
          Follow
        </Button>
      }
    >
      <ListItemAvatar>
        <Avatar src={profilePicture} />
      </ListItemAvatar>
      <ListItemText primary={firstName} />
    </ListItem>
  );
};

export const WhoToFollow = () => {
  const { users } = useSelector((store) => store.allUsers);
  const { token } = useSelector((store) => store.authDetails);
  const {
    userDetails: { following },
  } = useSelector((store) => store.userDetails);
  console.log(users, "users");

  const suggestions = users.filter(
    (user) => user.id !== token && !following?.following?.includes(user.id)
  );

  return (
    <>
      <List>
        <ListSubheader component="div">Who To follow</ListSubheader>
        {suggestions.map((user) => {
          return <SuggestedUserCard key={user.id} user={user} token={token} />;
        })}
      </List>
    </>
  );
};
