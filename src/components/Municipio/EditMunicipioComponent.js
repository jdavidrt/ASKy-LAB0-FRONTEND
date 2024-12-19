import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Paper, Container } from '@mui/material';
import MunicipioService from '../../services/MunicipioService';

const EditMunicipioComponent = () => {
    const { id } = useParams(); // Obtener el ID del municipio desde la URL
    const navigate = useNavigate(); // Para redireccionar al finalizar
    const [municipio, setMunicipio] = useState({ id: '', nombre: '' });
    const [error, setError] = useState('');

    useEffect(() => {
        // Obtener los datos del municipio por su ID
        MunicipioService.getMunicipioById(id)
            .then((response) => {
                setMunicipio(response.data);
            })
            .catch((error) => {
                setError('Error al cargar el municipio. Verifica el ID.');
                console.error(error);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMunicipio((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validar el nombre antes de enviar
        if (!municipio.nombre.trim()) {
            setError('El nombre del municipio no puede estar vacío.');
            return;
        }
        MunicipioService.updateMunicipio(id, municipio)
            .then(() => {
                alert('Municipio actualizado con éxito.');
                navigate('/municipio'); // Redirigir a la lista de municipios
            })
            .catch((error) => {
                setError('Error al actualizar el municipio.');
                console.error(error);
            });
    };

    return (
        <Container component={Paper} style={{ padding: '20px', marginTop: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Editar Municipio
            </Typography>
            {error && (
                <Typography color="error" gutterBottom>
                    {error}
                </Typography>
            )}
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '20px' }}>
                    <TextField
                        label="ID"
                        variant="outlined"
                        value={municipio.id}
                        InputProps={{
                            readOnly: true,
                        }}
                        fullWidth
                        style={{ marginBottom: '10px' }}
                        disabled
                    />
                    <TextField
                        label="Nombre"
                        name="nombre"
                        variant="outlined"
                        value={municipio.nombre}
                        onChange={handleChange}
                        fullWidth
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button type="submit" variant="contained" color="primary">
                        Guardar Cambios
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => navigate('/municipio')}
                    >
                        Cancelar
                    </Button>
                </div>
            </form>
        </Container>
    );
};

export default EditMunicipioComponent;
