import { configureStore } from '@reduxjs/toolkit'
import imageReducer from './features/images/imagesSlice.js'
import filtersReducer from './features/filters/filtersSlice'
import exceptionReducer from './features/exceptions/exceptionSlice'

const store = configureStore({
  reducer: {
    images: imageReducer,
    filters: filtersReducer,
    text: exceptionReducer
  },
})

export default store