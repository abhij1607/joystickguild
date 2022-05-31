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

function App() {
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
