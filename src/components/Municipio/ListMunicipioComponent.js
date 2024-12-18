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

const ListMunicipiosComponent = () => {
    const [municipios, setMunicipios] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredMunicipios, setFilteredMunicipios] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const navigate = useNavigate();

    // Datos de ejemplo
    const ejemploMunicipios = [
        { id: 1, nombre: 'Municipio A' },
        { id: 2, nombre: 'Municipio B' },
        { id: 3, nombre: 'Municipio C' },
        { id: 4, nombre: 'Municipio D' },
        { id: 5, nombre: 'Municipio E' },
    ];

    useEffect(() => {
        setMunicipios(ejemploMunicipios);
        setFilteredMunicipios(ejemploMunicipios); // Inicializar la lista filtrada
    }, []);

    // Manejar búsqueda
    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        setFilteredMunicipios(
            municipios.filter(
                (municipio) =>
                    municipio.nombre.toLowerCase().includes(term) ||
                    municipio.id.toString().includes(term)
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
            <h2 className="text-center">Lista de Municipios</h2>
            <div style={{ marginBottom: '20px' }}>
                <TextField
                    label="Buscar"
                    variant="outlined"
                    value={searchTerm}
                    onChange={handleSearch}
                    fullWidth
                />
                <Typography variant="body2" color="textSecondary" style={{ marginTop: '8px' }}>
                    Puedes buscar por <b>nombre</b> ó <b>ID</b>.
                </Typography>
            </div>
            <Link to="/add-municipio" style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="primary">
                    Agregar Municipio
                </Button>
            </Link>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredMunicipios
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((municipio) => (
                                <TableRow key={municipio.id}>
                                    <TableCell>{municipio.id}</TableCell>
                                    <TableCell>{municipio.nombre}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            size="small"
                                            style={{ marginRight: '10px' }}
                                            onClick={() => navigate(`/edit-municipio/${municipio.id}`)}
                                        >
                                            Editar
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            size="small"
                                            onClick={() =>
                                                setMunicipios(municipios.filter((m) => m.id !== municipio.id))
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
                    count={filteredMunicipios.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </div>
    );
};

export default ListMunicipiosComponent;
