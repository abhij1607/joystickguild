import { AddPost } from "components/AddPost/AddPost";
import { Post } from "components/Post/Post";
import { useSelector } from "react-redux";
import { sortPosts } from "utils/sortBy";
import { useState } from "react";
import Divider from "@mui/material/Divider";
import { FeedSortBy } from "components/SortBy/SortBy";

const Home = () => {
  const [sortBy, setSortBy] = useState("LATEST");
  const { token } = useSelector((store) => store.authDetails);
  const {
    userDetails: { following },
  } = useSelector((store) => store.userDetails);
  const { posts } = useSelector((store) => store.post);
  const filteredPostsByFollowingUser = posts?.filter(
    (post) =>
      following?.following?.includes(post?.data?.postBy) ||
      post?.data?.postBy === token
  );

  const sortedPosts = sortPosts(filteredPostsByFollowingUser, sortBy);

  return (
    <>
      <AddPost />
      <Divider />
      <FeedSortBy setSortBy={setSortBy} sortBy={sortBy} />
      <Divider />
      {sortedPosts?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
};
export { Home };
