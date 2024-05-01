import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import UserProfile from "./pages/UserProfile/UserProfile";
import CommunityPage from "./pages/CommunityPage/CommunityPage";
import Chat from "./pages/Chat/Chat";
import SinglePost from "./pages/SinglePost/SinglePost";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Trending from "./pages/Trending/Trending";
import SavedPosts from "./pages/SavedPosts/Saved";

function App() {
  return (
    <div className={StyleSheet.App}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Trending />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user/:id" element={<UserProfile />} />
          <Route path="/community/:id" element={<CommunityPage />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/post/:id" element={<SinglePost />} />
          <Route path="/user/:id/saved" element={<SavedPosts />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
