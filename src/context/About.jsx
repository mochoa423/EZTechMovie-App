import React from "react";

const About = () => {
  return (
    <div className="page about-page">
      <div className="about-container">
        <h1>About EZTechMovie</h1>
        <p className="about-description">
          EZTechMovie is your all-in-one streaming service manager. Our application
          allows users to browse and select subscription services, search movies and TV shows through TheMovieDB API,
          and manage their personalized content cart with a secure, simulated checkout system.
        </p>

        <h2>Key Features</h2>
        <ul className="about-features">
          <li>Live search for popular movies and TV shows via TheMovieDB API</li>
          <li>Add subscriptions, movies, or shows to a smart cart with restrictions (no duplicates)</li>
          <li>Simulated credit card checkout with clear user feedback</li>
          <li>Google OAuth for user login with profile-based access</li>
        </ul>

        <h2>Our Team</h2>
        <ul className="about-team">
          <li>Avery Krouskop – Cart Logic, Checkout, Media Integration, Scrollable Media UI</li>
          <li>Manuel Ochoa – UI Design, Google OAuth Setup, Login Button</li>
          <li>Kolton Tarango – Cart Persistence via localStorage</li>
          <li>Erin Weathers – Styling, Layout Consistency, Content Writing</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
