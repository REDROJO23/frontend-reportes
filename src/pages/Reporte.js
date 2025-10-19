import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Reporte = () => {
  const [registros, setRegistros] = useState([]);
  const navigate = useNavigate();

  const obtenerDatos = async () => {
    const res = await axios.get('http://localhost:3001/api/reportes');
    setRegistros(res.data);
  };

  const eliminarTodo = async () => {
    await axios.delete('http://localhost:3001/api/reportes');
    setRegistros([]);
  };

  useEffect(() => {
    obtenerDatos();
  }, []);

  return (
    <div className="container">
      <div className="reporte-header">
        <br/>
        <div className="logo-fijo">
          <img src="/logo.png" alt="Logo Empresa" className="logo-independiente" />
        </div>
        <br></br>
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