import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export const AddCiudadanoComponent = () => {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [tipoDocumento, setTipoDocumento] = useState("");
    const [numeroDocumento, setNumeroDocumento] = useState("");
    const [fechaNacimiento, setFechaNacimiento] = useState("");
    const [sexo, setSexo] = useState("");
    const [telefono, setTelefono] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            // Simulando obtención de datos del ciudadano para edición
            const ejemploCiudadano = {
                id: 1,
                nombre: 'Juan',
                apellido: 'Perez',
                tipoDocumento: 'CC',
                numeroDocumento: '123456789',
                fechaNacimiento: '1990-06-15',
                sexo: 'M',
                telefono: '3101234567'
            };

            setNombre(ejemploCiudadano.nombre);
            setApellido(ejemploCiudadano.apellido);
            setTipoDocumento(ejemploCiudadano.tipoDocumento);
            setNumeroDocumento(ejemploCiudadano.numeroDocumento);
            setFechaNacimiento(ejemploCiudadano.fechaNacimiento);
            setSexo(ejemploCiudadano.sexo);
            setTelefono(ejemploCiudadano.telefono);
        }
    }, [id]);

    const saveCiudadano = (e) => {
        e.preventDefault();

        const ciudadano = {
            id: id ? parseInt(id) : null,
            nombre,
            apellido,
            tipoDocumento,
            numeroDocumento,
            fechaNacimiento,
            sexo,
            telefono
        };

        if (id) {
            console.log("Actualizando ciudadano:", ciudadano);
            alert("Ciudadano actualizado correctamente");
        } else {
            console.log("Creando ciudadano:", ciudadano);
            alert("Ciudadano registrado correctamente");
        }

        navigate("/ciudadanos");
    };

    const title = id ? 'Actualizar Ciudadano' : 'Registrar Ciudadano';

    return (
        <div className='container'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    <h2 className='text-center'>{title}</h2>
                    <div className='card-body'>
                        <form onSubmit={saveCiudadano}>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Nombre</label>
                                <input
                                    type='text'
                                    placeholder='Ingrese el nombre'
                                    className='form-control'
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                />
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Apellido</label>
                                <input
                                    type='text'
                                    placeholder='Ingrese el apellido'
                                    className='form-control'
                                    value={apellido}
                                    onChange={(e) => setApellido(e.target.value)}
                                />
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Tipo de Documento</label>
                                <select
                                    className='form-control'
                                    value={tipoDocumento}
                                    onChange={(e) => setTipoDocumento(e.target.value)}
                                >
                                    <option value="" disabled>Seleccione el tipo de documento</option>
                                    <option value="CC">Cédula de Ciudadanía</option>
                                    <option value="TI">Tarjeta de Identidad</option>
                                    <option value="CE">Cédula de Extranjería</option>
                                </select>
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Número de Documento</label>
                                <input
                                    type='text'
                                    placeholder='Ingrese el número de documento'
                                    className='form-control'
                                    value={numeroDocumento}
                                    onChange={(e) => setNumeroDocumento(e.target.value)}
                                />
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Fecha de Nacimiento</label>
                                <input
                                    type='date'
                                    className='form-control'
                                    value={fechaNacimiento}
                                    onChange={(e) => setFechaNacimiento(e.target.value)}
                                />
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Sexo</label>
                                <select
                                    className='form-control'
                                    value={sexo}
                                    onChange={(e) => setSexo(e.target.value)}
                                >
                                    <option value="" disabled>Seleccione el sexo</option>
                                    <option value="M">Masculino</option>
                                    <option value="F">Femenino</option>
                                </select>
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Teléfono</label>
                                <input
                                    type='text'
                                    placeholder='Ingrese el teléfono'
                                    className='form-control'
                                    value={telefono}
                                    onChange={(e) => setTelefono(e.target.value)}
                                />
                            </div>

                            <div className='botones'>
                                <button type="submit" className="btn btn-primary mb-2">
                                    {id ? 'Actualizar' : 'Registrar'}
                                </button>
                                <Link to="/ciudadanos" className='btn btn-danger mb-2'>Cancelar</Link>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCiudadanoComponent;