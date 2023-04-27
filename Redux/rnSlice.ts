import { createSlice } from '@reduxjs/toolkit'
import { IObject } from '../Screens/nested/PostListScreen';
import { getComments, getPosts, loginUser, logOut, postComment, postPost, registerUser } from './rnOperations';
import { RootState } from './store';


export interface IRootState {
    auth: { email: string | null, id: string | null, login: string | null }
    token: string | null;
    isLoggedIn: boolean;
    loading: boolean;
    error: unknown;
    allPosts: IPosts | [],
    allComments: IComments | [],
    image: string | null
}
export interface IPosts extends Array<IObject> {
    id: string,
    photo: string,
    name: string
}
export interface IComments extends Array<IObject> {
    id: string,
    content: string,
}
const initialState: IRootState = {
    auth: {
        email: '', id: '', login: ''
    },
    allPosts: [],
    allComments: [],
    token: null,
    isLoggedIn: false,
    loading: false,
    error: null,
    image: null
}

export const rnSlice = createSlice({
    name: 'rn',
    initialState,
    reducers: {
        setImage: (state, { payload }) => {
            state.image = payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(registerUser.pending, (state) => {
            state.error = null;
            state.loading = true;
        }).addCase(registerUser.fulfilled, (state, { payload }) => {
            state.loading = false;
        }).addCase(registerUser.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        }).addCase(loginUser.pending, (state) => {
            state.error = null;
            state.loading = true;
        }).addCase(loginUser.fulfilled, (state, { payload }) => {
            state.auth.email = payload.email;
            state.auth.id = payload.uid;
            state.auth.login = payload.displayName;
            state.isLoggedIn = true;
            state.loading = false;
        }).addCase(loginUser.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        }).addCase(logOut.pending, (state) => {
            state.error = null;
            state.loading = true;
        }).addCase(logOut.fulfilled, (state, { payload }) => {
            state.auth = {
                email: '', id: '', login: ''
            };
            state.isLoggedIn = false;
            state.loading = false;
        }).addCase(logOut.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        }).addCase(postPost.pending, (state) => {
            state.error = null;
            state.loading = true;
        }).addCase(postPost.fulfilled, (state, { payload }) => {
            state.loading = false;
        }).addCase(postPost.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        }).addCase(getPosts.pending, (state) => {
            state.error = null;
            state.loading = true;
        }).addCase(getPosts.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.allPosts = payload as [];
        }).addCase(getPosts.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        }).addCase(postComment.pending, (state) => {
            state.error = null;
            state.loading = true;
        }).addCase(postComment.fulfilled, (state, { payload }) => {
            state.loading = false;
            // state.allPosts = payload as [];
        }).addCase(postComment.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        }).addCase(getComments.pending, (state) => {
            state.error = null;
            state.loading = true;
        }).addCase(getComments.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.allComments = payload as [];
        }).addCase(getComments.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        })
    },
})
export const { setImage } = rnSlice.actions;
export const getUserId = (state: RootState) => state.rn.auth.id;
export const getUserEmail = (state: RootState) => state.rn.auth.email;
export const getUserLogin = (state: RootState) => state.rn.auth.login;
export const getError = (state: RootState) => state.rn.error;
export const getLoggedIn = (state: RootState) => state.rn.isLoggedIn;
export const getAllPosts = (state: RootState) => state.rn.allPosts;
export const getAllComments = (state: RootState) => state.rn.allComments;