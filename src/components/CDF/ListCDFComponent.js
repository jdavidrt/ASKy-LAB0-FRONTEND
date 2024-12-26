import React, { useEffect, useState, useNavigate } from 'react';
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

const ListCDFComponent = () => {
    const [cdfs, setCdfs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCdfs, setFilteredCdfs] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const navigate = useNavigate();

    // Datos de ejemplo
    const ejemploCdfs = [
        { id: 1, idPersona: '123', idCdf: '456', fechaRegistro: new Date(2022, 0, 15) },
        { id: 2, idPersona: '789', idCdf: '101', fechaRegistro: new Date(2021, 5, 20) },
        { id: 3, idPersona: '112', idCdf: '131', fechaRegistro: new Date(2020, 3, 10) },
    ];

    useEffect(() => {
        setCdfs(ejemploCdfs);
        setFilteredCdfs(ejemploCdfs); // Inicializar la lista filtrada
    }, []);

    // Manejar búsqueda
    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        setFilteredCdfs(
            cdfs.filter(
                (cdf) =>
                    cdf.idPersona.toLowerCase().includes(term) ||
                    cdf.idCdf.toLowerCase().includes(term) ||
                    cdf.fechaRegistro.toLocaleDateString().includes(term)
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
            <h2 className="text-center">Lista de CDF</h2>
            <div style={{ marginBottom: '20px' }}>
                <TextField
                    label="Buscar"
                    variant="outlined"
                    value={searchTerm}
                    onChange={handleSearch}
                    fullWidth
                />
                <Typography variant="body2" color="textSecondary" style={{ marginTop: '8px' }}>
                    Puedes buscar por <b>ID Persona</b>, <b>ID CDF</b>, o <b>Fecha de Registro</b>.
                </Typography>
            </div>
            <Link to="/add-cdf" style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="primary">
                    Agregar CDF
                </Button>
            </Link>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>ID Persona</TableCell>
                            <TableCell>ID CDF</TableCell>
                            <TableCell>Fecha de Registro</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredCdfs
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((cdf) => (
                                <TableRow key={cdf.id}>
                                    <TableCell>{cdf.id}</TableCell>
                                    <TableCell>{cdf.idPersona}</TableCell>
                                    <TableCell>{cdf.idCdf}</TableCell>
                                    <TableCell>{cdf.fechaRegistro.toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            size="small"
                                            style={{ marginRight: '10px' }}
                                            onClick={() => navigate(`/edit-cdf/${cdf.id}`)}
                                        >
                                            Editar
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            size="small"
                                            onClick={() =>
                                                setCdfs(cdfs.filter((c) => c.id !== cdf.id))
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
                    count={filteredCdfs.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </div>
    );
};

export default ListCDFComponent;
