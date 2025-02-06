// 📁 src/pages/Ubicaciones.js
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
  TableContainer,
} from '@mui/material';
import axios from 'axios';
import "./Ubicaciones.css";

const Ubicaciones = () => {
  const [ubicaciones, setUbicaciones] = useState([]);
  const [open, setOpen] = useState(false);
  const [nuevaUbicacion, setNuevaUbicacion] = useState({ id: null, nombre: '', direccion: '', ciudad: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // Obtener ubicaciones al cargar el componente
  useEffect(() => {
    fetchUbicaciones();
  }, []);

  const fetchUbicaciones = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/ubicaciones');
      setUbicaciones(response.data);
    } catch (err) {
      setError('❌ Error al cargar ubicaciones. Inténtalo de nuevo.');
      console.error("❌ Error al obtener ubicaciones:", err);
    }
  };

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    setNuevaUbicacion({ ...nuevaUbicacion, [e.target.name]: e.target.value });
  };

  // Validar campos antes de enviar
  const validate = () => {
    if (!nuevaUbicacion.nombre || !nuevaUbicacion.direccion || !nuevaUbicacion.ciudad) {
      setError('Todos los campos son obligatorios.');
      return false;
    }
    setError('');
    return true;
  };

  // Agregar una nueva ubicación
  const handleAdd = () => {
    setNuevaUbicacion({ id: null, nombre: '', direccion: '', ciudad: '' }); // Limpiar el formulario
    setIsEditMode(false); // Modo "Agregar"
    setOpen(true); // Abrir el diálogo
  };

  // Editar una ubicación existente
  const handleEdit = (ubicacion) => {
    setNuevaUbicacion(ubicacion); // Cargar los datos de la ubicación a editar
    setIsEditMode(true); // Modo "Editar"
    setOpen(true); // Abrir el diálogo
  };

  // Guardar o actualizar ubicación
  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      if (isEditMode) {
        // Actualizar ubicación
        await axios.put(`http://localhost:5000/api/ubicaciones/${nuevaUbicacion.id}`, nuevaUbicacion);
      } else {
        // Crear ubicación
        await axios.post('http://localhost:5000/api/ubicaciones/agregar', nuevaUbicacion);
      }
      fetchUbicaciones(); // Actualizar la lista
      setOpen(false); // Cerrar el diálogo
    } catch (err) {
      setError('❌ Error al guardar ubicación. Inténtalo de nuevo.');
      console.error("❌ Error al guardar ubicación:", err);
    } finally {
      setLoading(false);
    }
  };

  // Eliminar una ubicación
  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta ubicación?')) {
      try {
        await axios.delete(`http://localhost:5000/api/ubicaciones/${id}`);
        fetchUbicaciones(); // Actualizar la lista
      } catch (err) {
        setError('❌ Error al eliminar ubicación. Inténtalo de nuevo.');
        console.error("❌ Error al eliminar ubicación:", err);
      }
    }
  };

  return (
    <div>
      <h2>Ubicaciones</h2>

      {/* Botón para abrir el diálogo de agregar ubicación */}
      <div className="agregar-ubicacion-container">
        <Button
          className="agregar-ubicacion-button"
          variant="contained"
          onClick={handleAdd}
          sx={{ mb: 2 }}
        >
          Agregar Ubicación
        </Button>
      </div>

      {/* Mostrar mensajes de error */}
      {error && <Alert severity="error">{error}</Alert>}

      {/* Tabla de ubicaciones */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Dirección</TableCell>
              <TableCell>Ciudad</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ubicaciones.map((ubicacion) => (
              <TableRow key={ubicacion.id}>
                <TableCell>{ubicacion.nombre}</TableCell>
                <TableCell>{ubicacion.direccion}</TableCell>
                <TableCell>{ubicacion.ciudad}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(ubicacion)}>Editar</Button>
                  <Button onClick={() => handleDelete(ubicacion.id)}>Eliminar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Diálogo para agregar/editar ubicación */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{isEditMode ? 'Editar Ubicación' : 'Agregar Ubicación'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Nombre"
            name="nombre"
            fullWidth
            margin="normal"
            onChange={handleChange}
            value={nuevaUbicacion.nombre}
          />
          <TextField
            label="Dirección"
            name="direccion"
            fullWidth
            margin="normal"
            onChange={handleChange}
            value={nuevaUbicacion.direccion}
          />
          <TextField
            label="Ciudad"
            name="ciudad"
            fullWidth
            margin="normal"
            onChange={handleChange}
            value={nuevaUbicacion.ciudad}
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

export default Ubicaciones;