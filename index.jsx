import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from './components/Layout';
import HostLayout from './components/HostLayout';
import AuthRequired from './components/AuthRequired';
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login"
import Registration from './pages/Registration';
import AccountSettings from './pages/AccountSettings';
import Vans from "./pages/Vans/Vans";
import VanDetail from "./pages/Vans/VanDetail";
import Reviews from './pages/Host/Reviews';
import Income from './pages/Host/Income';
import Dashboard from './pages/Host/Dashboard'
import HostVans from './pages/Host/HostVans';
import FormHost from './pages/Host/FormHost';
import HostVanDetail from "./pages/Host/HostVanDetail"
import HostVanInfo from "./pages/Host/HostVanInfo"
import HostVanPhotos from "./pages/Host/HostVanPhotos"
import HostVanPricing from "./pages/Host/HostVanPricing"
import NotFound from './pages/NotFound';
import "./server"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="vans" element={<Vans />} />
          <Route path="vans/:id" element={<VanDetail />} />
          <Route
            path="login"
            element={<Login />}
          />
          <Route path='/registration' element={<Registration />} /> 

          <Route element={<AuthRequired />}>
            <Route path="settings" element={<AccountSettings />} />
            <Route path="host" element={<HostLayout />}>
              {/* <Route index element={<Dashboard />} /> */}
              <Route path="income" element={<Income />} />
              <Route path="reviews" element={<Reviews />} />
              <Route index element={<HostVans />} />
              <Route path="form" element={<FormHost />} />
              <Route path="vans/:id" element={<HostVanDetail />}>
                <Route index element={<HostVanInfo />} />
                <Route path="pricing" element={<HostVanPricing />} />
                <Route path="photos" element={<HostVanPhotos />} />
              </Route>
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(<App />);