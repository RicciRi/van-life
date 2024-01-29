import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/Layout';
import HostLayout from './components/HostLayout';
import AuthRequired from './components/AuthRequired';
import ExitRequired from './components/ExitRequired';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Registration from './pages/Registration';
import AccountSettings from './pages/AccountSettings';
import Vans from './pages/Vans/Vans';
import VanDetail from './pages/Vans/VanDetail';
import Income from './pages/Host/Income';
import HostVans from './pages/Host/HostVans';
import FormHost from './pages/Host/FormHost';
import HostVanDetail from './pages/Host/HostVanDetail';
import HostVanInfo from './pages/Host/HostVanInfo';
import HostVanPhotos from './pages/Host/HostVanPhotos';
import HostVanPricing from './pages/Host/HostVanPricing';
import NotFound from './pages/NotFound';
import './server';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="vans" element={<Vans />} />
                    <Route path="vans/:id" element={<VanDetail />} />
                    <Route element={<ExitRequired />}>
                        <Route path="login" element={<Login />} />
                        <Route
                            path="/registration"
                            element={<Registration />}
                        />
                    </Route>
                    <Route path="/logout" element={<Logout />} />

                    <Route element={<AuthRequired />}>
                        <Route path="settings" element={<AccountSettings />} />
                        <Route path="host" element={<HostLayout />}>
                            <Route index element={<Income />} />
                            <Route path="vans" element={<HostVans />} />
                            <Route path="form" element={<FormHost />} />
                            <Route path="vans/:id" element={<HostVanDetail />}>
                                <Route index element={<HostVanInfo />} />
                                <Route
                                    path="pricing"
                                    element={<HostVanPricing />}
                                />
                                <Route
                                    path="photos"
                                    element={<HostVanPhotos />}
                                />
                            </Route>
                        </Route>
                    </Route>

                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
