import React from "react";

export const Footer = () => (
  <footer className="footer mt-auto py-4 bg-dark text-light text-center">

    <div className="container">

      
      <div className="row mb-3">

        <div className="col-12 col-md-4">
          <ul className="list-unstyled">
            <li>Characters</li>
            <li>Planets</li>
          </ul>
        </div>

        <div className="col-12 col-md-4">
          <ul className="list-unstyled">
            <li>Vehicles</li>
            <li>Starships</li>
          </ul>
        </div>

        <div className="col-12 col-md-4">
          <ul className="list-unstyled">
            <li>Favorites</li>
            <li>Contact</li>
          </ul>
        </div>

      </div>
      
      <div className="mb-3">
        <a href="#" className="text-warning mx-2">GitHub</a>
        <a href="#" className="text-warning mx-2">LinkedIn</a>
        <a href="#" className="text-warning mx-2">Twitter</a>
      </div>

      
      <p className="mb-0">
        © 2026 Star Wars Blog — Built by Moufdi
      </p>

    </div>

  </footer>
);