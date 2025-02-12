import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import BookingPage from "./pages/BookingPage";
import PricingPage from "./pages/PricingPage";
import NotFound from "./pages/NotFound";
import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./components/ScrollToTop";

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <NavBar />
            <Toaster position="top-center" toastOptions={{ duration: 5000 }} />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/about" element={<AboutPage />} />

                <Route path="/booking" element={<BookingPage />} />

                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
