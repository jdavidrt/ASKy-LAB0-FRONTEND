import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ListCiudadanosComponent = () => {
    const [ciudadanos, setCiudadanos] = useState([]);
    const [searchId, setSearchId] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [ciudadanosPerPage] = useState(8);

    // Datos de ejemplo
    const ejemploCiudadanos = [
        { id: 1, nombre: 'Juan', apellido: 'Perez', tipoDocumento: 'CC', numeroDocumento: '123456789', fechaNacimiento: new Date(1990, 5, 15), sexo: 'M', telefono: '3101234567' },
        { id: 2, nombre: 'Maria', apellido: 'Gomez', tipoDocumento: 'CC', numeroDocumento: '987654321', fechaNacimiento: new Date(1985, 10, 20), sexo: 'F', telefono: '3207654321' },
        { id: 3, nombre: 'Carlos', apellido: 'Lopez', tipoDocumento: 'TI', numeroDocumento: '1122334455', fechaNacimiento: new Date(2000, 3, 10), sexo: 'M', telefono: '3112345678' },
        { id: 4, nombre: 'Ana', apellido: 'Martinez', tipoDocumento: 'CC', numeroDocumento: '5544332211', fechaNacimiento: new Date(1992, 7, 5), sexo: 'F', telefono: '3123456789' },
        { id: 5, nombre: 'Luis', apellido: 'Rodriguez', tipoDocumento: 'CC', numeroDocumento: '6677889900', fechaNacimiento: new Date(1995, 0, 25), sexo: 'M', telefono: '3134567890' },
        { id: 6, nombre: 'Sofia', apellido: 'Hernandez', tipoDocumento: 'CC', numeroDocumento: '3344556677', fechaNacimiento: new Date(1988, 11, 30), sexo: 'F', telefono: '3145678901' },
        { id: 7, nombre: 'Diego', apellido: 'Garcia', tipoDocumento: 'CC', numeroDocumento: '2233445566', fechaNacimiento: new Date(1991, 2, 15), sexo: 'M', telefono: '3156789012' },
        { id: 8, nombre: 'Laura', apellido: 'Torres', tipoDocumento: 'CC', numeroDocumento: '9988776655', fechaNacimiento: new Date(1993, 8, 10), sexo: 'F', telefono: '3167890123' },
        { id: 9, nombre: 'Andres', apellido: 'Vargas', tipoDocumento: 'CC', numeroDocumento: '8877665544', fechaNacimiento: new Date(1989, 6, 20), sexo: 'M', telefono: '3178901234' },
        { id: 10, nombre: 'Camila', apellido: 'Ramirez', tipoDocumento: 'CC', numeroDocumento: '7766554433', fechaNacimiento: new Date(1996, 1, 12), sexo: 'F', telefono: '3189012345' },
    ];

    useEffect(() => {
        setCiudadanos(ejemploCiudadanos);
    }, []);

    const handleSearch = () => {
        if (searchId === '') {
            alert('Por favor ingresa un ID');
            return;
        }
        const ciudadano = ciudadanos.find(c => c.id === parseInt(searchId));
        if (ciudadano) {
            alert(`ID: ${ciudadano.id}\nNombre: ${ciudadano.nombre}\nApellido: ${ciudadano.apellido}\nTipo de Documento: ${ciudadano.tipoDocumento}\nNúmero de Documento: ${ciudadano.numeroDocumento}\nFecha de Nacimiento: ${ciudadano.fechaNacimiento.toLocaleDateString()}\nSexo: ${ciudadano.sexo}\nTeléfono: ${ciudadano.telefono}`);
        } else {
            alert('Ciudadano no encontrado');
        }
    };

    // Obtener ciudadanos actuales
    const indexOfLastCiudadano = currentPage * ciudadanosPerPage;
    const indexOfFirstCiudadano = indexOfLastCiudadano - ciudadanosPerPage;
    const currentCiudadanos = ciudadanos.slice(indexOfFirstCiudadano, indexOfLastCiudadano);

    // Cambiar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(ciudadanos.length / ciudadanosPerPage);

    return (
        <div className='container'>
            <h2 className='text-center'>Lista de Ciudadanos</h2>
            <Link to="/add-ciudadano" className='btn btn-primary mb-2'>Agregar Ciudadano</Link>
            <div className='row mb-3'>
                <div className='col-md-4'>
                    <input
                        type='text'
                        className='form-control'
                        placeholder='Buscar por ID'
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                    />
                </div>
                <div className='col-md-2'>
                    <button className='btn btn-primary' onClick={handleSearch}>Buscar</button>
                </div>
            </div>
            <table className='table table-bordered table-striped'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Tipo de Documento</th>
                        <th>Número de Documento</th>
                        <th>Fecha de Nacimiento</th>
                        <th>Sexo</th>
                        <th>Teléfono</th>
                    </tr>
                </thead>
                <tbody>
                    {currentCiudadanos.map(ciudadano => (
                        <tr key={ciudadano.id}>
                            <td>{ciudadano.id}</td>
                            <td>{ciudadano.nombre}</td>
                            <td>{ciudadano.apellido}</td>
                            <td>{ciudadano.tipoDocumento}</td>
                            <td>{ciudadano.numeroDocumento}</td>
                            <td>{ciudadano.fechaNacimiento.toLocaleDateString()}</td>
                            <td>{ciudadano.sexo}</td>
                            <td>{ciudadano.telefono}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <nav>
                <ul className='pagination'>
                    {[...Array(totalPages).keys()].map(number => (
                        <li key={number + 1} className='page-item'>
                            <button onClick={() => paginate(number + 1)} className='page-link'>
                                {number + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default ListCiudadanosComponent;