import { AddPost } from "components/AddPost/AddPost";
import { Post } from "components/Post/Post";
import { useSelector } from "react-redux";
// import { sortOldestFirst, sortLatestFirst } from "utils/filters";
import { useState } from "react";

const Home = () => {
  // const [sortBy, setSortBy] = useState("OLDEST");
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

  return (
    <>
      <AddPost />
      {filteredPostsByFollowingUser?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
};
export { Home };
