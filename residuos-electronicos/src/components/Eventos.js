import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from '@mui/material';
import axios from 'axios';
import "./Eventos.css";

const Eventos = () => {
  const [eventos, setEventos] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false); // Para manejar el modo edición
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null); // Para almacenar el evento seleccionado
  const [nuevoEvento, setNuevoEvento] = useState({
    nombre: '',
    fecha: '',
    descripcion: '',
    ubicacion_id: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
      setError('Error al cargar los eventos. Inténtalo de nuevo.');
    }
  };

  const handleOpen = () => {
    setEditMode(false); // Modo agregar
    setNuevoEvento({ nombre: '', fecha: '', descripcion: '', ubicacion_id: '' }); // Limpiar formulario
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError(''); // Limpiar mensajes de error al cerrar el diálogo
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoEvento((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      // Validar que todos los campos estén completos
      if (!nuevoEvento.nombre || !nuevoEvento.fecha || !nuevoEvento.descripcion || !nuevoEvento.ubicacion_id) {
        setError('Todos los campos son obligatorios.');
        return;
      }

      // Validar que la fecha tenga un formato válido
      const fechaValida = Date.parse(nuevoEvento.fecha);
      if (isNaN(fechaValida)) {
        setError('La fecha ingresada no es válida.');
        return;
      }

      // Validar que el ID de ubicación sea un número entero
      const ubicacionId = parseInt(nuevoEvento.ubicacion_id, 10);
      if (isNaN(ubicacionId) || ubicacionId <= 0) {
        setError('El ID de ubicación debe ser un número entero positivo.');
        return;
      }

      setLoading(true); // Activar indicador de carga

      if (editMode) {
        // Modo edición: Actualizar evento existente
        await axios.put(`http://localhost:5000/api/eventos/${eventoSeleccionado.id}`, {
          ...nuevoEvento,
          fecha: nuevoEvento.fecha,
          ubicacion_id: ubicacionId,
        });
      } else {
        // Modo agregar: Crear nuevo evento
        await axios.post('http://localhost:5000/api/eventos', {
          ...nuevoEvento,
          fecha: nuevoEvento.fecha,
          ubicacion_id: ubicacionId,
        });
      }

      fetchEventos(); // Refrescar la lista de eventos
      handleClose(); // Cerrar el diálogo
    } catch (error) {
      console.error("❌ Error al procesar evento:", error);
      setError('Error al guardar el evento. Inténtalo de nuevo.');
    } finally {
      setLoading(false); // Desactivar indicador de carga
    }
  };

  const handleEdit = (evento) => {
    setEditMode(true); // Activar modo edición
    setEventoSeleccionado(evento); // Almacenar el evento seleccionado
    setNuevoEvento({
      nombre: evento.nombre,
      fecha: evento.fecha,
      descripcion: evento.descripcion,
      ubicacion_id: evento.ubicacion_id.toString(),
    });
    setOpen(true); // Abrir el diálogo
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/eventos/${id}`);
      fetchEventos(); // Refrescar la lista de eventos
    } catch (error) {
      console.error("❌ Error al eliminar evento:", error);
      setError('Error al eliminar el evento. Inténtalo de nuevo.');
    }
  };

  return (
    <div>
      <h2>Eventos</h2>

      {/* Mensajes de error */}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {/* Botón para abrir el diálogo */}
      <div className="button-container">
        <Button variant="contained" onClick={handleOpen} sx={{ mb: 2 }}>
          Agregar Evento
        </Button>
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
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {eventos.length > 0 ? (
              eventos.map((evento) => (
                <TableRow key={evento.id}>
                  <TableCell>{evento.nombre}</TableCell>
                  <TableCell>{evento.fecha}</TableCell>
                  <TableCell>{evento.descripcion}</TableCell>
                  <TableCell>{evento.ubicacion_id}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={() => handleEdit(evento)}
                      sx={{ mr: 1 }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(evento.id)}
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No hay eventos disponibles.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Diálogo para agregar/editar evento */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editMode ? 'Editar Evento' : 'Agregar Evento'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Nombre"
            name="nombre"
            fullWidth
            margin="normal"
            onChange={handleChange}
            value={nuevoEvento.nombre}
          />
          <TextField
            label="Fecha"
            name="fecha"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            onChange={handleChange}
            value={nuevoEvento.fecha}
          />
          <TextField
            label="Descripción"
            name="descripcion"
            fullWidth
            margin="normal"
            onChange={handleChange}
            value={nuevoEvento.descripcion}
          />
          <TextField
            label="ID de Ubicación"
            name="ubicacion_id"
            fullWidth
            margin="normal"
            onChange={handleChange}
            value={nuevoEvento.ubicacion_id}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained" disabled={loading}>
            {loading ? 'Guardando...' : editMode ? 'Actualizar' : 'Guardar'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Eventos;