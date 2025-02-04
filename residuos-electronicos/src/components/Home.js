// src/components/Home.js
import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import "./Home.css"

const Home = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Gestión de Residuos Electrónicos
      </Typography>

      <Grid container spacing={4}>
        {/* Botón para Usuarios */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Usuarios
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Gestionar personas que entregan residuos electrónicos.
              </Typography>
              <Button
                component={Link}
                to="/usuarios"
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
              >
                Ir a Usuarios
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Botón para Dispositivos */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Dispositivos
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Registrar y gestionar dispositivos recogidos.
              </Typography>
              <Button
                component={Link}
                to="/dispositivos"
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
              >
                Ir a Dispositivos
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Botón para Ubicaciones */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Ubicaciones
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Ver y agregar puntos de recolección generales.
              </Typography>
              <Button
                component={Link}
                to="/ubicaciones"
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
              >
                Ir a Ubicaciones
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Botón para Puntos de Recolección */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Puntos de Recolección
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Ver y agregar puntos específicos de recolección.
              </Typography>
              <Button
                component={Link}
                to="/puntos-recoleccion"
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
              >
                Ir a Puntos de Recolección
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Botón para Eventos */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Eventos
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Registrar y gestionar eventos relacionados con la recolección.
              </Typography>
              <Button
                component={Link}
                to="/eventos"
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
              >
                Ir a Eventos
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
