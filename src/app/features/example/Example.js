import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { show, hide } from './exampleSlice'

function Profile() {
  return (
    <img
      src="https://i.imgur.com/QIrZWGIs.jpg"
      alt="Alan L. Hart"
    />
  );
}

export default function Home() {
  const dispatch = useDispatch()
  return (
    <section>
      <h1>Imagenes</h1>
      <div>
      <button
          aria-label="Increment value"
          onClick={() => dispatch(show())}
        >
          Mostrar
        </button>

        <button
          aria-label="Decrement value"
          onClick={() => dispatch(hide())}
        >
          Ocultar
        </button>
      </div>
      <Profile />
    </section>
  );
}