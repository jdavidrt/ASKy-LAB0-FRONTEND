import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ViviendaService from '../../services/ViviendaService';

const AddViviendaComponent = () => {
    const [direccion, setDireccion] = useState('');
    const [idMunicipio, setIdMunicipio] = useState('');
    const [capacidad, setCapacidad] = useState('');
    const [niveles, setNiveles] = useState('');
    const navigate = useNavigate();

    const saveVivienda = (e) => {
        e.preventDefault();

        // Validaciones de campos
        if (!direccion.trim()) {
            alert('La dirección no puede estar vacía.');
            return;
        }

        if (!idMunicipio || idMunicipio < 0) {
            alert('El ID del municipio no puede estar vacío o ser negativo.');
            return;
        }

        if (!capacidad || capacidad <= 0) {
            alert('La capacidad debe ser un número positivo.');
            return;
        }

        if (!niveles || niveles <= 0) {
            alert('El número de niveles debe ser un número positivo.');
            return;
        }

        const vivienda = {
            direccion,
            idMunicipio: parseInt(idMunicipio),
            capacidad: parseInt(capacidad),
            niveles: parseInt(niveles),
        };

        // Llamada al servicio para crear la vivienda
        ViviendaService.createVivienda(vivienda)
            .then(() => {
                alert('Vivienda registrada correctamente');
                navigate('/vivienda');
            })
            .catch((error) => {
                console.error('Error al registrar la vivienda', error);
                alert('Hubo un error al registrar la vivienda. Inténtelo de nuevo.');
            });
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    <h2 className='text-center'>Registrar Vivienda</h2>
                    <div className='card-body'>
                        <form onSubmit={saveVivienda}>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Dirección</label>
                                <input
                                    type='text'
                                    placeholder='Ingrese la dirección'
                                    className='form-control'
                                    value={direccion}
                                    onChange={(e) => setDireccion(e.target.value)}
                                />
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>ID del Municipio</label>
                                <input
                                    type='number'
                                    placeholder='Ingrese el ID del municipio'
                                    className='form-control'
                                    value={idMunicipio}
                                    onChange={(e) => setIdMunicipio(e.target.value)}
                                />
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Capacidad</label>
                                <input
                                    type='number'
                                    placeholder='Ingrese la capacidad'
                                    className='form-control'
                                    value={capacidad}
                                    onChange={(e) => setCapacidad(e.target.value)}
                                />
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Niveles</label>
                                <input
                                    type='number'
                                    placeholder='Ingrese el número de niveles'
                                    className='form-control'
                                    value={niveles}
                                    onChange={(e) => setNiveles(e.target.value)}
                                />
                            </div>

                            <div className='botones'>
                                <button type='submit' className='btn btn-primary mb-2'>
                                    Registrar
                                </button>
                                <Link to='/vivienda' className='btn btn-danger mb-2'>
                                    Cancelar
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <style>
                {`
                    input[type="number"]::-webkit-outer-spin-button,
                    input[type="number"]::-webkit-inner-spin-button {
                        -webkit-appearance: none;
                        margin: 0;
                    }

                    input[type="number"] {
                        -moz-appearance: textfield;
                    }
                `}
            </style>
        </div>
    );
};

export default AddViviendaComponent;
