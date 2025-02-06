import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, CircularProgress } from '@mui/material';
import "./PuntoRecoleccion.css";

const PuntosRecoleccion = () => {
  const [puntos, setPuntos] = useState([]);
  const [open, setOpen] = useState(false);
  const [nuevoPunto, setNuevoPunto] = useState({ nombre: '', direccion: '', latitud: '', longitud: '' });
  const [map, setMap] = useState(null); // Referencia al mapa
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false); // Verificar si Google Maps está cargado

  const initMap = useCallback(() => {
    const defaultCenter = { lat: -0.225219, lng: -78.524883 }; // Coordenadas de Quito
    const mapInstance = new window.google.maps.Map(document.getElementById('map'), {
      center: defaultCenter,
      zoom: 13,
    });
    setMap(mapInstance);
    setGoogleMapsLoaded(true);

    // Agregar marcadores existentes
    puntos.forEach((punto) => {
      new window.google.maps.Marker({
        position: { lat: parseFloat(punto.latitud), lng: parseFloat(punto.longitud) },
        map: mapInstance,
        title: punto.nombre,
      });
    });
  }, [puntos]);

  const fetchPuntos = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/puntos-recoleccion');
      setPuntos(response.data);
    } catch (error) {
      console.error("❌ Error al obtener puntos de recolección:", error);
    }
  }, []);

  // Cargar la API de Google Maps
  const loadGoogleMapsScript = useCallback(() => {
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA4huEpFPbN_6OKACwg-ShzETIXaUKUSeg&callback=initMap`;
      script.async = true;
      script.defer = true;
      window.initMap = initMap; // Función para inicializar el mapa
      document.head.appendChild(script);
    } else {
      initMap(); // Inicializar el mapa si ya está cargado
    }
  }, [initMap]);

  useEffect(() => {
    fetchPuntos();
    loadGoogleMapsScript();
  }, [fetchPuntos, loadGoogleMapsScript]); // Incluidas las dependencias 'fetchPuntos' y 'loadGoogleMapsScript'

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setNuevoPunto({ ...nuevoPunto, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      // Validar que todos los campos estén completos
      if (!nuevoPunto.nombre || !nuevoPunto.direccion || !nuevoPunto.latitud || !nuevoPunto.longitud) {
        alert("Por favor, completa todos los campos.");
        return;
      }

      // Validar que las coordenadas sean números válidos
      const latitud = parseFloat(nuevoPunto.latitud);
      const longitud = parseFloat(nuevoPunto.longitud);
      if (isNaN(latitud) || isNaN(longitud)) {
        alert("Las coordenadas deben ser números válidos.");
        return;
      }

      // Enviar datos al backend
      await axios.post('http://localhost:5000/api/puntos-recoleccion/agregar', {
        nombre: nuevoPunto.nombre,
        direccion: nuevoPunto.direccion,
        latitud: latitud,
        longitud: longitud
      });
      fetchPuntos(); // Refrescar la lista de puntos
      handleClose(); // Cerrar el diálogo

      // Agregar el nuevo marcador al mapa
      if (map) {
        new window.google.maps.Marker({
          position: { lat: latitud, lng: longitud },
          map: map,
          title: nuevoPunto.nombre,
        });
      }
    } catch (error) {
      console.error("❌ Error al agregar punto de recolección:", error);
    }
  };

  return (
    <div>
      <h2>Puntos de Recolección</h2>

      {/* Botón para abrir el diálogo */}
      <div className="agregar-punto-container">
        <Button
          className="agregar-punto-button"
          variant="contained"
          onClick={handleOpen}
          sx={{ mb: 2 }}
        >
          Agregar Punto de Recolección
        </Button>
      </div>

      {/* Mostrar indicador de carga mientras se carga Google Maps */}
      {!googleMapsLoaded ? (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <CircularProgress />
          <p>Cargando mapa...</p>
        </div>
      ) : (
        <div id="map" style={{ height: '500px', width: '100%' }}></div>
      )}

      {/* Diálogo para agregar punto de recolección */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Agregar Punto de Recolección</DialogTitle>
        <DialogContent>
          <TextField label="Nombre" name="nombre" fullWidth margin="normal" onChange={handleChange} />
          <TextField label="Dirección" name="direccion" fullWidth margin="normal" onChange={handleChange} />
          <TextField label="Latitud" name="latitud" fullWidth margin="normal" onChange={handleChange} />
          <TextField label="Longitud" name="longitud" fullWidth margin="normal" onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained">Guardar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PuntosRecoleccion;
