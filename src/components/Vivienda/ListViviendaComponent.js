import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import ViviendaService from '../../services/ViviendaService';

const ListViviendasComponent = () => {
    const [viviendas, setViviendas] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredViviendas, setFilteredViviendas] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Cargar todas las viviendas al montar el componente
    useEffect(() => {
        ViviendaService.getAllViviendas()
            .then((response) => {
                setViviendas(response.data);
                setFilteredViviendas(response.data);
            })
            .catch((error) => {
                setError('Error al cargar las viviendas.');
                console.error(error);
            });
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

    // Manejar eliminación de una vivienda
    const handleDelete = (id) => {
        if (window.confirm('¿Estás seguro de eliminar esta vivienda?')) {
            ViviendaService.deleteViviendaById(id)
                .then(() => {
                    setViviendas((prevViviendas) => prevViviendas.filter((v) => v.id !== id));
                    setFilteredViviendas((prevViviendas) => prevViviendas.filter((v) => v.id !== id));
                })
                .catch((error) => {
                    setError('Error al eliminar la vivienda.');
                    console.error(error);
                });
        }
    };

    return (
        <div className="container">
            <h2 className="text-center">Lista de Viviendas</h2>

            {error && (
                <Typography color="error" gutterBottom>
                    {error}
                </Typography>
            )}

            <div style={{ marginBottom: '20px' }}>
                <TextField
                    label="Buscar"
                    variant="outlined"
                    value={searchTerm}
                    onChange={handleSearch}
                    fullWidth
                />
                <Typography variant="body2" color="textSecondary" style={{ marginTop: '8px' }}>
                    Puedes buscar por <b>dirección</b> o <b>ID del municipio</b>.
                </Typography>
            </div>

            <Link to="/add-vivienda" style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="primary">
                    Agregar Vivienda
                </Button>
            </Link>

            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
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
                                            onClick={() => navigate(`/edit-vivienda/${vivienda.id}`)}
                                        >
                                            Editar
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            size="small"
                                            onClick={() => handleDelete(vivienda.id)}
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
