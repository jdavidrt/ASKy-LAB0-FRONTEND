import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export const AddGobernadorComponent = () => {
    const [idPersona, setIdPersona] = useState("");
    const [idVivienda, setIdVivienda] = useState("");
    const [fechaPosesion, setFechaPosesion] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            // Simulando obtención de datos del gobernador para edición
            const ejemploGobernador = {
                id: 1,
                idPersona: '123',
                idVivienda: '456',
                fechaPosesion: '2020-01-01'
            };

            setIdPersona(ejemploGobernador.idPersona);
            setIdVivienda(ejemploGobernador.idVivienda);
            setFechaPosesion(ejemploGobernador.fechaPosesion);
        }
    }, [id]);

    const saveGobernador = (e) => {
        e.preventDefault();

        const gobernador = {
            id: id ? parseInt(id) : null,
            idPersona,
            idVivienda,
            fechaPosesion
        };

        if (id) {
            console.log("Actualizando gobernador:", gobernador);
            alert("Gobernador actualizado correctamente");
        } else {
            console.log("Creando gobernador:", gobernador);
            alert("Gobernador registrado correctamente");
        }

        navigate("/gobernadors");
    };

    const title = id ? 'Actualizar Gobernador' : 'Registrar Gobernador';

    return (
        <div className='container'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    <h2 className='text-center'>{title}</h2>
                    <div className='card-body'>
                        <form onSubmit={saveGobernador}>

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
                                <Link to="/gobernadors" className='btn btn-danger mb-2'>Cancelar</Link>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddGobernadorComponent;
