import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./context/Navigation";
import Home from "./context/Home";
import About from "./context/About";
import Movies from "./context/Movies";  
import Cart from "./context/Cart";
import LoginButton from './context/LoginButton';
import Callback from './context/Callback';
<<<<<<< HEAD
=======
import CreditCardForm from './context/CreditCardForm';
>>>>>>> 2e9bc5e (Added Page Adjustments, Credit Card Security, Credit Card Form, Etc.)

const logout = () => {
  localStorage.removeItem("access_token");
  window.location.href = "/";
};

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Navigation />
	<LoginButton />
        <button onClick={logout}>Logout</button>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
	    <Route path="/callback" element={<Callback />} />	  
            <Route path="/movies" element={<Movies />} /> {/* Products from data.jsx */}
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
<<<<<<< HEAD
=======
			<Route path="/payment" element={<CreditCardForm />} />
>>>>>>> 2e9bc5e (Added Page Adjustments, Credit Card Security, Credit Card Form, Etc.)
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
