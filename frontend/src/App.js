
import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";


import Login from "./Pages/loginpage.jsx";
import Home from "./Pages/homepage.jsx";
import Signuppage from "./Pages/signuppage.jsx";
import Footer from "./Components/Home/Footer.jsx";
import Dashboard from "./Pages/admin/dashboard.jsx";
import Profile from "./Pages/Profile";
import { AuthProvider } from "./Utils/AuthContext";
import PrivateRoute from "./Components/PrivateRoute.jsx";
import CoursesPage from "./Pages/Course/CoursesPage.jsx";
import EnrollCoursePage from "./Pages/Course/EnrollCoursePage.jsx"; 
import AdminEnrollments from "./Pages/admin/AdminEnrollmentRequests.jsx";
import CourseViewerPage from "./Pages/Course/CourseViewerPage.jsx";

function App() {
  return (
    <HashRouter>
  <AuthProvider>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signuppage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/courses/:id/enroll" element={<EnrollCoursePage />} />
      <Route path="/courses/:id/view" element={<PrivateRoute><CourseViewerPage /></PrivateRoute>}/>

       <Route
            path="/admin/enrollments"
            element={
              <PrivateRoute>
                <AdminEnrollments />
              </PrivateRoute>
            }
          />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
  path="/profile"
  element={
    <PrivateRoute>
      <Profile />
    </PrivateRoute>
  }
/>
    </Routes>
    <Footer />
  </AuthProvider>
</HashRouter>

  );
}

export default App;
