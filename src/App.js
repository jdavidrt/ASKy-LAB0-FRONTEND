import logo from './logo.svg';
import './App.css';
import ListCiudadanosComponent from './components/Ciudadano/ListCiudadanosComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddCiudadanoComponent from './components/Ciudadano/AddCiudadanoComponent';


function App() {

  return (
    <div>
      <BrowserRouter>
        <HeaderComponent />
        <div className='container'>
          <Routes>
            <Route exact path='/' element={<ListCiudadanosComponent />}></Route>
            <Route path='/ciudadano' element={<ListCiudadanosComponent />}></Route>
            <Route path='/add-ciudadano' element={<AddCiudadanoComponent />}></Route>
            <Route path='/edit-ciudadano/:id' element={<AddCiudadanoComponent />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>

  );
}
export default App;
