import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    TablePagination,
    Typography,
} from '@mui/material';

const ListCiudadanosComponent = () => {
    const [ciudadanos, setCiudadanos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCiudadanos, setFilteredCiudadanos] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

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
        { id: 10, nombre: 'Camila', apellido: 'Ramirez', tipoDocumento: 'CC', numeroDocumento: '7766554433', fechaNacimiento: new Date(1996, 1, 12), sexo: 'F', telefono: '3189012345' }
    ];

    useEffect(() => {
        setCiudadanos(ejemploCiudadanos);
        setFilteredCiudadanos(ejemploCiudadanos); // Inicializar la lista filtrada
    }, []);

    // Manejar búsqueda
    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        setFilteredCiudadanos(
            ciudadanos.filter(
                (ciudadano) =>
                    ciudadano.nombre.toLowerCase().includes(term) ||
                    ciudadano.apellido.toLowerCase().includes(term) ||
                    ciudadano.numeroDocumento.includes(term) ||
                    ciudadano.telefono.includes(term)
            )
        );
        setPage(0); // Reiniciar la página al buscar
    };

    // Manejar cambio de página
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Manejar cambio de registros por página
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div className="container">
            <h2 className="text-center">Lista de Ciudadanos</h2>
            <div style={{ marginBottom: '20px' }}>
                <TextField
                    label="Buscar"
                    variant="outlined"
                    value={searchTerm}
                    onChange={handleSearch}
                    fullWidth
                />
                <Typography variant="body2" color="textSecondary" style={{ marginTop: '8px' }}>
                    Puedes buscar por <b>nombre</b>, <b>apellido</b>, <b>número de documento</b> o <b>teléfono</b>.
                </Typography>         
            </div>
            <Link to="/add-ciudadano" style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color="primary">
                        Agregar Ciudadano
                    </Button>
                </Link>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Apellido</TableCell>
                            <TableCell>Tipo de Documento</TableCell>
                            <TableCell>Número de Documento</TableCell>
                            <TableCell>Fecha de Nacimiento</TableCell>
                            <TableCell>Sexo</TableCell>
                            <TableCell>Teléfono</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredCiudadanos
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((ciudadano) => (
                                <TableRow key={ciudadano.id}>
                                    <TableCell>{ciudadano.id}</TableCell>
                                    <TableCell>{ciudadano.nombre}</TableCell>
                                    <TableCell>{ciudadano.apellido}</TableCell>
                                    <TableCell>{ciudadano.tipoDocumento}</TableCell>
                                    <TableCell>{ciudadano.numeroDocumento}</TableCell>
                                    <TableCell>{ciudadano.fechaNacimiento.toLocaleDateString()}</TableCell>
                                    <TableCell>{ciudadano.sexo}</TableCell>
                                    <TableCell>{ciudadano.telefono}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            size="small"
                                            style={{ marginRight: '10px' }}
                                            onClick={() => alert(`Editar ciudadano con ID: ${ciudadano.id}`)}
                                        >
                                            Editar
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            size="small"
                                            onClick={() =>
                                                setCiudadanos(ciudadanos.filter((c) => c.id !== ciudadano.id))
                                            }
                                        >
                                            Eliminar
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15]}
                    component="div"
                    count={filteredCiudadanos.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </div>
    );
};

export default ListCiudadanosComponent;
