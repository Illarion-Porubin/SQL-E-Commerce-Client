import {
    fetchRegistration,
    fetchLogin,
    ThirdPartyAuthorization,
    fetchAuthMe,
    fetchUpdateInfo,
    fetchUploadAvatar,
    fetchDeleteAvatar
} from "../redux/slices/authSlice";

import axios from 'axios';

jest.mock('axios');

describe('authSlice', () => {

    ///fetchRegistration

    it('should "fetchRegistration" with resolved response', async () => {
        const mockState = {
            username: 'User',
            email: 'user@mail.ru',
            password: 'user12345',
            phone: '88888888888',
        }

        // axios.post.mockResolvedValue(mockState); 

        const dispatch = jest.fn();
        const thunk = fetchRegistration(mockState);

        await thunk(dispatch, () => ({}))
        const { calls } = dispatch.mock
        expect(calls).toHaveLength(2);

        const [start, end] = calls;

        expect(start[0].type).toBe(fetchRegistration.pending().type);
        expect(end[0].type).toBe(fetchRegistration.fulfilled().type);
        expect(end[0].payload).toBe('User added');
    })

    it('should "fetchRegistration" with rejected response', async () => {
        const dispatch = jest.fn();
        const thunk = fetchRegistration();

        await thunk(dispatch, () => ({}))

        const { calls } = dispatch.mock
        expect(calls).toHaveLength(2);

        const [start, end] = calls;

        expect(start[0].type).toBe(fetchRegistration.pending().type);
        expect(end[0].type).toBe(fetchRegistration.rejected().type);
        expect(end[0].meta.rejectedWithValue).toBe(true);
        expect(end[0].payload).toBe("Server Error!");
    })

    ///fetchLogin

    it('should "fetchLogin" with resolved response', async () => {
        const user = {
            avatar: 'string',
            username: 'User',
            email: 'user@test.ru',
            phone: '88888888888',
            password: '123456',
            isActivated: 'true',
            admin: 'false',
            id: '1',
            profileUrl: 'profileUrl',
        }

        const mockState = { data: user };
        axios.post.mockResolvedValue(mockState);

        const dispatch = jest.fn();
        const thunk = fetchLogin({ email: 'user@test.ru', password: 'test12345' });

        await thunk(dispatch, () => ({}))
        const { calls } = dispatch.mock
        expect(calls).toHaveLength(2);

        const [start, end] = calls;

        expect(start[0].type).toBe(fetchLogin.pending().type);
        expect(end[0].type).toBe(fetchLogin.fulfilled().type);
        expect(end[0].payload).toBe(mockState.data);
    })

    it('should "fetchLogin" with rejected response', async () => {
        const dispatch = jest.fn();
        const thunk = fetchLogin();

        await thunk(dispatch, () => ({}))

        const { calls } = dispatch.mock
        expect(calls).toHaveLength(2);

        const [start, end] = calls;

        expect(start[0].type).toBe(fetchLogin.pending().type);
        expect(end[0].type).toBe(fetchLogin.rejected().type);
        expect(end[0].meta.rejectedWithValue).toBe(true);
        expect(end[0].payload).toBe("Value not found!");
    })

    /// ThirdPartyAuthorization

    // it('should "ThirdPartyAuthorization" with resolved response', async () => {
    //     const user = {
    //         avatar: 'string',
    //         username: 'User',
    //         email: 'user@test.ru',
    //         phone: '88888888888',
    //         password: '123456',
    //         isActivated: 'true',
    //         admin: 'false',
    //         id: '1',
    //         profileUrl: 'profileUrl',
    //     }

    //     const mockState = { data: user };
    //     axios.post.mockResolvedValue(mockState);

    //     const dispatch = jest.fn();
    //     const thunk = ThirdPartyAuthorization({ email: 'user@test.ru', password: 'test12345' });

    //     await thunk(dispatch, () => ({}))
    //     const { calls } = dispatch.mock
    //     expect(calls).toHaveLength(2);

    //     const [start, end] = calls;

    //     expect(start[0].type).toBe(ThirdPartyAuthorization.pending().type);
    //     expect(end[0].type).toBe(ThirdPartyAuthorization.fulfilled().type);
    //     expect(end[0].payload).toBe(mockState.data);
    // })

    // it('should "ThirdPartyAuthorization" with rejected response', async () => {
    //     const dispatch = jest.fn();
    //     const thunk = fetchLogin();

    //     await thunk(dispatch, () => ({}))

    //     const { calls } = dispatch.mock
    //     expect(calls).toHaveLength(2);

    //     const [start, end] = calls;

    //     expect(start[0].type).toBe(fetchLogin.pending().type);
    //     expect(end[0].type).toBe(fetchLogin.rejected().type);
    //     expect(end[0].meta.rejectedWithValue).toBe(true);
    //     expect(end[0].payload).toBe("Value not found!");
    // })
})