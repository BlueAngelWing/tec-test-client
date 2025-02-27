import React , { useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import { toggle, fetchFileText,dismissSuccess,dismissError} from './exceptionSlice'
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

function SuccesAlert() {
    const dispatch = useDispatch()
    return (
        
            <Alert action={<IconButton onClick={(state)=>{ dispatch(dismissSuccess())}}><CloseIcon></CloseIcon></IconButton>} severity="success">
            La peticion fue exitos.
            </Alert>

    );
}

function ErrorAlert() {
    const dispatch = useDispatch()
    return (
        
            <Alert action={<IconButton onClick={(state)=>{ dispatch(dismissError())}}><CloseIcon></CloseIcon></IconButton>} severity="error">
            Ocurrio un error con la peticion.
            </Alert>

    );
}

export default function Exception() {
    
    
  const dispatch = useDispatch()
  const files = [
    { label: 'goodfile.txt' },
    { label: 'badfile.txt' },
  ]

  const showSuccess = useSelector((state) => state.text.showSuccess)
  const showError = useSelector((state) => state.text.showError)
  const contents = useSelector((state) => state.text.text)
  const showText = useSelector((state) => state.text.show)
  console.log(contents);
  console.log(showText);

  const [selected, setSelected] = useState(0);
  const handleChange = (e) => setSelected(e.target.textContent);
  
  const selectedImage = useSelector((state) => fetchFileText(state, selected))
  return (
    <section>
        {showSuccess &&<SuccesAlert />}
        {showError &&<ErrorAlert />}
      <h1>Ejemplo de Exepciones</h1>
      <div>
        <p>Este Campo Crashea</p>
        <Autocomplete
        disablePortal
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Nombre" />}
        />
      </div>
      <div>
        <p>Este Tira error se backend con badfile.txt</p>
        <Autocomplete
        onChange={handleChange}
        disablePortal
        options={files}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Nombre" />}
        />
        <Button variant="contained"  onClick={(state) => dispatch(fetchFileText(state, selected))}>Obtener Contenidos</Button>
        
      </div>
      <div>
      {showText &&<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        {contents}
        </Typography> }
      </div>
    </section>
  );
}