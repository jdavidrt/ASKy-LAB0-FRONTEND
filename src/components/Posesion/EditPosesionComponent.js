import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export const EditPosesionComponent = () => {
    const [idPersona, setIdPersona] = useState("");
    const [idVivienda, setIdVivienda] = useState("");
    const [fechaPosesion, setFechaPosesion] = useState("");
    const { id } = useParams(); // Obtiene el ID de la posesión desde la URL
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            // Simulando obtención de datos de la posesión a partir del ID
            const ejemploPosesion = {
                id: parseInt(id),
                idPersona: '123',
                idVivienda: '456',
                fechaPosesion: '2020-01-01'
            };

            setIdPersona(ejemploPosesion.idPersona);
            setIdVivienda(ejemploPosesion.idVivienda);
            setFechaPosesion(ejemploPosesion.fechaPosesion);
        }
    }, [id]);

    const updatePosesion = (e) => {
        e.preventDefault();

        const posesion = {
            id: parseInt(id),
            idPersona,
            idVivienda,
            fechaPosesion
        };

        console.log("Actualizando posesión:", posesion);
        alert("Posesión actualizada correctamente");

        navigate("/posesiones");
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    <h2 className='text-center'>Actualizar Posesión</h2>
                    <div className='card-body'>
                        <form onSubmit={updatePosesion}>

                            <div className='form-group mb-2'>
                                <label className='form-label'>ID Persona</label>
                                <input
                                    type='text'
                                    placeholder='Ingrese el ID de la persona'
                                    className='form-control'
                                    value={idPersona}
                                    onChange={(e) => setIdPersona(e.target.value)}
                                />
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>ID Vivienda</label>
                                <input
                                    type='text'
                                    placeholder='Ingrese el ID de la vivienda'
                                    className='form-control'
                                    value={idVivienda}
                                    onChange={(e) => setIdVivienda(e.target.value)}
                                />
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Fecha de Posesión</label>
                                <input
                                    type='date'
                                    className='form-control'
                                    value={fechaPosesion}
                                    onChange={(e) => setFechaPosesion(e.target.value)}
                                />
                            </div>

                            <div className='botones'>
                                <button type="submit" className="btn btn-primary mb-2">
                                    Actualizar
                                </button>
                                <Link to="/posesiones" className='btn btn-danger mb-2'>Cancelar</Link>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditPosesionComponent;
