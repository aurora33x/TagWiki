import React from 'react';
import { fireEvent, render, act } from '@testing-library/react';
import LoginPage from "../LoginPage"
import UserContext from "../../components/UserContext"
import { MemoryRouter } from 'react-router-dom'
import axios from 'axios';
import Cookies from 'js-cookie';
import MockAdapter from 'axios-mock-adapter';
jest.mock('js-cookie')
describe('Login page test', () => {
    const base_url = process.env.REACT_APP_NODE_ENV === 'development' ? process.env.REACT_APP_LOCAL_BASE_URL : process.env.REACT_APP_SERVER_BASE_URL;
    let axiosMock;
    beforeAll(() => {
        axiosMock = new MockAdapter(axios);
    });

    afterEach(() => {
        axiosMock.reset();
    });
    it('should login successfully', async () => {
        Cookies.get.mockReturnValue('myjwtaccesstoken')
        console.log(Cookies.get)

        axiosMock.onPost(`${base_url}/auth/login`).reply(200, { 'accessToken': 'myjwtaccesstoken' })
        const mockSetToken = jest.fn();

        const { queryByText, getByPlaceholderText } = render(<MemoryRouter initialEntries={['/login']}>
            <UserContext.Provider value={{ userName: undefined, setToken: mockSetToken }}>
                <LoginPage />
            </UserContext.Provider></MemoryRouter>)
        fireEvent.change(getByPlaceholderText('Username'), { target: { value: 'user1' } });
        fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'pwd' } });

        await act(async () => {
            fireEvent.click(queryByText('LOGIN'));
        });

        expect(mockSetToken).toHaveBeenCalledWith('myjwtaccesstoken');

    })
})