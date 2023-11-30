import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../http/index"; ///for work 
import { Category } from "../../types/types";
// import axios from "axios"; ///for tests"


export const fetchGetCategories = createAsyncThunk<Category[], undefined, { rejectValue: string }>(
    "api/fetchGetCategories", async (_, { rejectWithValue }) => {
        try {
            const { data }: { data: Category[] } = await axios.get("/api/category");
            if (!data) {
                return rejectWithValue("Data undefined");
            }
            return data;
        } catch (error) {
            return rejectWithValue("Can't fetchGetCategories");
        }
    });

export const fetchAddCategory = createAsyncThunk<Category[], { title: string }, { rejectValue: string }>(
    "api/fetchAddCategory", async (params, { rejectWithValue }) => {
        try {
            if (params) {
                const { data }: { data: Category[] } = await axios.post("/api/category", params);
                return data;
            }
            return rejectWithValue("Data undefined");
        } catch (error) {
            return rejectWithValue("Can't fetchAddCategory");
        }
    });

export const fetchUpdateCategory = createAsyncThunk<Category[], { id: number, title: string }, { rejectValue: string }>(
    "api/fetchUpdateCategory", async (params, { rejectWithValue }) => {
        try {
            if (params) {
                const { data }: { data: Category[] } = await axios.put("/api/category", params);
                return data;
            }
            return rejectWithValue("Data undefined");
        } catch (error) {
            return rejectWithValue("Can't fetchUpdateCategory");
        }
    });

export const fetchDeleteCategory = createAsyncThunk<Category[], any, { rejectValue: string }>(
    "api/fetchDeleteCategory", async (params, { rejectWithValue }) => {
        try {
            if (params) {
                const { data }: { data: Category[] } = await axios.delete("/api/category", { data: params });
                return data;
            }
            return rejectWithValue("Data undefined");
        } catch (error) {
            return rejectWithValue("Can't fetchDeleteCategory");
        }
    });

interface categoryState {
    data: Category[],
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
                state.error = "fetchGetCategories Error!";
            })
            ///fetchAddCategory
            .addCase(fetchAddCategory.pending, (state) => {
                state.data = [];
                state.isLoading = "loading";
                state.error = null;
            })
            .addCase(fetchAddCategory.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = "loaded";
                state.error = null;
            })
            .addCase(fetchAddCategory.rejected, (state) => {
                state.data = [];
                state.isLoading = "error";
                state.error = "fetchAddCategory Error!";
            })
            ///fetchUpdateCategory
            .addCase(fetchUpdateCategory.pending, (state) => {
                state.data = [];
                state.isLoading = "loading";
                state.error = null;
            })
            .addCase(fetchUpdateCategory.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = "loaded";
                state.error = null;
            })
            .addCase(fetchUpdateCategory.rejected, (state) => {
                state.data = [];
                state.isLoading = "error";
                state.error = "fetchUpdateCategory Error!";
            })
    },
})


export default categorySlice.reducer;