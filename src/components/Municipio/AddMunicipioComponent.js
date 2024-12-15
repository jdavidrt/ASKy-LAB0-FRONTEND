import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export const AddMunicipioComponent = () => {
    const [nombre, setNombre] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            const ejemploMunicipio = {
                id: 1,
                nombre: 'Municipio A'
            };

            setNombre(ejemploMunicipio.nombre);
        }
    }, [id]);

    const saveMunicipio = (e) => {
        e.preventDefault();

        if (!nombre.trim()) {
            alert("El nombre del municipio no puede estar vacío.");
            return;
        }

        const municipio = {
            id: id ? parseInt(id) : null,
            nombre
        };

        if (id) {
            console.log("Actualizando municipio:", municipio);
            alert("Municipio actualizado correctamente");
        } else {
            console.log("Creando municipio:", municipio);
            alert("Municipio registrado correctamente");
        }

        navigate("/municipio");
    };

    const title = id ? 'Actualizar Municipio' : 'Registrar Municipio';

    return (
        <div className='container'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    <h2 className='text-center'>{title}</h2>
                    <div className='card-body'>
                        <form onSubmit={saveMunicipio}>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Nombre del Municipio</label>
                                <input
                                    type='text'
                                    placeholder='Ingrese el nombre del municipio'
                                    className='form-control'
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                />
                            </div>

                            <div className='botones'>
                                <button type="submit" className="btn btn-primary mb-2">
                                    {id ? 'Actualizar' : 'Registrar'}
                                </button>
                                <Link to="/municipio" className='btn btn-danger mb-2'>Cancelar</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddMunicipioComponent;
