import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { AuthState, LoginCredentials, RegisterData } from "@app/types/auth";
import { authService } from "@app/services/authService";

const initialState: AuthState = {
  user: null,
  token: authService.getToken(),
  isAuth: authService.isAuthenticated(),
  isLoading: false,
  error: null,
  isError: false,
  _persisted: false,
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData: LoginCredentials, { rejectWithValue }) => {
    try {
      const data = await authService.login(userData);
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("Unknown error occurred");
      }
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData: RegisterData, { rejectWithValue }) => {
    try {
      const data = await authService.register(userData);
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("Unknown error occurred");
      }
    }
  },
);

export const fetchUserProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const data = await authService.getProfile();
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("Unknown error occurred");
      }
    }
  },
);

export const logoutUser = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
  try {
    await authService.logout();
    return;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue("Unknown error occurred");
    }
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuth = true;
      authService.setToken(action.payload.token);
    },
    clearCredentials: (state) => {
      state.user = null;
      state.token = null;
      state.isAuth = false;
      authService.clearToken();
    },
    setPersisted: (state) => {
      state._persisted = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
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
        state.isAuth = false;
        state.error = action.payload as string;
        state.isError = true;
        authService.clearToken();
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isError = false;
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
        state.isError = true;
        authService.clearToken();
      })
      // Fetch Profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuth = true;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuth = false;
        state.error = action.payload as string;
        state.isError = true;
        authService.clearToken();
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuth = false;
        state.error = null;
        state.isError = false;
      });
  },
});

export const { setCredentials, clearCredentials, setPersisted } = authSlice.actions;
export default authSlice.reducer;
