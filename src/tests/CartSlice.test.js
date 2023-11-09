import cartSlice, { addOrder, deleteOrder, deleteUserOrders } from "../redux/slices/cartSlice";

describe('cartSlice', () => {
    it('should return defaul state when passed empety action', () => {
        const defaultState = {
            data: [],
            isLoading: "idle",
            error: null
        }
        const result = cartSlice(undefined, { type: '' });

        expect(result).toEqual(defaultState)
    })
    it('should add new order with "addOrder" action', () => {
        const newOrder = { productId: '1', product: 'product1', desc: 'desc1', count: 1 }
        const action = { type: addOrder.type, payload: newOrder }
        const cartState = {
            data: [action.payload],
            isLoading: "idle",
            error: null
        }

        const result = cartSlice(cartState, action)

        expect(result.data[0]).toBe(newOrder);
    })

    it('should delete order by id with "deleteOrder" action', () => {
        const orders = [
            {
                id: '1',
                productId: 1,
                type: 'type1',
                desc: 'desc1',
                img: 'img1',
                newprice: 100,
                count: 1
            },
            {
                id: '2',
                productId: 2,
                type: 'type2',
                desc: 'desc2',
                img: 'img2',
                newprice: 200,
                count: 2
            },
        ]
        const cartState = {
            data: orders,
            isLoading: "idle",
            error: null
        }

        const action = { type: deleteOrder.type, payload: { productId: 2 } }
        const result = cartSlice(cartState, action)

        expect(result.data).toEqual([orders[0]]);
    })

    it('should delete add orders id data wich use "deleteUserOrders" action', () => {
        const orders = [
            {
                id: '1',
                productId: 1,
                type: 'type1',
                desc: 'desc1',
                img: 'img1',
                newprice: 100,
                count: 1
            },
            {
                id: '2',
                productId: 2,
                type: 'type2',
                desc: 'desc2',
                img: 'img2',
                newprice: 200,
                count: 2
            },
        ]
        
        const cartState = {
            data: orders,
            isLoading: "idle",
            error: null
        }

        const action = { type: deleteUserOrders.type, payload: null }
        const result = cartSlice(cartState, action)

        expect(result.data).toEqual([]);
    })

})