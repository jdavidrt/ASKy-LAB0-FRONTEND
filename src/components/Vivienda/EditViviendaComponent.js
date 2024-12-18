import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Paper, Typography, Container } from '@mui/material';
import ViviendaService from '../../services/ViviendaService';

const EditViviendaComponent = () => {
    const { id } = useParams(); // Obtener el ID desde la URL
    const navigate = useNavigate();

    const [vivienda, setVivienda] = useState({
        direccion: '',
        idMunicipio: '',
        capacidad: '',
        niveles: ''
    });

    const [errors, setErrors] = useState({});

    // Cargar los datos de la vivienda al montar el componente
    useEffect(() => {
        ViviendaService.getViviendaById(id)
            .then((response) => {
                setVivienda(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener la vivienda:', error);
            });
    }, [id]);

    // Manejar cambios en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setVivienda({ ...vivienda, [name]: value });
    };

    // Validar formulario
    const validateForm = () => {
        const newErrors = {};
        if (!vivienda.direccion) newErrors.direccion = 'La dirección es obligatoria';
        if (!vivienda.idMunicipio) newErrors.idMunicipio = 'El ID del municipio es obligatorio';
        if (!vivienda.capacidad || vivienda.capacidad <= 0)
            newErrors.capacidad = 'La capacidad debe ser un número positivo';
        if (!vivienda.niveles || vivienda.niveles <= 0)
            newErrors.niveles = 'Los niveles deben ser un número positivo';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Manejar la actualización de datos
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            ViviendaService.updateVivienda(id, vivienda)
                .then(() => {
                    alert('¡Vivienda actualizada con éxito!');
                    navigate('/vivienda'); // Redirigir a la lista de viviendas
                })
                .catch((error) => {
                    console.error('Error al actualizar la vivienda:', error);
                    alert('Error al actualizar la vivienda');
                });
        }
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: '20px' }}>
            <Paper elevation={3} style={{ padding: '20px' }}>
                <Typography variant="h5" gutterBottom>
                    Editar Vivienda
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Dirección"
                        name="direccion"
                        value={vivienda.direccion}
                        onChange={handleChange}
                        error={!!errors.direccion}
                        helperText={errors.direccion}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="ID del Municipio"
                        name="idMunicipio"
                        type="number"
                        value={vivienda.idMunicipio}
                        onChange={handleChange}
                        error={!!errors.idMunicipio}
                        helperText={errors.idMunicipio}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Capacidad (Personas)"
                        name="capacidad"
                        type="number"
                        value={vivienda.capacidad}
                        onChange={handleChange}
                        error={!!errors.capacidad}
                        helperText={errors.capacidad}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Niveles"
                        name="niveles"
                        type="number"
                        value={vivienda.niveles}
                        onChange={handleChange}
                        error={!!errors.niveles}
                        helperText={errors.niveles}
                    />
                    <div style={{ marginTop: '20px', textAlign: 'right' }}>
                        <Button
                            variant="contained"
                            color="secondary"
                            style={{ marginRight: '10px' }}
                            onClick={() => navigate('/vivienda')}
                        >
                            Cancelar
                        </Button>
                        <Button variant="contained" color="primary" type="submit">
                            Guardar Cambios
                        </Button>
                    </div>
                </form>
            </Paper>
        </Container>
    );
};

export default EditViviendaComponent;
