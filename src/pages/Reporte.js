import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Reporte = () => {
  const [registros, setRegistros] = useState([]);
  const navigate = useNavigate();

  // URL dinámica para producción o desarrollo
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

  const obtenerDatos = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/reportes`);
      setRegistros(res.data);
    } catch (error) {
      console.error('Error al obtener reportes:', error);
    }
  };

  const eliminarTodo = async () => {
    try {
      await axios.delete(`${API_URL}/api/reportes`);
      setRegistros([]);
    } catch (error) {
      console.error('Error al eliminar reportes:', error);
    }
  };

  useEffect(() => {
    obtenerDatos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <div className="reporte-header">
        <br />
        <div className="logo-fijo">
          <img src="/logo.png" alt="Logo Empresa" className="logo-independiente" />
        </div>
        <br />
        <div className="fecha-titulo">
          <p className="fecha-derecha"><strong>Fecha:</strong> {new Date().toLocaleDateString()}</p>
          <h2 className="titulo-central">ACTIVIDADES DIARIAS DE VEHÍCULOS</h2>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>UNIDAD</th>
            <th>NO. ECOM</th>
            <th>USUARIO</th>
            <th>DESTINO</th>
            <th>SALIDA</th>
            <th>ENTRADA</th>
            <th>OBSERVACIONES</th>
          </tr>
        </thead>
        <tbody>
          {registros.map((r) => (
            <tr key={r.id}>
              <td>{r.unidad}</td>
              <td>{r.no_ecom}</td>
              <td>{r.usuario}</td>
              <td>{r.destino}</td>
              <td>{r.salida}</td>
              <td>{r.entrada}</td>
              <td>{r.observaciones}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="button-group">
        <button className="green" onClick={eliminarTodo}>ELIMINAR</button>
        <button className="orange" onClick={() => navigate('/')}>REGRESAR</button>
      </div>
    </div>
  );
};

export default Reporte;
