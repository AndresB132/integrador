import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axios from 'axios';
import "./Usuarios.css"

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [open, setOpen] = useState(false);
  const [nuevoUsuario, setNuevoUsuario] = useState({ nombre: '', email: '', telefono: '', rol: '' });

  useEffect(() => { fetchUsuarios(); }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/usuarios');
      setUsuarios(response.data);
    } catch (error) {
      console.error("❌ Error al obtener usuarios:", error);
    }
  };

  const handleChange = (e) => setNuevoUsuario({ ...nuevoUsuario, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/usuarios/agregar', nuevoUsuario);
      fetchUsuarios();
      setOpen(false);
    } catch (error) {
      console.error("❌ Error al agregar usuario:", error);
    }
  };

  return (
    <div>
      <h2>Usuarios</h2>
      <div className="agregar-usuario-container">
        <Button className="agregar-usuario-button" variant="contained" onClick={() => setOpen(true)}>Agregar Usuario</Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Rol</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usuarios.map((usuario) => (
              <TableRow key={usuario.id}>
                <TableCell>{usuario.nombre}</TableCell>
                <TableCell>{usuario.email}</TableCell>
                <TableCell>{usuario.telefono}</TableCell>
                <TableCell>{usuario.rol}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Agregar Usuario</DialogTitle>
        <DialogContent>
          <TextField label="Nombre" name="nombre" fullWidth margin="normal" onChange={handleChange} />
          <TextField label="Email" name="email" fullWidth margin="normal" onChange={handleChange} />
          <TextField label="Teléfono" name="telefono" fullWidth margin="normal" onChange={handleChange} />
          <TextField label="Rol" name="rol" fullWidth margin="normal" onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained">Guardar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Usuarios;
