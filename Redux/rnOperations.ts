import { createAsyncThunk } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { app, db } from '../firebase/config';
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
interface IAuthData {
    mail: string;
    password: string;
    login?: string
}
interface IPost {
    photo: string | undefined,
    name: string,
    location?: string
}
interface IComment {
    id: string,
    content: string,
    from: string | null,
    date: Date

}
import { RootState } from './store';
const auth = getAuth(app);
export const registerUser = createAsyncThunk('auth/register', async (data: IAuthData, { rejectWithValue, dispatch }) => {
    try {
        const { mail, password, login } = data;
        const result = await createUserWithEmailAndPassword(auth, mail, password);
        const loginedUser = {
            mail,
            password
        };
        if (result) {

            await updateProfile(auth.currentUser!, {
                displayName: login,
            });

            await dispatch(loginUser(loginedUser));
        }
        return result.user;
    } catch (error) {
        return rejectWithValue(error);
    }
});
export const loginUser = createAsyncThunk('auth/login', async (data: IAuthData, { rejectWithValue }) => {
    try {
        const { mail, password } = data;
        const result = await signInWithEmailAndPassword(auth, mail, password);
        return result.user;
    } catch (error) {
        return rejectWithValue(error);
    }
});
export const logOut = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
    try {
        const result = await signOut(auth);
        return result;
    } catch (error) {
        return rejectWithValue(error);
    }
});
export const postPost = createAsyncThunk('auth/post', async (data: IPost, { rejectWithValue, dispatch }) => {
    try {
        await addDoc(collection(db, 'posts'), {
            ...data
        });
        const result = await dispatch(getPosts());
        return result;
    } catch (error) {
        return rejectWithValue(error);
    }
});
export const getPosts = createAsyncThunk('auth/getPosts', async (_, { rejectWithValue, getState }) => {
    try {
        const state: RootState = getState() as RootState;
        const docs = await getDocs(query(collection(db, 'posts'), where("id", "==", state.rn.auth.email)));
        const result: object[] = [];
        docs.forEach((doc) => {
            result.push({ id: doc.id, ...doc.data() });
        });
        return result;
    } catch (error) {
        return rejectWithValue(error);
    }
});
export const postComment = createAsyncThunk('auth/comment', async (data: IComment, { rejectWithValue, dispatch }) => {
    try {

        await addDoc(collection(db, 'comments'), {
            ...data
        });
        const result = await dispatch(getComments());
        return result;
    } catch (error) {
        return rejectWithValue(error);
    }
});
export const getComments = createAsyncThunk('auth/getComments', async (_, { rejectWithValue, getState }) => {
    try {
        const state: RootState = getState() as RootState;
        const docs = await getDocs(query(collection(db, 'comments'), where("id", "==", state.rn.image)));
        const result: object[] = [];
        docs.forEach((doc) => {
            result.push({ id: doc.id, ...doc.data() });
        });
        return result;
    } catch (error) {
        return rejectWithValue(error);
    }
});