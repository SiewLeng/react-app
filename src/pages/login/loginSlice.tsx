import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { skipPartiallyEmittedExpressions } from 'typescript';
import { RootState, AppThunk } from '../../app/store';

type userDataType = {
    email: string,
    hobbies: [string],
    dateOfBirth: Date
};

type intialStateType = {
    isLogin: boolean,
    userData: userDataType
};

const initialState: intialStateType = {
    isLogin: false,
    userData: {
        email: '',
        hobbies: ['none'],
        dateOfBirth: new Date('')
    }
};

const createSliceObj =  {
    name: 'Login',
    initialState,
    reducers: {
        login: (state: any, action: PayloadAction<userDataType>) => {
            state.isLogin = true;
            state.userData = action.payload;
        }
    }
};

export const loginSlice = createSlice(createSliceObj);
export const getLoginState = (state: RootState) => state.login;

export const { login } = loginSlice.actions;
export default loginSlice.reducer;