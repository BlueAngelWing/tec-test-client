import { createSlice } from '@reduxjs/toolkit'

const bad = null;

export const exceptionSlice = createSlice({
    name: 'showText',
    initialState: {
      show: false,
      text:"",
      showError:false,
      showSuccess:false
    },
    reducers: {
      toggle: (state) => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes.
        // Also, no return statement is required from these functions.
        state.value = !state
      },
      textLoaded(state, action) {
        
          state.show = action.payload.show
          state.text = action.payload.text
          state.showSuccess = true
      },
      setError: (state) => {
        state.showError = true
        state.show = false
        state.text = ""
      },
      dismissSuccess: (state) => {
        state.showSuccess = false
      },
      dismissError: (state) => {
        state.showError = false
      },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { toggle, setError,textLoaded,showError,showSuccess,dismissSuccess,dismissError} = exceptionSlice.actions
  
  export default exceptionSlice.reducer

  export const fetchFileText = (state, filename) => async (dispatch) => {
    fetch('http://localhost:3001/api/text?filename='+ filename)
    .then(response => response.json())
    .then(data => dispatch(textLoaded(data)))
    .catch(error =>  dispatch(setError()));
  }
  