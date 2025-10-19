import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const opciones = {
  unidad: ['Frontier', 'Yaris'],
  no_ecom: ['A-05', 'A-13', 'A-14', 'A-18', 'A-19', 'A-20', 'A-27', 'A-29', 'A-31', 'A-34', 'A-35', 'A-36', 'A-37', 'A-38'],
  salida: ['sin actividad', 'sin retorno'],
  entrada: ['sin actividad', 'sin retorno'],
  observaciones: ['unidad en oficinas disponible', 'unidad fuera con el usuario', 'unidad no disponible']
};

const Formulario = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    unidad: '',
    no_ecom: '',
    usuario: '',
    destino: '',
    salida: '',
    entrada: '',
    observaciones: ''
  });

  const refs = useRef([]);
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (index < refs.current.length - 1) {
        refs.current[index + 1].focus();
      }
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`${API_URL}/api/reportes`, form);
      setForm({
        unidad: '',
        no_ecom: '',
        usuario: '',
        destino: '',
        salida: '',
        entrada: '',
        observaciones: ''
      });
      alert('✅ Registro guardado correctamente');
    } catch (error) {
      console.error('Error al registrar:', error);
      alert('❌ Error al registrar. Verifica la conexión con el backend.');
    }
  };

  return (
    <div className="container formulario-ajustada">
      <div className="formulario-card">
        <h2 className="formulario-titu">Registro de actividades diarias de vehículos</h2>
        <br />
        {Object.keys(form).map((campo, index) => (
          <div key={campo} className="form-group">
            <label>{campo.toUpperCase()}</label>
            {opciones[campo] ? (
              <>
                <input
                  list={campo}
                  name={campo}
                  value={form[campo]}
                  onChange={handleChange}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => (refs.current[index] = el)}
                />
                <datalist id={campo}>
                  {opciones[campo].map((op) => (
                    <option key={op} value={op} />
                  ))}
                </datalist>
              </>
            ) : (
              <input
                type="text"
                name={campo}
                value={form[campo]}
                onChange={handleChange}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (refs.current[index] = el)}
              />
            )}
          </div>
        ))}
        <div className="button-group">
          <button className="orange" onClick={handleSubmit}>REGISTRAR</button>
          <button className="purple" onClick={() => navigate('/reporte')}>VER REPORTE</button>
        </div>
      </div>
    </div>
  );
};

export default Formulario;
