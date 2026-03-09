import React, { useContext, useEffect } from "react";
import { Context } from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";

const People = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.fetchPeople && actions.fetchPeople();
  }, []);

  const imageMap = {
    "Luke Skywalker": "https://starwars-visualguide.com/assets/img/characters/1.jpg",
    "C-3PO": "https://starwars-visualguide.com/assets/img/characters/2.jpg",
    "R2-D2": "https://starwars-visualguide.com/assets/img/characters/3.jpg",
    "Darth Vader": "https://starwars-visualguide.com/assets/img/characters/4.jpg",
    "Leia Organa": "https://starwars-visualguide.com/assets/img/characters/5.jpg",
    "Owen Lars": "https://starwars-visualguide.com/assets/img/characters/6.jpg",
    "Beru Whitesun lars": "https://starwars-visualguide.com/assets/img/characters/7.jpg",
    "R5-D4": "https://starwars-visualguide.com/assets/img/characters/8.jpg",
    "Biggs Darklighter": "https://starwars-visualguide.com/assets/img/characters/9.jpg",
    "Obi-Wan Kenobi": "https://starwars-visualguide.com/assets/img/characters/10.jpg"
  };

  const getImageFor = (person) => {
    if (imageMap[person.name]) return imageMap[person.name];
    if (person.uid) {
      return `https://starwars-visualguide.com/assets/img/characters/${person.uid}.jpg`;
    }
    return `https://picsum.photos/600/400?random=${encodeURIComponent(
      person.uid || person.name
    )}`;
  };

  const imgStyle = {
    width: "100%",
    height: "250px",
    objectFit: "cover",
    display: "block"
  };

  const cardStyle = {
    borderRadius: "12px",
    overflow: "hidden"
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Characters</h2>
      <div className="row">
        {store.people && store.people.length ? (
          store.people.map((person) => (
            <div
              className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
              key={person.uid}
            >
              <div
                className="card bg-white text-dark shadow-sm h-100"
                style={cardStyle}
              >
                <img
                  src={getImageFor(person)}
                  alt={person.name}
                  style={imgStyle}
                  onError={(e) => {
                    if (!e.target.dataset.triedUid && person.uid) {
                      e.target.dataset.triedUid = "1";
                      e.target.src = `https://starwars-visualguide.com/assets/img/characters/${person.uid}.jpg`;
                      return;
                    }
                    e.target.onerror = null;
                    e.target.src = `https://picsum.photos/600/400?random=${encodeURIComponent(
                      person.uid || person.name
                    )}`;
                  }}
                />

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{person.name}</h5>

                  <div className="mt-auto d-flex justify-content-between">
                    
                    <Link
                      to={`/single/people/${person.uid}`}
                      className="btn btn-outline-dark btn-sm"
                    >
                      Learn more
                    </Link>

                    <button
                      className="btn btn-outline-warning btn-sm"
                      onClick={() =>
                        actions.addFavorite && actions.addFavorite(person.name)
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
            <p>No characters loaded yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default People;