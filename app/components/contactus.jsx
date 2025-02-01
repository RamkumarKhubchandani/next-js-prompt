"use client";
// import React, { useState } from "react";
// import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
// import DialogTitle from "@mui/material/DialogTitle";
// import DialogContent from "@mui/material/DialogContent";

// import DialogActions from "@mui/material/DialogActions";
// import TextField from "@mui/material/TextField";
// import InputAdornment from '@mui/material/InputAdornment';
// import PhoneInput from "react-phone-number-input";
// import "react-phone-number-input/style.css";

// import flags from "country-flag-icons/react/3x2";

// import MenuItem from "@mui/material/MenuItem";

// // import countryList from "react-phone-number-input/source/country_data.json";

// const getCountryISOLanguage = require("country-iso-2-to-3");

// const ContactUsDialog = ({ open, setOpen }) => {
//   const [email, setEmail] = React.useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [countryCode, setCountryCode] = useState("US");
//   const [value, setValue] = useState();
//   const [country, setCountry] = useState();

//   const handleOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleSubmit = () => {
//     // Send contact information to server
//     // alert(`Email: ${email}, Phone Number: ${phoneNumber}`);
//     handleClose();
//   };
//   const getUserCountry = async () => {
//     const response = await fetch('https://ipapi.co/json/');
//     const data = await response.json();
//     setCountry(data?.country_code);
//   }

//   // React.useEffect(() => {
//   //   const countryCode = getCountryISOLanguage(); // 'IN' for India
//   //   setCountryCode(countryCode);
//   //   setPhoneNumber(`+${countryCode}`);
//   // }, []);

//   React.useEffect(() => {
//     getUserCountry();
//   }, []);

//   const handleChange = (e) => {
//     setValue(e);
//     setCountry(e.country);
//   };

//   console.log("country", country)
//   const handlePhoneNumberChange = (value) => {
//     setPhoneNumber(value);
//   };

//   const handleCountryChange = (countryCode) => {
//     setCountry(countryCode);
//   };

//   return (
//     <div>
//       <Dialog
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="contact-us-dialog-title"
//         aria-describedby="contact-us-dialog-description"
//       >
//         <DialogTitle id="contact-us-dialog-title">Contact Us</DialogTitle>
//         <DialogContent>
//           <TextField
//             id="email"
//             label="Email"
//             type="email"
//             value={email}
//             onChange={(event) => setEmail(event.target.value)}
//             fullWidth
//           />
//           {/* <TextField
//             id="phone-number"
//             label="Phone Number with country code"
//             type="tel"
//             value={phoneNumber}
//             onChange={(event) => setPhoneNumber(event.target.value)}
//             fullWidth
//             margin="normal"
//           /> */}
//           <PhoneInput
//             country={country}
//             defaultCountry={country}
//             value={phoneNumber}
//             onChange={setPhoneNumber}
//             placeholder="Enter phone number"
//             onCountryChange={setCountry}
//             style={{
//               // custom styles
//               border: "1px solid blue",
//               borderRadius: "8px",
//               padding: "8px",
//             }}
//           />
//           {/* <TextField
//       label="Phone Number with country code"
//       value={phoneNumber}
//       onChange={(event) => handlePhoneNumberChange(event.target.value)}
//       fullWidth
//       margin="normal"
//       InputProps={{
//         startAdornment: (
//           <InputAdornment position="start">
//             <PhoneInput
//               country={country}
//               value={phoneNumber}
//               onChange={handlePhoneNumberChange}
//               onCountryChange={handleCountryChange}
//               containerStyle={{
//                 borderRadius: 0,
//                 border: 'none',
//                 padding: 0,
//                 backgroundColor: 'transparent',
//               }}
//               inputStyle={{
//                 width: '100%',
//                 height: '100%',
//                 borderRadius: 0,
//                 border: 'none',
//                 boxShadow: 'none',
//                 padding: '8px 0', // Add some padding to match Material-UI's TextField
//                 backgroundColor: 'transparent',
//               }}
//             />
//           </InputAdornment>
//         ),
//       }}
//     /> */}

//           <div>
//             {flags[countryCode]} {countryCode}
//           </div>

//           {/* <TextField
//             label="Phone Number"
//             value={value}
//             onChange={handleChange}
//             InputProps={{
//               inputComponent: PhoneInput,
//               inputProps: {
//                 country,
//                 value,
//                 onChange: handleChange,
//               },
//             }}
//             select
//           >
//             {countryList.map((country) => (
//               <MenuItem key={country.code} value={country.code}>
//                 {country.name} ({country.dialCode})
//               </MenuItem>
//             ))}
//           </TextField> */}
//         </DialogContent>

//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>

//           <Button onClick={handleSubmit}>Submit</Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default ContactUsDialog;

import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import { countryList } from "./countryList";
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

const ContactUsDialog = ({ open, setOpen }) => {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    const getUserCountry = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        const country = countryList.find(
          (c) => c.code.toLowerCase() === data.country_code.toLowerCase()
        );
        setSelectedCountry(country);
        setCountryCode(country);
        setPhoneNumber(""); // Reset phoneNumber when country changes
      } catch (error) {
        console.error("Error fetching user country:", error);
        const defaultCountry = countryList.find((c) => c.code === "US");
        setSelectedCountry(defaultCountry);
        setCountryCode(defaultCountry);
        setPhoneNumber(""); // Reset phoneNumber when country changes
      }
    };

    getUserCountry();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/send-email.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, phoneNumber, countryCode }),
      });
      if (response.ok) {
        console.log('Email sent successfully');
        handleClose();
      } else {
        console.error('Error sending email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleCountryChange = (event, newValue) => {
    console.log("event", event, newValue)
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        aria-labelledby="contact-us-dialog-title"
        aria-describedby="contact-us-dialog-description"
      >
        <DialogTitle id="contact-us-dialog-title">Contact Us</DialogTitle>
        <DialogContent>
          <TextField
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            fullWidth
            margin="normal"
          />
          {/* <TextField
            id="country-code"
            label="Country Code"
            value={countryCode}
            defaultValue={selectedCountry ? selectedCountry.dialCode : ""}
            select
            onChange={handleCountryChange}
            fullWidth
            margin="normal"
          >
            {countryList.map((country) => (
              <MenuItem key={country.code} value={country.code}>
                {`${country.name} (${country.dialCode})`}
              </MenuItem>
            ))}
          </TextField> */}
          <Autocomplete
            value={countryCode}
            onChange={handleCountryChange}
            options={countryList}
            getOptionLabel={(option) => `${option.name} (${option.dialCode})`}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Country Code"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {false ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
          />
          <TextField
            id="phone-number"
            label="Phone Number"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" sx={{ borderRadius: '10px', bgcolor: '#14b8a6 !important' }} onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ContactUsDialog;
