import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
  IconButton,
  Alert,
  CircularProgress
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Visibility as ViewIcon
} from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { fetchDocuments, uploadDocument, deleteDocument } from '../store/slices/documentSlice';

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string(),
  file: Yup.mixed().required('File is required'),
  patientId: Yup.string().required('Patient ID is required'),
  doctorId: Yup.string().required('Doctor ID is required'),
});

const Documents = () => {
  const dispatch = useDispatch();
  const { documents, loading, error } = useSelector((state) => state.documents);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    dispatch(fetchDocuments());
  }, [dispatch]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      patientId: '',
      doctorId: '',
      isPrivate: true,
    },
    validationSchema,
    onSubmit: async (values) => {
      const documentData = {
        ...values,
        file: selectedFile,
      };
      await dispatch(uploadDocument(documentData));
      setOpenDialog(false);
      formik.resetForm();
      setSelectedFile(null);
    },
  });

  const handleDelete = async (documentId) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      await dispatch(deleteDocument(documentId));
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Documents</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
        >
          Upload Document
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {documents.map((document) => (
          <Grid item xs={12} sm={6} md={4} key={document._id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {document.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {document.description}
                </Typography>
                <Typography variant="caption" display="block">
                  Uploaded: {new Date(document.uploadDate).toLocaleDateString()}
                </Typography>
                <Box display="flex" justifyContent="flex-end" mt={2}>
                  <IconButton
                    size="small"
                    onClick={() => window.open(document.fileUrl, '_blank')}
                  >
                    <ViewIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(document._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Upload New Document</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <TextField
              fullWidth
              margin="normal"
              name="title"
              label="Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            <TextField
              fullWidth
              margin="normal"
              name="description"
              label="Description"
              multiline
              rows={3}
              value={formik.values.description}
              onChange={formik.handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              name="patientId"
              label="Patient ID"
              value={formik.values.patientId}
              onChange={formik.handleChange}
              error={formik.touched.patientId && Boolean(formik.errors.patientId)}
              helperText={formik.touched.patientId && formik.errors.patientId}
            />
            <TextField
              fullWidth
              margin="normal"
              name="doctorId"
              label="Doctor ID"
              value={formik.values.doctorId}
              onChange={formik.handleChange}
              error={formik.touched.doctorId && Boolean(formik.errors.doctorId)}
              helperText={formik.touched.doctorId && formik.errors.doctorId}
            />
            <input
              accept="image/*,.pdf"
              style={{ display: 'none' }}
              id="file-input"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="file-input">
              <Button
                variant="outlined"
                component="span"
                fullWidth
                sx={{ mt: 2 }}
              >
                {selectedFile ? selectedFile.name : 'Choose File'}
              </Button>
            </label>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button type="submit" variant="contained" disabled={loading}>
              Upload
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Documents; 