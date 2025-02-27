import React , { useState }from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ImageItem from './ImageItem.js'
import { selectFilteredImages } from './imagesSlice.js'
import ImageList from '@mui/material/ImageList';
import { selectImages } from './imagesSlice'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {
  StatusFilters,
  statusFilterChanged
} from '../filters/filtersSlice'

function Profile() {
  return (
    <img
      src="https://i.imgur.com/QIrZWGIs.jpg"
      alt="Alan L. Hart"
    />
  );
}

const MyImageList = () => {
  // const imageIds = useSelector(selectFilteredImageIds)
  // const loadingStatus = useSelector((state) => state.images.status)

  // if (loadingStatus === 'loading') {
  //   return (
      
  //       <div className="image-list">
  //         <div className="loader" />
  //       </div>
      
  //   )
  // }

  // const renderedListItems = imageIds.map((imageId) => {
  //   return <ImageItem key={imageId} id={imageId} />
  // })

  // return <ul className="image-list">{renderedListItems}</ul>
  const itemData = useSelector(selectFilteredImages)
  return(
    <Grid container spacing={2}>
    <Grid item xs={12}>
    <ImageList
      sx={{
        width: 500,
        height: 450,
        // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
        transform: 'translateZ(0)',
      }}
      rowHeight={200}
      gap={1}
    >
      {itemData.map((item) => {
        const cols = item.featured ? 2 : 1;
        const rows = item.featured ? 2 : 1;
        return(
          <ImageItem key={item.id} id={item.id} img={item.image} completed={item.completed}/>
        )
        }
      )}

    </ImageList>
    </Grid>
    <Grid item xs={12}>
    <Footer/>
    </Grid>
    </Grid>
    
  )
  
}

const ImagesViewed = ({ count }) => {
  const suffix = count === 1 ? '' : 's'

  return (
    <div className="image-count">
      
      <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
        Imagenes Vistas
      </Typography>
      <strong>{count}</strong> item{suffix} left
    </div>
  )
}

const StatusFilter = ({ value: status, onChange }) => {
  const renderedFilters = Object.keys(StatusFilters).map((key) => {
    const value = StatusFilters[key]
    const handleClick = () => onChange(value)
    const className = value === status ? 'selected' : ''

    return (
      <Button variant="contained"  key={value} className={className} onClick={handleClick}>{key}</Button>
    )
  })

  return (
    <div>
<Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
        Filtrar por Estado
      </Typography>
     {renderedFilters}
    </div>
      
    
  )
}

const Footer = () => {
  const dispatch = useDispatch()

  const imagesRemaining = useSelector((state) => {
    const notViewedImages = selectImages(state).filter(
      (image) => !image.completed
    )
    return notViewedImages.length
  })

  const { status } = useSelector((state) => state.filters)

  const onStatusChange = (status) => dispatch(statusFilterChanged(status))

  return (
    <footer className="footer">
      <StatusFilter value={status} onChange={onStatusChange} />
    </footer>
  )
}

const Header = () => {
  const [status,setStatus] = useState('idle')


  let isLoading = status === 'loading'
  let loader = isLoading ? <div className="loader" /> : null

  return (
    
      <header className="header">
        {loader}
      </header>
    
    
  )
}
export default MyImageList

