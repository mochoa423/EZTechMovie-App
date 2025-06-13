<<<<<<< HEAD
import React from 'react';

const About = () => {
  return (
    <div className="page">
      <h1>About EZTechMovie App</h1>
      <p>EZTechMovie is your all in one solution to streaming!!</p>
=======
import React from "react";

const About = () => {
  return (
    <div className="page about-page">
      <div className="about-container">
        <h1>About EZTechMovie</h1>
        <p className="about-description">
          EZTechMovie is your all-in-one streaming service manager. Our application
          allows you to search for movies, track your favorite services, and manage
          subscriptions through a convenient shopping cart and checkout system.
        </p>

        <h2>Key Features</h2>
        <ul className="about-features">
          <li>Search for movie titles via TheMovieDB API</li>
          <li>Add and manage subscriptions in a smart cart</li>
          <li>Secure, simulated credit card checkout</li>
          <li>Planned support for Google OAuth login</li>
        </ul>

        <h2>Our Team</h2>
        <ul className="about-team">
          <li>Avery Krouskop – Cart Logic, Checkout, Integration</li>
          <li>Manuel Ochoa – UI Design & OAuth Implementation</li>
          <li>Kolton Tarango – Cart Persistence via localStorage, Presentation Expert</li>
          <li>Erin Weathers – Styling, & Copy</li>
        </ul>
      </div>
>>>>>>> 2e9bc5e (Added Page Adjustments, Credit Card Security, Credit Card Form, Etc.)
    </div>
  );
};

export default About;
