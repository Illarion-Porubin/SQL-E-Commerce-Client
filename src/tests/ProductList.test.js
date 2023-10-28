import { fetchGetProductsByLabel } from "../redux/slices/productSlice";
import axios from 'axios';

jest.mock('axios');

describe('productThunk', () => {
    it('shold be return ', async () => {
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
}) 