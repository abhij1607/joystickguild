import { AddPost } from "components/AddPost/AddPost";
import { Post } from "components/Post/Post";
import { useSelector } from "react-redux";

const Home = () => {
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
      <Post />
    </>
  );
};
export { Home };
