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

const ListGobernadorComponent = () => {
    const [gobernadores, setGobernadores] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredGobernadores, setFilteredGobernadores] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const navigate = useNavigate();

    // Datos de ejemplo
    const ejemploGobernadores = [
        { id: 1, id_persona: 101, id_departamento: 1, fecha_inicio: new Date(2020, 0, 1), fecha_fin: new Date(2023, 11, 31) },
        { id: 2, id_persona: 102, id_departamento: 2, fecha_inicio: new Date(2019, 0, 1), fecha_fin: new Date(2023, 5, 30) },
        { id: 3, id_persona: 103, id_departamento: 3, fecha_inicio: new Date(2021, 3, 15), fecha_fin: new Date(2024, 3, 14) },
    ];

    useEffect(() => {
        setGobernadores(ejemploGobernadores);
        setFilteredGobernadores(ejemploGobernadores); // Inicializar la lista filtrada
    }, []);

    // Manejar búsqueda
    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        setFilteredGobernadores(
            gobernadores.filter(
                (gobernador) =>
                    gobernador.id.toString().includes(term) ||
                    gobernador.id_persona.toString().includes(term) ||
                    gobernador.id_departamento.toString().includes(term) ||
                    gobernador.fecha_inicio.toLocaleDateString().includes(term) ||
                    gobernador.fecha_fin.toLocaleDateString().includes(term)
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
            <h2 className="text-center">Lista de Gobernadores</h2>
            <div style={{ marginBottom: '20px' }}>
                <TextField
                    label="Buscar"
                    variant="outlined"
                    value={searchTerm}
                    onChange={handleSearch}
                    fullWidth
                />
                <Typography variant="body2" color="textSecondary" style={{ marginTop: '8px' }}>
                    Puedes buscar por <b>ID</b>, <b>ID Persona</b>, <b>ID Departamento</b>, <b>Fecha de Inicio</b> o <b>Fecha de Fin</b>.
                </Typography>
            </div>
            <Link to="/add-gobernador" style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="primary">
                    Agregar Gobernador
                </Button>
            </Link>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>ID Persona</TableCell>
                            <TableCell>ID Departamento</TableCell>
                            <TableCell>Fecha de Inicio</TableCell>
                            <TableCell>Fecha de Fin</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredGobernadores
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((gobernador) => (
                                <TableRow key={gobernador.id}>
                                    <TableCell>{gobernador.id}</TableCell>
                                    <TableCell>{gobernador.id_persona}</TableCell>
                                    <TableCell>{gobernador.id_departamento}</TableCell>
                                    <TableCell>{gobernador.fecha_inicio.toLocaleDateString()}</TableCell>
                                    <TableCell>{gobernador.fecha_fin.toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            size="small"
                                            style={{ marginRight: '10px' }}
                                            onClick={() => navigate(`/edit-gobernador/${gobernador.id}`)}
                                        >
                                            Editar
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            size="small"
                                            onClick={() =>
                                                setGobernadores(gobernadores.filter((g) => g.id !== gobernador.id))
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
                    count={filteredGobernadores.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </div>
    );
};

export default ListGobernadorComponent;
