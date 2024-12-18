import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export const AddCDFComponent = () => {
    const [idPersona, setIdPersona] = useState("");
    const [idCdf, setIdCdf] = useState("");
    const [fechaRegistro, setFechaRegistro] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            // Simulando obtención de datos del CDF para edición
            const ejemploCDF = {
                id: 1,
                idPersona: '123',
                idCdf: '456',
                fechaRegistro: '2022-01-01'
            };

            setIdPersona(ejemploCDF.idPersona);
            setIdCdf(ejemploCDF.idCdf);
            setFechaRegistro(ejemploCDF.fechaRegistro);
        }
    }, [id]);

    const saveCDF = (e) => {
        e.preventDefault();

        const cdf = {
            id: id ? parseInt(id) : null,
            idPersona,
            idCdf,
            fechaRegistro
        };

        if (id) {
            console.log("Actualizando CDF:", cdf);
            alert("CDF actualizado correctamente");
        } else {
            console.log("Creando CDF:", cdf);
            alert("CDF registrado correctamente");
        }

        navigate("/cdfs");
    };

    const title = id ? 'Actualizar CDF' : 'Registrar CDF';

    return (
        <div className='container'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    <h2 className='text-center'>{title}</h2>
                    <div className='card-body'>
                        <form onSubmit={saveCDF}>

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
                                <label className='form-label'>ID CDF</label>
                                <input
                                    type='text'
                                    placeholder='Ingrese el ID del CDF'
                                    className='form-control'
                                    value={idCdf}
                                    onChange={(e) => setIdCdf(e.target.value)}
                                />
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Fecha de Registro</label>
                                <input
                                    type='date'
                                    className='form-control'
                                    value={fechaRegistro}
                                    onChange={(e) => setFechaRegistro(e.target.value)}
                                />
                            </div>

                            <div className='botones'>
                                <button type="submit" className="btn btn-primary mb-2">
                                    {id ? 'Actualizar' : 'Registrar'}
                                </button>
                                <Link to="/cdfs" className='btn btn-danger mb-2'>Cancelar</Link>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCDFComponent;
