import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axios from 'axios';
import "./Eventos.css"

const Eventos = () => {
  const [eventos, setEventos] = useState([]);
  const [open, setOpen] = useState(false);
  const [nuevoEvento, setNuevoEvento] = useState({ nombre: '', fecha: '', descripcion: '', ubicacion_id: '' });

  // Fetch eventos al cargar el componente
  useEffect(() => {
    fetchEventos();
  }, []);

  const fetchEventos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/eventos');
      setEventos(response.data);
    } catch (error) {
      console.error("❌ Error al obtener eventos:", error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setNuevoEvento({ ...nuevoEvento, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      // Validar que todos los campos estén completos
      if (!nuevoEvento.nombre || !nuevoEvento.fecha || !nuevoEvento.descripcion || !nuevoEvento.ubicacion_id) {
        alert("Por favor, completa todos los campos.");
        return;
      }

      // Enviar datos al backend
      await axios.post('http://localhost:5000/api/eventos', nuevoEvento);
      fetchEventos(); // Refrescar la lista de eventos
      handleClose(); // Cerrar el diálogo
    } catch (error) {
      console.error("❌ Error al agregar evento:", error);
    }
  };

  return (
    <div>
      <h2>Eventos</h2>
      <div className="button-container">
        <Button variant="contained" onClick={handleOpen} sx={{ mb: 2 }}>Agregar Evento</Button>
      </div>

      {/* Tabla de eventos */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>ID de Ubicación</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {eventos.map((evento) => (
              <TableRow key={evento.id}>
                <TableCell>{evento.nombre}</TableCell>
                <TableCell>{evento.fecha}</TableCell>
                <TableCell>{evento.descripcion}</TableCell>
                <TableCell>{evento.ubicacion_id}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Diálogo para agregar evento */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Agregar Evento</DialogTitle>
        <DialogContent>
          <TextField label="Nombre" name="nombre" fullWidth margin="normal" onChange={handleChange} />
          <TextField
            label="Fecha"
            name="fecha"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            onChange={handleChange}
          />
          <TextField label="Descripción" name="descripcion" fullWidth margin="normal" onChange={handleChange} />
          <TextField label="ID de Ubicación" name="ubicacion_id" fullWidth margin="normal" onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained">Guardar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Eventos;
