import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

type meesageType = {
    userId: string,
    text: string
}

type initalStateType = {
    messages: [] | meesageType[]
}

const initialState: initalStateType = {
    messages: []
};
export const messageSlice = createSlice({
    name: 'message',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
      update: (state, action: PayloadAction <meesageType[]>) => {
        state.messages = action.payload;
      }
    },
});

export const { update } = messageSlice.actions;
export const getMessagesState = (state: RootState) => state.message.messages;
export default messageSlice.reducer;



