import productReducer, { fetchGetProductsByLabel, fetchSearchProduct } from "../redux/slices/productSlice";

const initialState = {
    data: [],
    isLoading: "idle",
    error: null
}

describe('productSlice', () => {
    ///fetchGetProductsByLabel
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
            error: "fetchGetProductsByLabel Error!" 
        });
    })

    ///fetchSearchProduct
    it('should change status with "fetchSearchProduct.loading" action', () => {
        const state = productReducer(initialState, fetchSearchProduct.pending());
        expect(state.isLoading).toBe('loading')
        expect(state.error).toBeNull()
    })
    it('should fetch products with "fetchSearchProduct.fulfilled" action', () => {
        const mockState = { products: [{ id: 1, product: 'product1', desc: 'desc1' }] };

        const state = productReducer(initialState, fetchSearchProduct.fulfilled(mockState.products));
        expect(state).toEqual({
            data: mockState.products,
            isLoading: "loaded",
            error: null
        });
    })
    it('should change status and error witch "fetchSearchProduct.rejected"', () => {
        const state = productReducer(initialState, fetchSearchProduct.rejected());        
        expect(state).toEqual({
            data: [],
            isLoading: "error",
            error: "fetchSearchProduct Error!" 
        });
    })

    
})