import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import WeatherSearchBar from "./components/WeatherSearchBar";

// import Login from "./pages/LogIn";
// import Register from "./pages/Register";
// import About from "./pages/About";
// import BlogList from "./pages/BlogList";
// import BlogArticle from "./pages/BlogArticle";
// import SitesList from "./pages/SitesList";
// import SiteDetail from "./pages/SiteDetail";
// import MyHome from "./pages/MyHome";
// import AdminUserList from "./pages/AdminUserList";
// import AdminSiteList from "./pages/AdminSiteList";
// import BlogForm from "./pages/BlogForm";
// import SiteForm from "./pages/SiteForm";
// import MyDetails from "./components/MyDetails";
// import MyBlog from "./components/MyBlog";
import {router} from './router/index'

function App() {
  return (
    <Router>
      <NavBar />
      <WeatherSearchBar />
      <main className="pb-3">
      <React.Suspense>
          <Routes>
              {router.map((e,i) => (
                <Route path={e.path} element={<e.element/>} key={i}></Route>
              )
              )}
          </Routes>
        </React.Suspense>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
