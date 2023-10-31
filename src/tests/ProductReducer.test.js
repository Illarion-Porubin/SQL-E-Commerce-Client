import productReducer, { fetchGetProductsByLabel } from "../redux/slices/productSlice";

const initialState = {
    data: [],
    isLoading: "idle",
    error: null
}

describe('productSlice', () => {
    it('should change status with "fetchGetProductsByLabel.loading" action', () => {
        const state = productReducer(initialState, fetchGetProductsByLabel.pending());
        expect(state.isLoading).toBe('loading')
        expect(state.error).toBeNull()
    })
    it('should fetch products with "fetchGetProductsByLabel.fulfilled" action', () => {
        const mockState = { products: [{ id: 1, product: 'product1', desc: 'desc1' }] };
        const state = productReducer(initialState, fetchGetProductsByLabel.fulfilled(mockState.products));
        expect(state).toEqual({
            data: mockState.products,
            isLoading: "loaded",
            error: null
        });
    })
    it('should change status and error witch "fetchGetProductsByLabel.rejected"', () => {
        const state = productReducer(initialState, fetchGetProductsByLabel.rejected());        
        expect(state).toEqual({
            data: [],
            isLoading: "error",
            error: "FetchGetProductsByLabel Error!" 
        });
    })
})