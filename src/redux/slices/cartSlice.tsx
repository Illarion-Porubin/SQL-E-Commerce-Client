import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ProductCartType, UserOrder } from "../../types/types";
import axios from "../../http/index";



export const fetchOrder = createAsyncThunk<UserOrder, UserOrder, { rejectValue: string }>(
    "api/fetchOrder", async (params, { rejectWithValue }) => {
        const { data }: { data: UserOrder } = await axios.post("/api/cart", params);
        if (!data) {
            return rejectWithValue("Server Error!");
        }
        return data;
    });

// export const fetchOrder = createAsyncThunk<string, UserOrder, { rejectValue: string }>(
//     "api/fetchOrder", async (params, { rejectWithValue }) => {
//         try {
//             if (params) {
//                 await axios.post("/api/cart", params);
//                 return "Add order"
//             }
//             return rejectWithValue("Data undefined");
//         } catch (error) {
//             return rejectWithValue("Can't fetchOrder");
//         }
//     });

interface cartState {
    data: ProductCartType[],
    isLoading: "idle" | "loading" | "loaded" | "error";
    error: string | null,
}


export const initialState: cartState = {
    data: [],
    isLoading: "idle",
    error: null
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addOrder(state, action: PayloadAction<ProductCartType>) {
            if (!state.data?.length) {
                state.data?.push(action.payload);
            } else {
                const check = state.data.find((item: ProductCartType) => {
                    if (action.payload.productId === item.productId) {
                        return item;
                    }
                    return null
                })
                if (action.payload.id === "plus") {
                    check ? (check.count = check.count + 1) : state.data.push(action.payload);
                }
                else {
                    check ? (check.count = check.count > 1 ? check.count - 1 : check.count) : state.data.push(action.payload);
                }
            }
        },
        deleteOrder(state, action: PayloadAction<ProductCartType>) {
            state.data = state.data.filter((item: ProductCartType) => {
                if (action.payload.productId !== item.productId) {
                    return item;
                }
                return null
            })
        },
        deleteUserProducts(state, _) {
            state.data = []
        }
    },

    extraReducers: (builder) => {
        builder
            ///fetchRegister
            .addCase(fetchOrder.pending, (state) => {
                console.log('pending')
                state.isLoading = "loading";
            })
            .addCase(fetchOrder.fulfilled, (state) => {
                console.log('fulfilled')
                state.data = [];
                state.isLoading = "loaded";
            })
            .addCase(fetchOrder.rejected, (state) => {
                console.log('rejected')
                state.isLoading = "error";
            })
    }
})

export default cartSlice.reducer;