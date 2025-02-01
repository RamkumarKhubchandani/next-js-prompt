"use client";
import React from "react";
import { Typography, Box, Container } from "@mui/material";

function Footer() {
  return (
    <div style={styles.footer}>
      <Container>
        <Box display="flex" justifyContent="space-between">
          <div style={styles.footerColumn}>
            <Typography variant="h6">Contact Us</Typography>
            <Typography>Email: infojsprompt@gmail.com</Typography>
            <Typography>Phone: +917709330265</Typography>
          </div>
          
          <div style={styles.footerColumn}>
            <Typography variant="h6">Copyright © 2024 JSLife</Typography>
            <Typography>All rights reserved.</Typography>
          </div>
        </Box>
      </Container>
    </div>
  );
}

const styles = {
  footer: {
    backgroundColor: "#14b8a6",
    color: "white",
    borderTop: "2px solid #00A791",
    padding: "20px 0",
  },
  footerColumn: {
    flex: 1,
    padding: "10px",
    textAlign: "center",
  },
  newsletterForm: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "10px",
    padding: "20px",
    borderRadius: "5px",
  },
  formField: {
    display: "flex",
    justifyContent: "center",
  },
};

export default Footer;
