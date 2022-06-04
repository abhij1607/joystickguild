import { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import { useSelector } from "react-redux";
import { SuggestedUserCard } from "components/SuggestedUserCard/SuggestedUserCard";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const Posts = () => {
  return <div>Posts</div>;
};

export const Connections = ({ users, token, isFollowing }) => {
  return users.map((user) => (
    <SuggestedUserCard
      key={user.id}
      user={user}
      token={token}
      isFollowing={isFollowing}
    />
  ));
};

export const ProfileTabs = () => {
  const [value, setValue] = useState(0);

  const { token } = useSelector((store) => store.authDetails);

  const {
    userDetails: { following, followers },
  } = useSelector((store) => store.userDetails);
  const { users } = useSelector((store) => store.allUsers);

  const followingUsers = users.filter((user) =>
    following?.following.includes(user.id)
  );
  const followerUsers = users.filter((user) =>
    followers?.followers.includes(user.id)
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          aria-label="basic tabs example"
        >
          <Tab label="Post" {...a11yProps(0)} />
          <Tab label="Following" {...a11yProps(1)} />
          <Tab label="Followers" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Posts />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Connections users={followingUsers} token={token} isFollowing={true} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Connections users={followerUsers} token={token} isFollowing={false} />
      </TabPanel>
    </Box>
  );
};
