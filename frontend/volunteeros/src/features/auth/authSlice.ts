import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserProfile {
  id: string;
  roles: [];
  firstName: string;
  lastName: string;
  city: string;
  phone: string;
  avatar: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  registrationMessage: string;
  user: UserProfile | null;
  error: string | null;
}

const initialState: AuthState = {
  registrationMessage: "",
  error: null,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerSuccess: (state, action: PayloadAction<string>) => {
      state.registrationMessage = action.payload;
      state.error = null;
    },
    registerError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    login: (state, action: PayloadAction<UserProfile>) => {
      state.user = action.payload;
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
    },
  },
  selectors: {
    registrationMessage: (state) => state.registrationMessage,
    error: (state) => state.error,
    user: (state) => state.user,
    isAuthenticated: (state) => Boolean(state.user),
  },
});

export const authSliceActions = authSlice.actions;
export const authSliceSelectors = authSlice.selectors;
