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

const ListViviendasComponent = () => {
    const [viviendas, setViviendas] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredViviendas, setFilteredViviendas] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Datos de ejemplo
    const ejemploViviendas = [
        { id: 1, direccion: 'Calle 123 #12-34', idMunicipio: 101, capacidad: 4, niveles: 2 },
        { id: 2, direccion: 'Avenida 45 #12-34', idMunicipio: 102, capacidad: 6, niveles: 3 },
        { id: 3, direccion: 'Carrera 78 #12-34', idMunicipio: 103, capacidad: 3, niveles: 1 },
        { id: 4, direccion: 'Calle 10 #12-34', idMunicipio: 104, capacidad: 8, niveles: 4 },
        { id: 5, direccion: 'Avenida 7 #12-34', idMunicipio: 105, capacidad: 5, niveles: 2 },
    ];

    useEffect(() => {
        setViviendas(ejemploViviendas);
        setFilteredViviendas(ejemploViviendas); // Inicializar la lista filtrada
    }, []);

    // Manejar búsqueda
    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        setFilteredViviendas(
            viviendas.filter(
                (vivienda) =>
                    vivienda.direccion.toLowerCase().includes(term) ||
                    vivienda.idMunicipio.toString().includes(term) 
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
            <h2 className="text-center">Lista de Viviendas</h2>
            <div style={{ marginBottom: '20px' }}>
                <TextField
                    label="Buscar"
                    variant="outlined"
                    value={searchTerm}
                    onChange={handleSearch}
                    fullWidth
                />
                <Typography variant="body2" color="textSecondary" style={{ marginTop: '8px' }}>
                    Puedes buscar por <b>dirección</b> ó <b>ID del municipio</b>.
                </Typography>
            </div>
            <Link to="/add-vivienda" style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="primary">
                    Agregar Vivienda
                </Button>
            </Link>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Dirección</TableCell>
                            <TableCell>ID del Municipio</TableCell>
                            <TableCell>Capacidad (Personas)</TableCell>
                            <TableCell>Niveles</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredViviendas
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((vivienda) => (
                                <TableRow key={vivienda.id}>
                                    <TableCell>{vivienda.id}</TableCell>
                                    <TableCell>{vivienda.direccion}</TableCell>
                                    <TableCell>{vivienda.idMunicipio}</TableCell>
                                    <TableCell>{vivienda.capacidad}</TableCell>
                                    <TableCell>{vivienda.niveles}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            size="small"
                                            style={{ marginRight: '10px' }}
                                            onClick={() => alert(`Editar vivienda con ID: ${vivienda.id}`)}
                                        >
                                            Editar
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            size="small"
                                            onClick={() =>
                                                setViviendas(viviendas.filter((v) => v.id !== vivienda.id))
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
                    count={filteredViviendas.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </div>
    );
};

export default ListViviendasComponent;
