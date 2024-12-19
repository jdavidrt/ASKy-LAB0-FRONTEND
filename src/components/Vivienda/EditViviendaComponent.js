import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Paper, Typography, Container, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import ViviendaService from '../../services/ViviendaService';
import MunicipioService from '../../services/MunicipioService';

const EditViviendaComponent = () => {
    const { id } = useParams(); // Obtener el ID desde la URL
    const navigate = useNavigate();

    const [vivienda, setVivienda] = useState({
        direccion: '',
        capacidad: '',
        niveles: '',
        municipio: { id: '', nombre: '' } // Asegurarnos de que municipio sea un objeto con id y nombre vacíos al inicio
    });

    const [municipios, setMunicipios] = useState([]); // Estado para almacenar la lista de municipios
    const [errors, setErrors] = useState({});

    // Cargar los datos de la vivienda al montar el componente
    useEffect(() => {
        // Cargar los datos de la vivienda
        ViviendaService.getViviendaById(id)
            .then((response) => {
                const viviendaData = response.data;
                // Verificar que viviendaData.municipio no esté undefined antes de asignar
                const municipio = viviendaData.municipio ? viviendaData.municipio : { id: '', nombre: '' };
                setVivienda({
                    ...viviendaData,
                    municipio // Asegurarse de que municipio está correctamente asignado
                });
            })
            .catch((error) => {
                console.error('Error al obtener la vivienda:', error);
            });

        // Cargar la lista de municipios
        MunicipioService.getAllMunicipios()
            .then((response) => {
                setMunicipios(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener los municipios:', error);
            });
    }, [id]);

    // Manejar cambios en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setVivienda({ ...vivienda, [name]: value });
    };

    // Manejar el cambio en el municipio
    const handleMunicipioChange = (e) => {
        const { value } = e.target;
        const selectedMunicipio = municipios.find(m => m.id === parseInt(value)); // Buscar el municipio por su id
        setVivienda({
            ...vivienda,
            municipio: selectedMunicipio || { id: '', nombre: '' } // Si no se encuentra, mantener un objeto vacío por defecto
        });
    };

    // Validar formulario
    const validateForm = () => {
        const newErrors = {};
        if (!vivienda.direccion) newErrors.direccion = 'La dirección es obligatoria';
        if (!vivienda.municipio.id) newErrors.municipio = 'El municipio es obligatorio';
        if (!vivienda.capacidad || vivienda.capacidad <= 0)
            newErrors.capacidad = 'La capacidad debe ser un número positivo';
        if (vivienda.capacidad > 10)
            newErrors.capacidad = 'La capacidad no puede ser mayor a 10';
        if (!vivienda.niveles || vivienda.niveles <= 0)
            newErrors.niveles = 'Los niveles deben ser un número positivo';
        if (vivienda.niveles > 6)
            newErrors.niveles = 'El número de niveles no puede ser mayor a 6';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Manejar la actualización de datos
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const updatedVivienda = {
                id: vivienda.id,  // Mantener el id de la vivienda
                direccion: vivienda.direccion,
                capacidad: parseInt(vivienda.capacidad),
                niveles: parseInt(vivienda.niveles),
                municipio: {
                    id: vivienda.municipio.id, // Asegúrate de que municipio tenga id
                    nombre: vivienda.municipio.nombre
                }
            };

            ViviendaService.updateVivienda(id, updatedVivienda)
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
                    <FormControl fullWidth margin="normal" error={!!errors.municipio} variant="outlined">
                        <TextField
                            select
                            label={vivienda.municipio.nombre || "Selecciona un municipio"}
                            name="municipio"
                            value={vivienda.municipio.id || ''} // Asegúrate de que municipio.id siempre sea accesible
                            onChange={handleMunicipioChange}
                            helperText={errors.municipio} // Mensaje de error
                            error={!!errors.municipio}
                        >
                            {municipios.map((municipio) => (
                                <MenuItem key={municipio.id} value={municipio.id}>
                                    {municipio.nombre}
                                </MenuItem>
                            ))}
                        </TextField>
                    </FormControl>

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
