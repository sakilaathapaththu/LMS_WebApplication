import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API, { IMAGE_BASE_URL } from "../../Utils/api";
import { Container, Typography, Box } from "@mui/material";
import HomePageNavbar from "../../Components/Navbar/Homepagenavbar";
const CourseViewerPage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    API.get(`/courses/${id}/access`)
      .then(res => setCourse(res.data))
      .catch(err => alert("Access denied or not approved yet"));
  }, [id]);

  if (!course) return <p>Loading...</p>;
// ✅ Convert Drive /view to /preview for iframe
  const getEmbedUrl = (url) => {
    if (url.includes("drive.google.com") && url.includes("/view")) {
      return url.replace("/view", "/preview");
    }
    return url;
  };

  return (
    <Box>
        <HomePageNavbar/>
    <Container>
        
      <Typography variant="h4">{course.title}</Typography>
      <Typography variant="body1" sx={{ my: 2 }}>{course.description}</Typography>

       {course.videoClips?.map((url, idx) => (
        <Box key={idx} sx={{ mb: 3 }}>
          <Typography variant="subtitle1">Lecture {idx + 1}</Typography>
          <iframe
            width="100%"
            height="315"
            src={getEmbedUrl(url)}
            title={`Lecture ${idx + 1}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Box>
      ))}
    </Container>
    </Box>
  );
};

export default CourseViewerPage;
