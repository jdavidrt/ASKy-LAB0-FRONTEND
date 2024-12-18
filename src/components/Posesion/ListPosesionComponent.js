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

const ListPosesionComponent = () => {
    const [posesiones, setPosesiones] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPosesiones, setFilteredPosesiones] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Datos de ejemplo
    const ejemploPosesiones = [
        { id: 1, id_persona: 101, id_vivienda: 201, fecha_posesion: new Date(2023, 4, 15) },
        { id: 2, id_persona: 102, id_vivienda: 202, fecha_posesion: new Date(2023, 5, 10) },
        { id: 3, id_persona: 103, id_vivienda: 203, fecha_posesion: new Date(2023, 6, 20) },
        { id: 4, id_persona: 104, id_vivienda: 204, fecha_posesion: new Date(2023, 7, 25) },
        { id: 5, id_persona: 105, id_vivienda: 205, fecha_posesion: new Date(2023, 8, 30) },
    ];

    useEffect(() => {
        setPosesiones(ejemploPosesiones);
        setFilteredPosesiones(ejemploPosesiones); // Inicializar la lista filtrada
    }, []);

    // Manejar búsqueda
    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        setFilteredPosesiones(
            posesiones.filter(
                (posesion) =>
                    posesion.id.toString().includes(term) ||
                    posesion.id_persona.toString().includes(term) ||
                    posesion.id_vivienda.toString().includes(term) ||
                    posesion.fecha_posesion.toLocaleDateString().includes(term)
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
            <h2 className="text-center">Lista de Posesiones</h2>
            <div style={{ marginBottom: '20px' }}>
                <TextField
                    label="Buscar"
                    variant="outlined"
                    value={searchTerm}
                    onChange={handleSearch}
                    fullWidth
                />
                <Typography variant="body2" color="textSecondary" style={{ marginTop: '8px' }}>
                    Puedes buscar por <b>ID</b>, <b>ID Persona</b>, <b>ID Vivienda</b> o <b>Fecha de Posesión</b>.
                </Typography>
            </div>
            <Link to="/add-posesion" style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="primary">
                    Agregar Posesión
                </Button>
            </Link>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>ID Persona</TableCell>
                            <TableCell>ID Vivienda</TableCell>
                            <TableCell>Fecha de Posesión</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredPosesiones
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((posesion) => (
                                <TableRow key={posesion.id}>
                                    <TableCell>{posesion.id}</TableCell>
                                    <TableCell>{posesion.id_persona}</TableCell>
                                    <TableCell>{posesion.id_vivienda}</TableCell>
                                    <TableCell>{posesion.fecha_posesion.toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            size="small"
                                            style={{ marginRight: '10px' }}
                                            onClick={() => alert(`Editar posesión con ID: ${posesion.id}`)}
                                        >
                                            Editar
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            size="small"
                                            onClick={() =>
                                                setPosesiones(posesiones.filter((p) => p.id !== posesion.id))
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
                    count={filteredPosesiones.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </div>
    );
};

export default ListPosesionComponent;
