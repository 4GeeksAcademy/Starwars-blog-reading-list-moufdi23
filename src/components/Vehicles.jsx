import React, { useContext, useEffect } from "react";
import { Context } from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";

const Vehicles = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.fetchVehicles && actions.fetchVehicles();
  }, []);

  const imageMap = {
    "Sand Crawler": "https://starwars-visualguide.com/assets/img/vehicles/4.jpg",
    "T-16 skyhopper": "https://starwars-visualguide.com/assets/img/vehicles/6.jpg",
    "X-34 landspeeder": "https://starwars-visualguide.com/assets/img/vehicles/7.jpg",
    "TIE/LN starfighter": "https://starwars-visualguide.com/assets/img/vehicles/8.jpg",
    "Snowspeeder": "https://starwars-visualguide.com/assets/img/vehicles/14.jpg",
    "TIE bomber": "https://starwars-visualguide.com/assets/img/vehicles/16.jpg",
    "AT-AT": "https://starwars-visualguide.com/assets/img/vehicles/18.jpg",
    "AT-ST": "https://starwars-visualguide.com/assets/img/vehicles/19.jpg",
    "Storm IV Twin-Pod cloud car": "https://starwars-visualguide.com/assets/img/vehicles/20.jpg",
    "Sail barge": "https://starwars-visualguide.com/assets/img/vehicles/24.jpg"
  };

  const getImageFor = (vehicle) => {
    if (imageMap[vehicle.name]) return imageMap[vehicle.name];

    if (vehicle.uid) {
      return `https://starwars-visualguide.com/assets/img/vehicles/${vehicle.uid}.jpg`;
    }

    return `https://picsum.photos/600/400?random=${encodeURIComponent(
      vehicle.uid || vehicle.name
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
      <h2 className="mb-3">Vehicles</h2>

      <div className="row">
        {store.vehicles && store.vehicles.length ? (
          store.vehicles.map((vehicle) => (
            <div
              className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
              key={vehicle.uid}
            >
              <div
                className="card bg-white text-dark shadow-sm h-100"
                style={cardStyle}
              >
                <img
                  src={getImageFor(vehicle)}
                  alt={vehicle.name}
                  style={imgStyle}
                  onError={(e) => {
                    if (!e.target.dataset.triedUid && vehicle.uid) {
                      e.target.dataset.triedUid = "1";
                      e.target.src = `https://starwars-visualguide.com/assets/img/vehicles/${vehicle.uid}.jpg`;
                      return;
                    }
                    e.target.onerror = null;
                    e.target.src = `https://picsum.photos/600/400?random=${encodeURIComponent(
                      vehicle.uid || vehicle.name
                    )}`;
                  }}
                />

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{vehicle.name}</h5>

                  <div className="mt-auto d-flex justify-content-between">
                    
                    <Link
                      to={`/single/vehicles/${vehicle.uid}`}
                      className="btn btn-outline-dark btn-sm"
                    >
                      Learn more
                    </Link>

                    <button
                      className="btn btn-outline-warning btn-sm"
                      onClick={() =>
                        actions.addFavorite && actions.addFavorite(vehicle.name)
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
            <p>No vehicles loaded yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Vehicles;