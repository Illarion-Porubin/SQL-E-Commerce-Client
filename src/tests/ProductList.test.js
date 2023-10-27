import { fetchGetProductsByLabel } from "../redux/slices/productSlice";

global.fetch = jest.fn()

describe('productThunk', () => {
    it('test', async () => {
        const mockData = [{id: 1, type: 'type1', desc: 'desc1'}]
        
        fetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(mockData)
        })

        const dispatch = jest.fn();
        const thunk = fetchGetProductsByLabel();

        await thunk(dispatch, () => ({}))
        
        const { calls } = dispatch.mock
        expect(calls).toHaveLength(2);
        
        const [start, end] = calls;

        // console.log(calls, 'calls');
        // console.log(start[0].meta, 'start');
        // console.log(end[0].meta, 'end');

        expect(start[0].type).toBe(fetchGetProductsByLabel.pending().type);
        expect(end[0].type).toBe(fetchGetProductsByLabel.fulfilled().type);
        expect(end[0].payload).toBe(mockData);
    })
}) 