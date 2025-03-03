import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  relationships: [],
  loading: false,
  error: null,
};

const relationshipSlice = createSlice({
  name: 'relationships',
  initialState,
  reducers: {
    setRelationships: (state, action) => {
      state.relationships = action.payload;
      state.loading = false;
      state.error = null;
    },
    addRelationship: (state, action) => {
      state.relationships.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    updateRelationship: (state, action) => {
      const index = state.relationships.findIndex(rel => rel.id === action.payload.id);
      if (index !== -1) {
        state.relationships[index] = action.payload;
      }
      state.loading = false;
      state.error = null;
    },
    deleteRelationship: (state, action) => {
      state.relationships = state.relationships.filter(rel => rel.id !== action.payload);
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setRelationships,
  addRelationship,
  updateRelationship,
  deleteRelationship,
  setLoading,
  setError,
} = relationshipSlice.actions;
export default relationshipSlice.reducer; 