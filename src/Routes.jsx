import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Forecast from './views/Forecast';

const AppRoutes = function AppRoutes() {
  return (
    <Routes>
      <Route index element={<Forecast />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
