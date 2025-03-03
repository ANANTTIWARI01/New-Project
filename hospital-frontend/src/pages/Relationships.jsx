import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Relationships = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Relationships
        </Typography>
        <Typography variant="body1">
          Manage your relationships and connections here.
        </Typography>
      </Box>
    </Container>
  );
};

export default Relationships; 