import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import documentReducer from './slices/documentSlice';
import profileReducer from './slices/profileSlice';
import relationshipReducer from './slices/relationshipSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    documents: documentReducer,
    profile: profileReducer,
    relationships: relationshipReducer,
  },
}); 