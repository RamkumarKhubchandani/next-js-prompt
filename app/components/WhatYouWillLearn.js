"use client";
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const WhatYouWillLearn = () => {
  const learningItems = [
    'Master JavaScript to elevate your coding prowess.',
    'Unlock React\'s potential for dynamic web apps.',
    'Harness Angular for scalable project success.',
    'Command Vue for reactive & robust interfaces.',
    'Efficiently complete projects without fatigue.',
    'Achieve tangible career growth with expert guidance.',
  ];

  return (
    <Box sx={{ mt: 8, mb: 8, bgcolor: 'black', py: 6 }}>
      <Typography
        variant="h3"
        sx={{
          ...styles.heading,
          marginBottom: '40px',
          textAlign: 'center',
          color: 'white',
        }}
      >
        What You Will Learn
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {learningItems.map((item, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                p: 2,
                mb: 2,
              }}
            >
              <CheckCircleIcon sx={{ color: '#14b8a6', marginRight: '16px' }} />
              <Typography variant="body1" color="white">
                {item}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const styles = {
  heading: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '20px',
    position: 'relative',
  },
};

export default WhatYouWillLearn;