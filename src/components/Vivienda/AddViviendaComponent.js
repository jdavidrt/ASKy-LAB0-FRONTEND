import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ViviendaService from '../../services/ViviendaService';
import MunicipioService from '../../services/MunicipioService'; // Asegúrate de importar el servicio de municipios

const AddViviendaComponent = () => {
    const [direccion, setDireccion] = useState('');
    const [municipioNombre, setmunicipioNombre] = useState(''); // ID del municipio
    const [capacidad, setCapacidad] = useState('');
    const [niveles, setNiveles] = useState('');
    const [municipios, setMunicipios] = useState([]); // Para almacenar la lista de municipios
    const navigate = useNavigate();

    useEffect(() => {
        // Obtener los municipios disponibles cuando se cargue el componente
        MunicipioService.getAllMunicipios()
            .then((response) => {
                setMunicipios(response.data);  // Guardar la lista de municipios en el estado
            })
            .catch((error) => {
                console.error("Error al cargar los municipios", error);
                alert("Hubo un error al cargar los municipios.");
            });
    }, []);

    const saveVivienda = (e) => {
        e.preventDefault();

        // Validaciones de campos
        if (!direccion.trim()) {
            alert('La dirección no puede estar vacía.');
            return;
        }

        if (!municipioNombre) {
            alert('Debes seleccionar un municipio.');
            return;
        }

        if (!capacidad || capacidad <= 0) {
            alert('La capacidad debe ser un número positivo.');
            return;
        }

        if (capacidad > 10) {
            alert('La capacidad no puede ser mayor a 10.');
            return;
        }

        if (!niveles || niveles <= 0) {
            alert('El número de niveles debe ser un número positivo.');
            return;
        }

        if (niveles > 6) {
            alert('El número de niveles no puede ser mayor a 6.');
            return;
        }

        const vivienda = {
            direccion,
            capacidad: parseInt(capacidad),
            niveles: parseInt(niveles),
            municipioNombre: municipioNombre,
        };

        // Llamada al servicio para crear la vivienda
        ViviendaService.createVivienda(vivienda)
            .then(() => {
                alert('Vivienda registrada correctamente');
                navigate('/vivienda');
            })
            .catch((error) => {
                console.error('Error al registrar la vivienda', error);
                alert('Hubo un error al registrar la vivienda. Inténtalo de nuevo.');
            });
    };

    return (
        <div className="container">
            <div className="row">
                <div className="card col-md-6 offset-md-3 offset-md-3">
                    <h2 className="text-center">Registrar Vivienda</h2>
                    <div className="card-body">
                        <form onSubmit={saveVivienda}>
                            <div className="form-group mb-2">
                                <label className="form-label">Dirección</label>
                                <input
                                    type="text"
                                    placeholder="Ingrese la dirección"
                                    className="form-control"
                                    value={direccion}
                                    onChange={(e) => setDireccion(e.target.value)}
                                />
                            </div>

                            <div className="form-group mb-2">
                                <label className="form-label">Municipio</label>
                                <select
                                    className="form-control"
                                    value={municipioNombre}
                                    onChange={(e) => setmunicipioNombre(e.target.value)}
                                    required
                                >
                                    <option value="">Seleccionar Municipio</option>
                                    {municipios.map((municipio) => (
                                        <option key={municipio.id} value={municipio.id}>
                                            {municipio.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group mb-2">
                                <label className="form-label">Capacidad</label>
                                <input
                                    type="number"
                                    placeholder="Ingrese la capacidad"
                                    className="form-control"
                                    value={capacidad}
                                    onChange={(e) => setCapacidad(e.target.value)}
                                />
                            </div>

                            <div className="form-group mb-2">
                                <label className="form-label">Niveles</label>
                                <input
                                    type="number"
                                    placeholder="Ingrese el número de niveles"
                                    className="form-control"
                                    value={niveles}
                                    onChange={(e) => setNiveles(e.target.value)}
                                />
                            </div>

                            <div className="botones">
                                <button type="submit" className="btn btn-primary mb-2">
                                    Registrar
                                </button>
                                <Link to="/vivienda" className="btn btn-danger mb-2">
                                    Cancelar
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddViviendaComponent;
