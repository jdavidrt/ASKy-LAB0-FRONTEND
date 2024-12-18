import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export const AddPosesionComponent = () => {
    const [idPersona, setIdPersona] = useState("");
    const [idVivienda, setIdVivienda] = useState("");
    const [fechaPosesion, setFechaPosesion] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            // Simulando obtención de datos de la posesión para edición
            const ejemploPosesion = {
                id: 1,
                idPersona: '123',
                idVivienda: '456',
                fechaPosesion: '2020-01-01'
            };

            setIdPersona(ejemploPosesion.idPersona);
            setIdVivienda(ejemploPosesion.idVivienda);
            setFechaPosesion(ejemploPosesion.fechaPosesion);
        }
    }, [id]);

    const savePosesion = (e) => {
        e.preventDefault();

        const posesion = {
            id: id ? parseInt(id) : null,
            idPersona,
            idVivienda,
            fechaPosesion
        };

        if (id) {
            console.log("Actualizando posesión:", posesion);
            alert("Posesión actualizada correctamente");
        } else {
            console.log("Creando posesión:", posesion);
            alert("Posesión registrada correctamente");
        }

        navigate("/posesiones");
    };

    const title = id ? 'Actualizar Posesión' : 'Registrar Posesión';

    return (
        <div className='container'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    <h2 className='text-center'>{title}</h2>
                    <div className='card-body'>
                        <form onSubmit={savePosesion}>

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
                                    {id ? 'Actualizar' : 'Registrar'}
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

export default AddPosesionComponent;
