import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../http/index"; ///for work 
// import axios from "axios"; ///for tests"


export const fetchGetCategories = createAsyncThunk<string[], undefined, { rejectValue: string }>(
    "api/fetchGetCategories", async (_, { rejectWithValue }) => {
        try {
            const { data }: { data: string[] } = await axios.get(`/api/category`);
            if (!data) {
                return rejectWithValue("Data undefined");
            }
            return data;
        } catch (error) {
            return rejectWithValue("Can't fetchGetCategories");
        }
    });

interface categoryState {
    data: string[],
    isLoading: "idle" | "loading" | "loaded" | "error";
    error: string | null,
}

export const initialState: categoryState = {
    data: [],
    isLoading: "idle",
    error: null
}


export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            ///fetchGetCategories
            .addCase(fetchGetCategories.pending, (state) => {
                state.data = [];
                state.isLoading = "loading";
                state.error = null;
            })
            .addCase(fetchGetCategories.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = "loaded";
                state.error = null;
            })
            .addCase(fetchGetCategories.rejected, (state) => {
                state.data = [];
                state.isLoading = "error";
                state.error = "fetchGetTrendingByLabel Error!";
            })
    },
})


export default categorySlice.reducer;