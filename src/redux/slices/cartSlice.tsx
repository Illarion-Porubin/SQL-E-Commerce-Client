import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ProductType, UserOrder } from "../../types/types";
import axios from "../../http/index";



export const fetchOrder = createAsyncThunk<UserOrder, UserOrder, { rejectValue: string }>(
    "api/fetchOrder", async (params, { rejectWithValue }) => {
        const { data }: { data: any } = await axios.post("/api/cart", params);
        if (!data) {
            return rejectWithValue("Server Error!");
        }
        const newData: any = data
        return newData;
    });

interface State {
    data: ProductType[],
    isLoading: "idle" | "loading" | "loaded" | "error";
    error: string | null,
}


export const initialState: State = {
    data: [],
    isLoading: "idle",
    error: null
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addOrder(state, action: PayloadAction<ProductType>) {
            if (!state.data?.length) {
                state.data?.push(action.payload);
            } else {
                const check = state.data.find((item: ProductType) => {
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
                console.log(state.data)
            }
        },
        deleteOrder(state, action: PayloadAction<ProductType>) {
            state.data = state.data.filter((item: ProductType) => {
                if (action.payload.productId !== item.productId) {
                    return item;
                }
                return null
            })
        }
    },

    extraReducers: (builder) => {
        builder
            ///fetchRegister
            .addCase(fetchOrder.pending, (state) => {
                state.isLoading = "loading";
            })
            .addCase(fetchOrder.fulfilled, (state) => {
                state.data = [];
                state.isLoading = "loaded";
            })
            .addCase(fetchOrder.rejected, (state) => {
                state.isLoading = "error";
            })
    }
})

export default cartSlice.reducer;