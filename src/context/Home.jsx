import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="page home-container">
      <div className="home-hero">
        <h1>Welcome to EZTechMovie</h1>
        <p>
          Discover, explore, and subscribe to your favorite streaming services
          all in one place. Use our smart cart system to manage your subscriptions with ease.
        </p>
        <Link to="/movies">
          <button className="get-started-btn">Get Started</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
