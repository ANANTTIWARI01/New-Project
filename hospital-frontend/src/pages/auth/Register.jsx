import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Alert,
  Paper,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { register } from '../../store/slices/authSlice';

const steps = ['Account Type', 'Basic Information', 'Additional Details'];

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  name: Yup.string()
    .required('Name is required'),
  userType: Yup.string()
    .oneOf(['doctor', 'patient'], 'Please select a valid user type')
    .required('User type is required'),
  // Doctor specific fields
  specialization: Yup.string()
    .when('userType', {
      is: 'doctor',
      then: Yup.string().required('Specialization is required for doctors')
    }),
  registrationNumber: Yup.string()
    .when('userType', {
      is: 'doctor',
      then: Yup.string().required('Registration number is required for doctors')
    }),
  // Patient specific fields
  aadhaarNumber: Yup.string()
    .when('userType', {
      is: 'patient',
      then: Yup.string()
        .length(12, 'Aadhaar number must be 12 digits')
        .required('Aadhaar number is required for patients')
    })
});

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [activeStep, setActiveStep] = useState(0);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      userType: '',
      specialization: '',
      registrationNumber: '',
      aadhaarNumber: '',
      phone: '',
      address: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await dispatch(register(values)).unwrap();
        navigate('/dashboard');
      } catch (err) {
        // Error handled by redux
      }
    },
  });

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <FormControl component="fieldset">
            <FormLabel component="legend">Select Account Type</FormLabel>
            <RadioGroup
              name="userType"
              value={formik.values.userType}
              onChange={formik.handleChange}
            >
              <FormControlLabel
                value="doctor"
                control={<Radio />}
                label="Doctor"
              />
              <FormControlLabel
                value="patient"
                control={<Radio />}
                label="Patient"
              />
            </RadioGroup>
          </FormControl>
        );

      case 1:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="name"
                label="Full Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="email"
                label="Email Address"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              />
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="phone"
                label="Phone Number"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="address"
                label="Address"
                multiline
                rows={3}
                value={formik.values.address}
                onChange={formik.handleChange}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
            </Grid>
            {formik.values.userType === 'doctor' && (
              <>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="specialization"
                    label="Specialization"
                    value={formik.values.specialization}
                    onChange={formik.handleChange}
                    error={formik.touched.specialization && Boolean(formik.errors.specialization)}
                    helperText={formik.touched.specialization && formik.errors.specialization}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="registrationNumber"
                    label="Registration Number"
                    value={formik.values.registrationNumber}
                    onChange={formik.handleChange}
                    error={formik.touched.registrationNumber && Boolean(formik.errors.registrationNumber)}
                    helperText={formik.touched.registrationNumber && formik.errors.registrationNumber}
                  />
                </Grid>
              </>
            )}
            {formik.values.userType === 'patient' && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="aadhaarNumber"
                  label="Aadhaar Number"
                  value={formik.values.aadhaarNumber}
                  onChange={formik.handleChange}
                  error={formik.touched.aadhaarNumber && Boolean(formik.errors.aadhaarNumber)}
                  helperText={formik.touched.aadhaarNumber && formik.errors.aadhaarNumber}
                />
              </Grid>
            )}
          </Grid>
        );

      default:
        return 'Unknown step';
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
              {error}
            </Alert>
          )}

          <Box sx={{ width: '100%', mt: 3 }}>
            <Stepper activeStep={activeStep}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
              {getStepContent(activeStep)}

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mr: 1 }}>
                    Back
                  </Button>
                )}
                {activeStep === steps.length - 1 ? (
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                  >
                    {loading ? 'Registering...' : 'Register'}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={
                      (activeStep === 0 && !formik.values.userType) ||
                      (activeStep === 1 && (!formik.values.email || !formik.values.password || !formik.values.name))
                    }
                  >
                    Next
                  </Button>
                )}
              </Box>
            </Box>
          </Box>

          <Grid container justifyContent="flex-end" sx={{ mt: 3 }}>
            <Grid item>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <Typography variant="body2" color="primary">
                  Already have an account? Sign in
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register; 