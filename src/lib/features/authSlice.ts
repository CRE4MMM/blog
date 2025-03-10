import { createSlice } from '@reduxjs/toolkit'

interface IAuth {
    id: string
    firstname: string
    lastname: string
    email: string
}

const initialState: IAuth = {
    id: '',
    firstname: '',
    lastname: '',
    email: '',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSignIn: (state, action) => {
      console.log('CHECK ACTION SIGNIN', action)
      state.id = action.payload.id
      state.firstname = action.payload.firstname
      state.lastname = action.payload.lastname
      state.email = action.payload.email
    },
    setSignOut: (state) => {
      state.id = ''
      state.firstname = ''
      state.lastname = ''
      state.email = ''
    },
  },
})


export const { setSignIn, setSignOut } = authSlice.actions
export default authSlice.reducer
