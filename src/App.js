import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Formulario from './pages/Formulario';
import Reporte from './pages/Reporte';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Formulario />} />
        <Route path="/reporte" element={<Reporte />} />
      </Routes>
    </Router>
  );
}

export default App;