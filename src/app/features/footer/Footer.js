import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import BottomNavigation from '@mui/material/BottomNavigation';

import {
  StatusFilters,
  statusFilterChanged
} from '../filters/filtersSlice'
import {
  selectImages,
} from '../images/imagesSlice'

const ImagesViewed = ({ count }) => {
  const suffix = count === 1 ? '' : 's'

  return (
    <div className="image-count">
      <h5>Imagenes Vistas</h5>
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
      <li key={value}>
        <button className={className} onClick={handleClick}>
          {key}
        </button>
      </li>
    )
  })

  return (
    <div className="filters statusFilters">
      <h5>Filtrar por Estado</h5>
      <ul>{renderedFilters}</ul>
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
      <ImagesViewed count={imagesRemaining} />
      <StatusFilter value={status} onChange={onStatusChange} />
    </footer>
  )
}

export default Footer
