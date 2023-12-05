import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProductCardType, ProductForm } from '../../types/types';
import axios from "../../http/index"; ///for work 
// import axios from "axios"; ///for tests"

export const fetchGetProducts = createAsyncThunk<ProductCardType[], undefined, { rejectValue: string }>(
    "api/fetchGetProducts", async (_, { rejectWithValue }) => {
        const { data }: { data: ProductCardType[] } = await axios.get(`/api/products`);
        if (!data) {
            return rejectWithValue("Server Error!");
        }
        return data;
    });

export const fetchGetProductsByLabel = createAsyncThunk<ProductCardType[], string, { rejectValue: string }>(
    "api/fetchGetProductsByLabel", async (paramsProducts, { rejectWithValue }) => {
        try {
            const { data }: { data: ProductCardType[] } = await axios.get(`/api/products/label/${paramsProducts}`);
            if (!data) {
                return rejectWithValue("Data undefined");
            }
            return data;
        } catch (error) {
            return rejectWithValue("Can't fetchGetProductsByLabel");
        }
    });


export const fetchSearchProduct = createAsyncThunk<ProductCardType[], string, { rejectValue: string }>(
    "api/fetchSearchProduct",
    async (paramsProduct, { rejectWithValue }) => {
        try {
            const { data }: { data: ProductCardType[] } = await axios.get(`/api/product/search/${paramsProduct}`);
            if (!data) {
                return rejectWithValue("Data undefined");
            }
            return data;
        } catch (error) {
            return rejectWithValue("Can't fetchSearchProduct");
        }
    });

export const fetchAddProduct = createAsyncThunk<ProductCardType[], ProductForm, { rejectValue: string }>(
    "api/fetchAddProduct", async (params, { rejectWithValue }) => {
        try {
            const { data }: { data: ProductCardType[] } = await axios.post('/api/product', params);
            if (data) {
                return data
            }
            return rejectWithValue("Data undefined");
        } catch (error) {
            return rejectWithValue("Can't fetchAddProduct");
        }
    });

export const fetchDeleteProduct = createAsyncThunk<ProductCardType[], { id: number }, { rejectValue: string }>(
    "api/fetchDeleteProduct", async (params, { rejectWithValue }) => {
        try {
            const { data }: { data: ProductCardType[] } = await axios.delete('/api/product', { data: params });
            if (data) {
                return data
            }
            return rejectWithValue("Data undefined");
        } catch (error) {
            return rejectWithValue("Can't fetchDeleteProduct");
        }
    });

export const fetchFindProductByID = createAsyncThunk<ProductCardType, number, { rejectValue: string }>(
    "api/fetchUpdateProduct", async (params, { rejectWithValue }) => {
        try {
            const { data }: { data: ProductCardType } = await axios.get(`/api/product/${params}`);
            if (data) {
                return data
            }
            return rejectWithValue("Data undefined");
        } catch (error) {
            return rejectWithValue("Can't fetchUpdateProduct");
        }
    });

export const fetchUpdateProduct = createAsyncThunk<ProductCardType, ProductForm, { rejectValue: string }>(
    "api/fetchUpdateProduct", async (params, { rejectWithValue }) => {
        try {
            const { data }: { data: ProductCardType } = await axios.put('/api/product', params);
            if (data) {
                return data
            }
            return rejectWithValue("Data undefined");
        } catch (error) {
            return rejectWithValue("Can't fetchUpdateProduct");
        }
    });

/////////////Rating/////////////

export const fetchAddRating = createAsyncThunk<string, { ProductId: number, UserId: string | undefined, rating: number }, { rejectValue: string }>(
    "api/fetchAddRating", async (params, { rejectWithValue }) => {
        try {
            if (params) {
                await axios.post("/api/product/rating", params);
                return "Rating update"
            }
            return rejectWithValue("Data undefined");
        } catch (error) {
            return rejectWithValue("Can't fetchAddRating");
        }
    });

export interface productState {
    data: ProductCardType[],
    product: ProductCardType | null,
    isLoading: "idle" | "loading" | "loaded" | "error";
    error: string | null,
}

const initialState: productState = {
    data: [],
    product: null,
    isLoading: "idle",
    error: null
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            ///fetchGetProductsByLabel
            .addCase(fetchGetProductsByLabel.pending, (state) => {
                state.data = [];
                state.isLoading = "loading";
                state.error = null;
            })
            .addCase(fetchGetProductsByLabel.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = "loaded";
                state.error = null;
            })
            .addCase(fetchGetProductsByLabel.rejected, (state) => {
                state.data = [];
                state.isLoading = "error";
                state.error = "fetchGetProductsByLabel Error!";
            })
            ///fetchSearchProduct
            .addCase(fetchSearchProduct.pending, (state) => {
                state.data = [];
                state.isLoading = "loading";
                state.error = null;
            })
            .addCase(fetchSearchProduct.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = "loaded";
                state.error = null;
            })
            .addCase(fetchSearchProduct.rejected, (state) => {
                state.data = [];
                state.isLoading = "error";
                state.error = "fetchSearchProduct Error!";
            })
            //fetchAddProduct
            .addCase(fetchAddProduct.pending, (state) => {
                state.data = [];
                state.isLoading = "loading";
                state.error = null;
            })
            .addCase(fetchAddProduct.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = "loaded";
                state.error = null;
            })
            .addCase(fetchAddProduct.rejected, (state) => {
                state.data = [];
                state.isLoading = "error";
                state.error = "fetchAddProduct Error!";
            })
            //fetchDeleteProduct
            .addCase(fetchDeleteProduct.pending, (state) => {
                state.data = [];
                state.isLoading = "loading";
                state.error = null;
            })
            .addCase(fetchDeleteProduct.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = "loaded";
                state.error = null;
            })
            .addCase(fetchDeleteProduct.rejected, (state) => {
                state.data = [];
                state.isLoading = "error";
                state.error = "fetchDeleteProduct Error!";
            })
            //fetchFindProductByID
            .addCase(fetchFindProductByID.pending, (state) => {
                state.product = null;
                state.isLoading = "loading";
                state.error = null;
            })
            .addCase(fetchFindProductByID.fulfilled, (state, action) => {
                state.product = action.payload;
                state.isLoading = "loaded";
                state.error = null;
            })
            .addCase(fetchFindProductByID.rejected, (state) => {
                state.product = null;
                state.isLoading = "error";
                state.error = "fetchUpdateProduct Error!";
            })
    },
})

export default productSlice.reducer;