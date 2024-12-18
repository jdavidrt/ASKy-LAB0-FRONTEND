import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, Typography } from '@mui/material';
import { People, Home, Group, LocationCity, House, AccountCircle } from '@mui/icons-material';

const HomeComponent = () => {
    return (
        <div className="container" style={{ paddingTop: '20px' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Bienvenido a la Administración
            </Typography>
            <Grid container spacing={4} justifyContent="center">
                {/* Botón Personas */}
                <Grid item>
                    <Link to="/persona" style={{ textDecoration: 'none' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            startIcon={<People />}
                            style={{ width: '200px', height: '200px', fontSize: '18px' }}
                        >
                            Personas
                        </Button>
                    </Link>
                </Grid>

                {/* Botón Cabezas de Familia */}
                <Grid item>
                    <Link to="/cdf" style={{ textDecoration: 'none' }}>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="large"
                            startIcon={<AccountCircle />}
                            style={{ width: '200px', height: '200px', fontSize: '18px' }}
                        >
                            Cabezas de Familia
                        </Button>
                    </Link>
                </Grid>

                {/* Botón Gobernadores */}
                <Grid item>
                    <Link to="/gobernadore" style={{ textDecoration: 'none' }}>
                        <Button
                            variant="contained"
                            color="success"
                            size="large"
                            startIcon={<Group />}
                            style={{ width: '200px', height: '200px', fontSize: '18px' }}
                        >
                            Gobernadores
                        </Button>
                    </Link>
                </Grid>

                {/* Botón Posesiones */}
                <Grid item>
                    <Link to="/posesiones" style={{ textDecoration: 'none' }}>
                        <Button
                            variant="contained"
                            color="warning"
                            size="large"
                            startIcon={<LocationCity />}
                            style={{ width: '200px', height: '200px', fontSize: '18px' }}
                        >
                            Posesiones
                        </Button>
                    </Link>
                </Grid>

                {/* Botón Municipios */}
                <Grid item>
                    <Link to="/municipio" style={{ textDecoration: 'none' }}>
                        <Button
                            variant="contained"
                            color="info"
                            size="large"
                            startIcon={<Home />}
                            style={{ width: '200px', height: '200px', fontSize: '18px' }}
                        >
                            Municipios
                        </Button>
                    </Link>
                </Grid>

                {/* Botón Viviendas */}
                <Grid item>
                    <Link to="/vivienda" style={{ textDecoration: 'none' }}>
                        <Button
                            variant="contained"
                            color="error"
                            size="large"
                            startIcon={<House />}
                            style={{ width: '200px', height: '200px', fontSize: '18px' }}
                        >
                            Viviendas
                        </Button>
                    </Link>
                </Grid>
            </Grid>
        </div>
    );
};

export default HomeComponent;
