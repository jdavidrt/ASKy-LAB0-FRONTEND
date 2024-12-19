import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PersonaService from '../../services/PersonaService';
import ViviendaService from '../../services/ViviendaService';
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
    const [viviendas, setViviendas] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPersonas, setFilteredPersonas] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const navigate = useNavigate();

    // Cargar personas y viviendas desde los servicios
    useEffect(() => {
        PersonaService.getAllPersonas()
            .then((response) => {
                setPersonas(response.data);
                setFilteredPersonas(response.data);
            })
            .catch((error) => {
                console.error('Error al cargar las personas:', error);
            });

        ViviendaService.getAllViviendas()
            .then((response) => {
                setViviendas(response.data);
            })
            .catch((error) => {
                console.error('Error al cargar las viviendas:', error);
            });
    }, []);

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        setFilteredPersonas(
            personas.filter(
                (persona) =>
                    persona.nombre.toLowerCase().includes(term) ||
                    persona.id.toString().includes(term) ||
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
        if (window.confirm('¿Estás seguro de eliminar esta persona?')) {
            PersonaService.deletePersonaById(id)
                .then(() => {
                    const updatedPersonas = personas.filter((persona) => persona.id !== id);
                    setPersonas(updatedPersonas);
                    setFilteredPersonas(updatedPersonas);
                })
                .catch((error) => {
                    console.error('Error al eliminar la persona:', error);
                });
        }
    };

    // Obtener la dirección de la vivienda asociada a una persona
    const getDireccionVivienda = (personaId) => {
        const vivienda = viviendas.find((vivienda) =>
            vivienda.habitantes.some((habitante) => habitante.id === personaId)
        );
        return vivienda ? vivienda.direccion : 'Sin asignar';
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
                    Puedes buscar por <b>nombre</b>, <b>número de documento</b> o <b>teléfono</b>.
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
                            <TableCell>Nombre</TableCell>
                            <TableCell>Número de Documento</TableCell>
                            <TableCell>Fecha de Nacimiento</TableCell>
                            <TableCell>Sexo</TableCell>
                            <TableCell>Teléfono</TableCell>
                            <TableCell>Vivienda Actual</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredPersonas
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((persona) => (
                                <TableRow key={persona.id}>
                                    <TableCell>{persona.nombre}</TableCell>
                                    <TableCell>{persona.id}</TableCell>
                                    <TableCell>{new Date(persona.fechaNac).toLocaleDateString()}</TableCell>
                                    <TableCell>{persona.sexo}</TableCell>
                                    <TableCell>{persona.telefono}</TableCell>
                                    <TableCell>{getDireccionVivienda(persona.id)}</TableCell>
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
