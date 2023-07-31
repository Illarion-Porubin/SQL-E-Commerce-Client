import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "../../http/index";




const initialState = {
    data: [],
    isLoading: "idle",
    error: null
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // builder
           
    },
})

export default cartSlice.reducer;