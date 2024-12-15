import logo from './logo.svg';
import './App.css';
import ListCiudadanosComponent from './components/Ciudadano/ListCiudadanosComponent';
import ListViviendaComponent from './components/Vivienda/ListViviendaComponent';
import ListMunicipioComponent from './components/Municipio/ListMunicipioComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddCiudadanoComponent from './components/Ciudadano/AddCiudadanoComponent';
import AddViviendaComponent from './components/Vivienda/AddViviendaComponent';
import AddMunicipioComponent from './components/Municipio/AddMunicipioComponent';
import HomeComponent from './components/HomeComponent';

function App() {

  return (
    <div>
      <BrowserRouter>
        <HeaderComponent />
        <div className='container'>
          <Routes>
            <Route exact path='/' element={<HomeComponent />}></Route>
            <Route path='/home' element={<HomeComponent />}></Route>
            <Route path='/ciudadano' element={<ListCiudadanosComponent />}></Route>
            <Route path='/add-ciudadano' element={<AddCiudadanoComponent />}></Route>
            <Route path='/vivienda' element={<ListViviendaComponent />}></Route>
            <Route path='/add-vivienda' element={<AddViviendaComponent />}></Route>
            <Route path='/municipio' element={<ListMunicipioComponent />}></Route>
            <Route path='/add-municipio' element={<AddMunicipioComponent />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>

  );
}
export default App;
