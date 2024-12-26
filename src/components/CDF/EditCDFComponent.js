import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Typography, Paper, TextField } from '@mui/material';
import CDFService from '../../services/CDFService'; // Asegúrate de implementar este servicio

const EditCDFComponent = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Obtén el ID del CDF desde la URL

    const [cdf, setCdf] = useState({
        idPersona: '',
        idCdf: '',
        fechaRegistro: ''
    });

    const [errors, setErrors] = useState({});

    // Cargar la información inicial del CDF
    useEffect(() => {
        if (id) {
            CDFService.getCDFById(id)
                .then((response) => {
                    const data = response.data;
                    setCdf({
                        idPersona: data.idPersona,
                        idCdf: data.idCdf,
                        fechaRegistro: data.fechaRegistro.split('T')[0], // Ajustar formato ISO
                    });
                })
                .catch((error) => {
                    console.error('Error al cargar el CDF:', error);
                    alert('No se pudo cargar el CDF');
                    navigate('/cdf');
                });
        }
    }, [id, navigate]);

    const validate = () => {
        const newErrors = {};

        if (!cdf.idPersona.trim()) {
            newErrors.idPersona = 'El ID de la persona es obligatorio';
        }

        if (!cdf.idCdf.trim()) {
            newErrors.idCdf = 'El ID del CDF es obligatorio';
        }

        if (!cdf.fechaRegistro) {
            newErrors.fechaRegistro = 'La fecha de registro es obligatoria';
        } else {
            const today = new Date().toISOString().split('T')[0];
            if (cdf.fechaRegistro > today) {
                newErrors.fechaRegistro = 'La fecha de registro no puede ser futura';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCdf({ ...cdf, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            const formattedCDF = {
                idPersona: cdf.idPersona,
                idCdf: cdf.idCdf,
                fechaRegistro: `${cdf.fechaRegistro}T00:00:00.000+00:00`,
            };

            if (id) {
                CDFService.updateCDF(id, formattedCDF)
                    .then(() => {
                        alert('CDF actualizado correctamente');
                        navigate('/cdfs');
                    })
                    .catch((error) => {
                        console.error('Error al actualizar el CDF:', error);
                        alert('Hubo un error al actualizar el CDF');
                    });
            } else {
                CDFService.createCDF(formattedCDF)
                    .then(() => {
                        alert('CDF creado correctamente');
                        navigate('/cdfs');
                    })
                    .catch((error) => {
                        console.error('Error al crear el CDF:', error);
                        alert('Hubo un error al crear el CDF');
                    });
            }
        }
    };

    return (
        <Container component={Paper} style={{ padding: '20px', marginTop: '20px' }}>
            <Typography variant="h4" gutterBottom>
                {id ? 'Editar CDF' : 'Registrar CDF'}
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="ID Persona"
                    name="idPersona"
                    value={cdf.idPersona}
                    onChange={handleChange}
                    error={!!errors.idPersona}
                    helperText={errors.idPersona}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="ID CDF"
                    name="idCdf"
                    value={cdf.idCdf}
                    onChange={handleChange}
                    error={!!errors.idCdf}
                    helperText={errors.idCdf}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Fecha de Registro"
                    name="fechaRegistro"
                    type="date"
                    value={cdf.fechaRegistro}
                    onChange={handleChange}
                    error={!!errors.fechaRegistro}
                    helperText={errors.fechaRegistro}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    margin="normal"
                    required
                />
                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
                    {id ? 'Actualizar' : 'Registrar'}
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    style={{ marginTop: '10px', marginLeft: '10px' }}
                    onClick={() => navigate('/cdfs')}
                >
                    Cancelar
                </Button>
            </form>
        </Container>
    );
};

export default EditCDFComponent;
