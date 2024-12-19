import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Typography, Paper, TextField, MenuItem } from '@mui/material';
import PersonaService from '../../services/PersonaService';
import ViviendaService from '../../services/ViviendaService';

const EditPersonaComponent = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Obtén el ID de la persona desde la URL

    const [persona, setPersona] = useState({
        nombre: '',
        tipoDocumento: '',
        numeroDocumento: '',
        fechaNacimiento: '',
        sexo: '',
        telefono: '',
        viviendaActual: {
            id: '',
        },
    });

    const [errors, setErrors] = useState({});
    const [viviendas, setViviendas] = useState([]);

    const tipoDocumentoOpciones = [
        { value: 'CC', label: 'Cédula de Ciudadanía' },
        { value: 'TI', label: 'Tarjeta de Identidad' },
        { value: 'CE', label: 'Cédula de Extranjería' },
    ];

    const sexoOpciones = [
        { value: 'M', label: 'Masculino' },
        { value: 'F', label: 'Femenino' },
    ];

    // Cargar la información inicial de la persona y las viviendas
    useEffect(() => {
        PersonaService.getPersonaById(id)
            .then((response) => {
                const data = response.data;
                setPersona({
                    nombre: data.nombre,
                    tipoDocumento: data.tipo_doc,
                    numeroDocumento: String(data.id), // El ID se usa como número de documento
                    fechaNacimiento: data.fechaNac.split('T')[0], // Ajustar formato ISO
                    sexo: data.sexo,
                    telefono: data.telefono || '',
                    viviendaActual: {
                        id: String(data.viviendaId),
                    },
                });
            })
            .catch((error) => {
                console.error('Error al cargar la persona:', error);
                alert('No se pudo cargar la persona');
                navigate('/persona');
            });

        ViviendaService.getAllViviendas()
            .then((response) => {
                setViviendas(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener las viviendas:', error);
            });
    }, [id, navigate]);

    const validate = () => {
        const newErrors = {};
        if (!/^\d{1,10}$/.test(persona.numeroDocumento)) {
            newErrors.numeroDocumento = 'El número de documento solo puede contener números y debe ser de hasta 10 dígitos';
        }
        const today = new Date().toISOString().split('T')[0];
        if (persona.fechaNacimiento > today) {
            newErrors.fechaNacimiento = 'La fecha de nacimiento no puede ser superior a hoy';
        }
        if (!/^\d{10}$/.test(persona.telefono)) {
            newErrors.telefono = 'El teléfono debe contener exactamente 10 dígitos numéricos positivos';
        }
        if (!persona.viviendaActual.id) {
            newErrors.viviendaActual = 'Debe seleccionar una vivienda válida';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPersona({ ...persona, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const handleNestedChange = (e, parentKey, childKey) => {
        const { value } = e.target;
        setPersona({
            ...persona,
            [parentKey]: {
                ...persona[parentKey],
                [childKey]: value,
            },
        });
        setErrors({ ...errors, [parentKey]: '' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            const formattedPersona = {
                id: parseInt(persona.numeroDocumento, 10),
                tipo_doc: persona.tipoDocumento,
                nombre: persona.nombre,
                sexo: persona.sexo,
                fechaNac: `${persona.fechaNacimiento}T00:00:00.000+00:00`,
                telefono: persona.telefono,
                viviendaId: parseInt(persona.viviendaActual.id, 10),
            };

            PersonaService.updatePersona(id, formattedPersona)
                .then(() => {
                    alert('Persona actualizada correctamente');
                    navigate('/persona');
                })
                .catch((error) => {
                    console.error('Error al actualizar la persona:', error);
                    alert('Hubo un error al actualizar la persona');
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
                    select
                    label="Tipo de Documento"
                    name="tipoDocumento"
                    value={persona.tipoDocumento}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                >
                    <MenuItem value="" disabled>
                        Seleccione el tipo de documento
                    </MenuItem>
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
                    disabled 
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
                    <MenuItem value="" disabled>
                        Seleccione el sexo
                    </MenuItem>
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
                <TextField
                    select
                    label="Vivienda Actual"
                    name="viviendaActualId"
                    value={persona.viviendaActual.id}
                    onChange={(e) => handleNestedChange(e, 'viviendaActual', 'id')}
                    fullWidth
                    margin="normal"
                    required
                >
                    <MenuItem value="" disabled>
                        Seleccione una vivienda
                    </MenuItem>
                    {viviendas.map((vivienda) => (
                        <MenuItem key={vivienda.id} value={vivienda.id}>
                            {`${vivienda.direccion} (ID: ${vivienda.id})`}
                        </MenuItem>
                    ))}
                </TextField>
                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
                    Actualizar
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
