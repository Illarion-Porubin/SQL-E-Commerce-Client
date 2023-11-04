import trendingReducer, { fetchGetTrendingByLabel } from "../redux/slices/trendingSlice";

const initialState = {
    data: [],
    isLoading: "idle",
    error: null
}

describe('productSlice', () => {
    ///fetchGetTrendingByLabel
    it('should change status with "fetchGetTrendingByLabel.loading" action', () => {
        const state = trendingReducer(initialState, fetchGetTrendingByLabel.pending());
        expect(state.isLoading).toBe('loading')
        expect(state.error).toBeNull()
    })
    it('should fetch products with "fetchGetTrendingByLabel.fulfilled" action', () => {
        const mockState = { products: [{ id: 1, product: 'product1', desc: 'desc1' }] };
        const state = trendingReducer(initialState, fetchGetTrendingByLabel.fulfilled(mockState.products));
        expect(state).toEqual({
            data: mockState.products,
            isLoading: "loaded",
            error: null
        });
    })
    it('should change status and error witch "fetchGetTrendingByLabel.rejected"', () => {
        const state = trendingReducer(initialState, fetchGetTrendingByLabel.rejected());
        expect(state).toEqual({
            data: [],
            isLoading: "error",
            error: "fetchGetTrendingByLabel Error!"
        });
    })
})