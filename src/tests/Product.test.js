import { fetchGetProductsByLabel, fetchSearchProduct, fetchAddRating } from "../redux/slices/productSlice";
import axios from 'axios';

jest.mock('axios');

describe('productThunk', () => {
    ///////////////fetchGetProductsByLabel

    it('shold "fetchGetProductsByLabel" with resolved response', async () => {
        const mockState = { data: [{ id: 1, product: 'product1', desc: 'desc1' }] };
        axios.get.mockResolvedValue(mockState);

        const dispatch = jest.fn();
        const thunk = fetchGetProductsByLabel(JSON.stringify({ page: 0, label: 'top' }));

        await thunk(dispatch, () => ({}))
        const { calls } = dispatch.mock
        expect(calls).toHaveLength(2);

        const [start, end] = calls;

        expect(start[0].type).toBe(fetchGetProductsByLabel.pending().type);
        expect(end[0].type).toBe(fetchGetProductsByLabel.fulfilled().type);
        expect(end[0].payload).toBe(mockState.data);
    })

    it('shold "fetchGetProductsByLabel" with rejected response', async () => {
        const dispatch = jest.fn();
        const thunk = fetchGetProductsByLabel();

        await thunk(dispatch, () => ({}))

        const { calls } = dispatch.mock
        expect(calls).toHaveLength(2);

        const [start, end] = calls;

        expect(start[0].type).toBe(fetchGetProductsByLabel.pending().type);
        expect(end[0].type).toBe(fetchGetProductsByLabel.rejected().type);
        expect(end[0].meta.rejectedWithValue).toBe(true);
        expect(end[0].payload).toBe("Can't fetchGetProductsByLabel");
    })

    ///////////////fetchSearchProduct

    it('shold "fetchSearchProduct" with resolved response', async () => {
        const mockState = { data: [{ id: 1, product: 'product1', desc: 'desc1' }] };
        axios.get.mockResolvedValue(mockState);

        const dispatch = jest.fn();
        const thunk = fetchSearchProduct(JSON.stringify({ word: 'product1', page: 0 }));

        await thunk(dispatch, () => ({}))
        const { calls } = dispatch.mock
        expect(calls).toHaveLength(2);

        const [start, end] = calls;

        expect(start[0].type).toBe(fetchSearchProduct.pending().type);
        expect(end[0].type).toBe(fetchSearchProduct.fulfilled().type);
        expect(end[0].payload).toBe(mockState.data);
    })

    it('shold "fetchSearchProduct" with rejected response', async () => {
        const dispatch = jest.fn();
        const thunk = fetchSearchProduct();

        await thunk(dispatch, () => ({}))

        const { calls } = dispatch.mock
        expect(calls).toHaveLength(2);

        const [start, end] = calls;

        expect(start[0].type).toBe(fetchSearchProduct.pending().type);
        expect(end[0].type).toBe(fetchSearchProduct.rejected().type);
        expect(end[0].meta.rejectedWithValue).toBe(true);
        expect(end[0].payload).toBe("Can't fetchSearchProduct");
    })

    ///////////////fetchAddRating

    it('shold "fetchAddRating" with resolved response', async () => {
        const mockState = { data: [{ id: 1, product: 'product1', desc: 'desc1' }] };
        const newRating = { ProductId: 1, UserId: 1, rating: 100 }
        axios.post.mockResolvedValue(mockState);

        const dispatch = jest.fn();
        const thunk = fetchAddRating(newRating);

        await thunk(dispatch, () => ({}))
        const { calls } = dispatch.mock
        expect(calls).toHaveLength(2);

        const [start, end] = calls;

        expect(start[0].type).toBe(fetchAddRating.pending().type);
        expect(end[0].type).toBe(fetchAddRating.fulfilled().type);
        expect(end[0].payload).toBe("Rating update");
    })

    it('shold "fetchAddRating" with rejected response', async () => {
        const dispatch = jest.fn();
        const thunk = fetchAddRating();

        await thunk(dispatch, () => ({}))

        const { calls } = dispatch.mock
        expect(calls).toHaveLength(2);

        const [start, end] = calls;

        expect(start[0].type).toBe(fetchAddRating.pending().type);
        expect(end[0].type).toBe(fetchAddRating.rejected().type);
        expect(end[0].meta.rejectedWithValue).toBe(true);
        expect(end[0].payload).toBe("Data undefined");
    })
}) 