"use client";
import React from "react";
import Image from 'next/image';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import image from "./JavaScript-logo.png";
import ContactUsDialog from "./contactus";
import WhatYouWillLearn from "./WhatYouWillLearn";
import MembershipBenefits from "./MembershipBenefits";	
import HowItWorks from "./HowItWorks";
import reactImage from "./react.png";
import angularImage from "./angular.png";
import vueImage from "./vue.png";

const MainPage = () => {
  const [open, setOpen] = React.useState(false);
  const handleContactUsClick = () => {
    setOpen((prev) => !prev);
  };

  const testimonials = [
    {
      text: "This conference was a game-changer for my career!",
      author: "Emil Andersson",
    },
    {
      text: "I learned so much from the speakers and met so many great people.",
      author: "Helena Johansson",
    },
    {
      text: "I have created ecommerse project in angular in just 2 weeks!",
      author: "Rohan Patil",
    },
    {
      text: "I have learned Vue in just 10 coding session with typescript, its learning with fun!",
      author: "Rajkumar P",
    },
    {
      text: "It was amazing for me to learn JS from this place!",
      author: "Ketrina Andersson",
    },
    {
      text: "Ramkumar was very honest and talented person, I learned Nodejs with him within a week",
      author: "Mariza kenny",
    },
    {
      text: "This course change my thinking about JS!, learn a lot from here",
      author: "Mariza villas",
    },
  ];
  return (
    <>
      <ContactUsDialog open={open} setOpen={setOpen} />

      <Box
        display="flex"
        flexWrap="wrap"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap="20px"
        padding="20px"
      >
        <Typography variant="h3" sx={styles.heading}>
          <span sx={styles.headingBackground}></span>
          Join our online Conferences
        </Typography>
        {/* <ArticleCarousel /> */}

        <div className="flex justify-center gap-10 conference-container">
          <div className="w-full sm:w-1/2 lg:w-1/3" sx={{ maxWidth: 345, margin: "20px", textAlign: "center" }}>
            <Card variant="outlined" >
              {/* <CardMedia component="img" image={image} alt="JavaScript Logo" /> */}
              <Image src={image} alt="JavaScript Logo" />
              <CardContent sx={styles.CardContent}>
                <Typography variant="h5" sx={styles.cardTitle}>
                  Join the Ultimate JavaScript Conference
                </Typography>
                <Typography variant="body1" sx={styles.cardText}>
                  Are you ready to dive into the world of JavaScript and take
                  your web development skills to new heights? Look no further!
                  We are thrilled to invite you to our highly anticipated
                  JavaScript Conference, where innovation meets expertise, and
                  where the future of web development unfolds.
                </Typography>
              </CardContent>
              <CardActions sx={styles.cardActions}>
                <Button
                  variant="contained"
                  size="small"
                  sx={styles.learnMoreButton}
                  onClick={handleContactUsClick}
                >
                  Know More
                </Button>
              </CardActions>
            </Card>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/3" sx={{ maxWidth: 345, margin: "20px", textAlign: "center" }}>
          {/* sx={styles.card} */}
            <Card variant="outlined">
              {/* <CardMedia component="img" image={reactImage} alt="React Logo" /> */}
              <Image src={reactImage} alt="React Logo" />
              <CardContent sx={styles.CardContent}>
                <Typography variant="h5" sx={styles.cardTitle}>
                  Elevate Your React Game at the Ultimate React Conference
                </Typography>
                <Typography variant="body1" sx={styles.cardText}>
                  Get ready to embark on a React journey like no other! The
                  React Conference of the year is here, and it's packed with
                  everything you need to supercharge your React skills, network
                  with industry leaders, and take your career to new heights.
                </Typography>
              </CardContent>
              <CardActions sx={styles.cardActions}>
                <Button
                  variant="contained"
                  size="small"
                  sx={styles.learnMoreButton}
                  onClick={handleContactUsClick}
                >
                  Know More
                </Button>
              </CardActions>
            </Card>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/3" sx={{ maxWidth: 345, margin: "20px", textAlign: "center" }}>
          {/* sx={styles.card} */}
            <Card variant="outlined">
            <div style={{ maxHeight: '433px', height: 'auto' }}>
            <Image src={angularImage} alt="Angular Logo" height={420} width={433} />
            </div>
              {/* <CardMedia component="img" sx={{maxHeight: 433, maxWidth: 433}} image={angularImage} alt="Angular Logo" /> */}
              <CardContent sx={styles.CardContent}>
                <Typography variant="h5" sx={styles.cardTitle}>
                  Join our angular conference with live ecommerse project
                </Typography>
                <Typography variant="body1" sx={styles.cardText}>
                  Get ready to embark on a React journey like no other! The
                  React Conference of the year is here, and it's packed with
                  everything you need to supercharge your React skills, network
                  with industry leaders, and take your career to new heights.
                </Typography>
              </CardContent>
              <CardActions sx={styles.cardActions}>
                <Button
                  variant="contained"
                  size="small"
                  sx={styles.learnMoreButton}
                  onClick={handleContactUsClick}
                >
                  Know More
                </Button>
              </CardActions>
            </Card>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/3" sx={{ maxWidth: 345, margin: "20px", textAlign: "center" }}>
          {/* sx={styles.card} */}
            <Card variant="outlined">
            <Image src={vueImage} alt="Vue Logo" height={433} width={433} />
              {/* <CardMedia component="img" image={vueImage} alt="Vue Logo" /> */}
              <CardContent sx={styles.CardContent}>
                <Typography variant="h5" sx={styles.cardTitle}>
                  Join our Vue Conference with live project like chat box
                </Typography>
                <Typography variant="body1" sx={styles.cardText}>
                  Get ready to embark on a React journey like no other! The
                  React Conference of the year is here, and it's packed with
                  everything you need to supercharge your React skills, network
                  with industry leaders, and take your career to new heights.
                </Typography>
              </CardContent>
              <CardActions sx={styles.cardActions}>
                <Button
                  variant="contained"
                  size="small"
                  sx={styles.learnMoreButton}
                  onClick={handleContactUsClick}
                >
                  Know More
                </Button>
              </CardActions>
            </Card>
          </div>
        </div>

        <HowItWorks />

        <WhatYouWillLearn />
        <MembershipBenefits handleContactUsClick={handleContactUsClick} />

        <Typography
          variant="h3"
          sx={{ ...styles.heading, marginTop: "40px", textAlign: "center" }}
        >
          What Our Students Say
        </Typography>
        <Box display="flex" justifyContent="center" flexWrap="wrap">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              text={testimonial.text}
              author={testimonial.author}
            />
          ))}
        </Box>
        <Typography variant="h3" sx={styles.heading}>
          Explore Our Articles
        </Typography>
        <Box display="flex" justifyContent="center" gap="30px" className="article-container">
          <Card variant="outlined" sx={styles.smallCard}>
            <CardContent sx={styles.sliderCardContent}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Image
                  alt="article image"
                  src={image}                  
                  style={{ marginRight: "10px", width: "50px", height: "50px" }}
                />
                <div>
                  <Typography variant="h5" sx={styles.cardTitle}>
                    Bridge Pattern in JavaScript
                  </Typography>
                  <Typography variant="body1" sx={styles.cardText}>
                    The Bridge pattern is a structural design pattern that
                    decouples an abstraction from its implementation, so that
                    each can vary independently. This makes it easier to change
                    the behavior of an application without affecting its
                    underlying structure. The Bridge pattern is often used in
                    GUI development, where it can be used to separate the look
                    and feel of the GUI from its underlying functionality. This
                    makes it possible to easily change the look and feel of the
                    GUI without affecting the rest of the application.
                  </Typography>
                </div>
              </div>
            </CardContent>
            <CardActions sx={styles.cardActions}>
              <a
                href="https://ramkumarkhub.medium.com/bridge-pattern-in-javascript-98cb0b4e819d"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="contained"
                  size="small"
                  sx={styles.learnMoreButton}
                >
                  Read More
                </Button>
              </a>
            </CardActions>
          </Card>

          <Card variant="outlined" sx={styles.smallCard}>
            <CardContent sx={styles.sliderCardContent}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Image
                  src={image}
                  
                  alt="Bridge Pattern Image"
                  style={{ marginRight: "10px", width: "50px", height: "50px" }}
                />
                <div>
                  <Typography variant="h5" sx={styles.cardTitle}>
                    JavaScript Boolean Class: A Step-by-Step Guide with Examples
                  </Typography>
                  <Typography variant="body1" sx={styles.cardText}>
                    Booleans are one of the most fundamental data types in
                    JavaScript. They can be used to represent true or false
                    values, and they are essential for controlling program flow.
                    In this blog post, we will take a step-by-step look at the
                    JavaScript Boolean class, and we will provide some good
                    examples to help you learn how to use it effectively. What
                    is the JavaScript Boolean class?
                  </Typography>
                </div>
              </div>
            </CardContent>
            <CardActions sx={styles.cardActions}>
              <a
                href="https://ramkumarkhub.medium.com/javascript-boolean-class-a-step-by-step-guide-with-examples-01cf150dcad9"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="contained"
                  size="small"
                  sx={styles.learnMoreButton}
                >
                  Read More
                </Button>
              </a>
            </CardActions>
          </Card>

          <Card variant="outlined" sx={styles.smallCard}>
            <CardContent sx={styles.sliderCardContent}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Image
                  src={image}
                  alt="Bridge Pattern Image"
                  style={{ marginRight: "10px", width: "50px", height: "50px" }}
                />
                <div>
                  <Typography variant="h5" sx={styles.cardTitle}>
                    Call, Apply and Bind in JavaScript{" "}
                  </Typography>
                  <Typography variant="body1" sx={styles.cardText}>
                    The call(), apply(), and bind() methods in JavaScript are
                    powerful tools that allow you to call functions with a
                    specified this value and arguments. These methods can be
                    used to write more flexible and reusable code. What is the
                    this value? The this value in JavaScript is a special
                    variable that refers to the current object. When a function
                    is called, the this value is set to the object that the
                    function is called on.
                  </Typography>
                </div>
              </div>
            </CardContent>
            <CardActions sx={styles.cardActions}>
              <a
                href="https://ramkumarkhub.medium.com/call-apply-and-bind-in-javascript-aa857c714a94"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="contained"
                  size="small"
                  sx={styles.learnMoreButton}
                >
                  Read More
                </Button>
              </a>
            </CardActions>
          </Card>
        </Box>
      </Box>
    </>
  );
};

const Testimonial = ({ text, author }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: "20px", textAlign: "center" }}>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          "{text}"
        </Typography>
        <Typography
          variant="subtitle2"
          style={{ marginTop: "15px", fontWeight: "bold" }}
        >
          - {author}
        </Typography>
      </CardContent>
    </Card>
  );
};

// const ArticleCarousel = () => {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//   };

//   return (
//     <Slider {...settings}>
//       <Card>
//         <CardContent>
//           <Typography variant="h5">Heading for first slide</Typography>
//           <Typography variant="body1">Content for first slide</Typography>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardContent>
//           <Typography variant="h5">Heading for second slide</Typography>
//           <Typography variant="body1">Content for second slide</Typography>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardContent>
//           <Typography variant="h5">Heading for third slide</Typography>
//           <Typography variant="body1">Content for third slide</Typography>
//         </CardContent>
//       </Card>
//     </Slider>
//   );
// };

const styles = {
  smallCard: {
    marginTop: 0,
    marginBottom: 5,
    flex: "0 0 calc(33.33% - 20px)",
    borderRadius: "8px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#F0F0F0",
    color: "black",
    transition: "transform 0.2s",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  heading: {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#5A5A5A",
    position: "relative",
    marginTop: 5,
  },
  headingBackground: {
    position: "absolute",
    top: "50%",
    left: "0",
    width: "100%",
    height: "1px",
    backgroundColor: "white",
    zIndex: -1,
  },
  card: {
    flex: "0 0 30%",
    borderRadius: "8px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f2f2f2",
    transition: "transform 0.2s",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  cardTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  cardText: {
    fontSize: "1rem",
    marginBottom: "20px",
  },
  cardActions: {
    justifyContent: "flex-end",
    padding: "16px",
  },
  learnMoreButton: {
    backgroundColor: '#14b8a6 !important',
    color: "white",
  },
  CardContent: {
    minHeight: 200,
    maxHeight: 220,
  },
  sliderCardContent: {
    minHeight: 310,
    maxHeight: 310,
  },
};

export default MainPage;
