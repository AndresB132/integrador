import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axios from 'axios';
import "./Ubicaciones.css"

const Ubicaciones = () => {
  const [ubicaciones, setUbicaciones] = useState([]);
  const [open, setOpen] = useState(false);
  const [nuevaUbicacion, setNuevaUbicacion] = useState({ nombre: '', direccion: '', ciudad: '' });

  useEffect(() => {
    fetchUbicaciones();
  }, []);

  const fetchUbicaciones = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/ubicaciones');
      setUbicaciones(response.data);
    } catch (error) {
      console.error("❌ Error al obtener ubicaciones:", error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setNuevaUbicacion({ ...nuevaUbicacion, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/ubicaciones/agregar', nuevaUbicacion);
      fetchUbicaciones();
      handleClose();
    } catch (error) {
      console.error("❌ Error al agregar ubicación:", error);
    }
  };

  return (
    <div>
      <h2>Ubicaciones</h2>
      <div className="agregar-ubicacion-container">
        <Button className="agregar-ubicacion-button" variant="contained" onClick={handleOpen} sx={{ mb: 2 }}>Agregar Ubicación</Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Dirección</TableCell>
              <TableCell>Ciudad</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ubicaciones.map((ubicacion) => (
              <TableRow key={ubicacion.id}>
                <TableCell>{ubicacion.nombre}</TableCell>
                <TableCell>{ubicacion.direccion}</TableCell>
                <TableCell>{ubicacion.ciudad}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Agregar Ubicación</DialogTitle>
        <DialogContent>
          <TextField label="Nombre" name="nombre" fullWidth margin="normal" onChange={handleChange} />
          <TextField label="Dirección" name="direccion" fullWidth margin="normal" onChange={handleChange} />
          <TextField label="Ciudad" name="ciudad" fullWidth margin="normal" onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained">Guardar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Ubicaciones;
