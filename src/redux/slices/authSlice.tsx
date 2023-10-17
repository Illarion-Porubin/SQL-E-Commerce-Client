import { createSlice, createAsyncThunk, AnyAction, PayloadAction } from "@reduxjs/toolkit";
import { UpdateTypes, UserTypes } from "../../types/types";
import axios from "../../http/index";

export const fetchRegistration = createAsyncThunk<UserTypes, { username: FormDataEntryValue, email: FormDataEntryValue, password: FormDataEntryValue, phone: FormDataEntryValue }, { rejectValue: string }>(
  "api/fetchRegistration", async (params, { rejectWithValue }) => {
    const { data }: { data: UserTypes } = await axios.post("/api/registration", params);
    if (!data) {
      return rejectWithValue("Server Error!");
    }
    return data;
  });

export const fetchLogin = createAsyncThunk<UserTypes, { email: FormDataEntryValue, password: FormDataEntryValue }, { rejectValue: string }>(
  "api/fetchLogin", async (params, { rejectWithValue }) => {
    const { data }: { data: UserTypes } = await axios.post("/api/login", params);
    if (!data) {
      return rejectWithValue("Server Error!");
    }
    return data;
  }
);

export const ThirdPartyAuthorization = createAsyncThunk(
  "api/GooglefetchLogin", async (_, { rejectWithValue }) => {
    const { data }: { data: any } = await axios.get("/auth/login/success");
    if (!data) {
      return rejectWithValue("Server Error!");
    }
    return data.user; 
  }
);

export const fetchAuthMe = createAsyncThunk<UserTypes, void, { rejectValue: string }>(
  "api/fetchAuthMe", async (_, { rejectWithValue }) => {
    const { data }: { data: UserTypes } = await axios.get("/api/me");
    if (!data) {
      return rejectWithValue("Server Error!");
    }
    return data;
  }
);


export const fetchUpdateInfo = createAsyncThunk<UserTypes, UpdateTypes, { rejectValue: string }>(
  "api/fetchUpdateInfo",
  async (params, { rejectWithValue }) => {
    const { data }: { data: UserTypes } = await axios.put("/api/update", params);
    if (!data) {
      return rejectWithValue("Server Error!");
    }
    return data;
  }
);

export const fetchUploadAvatar = createAsyncThunk<UserTypes, FormData, { rejectValue: string }>(
  "api/fetchUploadAvatar", async (params, { rejectWithValue }) => {
    const { data }: { data: UserTypes } = await axios.post("/api/avatar", params);
    if (!data) {
      return rejectWithValue("Server Error!");
    }
    return data;
  });

export const fetchDeleteAvatar = createAsyncThunk<UserTypes, undefined, { rejectValue: string }>(
  "api/fetchDeleteAvatar",
  async (_, { rejectWithValue }) => {
    const { data }: { data: UserTypes } = await axios.delete("/api/avatar/");
    if (!data) {
      return rejectWithValue("Server Error!");
    }
    return data;
  }
);

export type AuthState = {
  data: UserTypes | null;
  isLoading: "idle" | "loading" | "loaded" | "error";
  error: string | null;
}

const initialState: AuthState = {
  data: null,
  isLoading: "idle",
  error: null,
};


export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      ///fetchRegister
      .addCase(fetchRegistration.pending, (state) => {
        state.data = null;
        state.isLoading = "loading";
      })
      .addCase(fetchRegistration.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = "loaded";
      })
      .addCase(fetchRegistration.rejected, (state) => {
        state.data = null;
        state.isLoading = "error";
      })
      ///ThirdPartyAuthorization
      .addCase(ThirdPartyAuthorization.pending, (state) => {
        state.data = null;
        state.isLoading = "loading";
      })
      .addCase(ThirdPartyAuthorization.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = "loaded";
      }) 
      .addCase(ThirdPartyAuthorization.rejected, (state) => {
        state.data = null;
        state.isLoading = "error";
      })
      ///fetchLogin
      .addCase(fetchLogin.pending, (state) => {
        state.data = null;
        state.isLoading = "loading";
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = "loaded";
      })
      .addCase(fetchLogin.rejected, (state) => {
        state.data = null;
        state.isLoading = "error";
      })
      ///fetchAuthMe
      .addCase(fetchAuthMe.pending, (state) => {
        state.data = null;
        state.isLoading = "loading";
      })
      .addCase(fetchAuthMe.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = "loaded";
      })
      .addCase(fetchAuthMe.rejected, (state) => {
        state.data = null;
        state.isLoading = "error";
      })
      ///catch errors
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.type;
        state.isLoading = "error"
      })
  },
});

export default authSlice.reducer;
export const { logout } = authSlice.actions;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}