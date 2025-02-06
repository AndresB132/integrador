// 📁 src/pages/Usuarios.js
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert,
  TableContainer, // Importación corregida
} from '@mui/material';
import axios from 'axios';
import "./Usuarios.css";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [open, setOpen] = useState(false);
  const [nuevoUsuario, setNuevoUsuario] = useState({ id: null, nombre: '', email: '', telefono: '', rol: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // Obtener usuarios al cargar el componente
  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/usuarios');
      setUsuarios(response.data);
    } catch (err) {
      setError('❌ Error al cargar usuarios. Inténtalo de nuevo.');
      console.error("❌ Error al obtener usuarios:", err);
    }
  };

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    setNuevoUsuario({ ...nuevoUsuario, [e.target.name]: e.target.value });
  };

  // Validar campos antes de enviar
  const validate = () => {
    if (!nuevoUsuario.nombre || !nuevoUsuario.email || !nuevoUsuario.telefono || !nuevoUsuario.rol) {
      setError('Todos los campos son obligatorios.');
      return false;
    }
    setError('');
    return true;
  };

  // Agregar un nuevo usuario
  const handleAdd = () => {
    setNuevoUsuario({ id: null, nombre: '', email: '', telefono: '', rol: '' }); // Limpiar el formulario
    setIsEditMode(false); // Modo "Agregar"
    setOpen(true); // Abrir el diálogo
  };

  // Editar un usuario existente
  const handleEdit = (usuario) => {
    setNuevoUsuario(usuario); // Cargar los datos del usuario a editar
    setIsEditMode(true); // Modo "Editar"
    setOpen(true); // Abrir el diálogo
  };

  // Guardar o actualizar usuario
  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      if (isEditMode) {
        // Actualizar usuario
        await axios.put(`http://localhost:5000/api/usuarios/${nuevoUsuario.id}`, nuevoUsuario);
      } else {
        // Crear usuario
        await axios.post('http://localhost:5000/api/usuarios/agregar', nuevoUsuario);
      }
      fetchUsuarios(); // Actualizar la lista
      setOpen(false); // Cerrar el diálogo
    } catch (err) {
      setError('❌ Error al guardar usuario. Inténtalo de nuevo.');
      console.error("❌ Error al guardar usuario:", err);
    } finally {
      setLoading(false);
    }
  };

  // Eliminar un usuario
  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      try {
        await axios.delete(`http://localhost:5000/api/usuarios/${id}`);
        fetchUsuarios(); // Actualizar la lista
      } catch (err) {
        setError('❌ Error al eliminar usuario. Inténtalo de nuevo.');
        console.error("❌ Error al eliminar usuario:", err);
      }
    }
  };

  return (
    <div>
      <h2>Usuarios</h2>

      {/* Botón para abrir el diálogo de agregar usuario */}
      <div className="agregar-usuario-container">
        <Button
          className="agregar-usuario-button"
          variant="contained"
          onClick={handleAdd}
        >
          Agregar Usuario
        </Button>
      </div>

      {/* Mostrar mensajes de error */}
      {error && <Alert severity="error">{error}</Alert>}

      {/* Tabla de usuarios */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usuarios.map((usuario) => (
              <TableRow key={usuario.id}>
                <TableCell>{usuario.nombre}</TableCell>
                <TableCell>{usuario.email}</TableCell>
                <TableCell>{usuario.telefono}</TableCell>
                <TableCell>{usuario.rol}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(usuario)}>Editar</Button>
                  <Button onClick={() => handleDelete(usuario.id)}>Eliminar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Diálogo para agregar/editar usuario */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{isEditMode ? 'Editar Usuario' : 'Agregar Usuario'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Nombre"
            name="nombre"
            fullWidth
            margin="normal"
            onChange={handleChange}
            value={nuevoUsuario.nombre}
          />
          <TextField
            label="Email"
            name="email"
            fullWidth
            margin="normal"
            onChange={handleChange}
            value={nuevoUsuario.email}
          />
          <TextField
            label="Teléfono"
            name="telefono"
            fullWidth
            margin="normal"
            onChange={handleChange}
            value={nuevoUsuario.telefono}
          />
          <TextField
            label="Rol"
            name="rol"
            fullWidth
            margin="normal"
            onChange={handleChange}
            value={nuevoUsuario.rol}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Guardar'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Usuarios;