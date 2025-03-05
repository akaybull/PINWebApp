import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import Cookies from "js-cookie";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post("/TokenAuth/Authenticate", {
        userNameOrEmailAddress: credentials.username,
        password: credentials.password,
        rememberClient: credentials.rememberMe || false,
      });

      if (response.data.result.accessToken) {
        Cookies.set("token", response.data.result.accessToken, {
          expires: credentials.rememberMe ? 7 : 1,
        });
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCurrentLoginInformationsWithRoles = createAsyncThunk(
  "auth/getCurrentLoginInformationsWithRoles",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "/services/app/Session/GetCurrentLoginInformationsWithRoles"
      );
      return response.data.result;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: Cookies.get("token") || null,
    isLoading: false,
    error: null,
    userInformantionError: null,
    informantionIsLoading: false,
    application: null,
    firmAddressId: null,
    firmId: null,
    roles: null,
    salePlace: null,
    subWarehouseId: null,
    tenant: null,
    user: null,
    userType: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      Cookies.remove("token");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.result.accessToken;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.error;
      })
      .addCase(getCurrentLoginInformationsWithRoles.pending, (state) => {
        state.informantionIsLoading = true;
      })
      .addCase(
        getCurrentLoginInformationsWithRoles.fulfilled,
        (state, action) => {
          (state.application = action.payload.application),
            (state.firmAddressId = action.payload.firmAddressId),
            (state.firmId = action.payload.firmId),
            (state.roles = action.payload.roles),
            (state.salePlace = action.payload.salePlace),
            (state.subWarehouseId = action.payload.subWarehouseId),
            (state.tenant = action.payload.tenant),
            (state.user = action.payload.user),
            (state.userType = action.payload.userType);
        }
      )
      .addCase(
        getCurrentLoginInformationsWithRoles.rejected,
        (state, action) => {
          state.informantionIsLoading = false;
          state.userInformantionError = action.payload.error;
        }
      );
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
