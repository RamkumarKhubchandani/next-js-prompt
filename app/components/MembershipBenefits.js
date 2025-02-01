"use client";
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

const MembershipBenefits = ({
    handleContactUsClick
}) => {
  const plans = [
    {
      name: 'Gold (Front end)',
      price: {
        india: '₹9999',
        international: '$130',
      },
      description:
        'Unlock your potential as an independent front-end developer by mastering JavaScript and one of the industry-leading frameworks like Angular, React, or Vue',
      color: '#ff9800',
    },
    {
      name: 'Platinum (Full Stack)',
      price: {
        india: '₹19999',
        international: '$260',
      },
      description:
        'It\'s a full-stack program covering JavaScript, any front-end framework (Angular, React, or Vue), Node.js, and MongoDB.',
      color: '#3f51b5',
    },
  ];

  const commonBenefits = [
    'Unlimited sessions for 1 year',
    'One-to-one connect for all doubts and concerns',
    'Pure coding sessions, interview guidance, and reference',
    'Live project with perfect industry experience',
    'One-to-one mock interviews',
    'Practical sessions',
    'Weekly and weekend batches with unlimited sessions',
  ];

  return (
    <Box sx={{ mt: 0, mb: 8, bgcolor: '#393434', py: 6 }}>
      <Typography
        variant="h3"
        sx={{
          ...styles.heading,
          marginBottom: '40px',
          textAlign: 'center',
          color: 'white',
        }}
      >
        Membership Benefits
      </Typography>
      <Typography
        variant="body1"
        sx={{
          marginBottom: '40px',
          textAlign: 'center',
          color: 'white',
        }}
      >
        Pick a plan of your choice
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {plans.map((plan, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Box
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                p: 4,
                textAlign: 'center',
                color: 'white',
              }}
            >
              <Typography variant="h4" gutterBottom>
                {plan.name}
              </Typography>
              <Typography variant="h2" gutterBottom>
                {plan.price.india}
              </Typography>
              <Typography variant="body1" gutterBottom>
                (For India)
              </Typography>
              <Typography variant="h2" gutterBottom>
                {plan.price.international}
              </Typography>
              <Typography variant="body1" gutterBottom>
                (International)
              </Typography>
              <Typography variant="body1" gutterBottom>
                {plan.description}
              </Typography>
              <Box
                sx={{
                  bgcolor: plan.color,
                  borderRadius: '8px',
                  p: 4,
                  mt: 4,
                }}
              >
                <Typography variant="h5" gutterBottom>
                  Common Benefits
                </Typography>
                {commonBenefits.map((benefit, index) => (
                  <Typography key={index} variant="body1" gutterBottom>
                    • {benefit}
                  </Typography>
                ))}
              </Box>
              <Button
                onClick={handleContactUsClick}
                variant="contained"
                sx={{
                  mt: 4,
                  bgcolor: plan.color,
                  '&:hover': {
                    bgcolor: `${plan.color}CC`, // Lighter shade on hover
                  },
                }}
              >
                Join Now
              </Button>
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

export default MembershipBenefits;