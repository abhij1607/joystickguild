import { useSelector } from "react-redux";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import { SuggestedUserCard } from "components/SuggestedUserCard/SuggestedUserCard";

export const WhoToFollow = () => {
  const { users } = useSelector((store) => store.allUsers);
  const { token } = useSelector((store) => store.authDetails);
  const {
    userDetails: { following },
  } = useSelector((store) => store.userDetails);

  const suggestions = users.filter(
    (user) => user.id !== token && !following?.following?.includes(user.id)
  );

  return (
    <List>
      <ListSubheader component="div">Who To follow</ListSubheader>
      {suggestions.map((user) => {
        return <SuggestedUserCard key={user.id} user={user} token={token} />;
      })}
    </List>
  );
};
