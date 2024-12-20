import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export const EditGobernadorComponent = () => {
    const [idPersona, setIdPersona] = useState("");
    const [idVivienda, setIdVivienda] = useState("");
    const [fechaPosesion, setFechaPosesion] = useState("");
    const { id } = useParams(); // Obtiene el ID del gobernador desde la URL
    const navigate = useNavigate();

    useEffect(() => {
        // Simulando obtención de datos del gobernador a partir del ID
        if (id) {
            const ejemploGobernador = {
                id: parseInt(id),
                idPersona: '123',
                idVivienda: '456',
                fechaPosesion: '2020-01-01'
            };

            setIdPersona(ejemploGobernador.idPersona);
            setIdVivienda(ejemploGobernador.idVivienda);
            setFechaPosesion(ejemploGobernador.fechaPosesion);
        }
    }, [id]);

    const updateGobernador = (e) => {
        e.preventDefault();

        const gobernador = {
            id: parseInt(id),
            idPersona,
            idVivienda,
            fechaPosesion
        };

        console.log("Actualizando gobernador:", gobernador);
        alert("Gobernador actualizado correctamente");

        navigate("/gobernadors");
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    <h2 className='text-center'>Actualizar Gobernador</h2>
                    <div className='card-body'>
                        <form onSubmit={updateGobernador}>

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
                                <Link to="/gobernadors" className='btn btn-danger mb-2'>Cancelar</Link>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditGobernadorComponent;
