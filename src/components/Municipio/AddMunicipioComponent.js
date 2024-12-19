import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import MunicipioService from '../../services/MunicipioService'; // Asegúrate de que la ruta sea correcta
import { Alert, Snackbar } from '@mui/material';

export const AddMunicipioComponent = () => {
    const [nombre, setNombre] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            loadMunicipio();
        }
    }, [id]);

    const loadMunicipio = async () => {
        try {
            setLoading(true);
            const response = await MunicipioService.getMunicipioById(id);
            setNombre(response.data.nombre);
            setError("");
        } catch (err) {
            setError("Error al cargar el municipio. Por favor, intente nuevamente.");
            console.error("Error loading municipio:", err);
            setSnackbar({
                open: true,
                message: 'Error al cargar el municipio',
                severity: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    const saveMunicipio = async (e) => {
        e.preventDefault();

        if (!nombre.trim()) {
            setSnackbar({
                open: true,
                message: 'El nombre del municipio no puede estar vacío',
                severity: 'error'
            });
            return;
        }

        const municipio = {
            nombre: nombre.trim()
        };

        try {
            setLoading(true);
            if (id) {
                await MunicipioService.updateMunicipio(id, municipio);
                setSnackbar({
                    open: true,
                    message: 'Municipio actualizado correctamente',
                    severity: 'success'
                });
            } else {
                await MunicipioService.createMunicipio(municipio);
                setSnackbar({
                    open: true,
                    message: 'Municipio registrado correctamente',
                    severity: 'success'
                });
            }
            setTimeout(() => navigate("/municipio"), 1000);
        } catch (err) {
            console.error("Error saving municipio:", err);
            setError(id ? "Error al actualizar el municipio" : "Error al crear el municipio");
            setSnackbar({
                open: true,
                message: id ? 'Error al actualizar el municipio' : 'Error al crear el municipio',
                severity: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const title = id ? 'Actualizar Municipio' : 'Registrar Municipio';

    if (loading) {
        return (
            <div className="container text-center mt-5">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    <h2 className='text-center'>{title}</h2>
                    <div className='card-body'>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <form onSubmit={saveMunicipio}>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Nombre del Municipio</label>
                                <input
                                    type='text'
                                    placeholder='Ingrese el nombre del municipio'
                                    className='form-control'
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    disabled={loading}
                                />
                            </div>

                            <div className='botones'>
                                <button 
                                    type="submit" 
                                    className="btn btn-primary mb-2"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                            {id ? 'Actualizando...' : 'Registrando...'}
                                        </>
                                    ) : (
                                        id ? 'Actualizar' : 'Registrar'
                                    )}
                                </button>
                                <Link to="/municipio" className='btn btn-danger mb-2 ms-2'>Cancelar</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

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

export default AddMunicipioComponent;