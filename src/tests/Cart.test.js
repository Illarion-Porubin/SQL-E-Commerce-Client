import { fetchOrder } from "../redux/slices/cartSlice";
import axios from 'axios';

jest.mock('axios');

describe('trendingThunk', () => {
    it('shold "fetchOrder" with resolved response', async () => {
        const mockState = {
            userId: 1,
            email: 'test@emai.ru',
            phone: '8988888888',
            userCart: 'message',
            amount: 1,
            totalsum: 1
        }
        axios.post.mockResolvedValue(mockState);

        const dispatch = jest.fn();
        const thunk = fetchOrder(mockState);

        await thunk(dispatch, () => ({}))
        const { calls } = dispatch.mock
        expect(calls).toHaveLength(2);

        const [start, end] = calls;
        
        expect(start[0].type).toBe(fetchOrder.pending().type);
        expect(end[0].type).toBe(fetchOrder.fulfilled().type);
        expect(end[0].payload).toBe('Add order');
    })
})