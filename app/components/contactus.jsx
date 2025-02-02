// "use client";
// import React, { useState, useEffect } from "react";
// import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
// import DialogTitle from "@mui/material/DialogTitle";
// import DialogContent from "@mui/material/DialogContent";
// import DialogActions from "@mui/material/DialogActions";
// import TextField from "@mui/material/TextField";
// import { countryList } from "./countryList";
// import Autocomplete from '@mui/material/Autocomplete';
// import CircularProgress from '@mui/material/CircularProgress';

// const ContactUsDialog = ({ open, setOpen }) => {
//   const [email, setEmail] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [countryCode, setCountryCode] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [selectedCountry, setSelectedCountry] = useState(null);

//   useEffect(() => {
//     const getUserCountry = async () => {
//       try {
//         const response = await fetch("https://ipapi.co/json/");
//         const data = await response.json();
//         const country = countryList.find(
//           (c) => c.code.toLowerCase() === data.country_code.toLowerCase()
//         );
//         setSelectedCountry(country);
//         setCountryCode(country);
//         setPhoneNumber(""); // Reset phoneNumber when country changes
//       } catch (error) {
//         console.error("Error fetching user country:", error);
//         const defaultCountry = countryList.find((c) => c.code === "US");
//         setSelectedCountry(defaultCountry);
//         setCountryCode(defaultCountry);
//         setPhoneNumber(""); // Reset phoneNumber when country changes
//       }
//     };

//     getUserCountry();
//   }, []);

//   const handleOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await fetch('/send-email.php', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, phoneNumber, countryCode }),
//       });
//       if (response.ok) {
//         console.log('Email sent successfully');
//         handleClose();
//       } else {
//         console.error('Error sending email');
//       }
//     } catch (error) {
//       console.error('Error sending email:', error);
//     }
//   };

//   const handlePhoneNumberChange = (event) => {
//     setPhoneNumber(event.target.value);
//   };

//   const handleCountryChange = (event, newValue) => {
//     console.log("event", event, newValue)
//   };

//   return (
//     <div>
//       <Dialog
//         open={open}
//         onClose={handleClose}
//         fullWidth
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
//             margin="normal"
//           />
//           {/* <TextField
//             id="country-code"
//             label="Country Code"
//             value={countryCode}
//             defaultValue={selectedCountry ? selectedCountry.dialCode : ""}
//             select
//             onChange={handleCountryChange}
//             fullWidth
//             margin="normal"
//           >
//             {countryList.map((country) => (
//               <MenuItem key={country.code} value={country.code}>
//                 {`${country.name} (${country.dialCode})`}
//               </MenuItem>
//             ))}
//           </TextField> */}
//           <Autocomplete
//             value={countryCode}
//             onChange={handleCountryChange}
//             options={countryList}
//             getOptionLabel={(option) => `${option.name} (${option.dialCode})`}
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 label="Country Code"
//                 InputProps={{
//                   ...params.InputProps,
//                   endAdornment: (
//                     <React.Fragment>
//                       {false ? (
//                         <CircularProgress color="inherit" size={20} />
//                       ) : null}
//                       {params.InputProps.endAdornment}
//                     </React.Fragment>
//                   ),
//                 }}
//               />
//             )}
//           />
//           <TextField
//             id="phone-number"
//             label="Phone Number"
//             value={phoneNumber}
//             onChange={handlePhoneNumberChange}
//             fullWidth
//             margin="normal"
//           />
//         </DialogContent>

//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button variant="contained" sx={{ borderRadius: '10px', bgcolor: '#14b8a6 !important' }} onClick={handleSubmit}>Submit</Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default ContactUsDialog;
// app/components/ContactUsDialog.js
'use client';

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
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const ContactUsDialog = ({ open, setOpen }) => {
  const [formData, setFormData] = useState({
    email: '',
    phoneNumber: '',
    countryCode: null
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    const getUserCountry = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        const country = countryList.find(
          (c) => c.code.toLowerCase() === data.country_code.toLowerCase()
        );
        setFormData(prev => ({
          ...prev,
          countryCode: country
        }));
      } catch (error) {
        console.error("Error fetching user country:", error);
        const defaultCountry = countryList.find((c) => c.code === "IN");
        setFormData(prev => ({
          ...prev,
          countryCode: defaultCountry
        }));
      }
    };

    getUserCountry();
  }, []);

  const handleClose = () => {
    setOpen(false);
    // Reset form when dialog closes
    setFormData({
      email: '',
      phoneNumber: '',
      countryCode: null
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSnackbar({
          open: true,
          message: 'Message sent successfully!',
          severity: 'success'
        });
        handleClose();
      } else {
        throw new Error(data.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error:', error);
      setSnackbar({
        open: true,
        message: error.message || 'Failed to send message. Please try again.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field) => (event, newValue) => {
    setFormData(prev => ({
      ...prev,
      [field]: field === 'countryCode' ? newValue : event.target.value
    }));
  };

  const isFormValid = formData.email && formData.phoneNumber && formData.countryCode;

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        aria-labelledby="contact-us-dialog-title"
      >
        <DialogTitle id="contact-us-dialog-title">Contact Us</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} noValidate>
            <TextField
              id="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleInputChange('email')}
              fullWidth
              margin="normal"
              required
              error={!formData.email}
            />
            <Autocomplete
              value={formData.countryCode}
              onChange={handleInputChange('countryCode')}
              options={countryList}
              getOptionLabel={(option) => option ? `${option.name} (${option.dialCode})` : ''}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Country Code"
                  required
                  error={!formData.countryCode}
                  margin="normal"
                />
              )}
            />
            <TextField
              id="phone-number"
              label="Phone Number"
              value={formData.phoneNumber}
              onChange={handleInputChange('phoneNumber')}
              fullWidth
              margin="normal"
              required
              error={!formData.phoneNumber}
            />
          </form>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleSubmit}
            disabled={loading || !isFormValid}
            sx={{ 
              borderRadius: '10px', 
              bgcolor: '#14b8a6 !important',
              '&:disabled': {
                bgcolor: 'rgba(0, 0, 0, 0.12) !important'
              }
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
      >
        <Alert 
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ContactUsDialog;