import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Result from "./pages/Result.jsx";
import BuyCredit from "./pages/BuyCredit.jsx";
import Navbar from "./components/Layout/Navbar.jsx";
import Footer from "./components/Layout/Footer.jsx";
import { ImageProvider } from "./context/ImageContext.jsx";

function App() {
  return (
    <ImageProvider>
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/result" element={<Result />} />
          <Route path="/buycredit" element={<BuyCredit />} />
        </Routes>
        <Footer />
      </div>
    </ImageProvider>
  );
}

export default App;
