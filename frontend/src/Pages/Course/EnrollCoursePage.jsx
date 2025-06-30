import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container, Typography, TextField, Button, Box
} from "@mui/material";
import API, { IMAGE_BASE_URL } from "../../Utils/api";
import HomePageNavbar from "../../Components/Navbar/Homepagenavbar";
     
const EnrollCoursePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [key, setKey] = useState("");

  useEffect(() => {
    API.get("/courses/all").then(res => {
      const found = res.data.find(c => c._id === id);
      setCourse(found);
    });
  }, [id]);

  const handleSubmit = async () => {
    try {
      await API.post("/courses/enroll", { courseId: id, enrollmentKey: key });
      alert("Enrollment submitted. Waiting for admin approval.");
      navigate("/my-courses"); // or wherever you want
    } catch (err) {
      alert(err.response?.data?.message || "Enrollment failed");
    }
  };

  if (!course) return <p>Loading...</p>;

  return (
    <Box>
      <HomePageNavbar/>
   
    <Container>
       
      <Typography variant="h4">{course.title}</Typography>
      <img
        src={`${IMAGE_BASE_URL}/${course.coverImage}`}
        alt="cover"
        style={{ width: "100%", maxHeight: "300px", objectFit: "cover", marginBottom: 20 }}
      />
      <TextField
        fullWidth
        label="Enter Enrollment Key"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        sx={{ mt: 2 }}
      />
      <Button variant="contained" sx={{ mt: 2 }} onClick={handleSubmit}>
        Submit
      </Button>
    </Container>
     </Box>
  );
};

export default EnrollCoursePage;
