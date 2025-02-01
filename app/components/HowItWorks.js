"use client";
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const HowItWorks = () => {
  const steps = [
    {
      title: "Join our group or 1-on-1 sessions",
      description: "Pick the plan that best helps you achieve your goals",
      color: "#0077b6",
    },
    {
      title: "Take Action",
      description:
        "Join weekly live sessions & use recorded tutorials to make progress",
      color: "#00b09b",
    },
    {
      title: "Get Results",
      description: "Overcome problems & achieve your goals",
      color: "#96c93d",
    },
  ];

  return (
    <section aria-label="How It Works">
      <Box
        sx={{
          mt: 8,
          mb: 8,
          bgcolor: "black",
          py: 6,
          width: "100%",
          padding: 5,
          marginBottom: 0,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            ...styles.heading,
            marginBottom: "40px",
            textAlign: "center",
            color: "white",
          }}
        >
          How It Works
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {steps.map((step, index) => (
            <Grid item xs={12} sm={6} md={4} key={`${index}-howitworks`}>
              <Box
                role="region"
                aria-label={`Step ${index + 1}: ${step.title}`}
                sx={{
                  bgcolor: step.color,
                  borderRadius: "8px",
                  p: 3,
                  textAlign: "center",
                  color: "white",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h5" gutterBottom>
                  {index + 1}. {step.title}
                </Typography>
                <Typography variant="body1">{step.description}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </section>
  );
};

const styles = {
  heading: {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "20px",
    position: "relative",
  },
};

export default HowItWorks;
