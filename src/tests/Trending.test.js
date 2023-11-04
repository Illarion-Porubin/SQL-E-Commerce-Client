import { fetchGetTrendingByLabel } from "../redux/slices/trendingSlice";
import axios from 'axios';

jest.mock('axios');

describe('trendingThunk', () => {
    it('shold "fetchGetTrendingByLabel" with resolved response', async () => {
        const mockState = { data: [{ id: 1, product: 'product1', desc: 'desc1' }] };
        axios.get.mockResolvedValue(mockState);

        const dispatch = jest.fn();
        const thunk = fetchGetTrendingByLabel(JSON.stringify({ page: 0, label: 'top' }));

        await thunk(dispatch, () => ({}))
        const { calls } = dispatch.mock
        expect(calls).toHaveLength(2);

        const [start, end] = calls;

        expect(start[0].type).toBe(fetchGetTrendingByLabel.pending().type);
        expect(end[0].type).toBe(fetchGetTrendingByLabel.fulfilled().type);
        expect(end[0].payload).toBe(mockState.data);
    })
})