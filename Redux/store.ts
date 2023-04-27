import { configureStore } from '@reduxjs/toolkit';
import { rnSlice } from './rnSlice'

export const store = configureStore({
    reducer: {
        rn: rnSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
