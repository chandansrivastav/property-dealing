import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import PageNotFound from "./components/PageNotFound";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import TermsAndConditions from "./components/TermsAndConditions";
import PrivacyOfUsers from "./components/PrivacyOfUsers";
import Blogs from "./components/Blogs";
import News from "./components/News";
import Testimonials from "./components/Testimonials";
import PropertyList from "./components/PropertyList";
import PropertyDetails from "./components/PropertyDetails";

function App() {
  const location = useLocation();

  // Define routes where Header should not be displayed
  const noHeaderRoutes = ["/"];

  const shouldShowHeader = !noHeaderRoutes.includes(location.pathname);

  return (
    <>
      <Header shouldShowHeader={shouldShowHeader} />
      <Routes>
        <Route index element={<Home />}></Route>
        <Route path="/about-us" element={<AboutUs />}></Route>
        <Route path="/contact-us" element={<ContactUs />}></Route>
        <Route
          path="/terms-and-conditions"
          element={<TermsAndConditions />}
        ></Route>
        <Route path="/privacy-of-users" element={<PrivacyOfUsers />}></Route>
        <Route path="/property-list/:id" element={<PropertyList />}></Route>
        <Route
          path="/property-details/:slug/:id"
          element={<PropertyDetails />}
        ></Route>
        <Route path="/blog" element={<Blogs />}></Route>
        <Route path="/news" element={<News />}></Route>
        <Route path="/testimonials" element={<Testimonials />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;

// import { Navigate, Outlet } from 'react-router-dom';

// const AuthLayout = () => {
//   if (Parse.User.current() !== null) {
//     const isAuthenticated = Parse.User.current().getSessionToken();
//     return isAuthenticated ? <Outlet /> : null; // or loading indicator, etc...
//   }
//   return <Navigate to={"/login"} replace />;
// };
// <Route element={<AuthLayout />}>
//   <Route path="/book" element={<BookPage />} />
//   ... other protected routes ...
// </Route>
