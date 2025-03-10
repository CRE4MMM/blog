import { configureStore } from '@reduxjs/toolkit'
import  authReducer from '@/lib/features/authSlice'

export const store = configureStore({
    reducer: {
        authState: authReducer,
    },
})

export type RootState = ReturnType<typeof store.getState> // untuk mendefinisikan struktur data yang tersimpan pada redux
export type AppDispatch = typeof store.dispatch // untuk mendefinisikan struktur data apa yang disimpan pada reducer store redux
