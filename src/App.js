import logo from './logo.svg';
import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Example from "./app/features/example/Example.js";
import MyImageList from "./app/features/images/MyImageList.js";
import MyRandomGrid from "./app/features/grid/MyRandomGrid.js";
import Exception from "./app/features/exceptions/Exceptions.js";
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import Paper from '@mui/material/Paper';
import Header from "./app/features/header/Header.js";
import Footer from "./app/features/footer/Footer.js";
import Grid from '@mui/material/Grid';

function App() {
  return (
    
    
      <ErrorBoundary>
         <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Aplicacion de prueba
            </Typography>
          </Toolbar>
        </AppBar>
        <Router>
          <Grid container spacing={2}>
            <Grid item xs={3}>
            < Link to="/">Home</Link>
            </Grid>
            <Grid item xs={3}>
            <Link to="/images">Imagenes</Link>
            </Grid>
            <Grid item xs={3}>
            <Link to="/exeption">Excepciones</Link>
            </Grid>
            <Grid item xs={3}>
            <Link to="/grid">Grid</Link>
            </Grid>
          </Grid>
          <Routes>
              <Route path="/exeption" element={<Exception/>}/>
              <Route path="/grid" element={<MyRandomGrid/>}/>
              <Route path="/images" element={<MyImageList/>}/>
              <Route path="/"/>
            </Routes>
        </Router>
        
     
       
      </ErrorBoundary>
      
      
    
  );
}



function Users() {
  return <h2>Grid</h2>;
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}

export default App;
