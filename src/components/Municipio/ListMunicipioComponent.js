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
    Snackbar,
    Alert,
} from '@mui/material';
import MunicipioService from '../../services/MunicipioService'; // Asegúrate de que la ruta sea correcta

const ListMunicipiosComponent = () => {
    const [municipios, setMunicipios] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredMunicipios, setFilteredMunicipios] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const navigate = useNavigate();

    useEffect(() => {
        loadMunicipios();
    }, []);

    const loadMunicipios = async () => {
        try {
            const response = await MunicipioService.getAllMunicipios();
            setMunicipios(response.data);
            setFilteredMunicipios(response.data);
        } catch (error) {
            console.error('Error al cargar municipios:', error);
            setSnackbar({
                open: true,
                message: 'Error al cargar los municipios',
                severity: 'error'
            });
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Está seguro de que desea eliminar este municipio?')) {
            try {
                await MunicipioService.deleteMunicipio(id);
                setSnackbar({
                    open: true,
                    message: 'Municipio eliminado exitosamente',
                    severity: 'success'
                });
                loadMunicipios(); // Recargar la lista después de eliminar
            } catch (error) {
                console.error('Error al eliminar municipio:', error);
                setSnackbar({
                    open: true,
                    message: 'Error al eliminar el municipio',
                    severity: 'error'
                });
            }
        }
    };

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
        setPage(0);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
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
                                            onClick={() => handleDelete(municipio.id)}
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

            <Snackbar 
                open={snackbar.open} 
                autoHideDuration={6000} 
                onClose={handleCloseSnackbar}
            >
                <Alert 
                    onClose={handleCloseSnackbar} 
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default ListMunicipiosComponent;