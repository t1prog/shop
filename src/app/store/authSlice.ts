import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, LoginCredentials, User, RegisterData } from "@app/types/auth";
import { storage } from "@app/utils/localStorage";

const initialState: AuthState = {
  user: null,
  token: storage.get("token", null),
  isAuth: !!storage.get("token", null),
  isLoading: false,
  error: null,
  isError: false,
  _persisted: false,
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "login failed");
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
    // TODO: REMOVE
    //В режиме разработки — возвращаем мок
    if (import.meta.env.DEV) {
      return {
        user: {
          id: "1",
          name: "Тестовый Пользователь",
          email: "test@example.com",
        },
      };
    }

    try {
      // Мб перейду на axios
      const token = storage.get("token", null);
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
    setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuth = true;
    },
    clearCredentials: (state) => {
      state.user = null;
      state.token = null;
      state.isAuth = false;
    },
    setPersisted: (state) => {
      state._persisted = true;
    },
  },
  extraReducers(builder) {
    builder
      // login
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
      })
      // reg
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
      })
      // fetch profile
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
      });
  },
});

export const { setCredentials, clearCredentials, setPersisted } = authSlice.actions;
export default authSlice.reducer;
