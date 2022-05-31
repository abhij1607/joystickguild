import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import RocketOutlinedIcon from "@mui/icons-material/RocketOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Stack, Button } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import "./SideNav.css";

import { NavLink } from "react-router-dom";
import { logout } from "../../firebase/firebase-auth";
import { useDispatch } from "react-redux";
import { logoutUser } from "features/auth/authSlice";

const useStyles = makeStyles({
  link: {
    "&.active": {
      background: "lightblue",
    },
  },
});

const SidebarLink = ({ text, Icon, url }) => {
  const classes = useStyles();
  return (
    <Button to={url} component={NavLink} className={`${classes.link} navlink`}>
      <Icon /> {text}
    </Button>
  );
};

export const SideNav = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await logout();
    dispatch(logoutUser());
  };
  return (
    <Stack spacing={3}>
      <SidebarLink Icon={HomeOutlinedIcon} text="Home" url="/" />
      <SidebarLink Icon={RocketOutlinedIcon} text="Explore" url="/explore" />
      <SidebarLink
        Icon={NotificationsNoneOutlinedIcon}
        text="Notifications"
        url="/notification"
      />
      <SidebarLink
        Icon={BookmarkBorderOutlinedIcon}
        text="Bookmarks"
        url="bookmarks"
      />
      <SidebarLink
        Icon={AccountCircleOutlinedIcon}
        text="Profile"
        url="profile"
      />
      <Button
        type="button"
        align="center"
        variant="outlined"
        color="primary"
        onClick={handleLogout}
        fullWidth
      >
        Logout
      </Button>
    </Stack>
  );
};
