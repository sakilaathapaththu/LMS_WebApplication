
import React from "react";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";

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
import AddCoursePage from "./Pages/admin/AddCoursePage";
import AdminAllCoursesPage from "./Pages/admin/AdminAllCoursesPage.jsx";
import AdminUserManagement from "./Pages/admin/AdminUserManagement.jsx";
import AdminProfile from "./Pages/admin/AdminProfile.jsx";
import AboutUs from "./Pages/AboutUs.jsx";
import ContactUs from "./Pages/ContactUs.jsx";
import AddQuizPage from "./Pages/admin/AddQuizPage.jsx";
import TakeQuizPage from './Pages/Course/TakeQuizPage.jsx';
import AdminViewQuizResults from "./Pages/admin/AdminViewQuizResults.jsx";

function AppRoutes() {
  const location = useLocation();

  // Define routes where you do NOT want the footer
  const hideFooterRoutes = ["/dashboard", "/admin/enrollments","/courses/add","/admin/courses","/admin/users","/admin/profile","/admin/addquiz","/admin/all-quiz-results"];

  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signuppage />} />
        <Route path="/login" element={<Login />} />
         <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
        <Route path="/quizzes/:courseId" element={<PrivateRoute><TakeQuizPage /></PrivateRoute>} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:id/enroll" element={<EnrollCoursePage />} />
        <Route path="/courses/add" element={<PrivateRoute><AddCoursePage /></PrivateRoute>} />
        <Route path="/admin/courses" element={<PrivateRoute><AdminAllCoursesPage /></PrivateRoute>} />
        <Route path="/admin/users" element={<PrivateRoute><AdminUserManagement /></PrivateRoute>} />
        <Route path="/admin/profile" element={<PrivateRoute><AdminProfile /></PrivateRoute>} />
        <Route path="/admin/addquiz" element={<PrivateRoute><AddQuizPage /></PrivateRoute>} />
        <Route path="/admin/all-quiz-results" element={<PrivateRoute><AdminViewQuizResults /></PrivateRoute>} />

        
        <Route
          path="/courses/:id/view"
          element={
            <PrivateRoute>
              <CourseViewerPage />
            </PrivateRoute>
          }
        />
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

      {/* Show footer only if not in hidden routes */}
      {!shouldHideFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </HashRouter>
  );
}

export default App;
