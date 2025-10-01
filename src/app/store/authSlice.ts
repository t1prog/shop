import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";

import type {
  AuthState,
  LoginCredentials,
  User,
  RegisterData,
} from "@app/types/auth";

import { storageGet, storageSet } from "@app/utils/localStorage";

const initialState: AuthState = {
  user: null,
  token: storageGet("token", null),
  isAuth: !!storageGet("token", null),
  isLoading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData: LoginCredentials, { rejectWithValue }) => {
    try {
      // Мб перейду на axios
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "login failed");
      }

      storageSet("token", data.token);

      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("unknown error");
      }
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData: RegisterData, { rejectWithValue }) => {
    try {
      // Мб перейду на axios
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("unknown error");
      }
    }
  },
);

export const fetchUserProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      // Мб перейду на axios
      const token = storageGet("token", null);
      const response = await fetch("/api/auth/me", {
        headers: { "Authorization": `Bearer ${token}` },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "fetch profile failed");
      }

      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("unknown error");
      }
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      // и тут
      state.token = null;
      // и там
      storageSet("token", null);
      state.isAuth = false;
      state.error = null;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuth = true;
    },
    // Чтоб было
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      // login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuth = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuth = false;
      })
      // reg
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuth = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // fetch profile
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuth = true;
      })
      .addCase(fetchUserProfile.rejected, (state) => {
        state.user = null;
        state.token = null;
        state.isAuth = false;
        storageSet("token", null);
      });
  },
});

export const { logout, clearError, setUser } = authSlice.actions;
export default authSlice.reducer;
