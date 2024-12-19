import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Typography, Paper, TextField, MenuItem } from '@mui/material';
import PersonaService from '../../services/PersonaService';

const EditPersonaComponent = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Estado inicial para la persona
    const [persona, setPersona] = useState({
        nombre: '',
        apellido: '',
        tipoDocumento: '',
        numeroDocumento: '',
        fechaNacimiento: '',
        sexo: '',
        telefono: ''
    });

    const [errors, setErrors] = useState({});

    // Opciones para los select de tipo de documento y sexo
    const tipoDocumentoOpciones = [
        { value: 'CC', label: 'Cédula de Ciudadanía' },
        { value: 'TI', label: 'Tarjeta de Identidad' },
        { value: 'CE', label: 'Cédula de Extranjería' }
    ];

    const sexoOpciones = [
        { value: 'M', label: 'Masculino' },
        { value: 'F', label: 'Femenino' }
    ];

    // Cargar la persona por su ID al iniciar el componente
    useEffect(() => {
        PersonaService.getPersonaById(id)
            .then((response) => {
                setPersona(response.data); 
            })
            .catch((error) => {
                console.error('Error al obtener la persona', error);
            });
    }, [id]);

    // Validar los datos antes de enviar
    const validate = () => {
        const newErrors = {};

        // Validar apellido solo letras
        if (!/^[a-zA-Z\s]+$/.test(persona.apellido)) {
            newErrors.apellido = 'El apellido solo puede contener letras';
        }

        // Validar cedula solo números
        if (!/^\d*$/.test(persona.numeroDocumento)) {
            newErrors.numeroDocumento = 'El número de documento solo puede contener números';
        }

        // Validar fecha no posterior a hoy
        const today = new Date().toISOString().split('T')[0];
        if (persona.fechaNacimiento > today) {
            newErrors.fechaNacimiento = 'La fecha de nacimiento no puede ser superior a hoy';
        }

        // Validar teléfono solo números
        if (!/^\d*$/.test(persona.telefono)) {
            newErrors.telefono = 'El teléfono solo puede contener números';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Retorna true si no hay errores
    };

    // Manejar cambios en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPersona({ ...persona, [name]: value });

        // Limpiar errores del campo en tiempo real
        setErrors({ ...errors, [name]: '' });
    };

    // Manejar la actualización de la persona
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            PersonaService.updatePersona(id,persona) // cambiar a udpdate cuando haya
                .then(() => {
                    navigate('/persona'); 
                })
                .catch((error) => {
                    console.error('Error al actualizar la persona', error);
                });
        }
    };

    return (
        <Container component={Paper} style={{ padding: '20px', marginTop: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Editar Persona
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Nombre"
                    name="nombre"
                    value={persona.nombre}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Apellido"
                    name="apellido"
                    value={persona.apellido}
                    onChange={handleChange}
                    error={!!errors.apellido}
                    helperText={errors.apellido}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    select
                    label="Tipo de Documento"
                    name="tipoDocumento"
                    value={persona.tipoDocumento}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                >
                    <MenuItem value="" disabled>Seleccione el tipo de documento</MenuItem>
                    {tipoDocumentoOpciones.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    label="Número de Documento"
                    name="numeroDocumento"
                    value={persona.numeroDocumento}
                    onChange={handleChange}
                    error={!!errors.numeroDocumento}
                    helperText={errors.numeroDocumento}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Fecha de Nacimiento"
                    name="fechaNacimiento"
                    type="date"
                    value={persona.fechaNacimiento}
                    onChange={handleChange}
                    error={!!errors.fechaNacimiento}
                    helperText={errors.fechaNacimiento}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    select
                    label="Sexo"
                    name="sexo"
                    value={persona.sexo}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                >
                    <MenuItem value="" disabled>Seleccione el sexo</MenuItem>
                    {sexoOpciones.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    label="Teléfono"
                    name="telefono"
                    value={persona.telefono}
                    onChange={handleChange}
                    error={!!errors.telefono}
                    helperText={errors.telefono}
                    fullWidth
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
                    Guardar
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    style={{ marginTop: '10px', marginLeft: '10px' }}
                    onClick={() => navigate('/persona')}
                >
                    Cancelar
                </Button>
            </form>
        </Container>
    );
};

export default EditPersonaComponent;
