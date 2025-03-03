import axios from 'axios';

const API_URL = '/api/documents';

const getAuthHeader = () => ({
  headers: { 'x-auth-token': localStorage.getItem('token') }
});

const documentService = {
  // Upload document
  uploadDocument: async (documentData) => {
    const formData = new FormData();
    formData.append('file', documentData.file);
    formData.append('title', documentData.title);
    formData.append('description', documentData.description);
    formData.append('patientId', documentData.patientId);
    formData.append('doctorId', documentData.doctorId);
    if (documentData.tags) {
      formData.append('tags', documentData.tags.join(','));
    }
    formData.append('isPrivate', documentData.isPrivate);

    const response = await axios.post(API_URL + '/upload', formData, {
      ...getAuthHeader(),
      'Content-Type': 'multipart/form-data'
    });
    return response;
  },

  // Get all documents
  getDocuments: async () => {
    const response = await axios.get(API_URL, getAuthHeader());
    return response;
  },

  // Get document by ID
  getDocumentById: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`, getAuthHeader());
    return response;
  },

  // Delete document
  deleteDocument: async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`, getAuthHeader());
    return response;
  },

  // Update document
  updateDocument: async (id, updateData) => {
    const response = await axios.put(`${API_URL}/${id}`, updateData, getAuthHeader());
    return response;
  }
};

export default documentService; 