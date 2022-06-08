import { Post } from "components/Post/Post";
import { useSelector } from "react-redux";
import { sortPosts } from "utils/sortBy";
import { useState } from "react";
import Divider from "@mui/material/Divider";
import { FeedSortBy } from "components/SortBy/SortBy";

export const Bookmarks = () => {
  const [sortBy, setSortBy] = useState("LATEST");

  const { token } = useSelector((store) => store.authDetails);
  const {
    userDetails: { bookmarks },
  } = useSelector((store) => store.userDetails);
  const { posts } = useSelector((store) => store.post);

  const filteredPostsByBookmarks = posts?.filter((post) =>
    bookmarks?.bookmarks?.includes(post?.id)
  );

  const sortedPosts = sortPosts(filteredPostsByBookmarks, sortBy);

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
