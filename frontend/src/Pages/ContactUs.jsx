import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  IconButton,
  Link,
  Container,
} from "@mui/material";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaGithub,
  FaWhatsapp,
  FaLinkedin,
} from "react-icons/fa";
import emailjs from "emailjs-com";
import HomePageNavbar from "../Components/Navbar/Homepagenavbar";
const ContactUs = () => {
  const formInitialDetails = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  };

  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState("Send");
  const [status, setStatus] = useState({});

  const onFormUpdate = (field, value) => {
    setFormDetails({ ...formDetails, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonText("Sending...");

    const templateParams = { ...formDetails };

    emailjs.send(
      "service_iz4upso",
      "template_igzmdar",
      templateParams,
      "Saxc69ddljcENyxEM"
    ).then(() => {
      setStatus({ success: true, message: "✅ Message sent successfully!" });
      setFormDetails(formInitialDetails);
      setButtonText("Send");
    }).catch(() => {
      setStatus({ success: false, message: "❌ Failed to send message. Please try again." });
      setButtonText("Send");
    });
  };

  return (
    <Box><HomePageNavbar/>
    <Box sx={{ py: 6, backgroundColor: "#f9f9f9" }}>
        
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" gutterBottom>
          Contact Us
        </Typography>

        <Grid container spacing={4} mt={4}>
          {/* Form */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="First Name"
                      fullWidth
                      required
                      value={formDetails.firstName}
                      onChange={(e) => onFormUpdate("firstName", e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Last Name"
                      fullWidth
                      required
                      value={formDetails.lastName}
                      onChange={(e) => onFormUpdate("lastName", e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Email Address"
                      type="email"
                      fullWidth
                      required
                      value={formDetails.email}
                      onChange={(e) => onFormUpdate("email", e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Phone No."
                      type="tel"
                      fullWidth
                      value={formDetails.phone}
                      onChange={(e) => onFormUpdate("phone", e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Message"
                      multiline
                      rows={6}
                      fullWidth
                      required
                      value={formDetails.message}
                      onChange={(e) => onFormUpdate("message", e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" fullWidth variant="contained">
                      {buttonText}
                    </Button>
                  </Grid>
                  {status.message && (
                    <Grid item xs={12}>
                      <Typography
                        variant="body2"
                        color={status.success ? "green" : "error"}
                      >
                        {status.message}
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </form>
            </Paper>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <FaEnvelope style={{ marginRight: 10 }} />
                <Link href="mailto:sakila.atapattu@gmail.com" underline="hover">
                  sakila.atapattu@gmail.com
                </Link>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <FaPhoneAlt style={{ marginRight: 10 }} />
                <Link href="tel:+94714782241" underline="hover">
                  +94 71 478 2241
                </Link>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <FaMapMarkerAlt style={{ marginRight: 10 }} />
                <Typography>Rajagedra, Ahugoda, Pothuhera</Typography>
              </Box>
              
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <FaLinkedin style={{ marginRight: 10 }} />
                <Link href="https://www.linkedin.com/in/sakila-athapaththu-412647215" target="_blank" rel="noreferrer">
                  LinkedIn
                </Link>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <FaWhatsapp style={{ marginRight: 10 }} />
                <Link href="https://wa.me/714782241" target="_blank" rel="noreferrer">
                  Chat on WhatsApp
                </Link>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
    </Box>
  );
};

export default ContactUs;
