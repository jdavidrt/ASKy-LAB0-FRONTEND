import './App.css';
import ListPersonasComponent from './components/Persona/ListPersonasComponent';
import ListViviendaComponent from './components/Vivienda/ListViviendaComponent';
import ListMunicipioComponent from './components/Municipio/ListMunicipioComponent';
import HeaderComponent from './components/HeaderComponent';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddPersonasComponent from './components/Persona/AddPersonasComponent';
import AddViviendaComponent from './components/Vivienda/AddViviendaComponent';
import AddMunicipioComponent from './components/Municipio/AddMunicipioComponent';
import EditViviendaComponent from './components/Vivienda/EditViviendaComponent';
import EditPersonasComponent from './components/Persona/EditPersonasComponent';
import EditMunicipioComponent from './components/Municipio/EditMunicipioComponent';
import HomeComponent from './components/HomeComponent';
import ListCDFComponent from './components/CDF/ListCDFComponent';
import AddCDFComponent from './components/CDF/AddCDFComponent';
//import EditCDFComponent from './components/CDF/EditCDFComponent';
import ListGobernadorComponent from './components/Gobernador/ListGobernadorComponent';
import AddGobernadorComponent from './components/Gobernador/AddGobernadorComponent';
//import EditGobernadorComponent from './components/Gobernador/EditGobernadorComponent';
import ListPosesionComponent from './components/Posesion/ListPosesionComponent';
import AddPosesionComponent from './components/Posesion/AddPosesionComponent';
//import EditPosesionesComponent from './components/Posesiones/EditPosesionesComponent';


//<Route path='/edit-cdf/:id' element={<EditCDFComponent />}></Route>
//<Route path='/edit-posesiones/:id' element={<EditPosesionesComponent />}></Route>
//<Route path='/edit-gobernador/:id' element={<EditGobernadorComponent />}></Route>
function App() {

  return (
    <div>
      <BrowserRouter>
        <HeaderComponent />
        <div className='container'>
          <Routes>
            <Route exact path='/' element={<HomeComponent />}></Route>
            <Route path='/home' element={<HomeComponent />}></Route>
            <Route path='/persona' element={<ListPersonasComponent />}></Route>
            <Route path='/add-persona' element={<AddPersonasComponent />}></Route>
            <Route path='/edit-persona/:id' element={<EditPersonasComponent />}></Route>
            <Route path='/vivienda' element={<ListViviendaComponent />}></Route>
            <Route path='/add-vivienda' element={<AddViviendaComponent />}></Route>
            <Route path='/edit-vivienda/:id' element={<EditViviendaComponent />}></Route>
            <Route path='/municipio' element={<ListMunicipioComponent />}></Route>
            <Route path='/add-municipio' element={<AddMunicipioComponent />}></Route>
            <Route path='/edit-municipio/:id' element={<EditMunicipioComponent />}></Route>
            <Route path='/cdf' element={<ListCDFComponent />}></Route>
            <Route path='/add-cdf' element={<AddCDFComponent />}></Route>
            <Route path='/gobernadore' element={<ListGobernadorComponent />}></Route>
            <Route path='/add-gobernador' element={<AddGobernadorComponent />}></Route>
            <Route path='/posesiones' element={<ListPosesionComponent />}></Route>
            <Route path='/add-posesion' element={<AddPosesionComponent />}></Route>

          </Routes>
        </div>
      </BrowserRouter>
    </div>

  );
}
export default App;
