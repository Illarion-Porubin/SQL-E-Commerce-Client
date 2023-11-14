import {
    fetchRegistration,
    fetchLogin,
    ThirdPartyAuthorization,
    fetchAuthMe,
    fetchUpdateInfo,
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

    it('should "ThirdPartyAuthorization" with resolved response', async () => {
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
        axios.get.mockResolvedValue(mockState);

        const dispatch = jest.fn();
        const thunk = ThirdPartyAuthorization();

        await thunk(dispatch, () => ({}))
        const { calls } = dispatch.mock
        expect(calls).toHaveLength(2);

        const [start, end] = calls;

        expect(start[0].type).toBe(ThirdPartyAuthorization.pending().type); 
        expect(end[0].type).toBe(ThirdPartyAuthorization.fulfilled().type);
        expect(end[0].payload).toBe(mockState.data.user);
    })

    it('should "ThirdPartyAuthorization" with rejected response', async () => {
        const dispatch = jest.fn();
        const thunk = ThirdPartyAuthorization();

        await thunk(dispatch, () => ({}))

        const { calls } = dispatch.mock
        expect(calls).toHaveLength(2);

        const [start, end] = calls;

        expect(start[0].type).toBe(ThirdPartyAuthorization.pending().type);
        expect(end[0].type).toBe(ThirdPartyAuthorization.rejected().type);
        expect(end[0].meta.rejectedWithValue).toBe(true);
        expect(end[0].payload).toBe("Can't ThirdPartyAuthorization");
    })

     /// fetchAuthMe

     it('should "fetchAuthMe" with resolved response', async () => {
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
        axios.get.mockResolvedValue(mockState);

        const dispatch = jest.fn();
        const thunk = fetchAuthMe();

        await thunk(dispatch, () => ({}))
        const { calls } = dispatch.mock
        expect(calls).toHaveLength(2);

        const [start, end] = calls;

        expect(start[0].type).toBe(fetchAuthMe.pending().type); 
        expect(end[0].type).toBe(fetchAuthMe.fulfilled().type);
        expect(end[0].payload).toBe(mockState.data);
    })

    it('should "fetchAuthMe" with rejected response', async () => {
        const dispatch = jest.fn();
        const thunk = fetchAuthMe();

        await thunk(dispatch, () => ({}))

        const { calls } = dispatch.mock
        expect(calls).toHaveLength(2);

        const [start, end] = calls;

        expect(start[0].type).toBe(fetchAuthMe.pending().type);
        expect(end[0].type).toBe(fetchAuthMe.rejected().type);
        expect(end[0].meta.rejectedWithValue).toBe(true);
        expect(end[0].payload).toBe("Can't fetchAuthMe");
    })

    /// fetchAuthMe

    it('should "fetchUpdateInfo" with resolved response', async () => {

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

        const userUpdate = {
            id: '1',
            username: 'User1',
            email: 'user@test.ru1',
            phone: '18888888881',
            oldpass: '123456',
            newpass: '1123456',
            confirmpass: '1123456',
        }

        const mockState = { data: user };
        axios.put.mockResolvedValue(mockState);


        const dispatch = jest.fn();
        const thunk = fetchUpdateInfo(userUpdate);

        await thunk(dispatch, () => ({}))
        const { calls } = dispatch.mock
        expect(calls).toHaveLength(2);

        const [start, end] = calls;

        console.log(calls)

        expect(start[0].type).toBe(fetchUpdateInfo.pending().type); 
        expect(end[0].type).toBe(fetchUpdateInfo.fulfilled().type);
        expect(end[0].payload).toBe(mockState.data);
    })

    it('should "fetchUpdateInfo" with rejected response', async () => {
        const dispatch = jest.fn();
        const thunk = fetchUpdateInfo();

        await thunk(dispatch, () => ({}))

        const { calls } = dispatch.mock
        expect(calls).toHaveLength(2);

        const [start, end] = calls;

        expect(start[0].type).toBe(fetchUpdateInfo.pending().type);
        expect(end[0].type).toBe(fetchUpdateInfo.rejected().type);
        expect(end[0].meta.rejectedWithValue).toBe(true);
        expect(end[0].payload).toBe("Can't fetchUpdateInfo");
    })
})