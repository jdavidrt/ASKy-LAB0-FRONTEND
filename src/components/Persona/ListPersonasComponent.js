import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PersonaService from '../../services/PersonaService'; // Importa tu servicio
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

const ListPersonasComponent = () => {
    const [personas, setPersonas] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPersonas, setFilteredPersonas] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        // Cargar personas desde el servicio
        PersonaService.getAllPersonas()
            .then((response) => {
                setPersonas(response.data);
                setFilteredPersonas(response.data);
            })
            .catch((error) => {
                console.error('Error al cargar las personas:', error);
            });
    }, []);

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        setFilteredPersonas(
            personas.filter(
                (persona) =>
                    persona.nombre.toLowerCase().includes(term) ||
                    persona.apellido.toLowerCase().includes(term) ||
                    persona.numeroDocumento.includes(term) ||
                    persona.telefono.includes(term)
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

    const handleDelete = (id) => {
        PersonaService.deletePersonaById(id)
            .then(() => {
                // Actualizar el estado local después de eliminar
                const updatedPersonas = personas.filter((persona) => persona.id !== id);
                setPersonas(updatedPersonas);
                setFilteredPersonas(updatedPersonas);
            })
            .catch((error) => {
                console.error('Error al eliminar la persona:', error);
            });
    };

    return (
        <div className="container">
            <h2 className="text-center">Lista de personas</h2>
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
            <Link to="/add-persona" style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="primary">
                    Agregar persona
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
                        {filteredPersonas
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((persona) => (
                                <TableRow key={persona.id}>
                                    <TableCell>{persona.id}</TableCell>
                                    <TableCell>{persona.nombre}</TableCell>
                                    <TableCell>{persona.apellido}</TableCell>
                                    <TableCell>{persona.tipoDocumento}</TableCell>
                                    <TableCell>{persona.numeroDocumento}</TableCell>
                                    <TableCell>{new Date(persona.fechaNacimiento).toLocaleDateString()}</TableCell>
                                    <TableCell>{persona.sexo}</TableCell>
                                    <TableCell>{persona.telefono}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            size="small"
                                            style={{ marginRight: '10px' }}
                                            onClick={() => navigate(`/edit-persona/${persona.id}`)}
                                        >
                                            Editar
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            size="small"
                                            onClick={() => handleDelete(persona.id)}
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
                    count={filteredPersonas.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </div>
    );
};

export default ListPersonasComponent;
