import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Admin = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Admin Dashboard
        </Typography>
        <Typography variant="body1">
          Administrative controls and management tools.
        </Typography>
      </Box>
    </Container>
  );
};

export default Admin; 