"use client";
import React from "react";
import Image from 'next/image';
import WhatsAppImg from "./images/whatsapp.jpg";
import "./App.css";
import AppContainer from "./AppContainer";
import Footer from "./Footer";
import { Button } from "@mui/material";
import ContactUsDialog from "./contactus";
import JSPromptLogo from './JSPromptLogo';

function App() {
  const [open, setOpen] = React.useState(false);

  const handleContactUsClick = () => {
    setOpen((prev) => !prev);
  };
  return (
    <>
      <ContactUsDialog open={open} setOpen={setOpen} />
      <div style={styles.router}>
        <div style={styles.navBar} className="w-full fixed z-10">
          <JSPromptLogo />
          <div style={styles.rightSection}>
            <p style={styles.contact} className="flex contact-details"><span><a href="https://wa.me/917709330265" target="_blank" rel="noopener noreferrer"><Image src={WhatsAppImg} alt='whatsapp' height='50' width='50' /></a></span><span className="m-2 cnumber"> +917709330265</span></p>
            <Button variant="contained" onClick={handleContactUsClick} className="rounded-full" sx={{ borderRadius: '50px', bgcolor: '#14b8a6 !important' }}>
              contact Us 
            </Button>
          </div>
        </div>
        <AppContainer setOpen={setOpen} />
        <Footer />
      </div>
    </>
  );
}

const styles = {
  router: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  navBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0px 20px",
    backgroundColor: "#f4f4f4",
  },
  rightSection: {
    display: "flex",
    alignItems: "center",
  },
  contact: {
    marginRight: "20px",
  },
  loginLink: {
    textDecoration: "none",
    color: "white",
    padding: "5px 10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    backgroundColor: "blue",
  },
  logoImage: {
    width: "60px",
    height: "60px",
    marginRight: "10px",
  },
  content: {
    flex: 1,
  },
};

export default App;
