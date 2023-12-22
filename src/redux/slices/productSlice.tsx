import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProductCardType, ProductForm, ProductType } from '../../types/types';
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
            const { data }: { data: ProductCardType[] } = await axios.get(`/api/products/label/${paramsProducts}`, { withCredentials: true });
            if (!data) {
                return rejectWithValue("Data undefined");
            }
            return data;
        } catch (error) {
            return rejectWithValue("Can't fetchGetProductsByLabel");
        }
    });

export const fetchGetProductsByCategory = createAsyncThunk<ProductCardType[], string, { rejectValue: string }>(
    "api/fetchGetProductsByCategory", async (paramsProducts, { rejectWithValue }) => {
        try {
            const { data }: { data: ProductCardType[] } = await axios.get(`/api/products/category/${paramsProducts}`);
            if (!data) {
                return rejectWithValue("Data undefined");
            }
            return data;
        } catch (error) {
            return rejectWithValue("Can't fetchGetProductsByCategory");
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

export const fetchFindProductByID = createAsyncThunk<ProductCardType[], number, { rejectValue: string }>(
    "api/fetchFindProductByID", async (params, { rejectWithValue }) => {
        try {
            const { data }: { data: ProductCardType[] } = await axios.get(`/api/product/${params}`);
            if (data) {
                return data
            }
            return rejectWithValue("Data undefined");
        } catch (error) {
            return rejectWithValue("Can't fetchFindProductByID");
        }
    });

export const fetchUpdateProduct = createAsyncThunk<ProductCardType[], ProductForm, { rejectValue: string }>(
    "api/fetchUpdateProduct", async (params, { rejectWithValue }) => {
        try {
            const { data }: { data: ProductCardType[] } = await axios.put('/api/product', params);
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

export const fetchDeletePhoto = createAsyncThunk<any, string, { rejectValue: string }>(
    "api/fetchDeletePhoto",
    async (id, { rejectWithValue }) => {
        const { data } = await axios.delete("/api/photo/" + id);
        if (!data) {
            return rejectWithValue("Server Error!");
        }
        const auth = data
        return auth;
    }
);

export interface productState {
    data: ProductCardType[],
    product: null | ProductType,
    isLoading: "idle" | "loading" | "loaded" | "error";
    error: string | null,
}

const initialState: productState = {
    data: [],
    product: null,
    isLoading: "idle",
    error: null
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        addNewProduct(state, action) {
            state.product = action.payload
        },

        deleteProduct(state, _) {
            state.product = null
        },

        updateProductUrl(state, action) {
            state.product = { ...state.product, url: action.payload }
        }
    },
    extraReducers: (builder) => {
        builder
            ///fetchGetProducts
            .addCase(fetchGetProducts.pending, (state) => {
                state.data = [];
                state.isLoading = "loading";
                state.error = null;
            })
            .addCase(fetchGetProducts.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = "loaded";
                state.error = null;
            })
            .addCase(fetchGetProducts.rejected, (state) => {
                state.data = [];
                state.isLoading = "error";
                state.error = "fetchGetProducts Error!";
            })
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
            ///fetchGetProductsByCategory
            .addCase(fetchGetProductsByCategory.pending, (state) => {
                state.data = [];
                state.isLoading = "loading";
                state.error = null;
            })
            .addCase(fetchGetProductsByCategory.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = "loaded";
                state.error = null;
            })
            .addCase(fetchGetProductsByCategory.rejected, (state) => {
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
                state.data = [];
                state.isLoading = "loading";
                state.error = null;
            })
            .addCase(fetchFindProductByID.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = "loaded";
                state.error = null;
            })
            .addCase(fetchFindProductByID.rejected, (state) => {
                state.data = [];
                state.isLoading = "error";
                state.error = "fetchFindProductByID Error!";
            })
            //fetchUpdateProduct
            .addCase(fetchUpdateProduct.pending, (state) => {
                state.data = [];
                state.isLoading = "loading";
                state.error = null;
            })
            .addCase(fetchUpdateProduct.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = "loaded";
                state.error = null;
            })
            .addCase(fetchUpdateProduct.rejected, (state) => {
                state.data = [];
                state.isLoading = "error";
                state.error = "fetchFindProductByID Error!";
            })
    },
})

export const { addNewProduct, updateProductUrl, deleteProduct } = productSlice.actions;
export default productSlice.reducer;