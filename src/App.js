import "./App.css";
import LoginPage from "./pages/LoginPage";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import PostsPage from "./pages/PostsPage";

import { useEffect } from "react";

function App() {
  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const lastLoginTime = localStorage.getItem("lastLoginTime");

    if (storedIsLoggedIn && lastLoginTime) {
      const currentTime = new Date().getTime();
      const timeDifference = currentTime - Number(lastLoginTime);
      const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours

      if (timeDifference > twentyFourHours) {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("username");
        localStorage.removeItem("lastLoginTime");
      }
    }
  }, []);

  return (
    <BrowserRouter className="App">
      <header></header>
      <main>
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/posts" element={<PostsPage />}></Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
