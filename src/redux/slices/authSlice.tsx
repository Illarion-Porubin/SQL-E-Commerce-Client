import { createSlice, createAsyncThunk, AnyAction, PayloadAction } from "@reduxjs/toolkit";
import { UpdateTypes, UserTypes } from "../../types/types";
import axios from "../../http/index"; ///for work 
// import axios from "axios"; ///for tests"

// export const fetchRegistration = createAsyncThunk<UserTypes, { username: FormDataEntryValue, email: FormDataEntryValue, password: FormDataEntryValue, phone: FormDataEntryValue }, { rejectValue: string }>(
//   "api/fetchRegistration", async (params, { rejectWithValue }) => {
//     try {
//       const { data }: { data: UserTypes } = await axios.post("/api/registration", params);
//       if (!data) {
//         return rejectWithValue("Server Error!");
//       }
//       return data;
//     } catch (error) {
//       return rejectWithValue("Can't fetchRegistration");
//     }
//   });

export const fetchRegistration = createAsyncThunk<string, { username: FormDataEntryValue, email: FormDataEntryValue, password: FormDataEntryValue, phone: FormDataEntryValue }, { rejectValue: string }>(
  "api/fetchRegistration", async (params, { rejectWithValue }) => {
    try {
      if (params) {
        await axios.post("/api/registration", params);
        return "User added"
      }
      return rejectWithValue("Server Error!");
    } catch (error) {
      return rejectWithValue("Can't fetchRegistration");
    }
  });

export const fetchLogin = createAsyncThunk<UserTypes, { email: FormDataEntryValue, password: FormDataEntryValue }, { rejectValue: string }>(
  "api/fetchLogin", async (params, { rejectWithValue }) => {
    try {
      if (!params) {
        return rejectWithValue("Value not found!");
      }
      const { data }: { data: UserTypes } = await axios.post("/api/login", params);
      if (!data) {
        return rejectWithValue("Server Error!");
      }
      return data;
    } catch (error) {
      return rejectWithValue("Can't fetchLogin");
    }
  }
);

export const ThirdPartyAuthorization = createAsyncThunk(
  "api/ThirdPartyAuthorization", async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/auth/login/success");
      if (!data) {
        return rejectWithValue("Server Error!");
      }
      return data.user;
    } catch (error) {
      return rejectWithValue("Can't ThirdPartyAuthorization");
    }
  }
);

export const fetchAuthMe = createAsyncThunk<UserTypes, void, { rejectValue: string }>(
  "api/fetchAuthMe", async (_, { rejectWithValue }) => {
    try {
      const { data }: { data: UserTypes } = await axios.get("/api/me", { withCredentials: true });
      if (!data) {
        return rejectWithValue("Server Error!");
      }
      return data;
    } catch (error) {
      return rejectWithValue("Can't fetchAuthMe");
    }
  }
);


export const fetchUpdateInfo = createAsyncThunk<UserTypes, UpdateTypes, { rejectValue: string }>(
  "api/fetchUpdateInfo",
  async (params, { rejectWithValue }) => {
    console.log(params, 'params<<<<<<<<<<<')
    try {
      const { data }: { data: UserTypes } = await axios.put("/api/update", params);
      if (!data) {
        return rejectWithValue("Server Error!");
      }
      return data;
    } catch (error) {
      return rejectWithValue("Can't fetchUpdateInfo");
    }
  }
);

// export const fetchUploadAvatar = createAsyncThunk<UserTypes, FormData, { rejectValue: string }>(
//   "api/fetchUploadAvatar", async (params, { rejectWithValue }) => {
//     try {
//       const { data }: { data: UserTypes } = await axios.post("/api/avatar", params);
//       if (!data) {
//         return rejectWithValue("Server Error!");
//       }
//       return data;
//     } catch (error) {
//       return rejectWithValue("Can't fetchUploadAvatar");
//     }
//   });

// export const fetchDeleteAvatar = createAsyncThunk<UserTypes, undefined, { rejectValue: string }>(
//   "api/fetchDeleteAvatar",
//   async (_, { rejectWithValue }) => {
//     try {
//       const { data }: { data: UserTypes } = await axios.delete("/api/avatar/");
//       if (!data) {
//         return rejectWithValue("Server Error!");
//       }
//       return data;
//     } catch (error) {
//       return rejectWithValue("Can't fetchDeleteAvatar");
//     }
//   }
// );

export const fetchUpdateAvatar = createAsyncThunk<UserTypes, { email: string, avatar: string }, { rejectValue: string }>(
  "api/fetchUpdateAvatar",
  async (params, { rejectWithValue }) => {
    try {
      const { data }: { data: UserTypes } = await axios.put("/api/avatar", params);
      if (!data) {
        return rejectWithValue("Server Error!");
      }
      return data;
    } catch (error) {
      return rejectWithValue("Can't fetchUpdateAvatar");
    }
  }
);

export const fetchDeleteAvatar = createAsyncThunk<UserTypes, string, { rejectValue: string }>(
  "api/fetchDeleteAvatar",
  async (id, { rejectWithValue }) => {
    const { data }: { data: UserTypes } = await axios.delete("/api/photo/" + id);
    if (!data) {
      return rejectWithValue("Server Error!");
    }
    const auth: UserTypes = data
    return auth;
  }
);

export type authState = {
  data: UserTypes | null;
  isLoading: "idle" | "loading" | "loaded" | "error";
  error: string | null;
}

const initialState: authState = {
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
      ///fetchRegistration
      // .addCase(fetchRegistration.pending, (state) => {
      //   console.log('pending <<<')
      //   state.data = null;
      //   state.isLoading = "loading";
      //   state.error = null;
      // })
      // .addCase(fetchRegistration.fulfilled, (state, action) => {
      //   console.log(action.payload, '<<<')
      //   state.data = action.payload;
      //   state.isLoading = "loaded";
      //   state.error = null;
      // })
      // .addCase(fetchRegistration.rejected, (state) => {
      //   console.log('rejected <<<')
      //   state.data = null;
      //   state.isLoading = "error";
      //   state.error = "fetchRegistration Error!";
      // })
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