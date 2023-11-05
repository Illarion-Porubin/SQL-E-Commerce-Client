import { selectCartData, selectAuthData, selectProductData, selectTrendingData } from "../redux/selectos";

describe('redux selectors', () => {
    it('shold select "cart" from state object', () => {
        const cartState = [{ id: 123, desc: 'desc1', text: 'text1', price: 100 }];
        const result = selectCartData({ cart: cartState });
        expect(result).toEqual(cartState);
    })

    it('shold select "product" from state object', () => {
        const productState = [{ id: 123, desc: 'desc1', text: 'text1', price: 100 }];
        const result = selectProductData({ products: productState });
        expect(result).toEqual(productState);
    })

    it('shold select "trending" from state object', () => {
        const trendingState = [{ id: 123, desc: 'desc1', text: 'text1', price: 100 }];
        const result = selectTrendingData({ trending: trendingState });
        expect(result).toEqual(trendingState);
    })

    it('shold select "auth" from state object', () => {
        const authState = {
            accessToken: 'qweqwe1231sad',
            refreshToken: 'qweqwe1231sad4442242',
            isLoading: 'loaded',
            provider: 'default',
            user: {
                avatar: 'string',
                username: 'User',
                email: 'user@test.ru',
                phone: '88888888888',
                password: 'password',
                oldpass: 'oldpass',
                newpass: 'newpass',
                confirmpass: 'confirmpass',
                isActivated: true,
                admin: false,
                id: '1',
                profileUrl: 'profileUrl',
            }
        }
        const result = selectAuthData({ auth: authState });
        expect(result).toEqual(authState);
    })
})  