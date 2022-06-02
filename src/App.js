import {
  Home,
  Login,
  Signup,
  PageNotFound,
  Notifications,
  Profile,
  Explore,
  Bookmarks,
} from "./pages";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "components/PrivateRoute/PrivateRoute";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetailss } from "./firebase/firestore-requests";

function App() {
  const { token } = useSelector((store) => store.authDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserDetailss(token));
  }, [token, dispatch]);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notification" element={<Notifications />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
