import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import "./PuntoRecoleccion.css"

const PuntosRecoleccion = () => {
  const [puntos, setPuntos] = useState([]);
  const [open, setOpen] = useState(false);
  const [nuevoPunto, setNuevoPunto] = useState({ nombre: '', direccion: '', latitud: '', longitud: '' });

  // Fetch puntos de recolección al cargar el componente
  useEffect(() => {
    fetchPuntos();
  }, []);

  const fetchPuntos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/puntos-recoleccion');
      setPuntos(response.data);
    } catch (error) {
      console.error("❌ Error al obtener puntos de recolección:", error);
    }
  };

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

      // Enviar datos al backend
      await axios.post('http://localhost:5000/api/puntos-recoleccion', nuevoPunto);
      fetchPuntos(); // Refrescar la lista de puntos
      handleClose(); // Cerrar el diálogo
    } catch (error) {
      console.error("❌ Error al agregar punto de recolección:", error);
    }
  };

  return (
    <div>
      <h2>Puntos de Recolección</h2>
      <div className="agregar-punto-container">
        <Button className="agregar-punto-button" variant="contained" onClick={handleOpen} sx={{ mb: 2 }}>Agregar Punto de Recolección</Button>
      </div>

      {/* Mapa */}
      <MapContainer center={[-0.225219, -78.524883]} zoom={13} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {puntos.map((punto) => (
          <Marker key={punto.id} position={[parseFloat(punto.latitud), parseFloat(punto.longitud)]}>
            <Popup>
              <b>{punto.nombre}</b>
              <br />
              {punto.direccion}
            </Popup>
          </Marker>
        ))}
      </MapContainer>

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
