import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
import HomeComponent from './components/HomeComponent';

import ListPersonasComponent from './components/Persona/ListPersonasComponent';
import AddPersonaComponent from './components/Persona/AddPersonasComponent';

import ListViviendaComponent from './components/Vivienda/ListViviendaComponent';
import AddViviendaComponent from './components/Vivienda/AddViviendaComponent';

import ListMunicipioComponent from './components/Municipio/ListMunicipioComponent';
import AddMunicipioComponent from './components/Municipio/AddMunicipioComponent';

import ListCDFComponent from './components/CDF/ListCDFComponent';
import AddCDFComponent from './components/CDF/AddCDFComponent';

import ListGobernadorComponent from './components/Gobernador/ListGobernadorComponent';
import AddGobernadorComponent from './components/Gobernador/AddGobernadorComponent';

import ListPosesionComponent from './components/Posesion/ListPosesionComponent';
import AddPosesionComponent from './components/Posesion/AddPosesionComponent';

function App() {
  return (
    <div>
      <BrowserRouter>
        <HeaderComponent />
        <div className='container'>
          <Routes>
            {/* Home */}
            <Route exact path='/' element={<HomeComponent />} />
            <Route path='/home' element={<HomeComponent />} />

            {/* Persona */}
            <Route path='/persona' element={<ListPersonasComponent />} />
            <Route path='/add-persona' element={<AddPersonaComponent />} />

            {/* Vivienda */}
            <Route path='/vivienda' element={<ListViviendaComponent />} />
            <Route path='/add-vivienda' element={<AddViviendaComponent />} />

            {/* Municipio */}
            <Route path='/municipio' element={<ListMunicipioComponent />} />
            <Route path='/add-municipio' element={<AddMunicipioComponent />} />

            {/* CDF */}
            <Route path='/cdf' element={<ListCDFComponent />} />
            <Route path='/add-cdf' element={<AddCDFComponent />} />

            {/* Gobernador */}
            <Route path='/gobernadore' element={<ListGobernadorComponent />} />
            <Route path='/add-gobernador' element={<AddGobernadorComponent />} />

            {/* Posesión */}
            <Route path='/posesiones' element={<ListPosesionComponent />} />
            <Route path='/add-posesion' element={<AddPosesionComponent />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
