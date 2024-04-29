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

function App() {
  return (
    <div className={StyleSheet.App}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Trending />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<UserProfile />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/post" element={<SinglePost />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
