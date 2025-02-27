import { createSlice, createSelector} from '@reduxjs/toolkit'
import { StatusFilters } from '../filters/filtersSlice'
import { client } from '../../../api/client'

const initialState = {
  status: 'idle',
  entities: [
  //   { id: 0, image: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e', completed: true},
  // { id: 1, image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d', completed: false},
  // { id: 2, image: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45', completed: false },
  // { id: 3, image: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45', completed: false },
  // { id: 4, image: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45', completed: false },
  // { id: 5, image: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45', completed: false },
  // { id: 6, image: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45', completed: false },
  // { id: 7, image: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45', completed: false },

  ]
}

export const exampleSlice = createSlice({
    name: 'images',
    initialState,
    reducers: {
      imageToggled(state, action) {
        const imageId = action.payload
        const image = state.entities[imageId]
        image.completed = !image.completed
      },
      imagesLoading(state, action) {
        state.status = 'loading'
      },
      imagesLoaded(state, action) {
        const newEntities = {}
        action.payload.forEach((image) => {
          newEntities[image.id] = image
        })
        state.entities = newEntities
        state.status = 'idle'
      },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { imageToggled, imagesLoaded, imagesLoading, } = exampleSlice.actions
  
  export default exampleSlice.reducer

  export const fetchImages = () => async (dispatch) => {
    dispatch(imagesLoading())
    fetch('http://localhost:3001/api/images')
    .then(response => response.json())
    .then(data => dispatch(imagesLoaded(data.images)))
    .catch(error => console.error(error));
  }

  const selectImageEntities = (state) => state.images.entities

export const selectImages = createSelector(selectImageEntities, (entities) =>
  Object.values(entities)
)

export const selectImageById = (state, imageId) => {
  return selectImageEntities(state)[imageId]
}

export const selectImageIds = createSelector(
  // First, pass one or more "input selector" functions:
  selectImages,
  // Then, an "output selector" that receives all the input results as arguments
  // and returns a final result value
  (images) => images.map((image) => image.id)
)

export const selectFilteredImages = createSelector(
  // First input selector: all images
  selectImages,
  // Second input selector: all filter values
  (state) => state.filters,
  // Output selector: receives both values
  (images, filters) => {
    const { status} = filters
    const showAllCompletions = status === StatusFilters.All
    if (showAllCompletions) {
      return images
    }

    const completedStatus = status === StatusFilters.Completed
    // Return either active or completed images based on filter
    return images.filter((image) => {
      const statusMatches =
        showAllCompletions || image.completed === completedStatus
      return statusMatches
    })
  }
)

export const selectFilteredImageIds = createSelector(
  // Pass our other memoized selector as an input
  selectFilteredImages,
  // And derive data in the output selector
  (filteredImages) => filteredImages.map((image) => image.id)
)