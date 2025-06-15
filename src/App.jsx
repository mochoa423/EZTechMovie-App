import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./context/Navigation";
import Home from "./context/Home";
import About from "./context/About";
import Movies from "./context/Movies";  
import Cart from "./context/Cart";
import Callback from './context/Callback';
import CreditCardForm from './context/CreditCardForm';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Navigation user={user} setUser={setUser} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/callback" element={<Callback />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
            <Route path="/payment" element={<CreditCardForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
