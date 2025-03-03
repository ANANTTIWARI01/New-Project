import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Paper,
  Grid,
  Typography,
  TextField,
  Button,
  Avatar,
  Divider,
  Alert,
  CircularProgress,
  Card,
  CardContent
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Person as PersonIcon } from '@mui/icons-material';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  phone: Yup.string().matches(/^\+?[\d\s-]+$/, 'Invalid phone number'),
  address: Yup.string(),
  specialization: Yup.string().when('userType', {
    is: 'doctor',
    then: Yup.string().required('Specialization is required for doctors')
  }),
  registrationNumber: Yup.string().when('userType', {
    is: 'doctor',
    then: Yup.string().required('Registration number is required for doctors')
  }),
  aadhaarNumber: Yup.string().when('userType', {
    is: 'patient',
    then: Yup.string().required('Aadhaar number is required for patients')
  })
});

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
      specialization: user?.specialization || '',
      registrationNumber: user?.registrationNumber || '',
      aadhaarNumber: user?.aadhaarNumber || '',
      userType: user?.userType || ''
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // await dispatch(updateProfile(values));
        setIsEditing(false);
      } catch (err) {
        // Error handled by redux
      }
    }
  });

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Profile Overview */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3}>
            <Box p={3} textAlign="center">
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  margin: '0 auto',
                  bgcolor: 'primary.main'
                }}
              >
                <PersonIcon sx={{ fontSize: 60 }} />
              </Avatar>
              <Typography variant="h6" sx={{ mt: 2 }}>
                {user?.name}
              </Typography>
              <Typography color="textSecondary">
                {user?.userType?.charAt(0).toUpperCase() + user?.userType?.slice(1)}
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Cancel Edit' : 'Edit Profile'}
              </Button>
            </Box>
          </Paper>

          {/* Additional Info Card */}
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Account Information
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body2" color="textSecondary">
                Member since: {new Date(user?.createdAt).toLocaleDateString()}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Last updated: {new Date(user?.updatedAt).toLocaleDateString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Profile Details Form */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3}>
            <Box p={3}>
              <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                      Personal Information
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="name"
                      label="Name"
                      disabled={!isEditing}
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="email"
                      label="Email"
                      disabled={!isEditing}
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={formik.touched.email && Boolean(formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="phone"
                      label="Phone"
                      disabled={!isEditing}
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
                      disabled={!isEditing}
                      value={formik.values.address}
                      onChange={formik.handleChange}
                      error={formik.touched.address && Boolean(formik.errors.address)}
                      helperText={formik.touched.address && formik.errors.address}
                    />
                  </Grid>

                  {user?.userType === 'doctor' && (
                    <>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          name="specialization"
                          label="Specialization"
                          disabled={!isEditing}
                          value={formik.values.specialization}
                          onChange={formik.handleChange}
                          error={formik.touched.specialization && Boolean(formik.errors.specialization)}
                          helperText={formik.touched.specialization && formik.errors.specialization}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          name="registrationNumber"
                          label="Registration Number"
                          disabled={!isEditing}
                          value={formik.values.registrationNumber}
                          onChange={formik.handleChange}
                          error={formik.touched.registrationNumber && Boolean(formik.errors.registrationNumber)}
                          helperText={formik.touched.registrationNumber && formik.errors.registrationNumber}
                        />
                      </Grid>
                    </>
                  )}

                  {user?.userType === 'patient' && (
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        name="aadhaarNumber"
                        label="Aadhaar Number"
                        disabled={!isEditing}
                        value={formik.values.aadhaarNumber}
                        onChange={formik.handleChange}
                        error={formik.touched.aadhaarNumber && Boolean(formik.errors.aadhaarNumber)}
                        helperText={formik.touched.aadhaarNumber && formik.errors.aadhaarNumber}
                      />
                    </Grid>
                  )}

                  {isEditing && (
                    <Grid item xs={12}>
                      <Box display="flex" justifyContent="flex-end" mt={2}>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          disabled={loading}
                        >
                          {loading ? 'Saving...' : 'Save Changes'}
                        </Button>
                      </Box>
                    </Grid>
                  )}
                </Grid>
              </form>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile; 