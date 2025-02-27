import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import StarBorderIcon from '@mui/icons-material/Visibility';

import {
  imageToggled,
  selectImageById,
} from './imagesSlice'

function srcset(image, width, height, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width * cols}&h=${
      height * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}
// Destructure `props.id`, since we just need the ID value
const ImageItem = ({ id }) => {
  // Call our `selectImageById` with the state _and_ the ID value
  const selectedImage = useSelector((state) => selectImageById(state, id))
  const { image, completed } = selectedImage

  const dispatch = useDispatch()

  const handleCompletedChanged = () => {
    dispatch(imageToggled(selectedImage.id))
  }
  const cols = 1;
  const rows = 1;
  const color = completed ? 'cyan' : 'white';

  return (
    // <li>
    //   <div className="view">
    //     <div className="segment label">
    //       <input
    //         className="toggle"
    //         type="checkbox"
    //         checked={completed}
    //         onChange={handleCompletedChanged}
    //       />
    //       <div className="image-text">{image}</div>
    //     </div>
    //     <div className="segment buttons">
    //     </div>
    //   </div>
    // </li>

    <ImageListItem key={selectedImage.id} cols={cols} rows={rows}>
            <img
              {...srcset(image, 250, 200, rows, cols)}
              alt={selectedImage.id}
              loading="lazy"
              onClick={handleCompletedChanged}
            />
            
            <ImageListItemBar
              sx={{
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                  'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
              }}
              title=""
              position="top"
              actionIcon={
                 <IconButton
                  sx={{ color: {color}}}
                  aria-label={`star ${selectedImage.id}`}
                  onClick={handleCompletedChanged}
                >
                  <StarBorderIcon />
                </IconButton>
              }
              actionPosition="left"
            />
          </ImageListItem>
  )
}

export default ImageItem
