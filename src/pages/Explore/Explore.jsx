import { Post } from "components/Post/Post";
import { useSelector } from "react-redux";
import { sortPosts } from "utils/sortBy";
import { useState } from "react";
import Divider from "@mui/material/Divider";
import { FeedSortBy } from "components/SortBy/SortBy";

export const Explore = () => {
  const [sortBy, setSortBy] = useState("LATEST");
  const { posts } = useSelector((store) => store.post);
  const postsToSort = [...posts];
  const sortedPosts = sortPosts(postsToSort, sortBy);

  return (
    <>
      <FeedSortBy setSortBy={setSortBy} sortBy={sortBy} />
      <Divider />
      {sortedPosts?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
};
