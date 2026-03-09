import React, { useContext, useEffect } from "react";
import { Context } from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";

const Planets = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.fetchPlanets && actions.fetchPlanets();
  }, []);

  const imageMap = {
    "Tatooine": "https://starwars-visualguide.com/assets/img/planets/1.jpg",
    "Alderaan": "https://starwars-visualguide.com/assets/img/planets/2.jpg",
    "Yavin IV": "https://starwars-visualguide.com/assets/img/planets/3.jpg",
    "Hoth": "https://starwars-visualguide.com/assets/img/planets/4.jpg",
    "Dagobah": "https://starwars-visualguide.com/assets/img/planets/5.jpg",
    "Bespin": "https://starwars-visualguide.com/assets/img/planets/6.jpg",
    "Endor": "https://starwars-visualguide.com/assets/img/planets/7.jpg",
    "Naboo": "https://starwars-visualguide.com/assets/img/planets/8.jpg",
    "Coruscant": "https://starwars-visualguide.com/assets/img/planets/9.jpg",
    "Kamino": "https://starwars-visualguide.com/assets/img/planets/10.jpg"
  };

  const getImageFor = (planet) => {
    if (imageMap[planet.name]) return imageMap[planet.name];

    if (planet.uid) {
      return `https://starwars-visualguide.com/assets/img/planets/${planet.uid}.jpg`;
    }

    return `https://picsum.photos/600/400?random=${encodeURIComponent(
      planet.uid || planet.name
    )}`;
  };

  const imgStyle = {
    width: "100%",
    height: "220px",
    objectFit: "cover",
    display: "block"
  };

  const cardStyle = {
    borderRadius: "12px",
    overflow: "hidden"
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Planets</h2>

      <div className="row">
        {store.planets && store.planets.length ? (
          store.planets.map((planet) => (
            <div
              className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
              key={planet.uid}
            >
              <div
                className="card bg-white text-dark shadow-sm h-100"
                style={cardStyle}
              >
                <img
                  src={getImageFor(planet)}
                  alt={planet.name}
                  style={imgStyle}
                  onError={(e) => {
                    if (!e.target.dataset.triedUid && planet.uid) {
                      e.target.dataset.triedUid = "1";
                      e.target.src = `https://starwars-visualguide.com/assets/img/planets/${planet.uid}.jpg`;
                      return;
                    }
                    e.target.onerror = null;
                    e.target.src = `https://picsum.photos/600/400?random=${encodeURIComponent(
                      planet.uid || planet.name
                    )}`;
                  }}
                />

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{planet.name}</h5>

                  <div className="mt-auto d-flex justify-content-between">
                    
                    <Link
                      to={`/single/planets/${planet.uid}`}
                      className="btn btn-outline-dark btn-sm"
                    >
                      Learn more
                    </Link>

                    <button
                      className="btn btn-outline-warning btn-sm"
                      onClick={() =>
                        actions.addFavorite && actions.addFavorite(planet.name)
                      }
                    >
                      <i className="fa-regular fa-heart" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <p>No planets loaded yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Planets;