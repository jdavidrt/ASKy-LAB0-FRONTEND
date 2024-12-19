import logo from './logo.svg';
import './App.css';
import ListPersonasComponent from './components/Persona/ListPersonasComponent';
import ListViviendaComponent from './components/Vivienda/ListViviendaComponent';
import ListMunicipioComponent from './components/Municipio/ListMunicipioComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddPersonasComponent from './components/Persona/AddPersonasComponent';
import AddViviendaComponent from './components/Vivienda/AddViviendaComponent';
import AddMunicipioComponent from './components/Municipio/AddMunicipioComponent';
import EditViviendaComponent from './components/Vivienda/EditViviendaComponent';
import EditPersonasComponent from './components/Persona/EditPersonasComponent';
import EditMunicipioComponent from './components/Municipio/EditMunicipioComponent';
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
            <Route path='/persona' element={<ListPersonasComponent />}></Route>
            <Route path='/add-persona' element={<AddPersonasComponent />}></Route>
            <Route path='/edit-persona/:id' element={<EditPersonasComponent />}></Route>
            <Route path='/vivienda' element={<ListViviendaComponent />}></Route>
            <Route path='/add-vivienda' element={<AddViviendaComponent />}></Route>
            <Route path='/edit-vivienda/:id' element={<EditViviendaComponent />}></Route>
            <Route path='/municipio' element={<ListMunicipioComponent />}></Route>
            <Route path='/add-municipio' element={<AddMunicipioComponent />}></Route>
            <Route path='/edit-municipio/:id' element={<EditMunicipioComponent />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>

  );
}
export default App;
