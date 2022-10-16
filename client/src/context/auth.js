import { createSlice } from '@reduxjs/toolkit'

export const auth = createSlice({
  name: 'auth',
  initialState: {
    email: null,
  },
  reducers: {
    setEmail: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.email = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setEmail } = auth.actions

export const email = (state) => state.auth.email

export default auth.reducer