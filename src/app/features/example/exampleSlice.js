import { createSlice } from '@reduxjs/toolkit'

export const exampleSlice = createSlice({
    name: 'showImage',
    initialState: {
      value: true,
    },
    reducers: {
      show: (state) => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes.
        // Also, no return statement is required from these functions.
        state.value =true
      },
      hide: (state) => {
        state.value = false
      }
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { show, hide } = exampleSlice.actions
  
  export default exampleSlice.reducer