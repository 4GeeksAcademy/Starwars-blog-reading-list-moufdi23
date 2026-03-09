import React, { useEffect, useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../hooks/useGlobalReducer";

export const Single = () => {
  const { type, theId } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(`https://www.swapi.tech/api/${type}/${theId}`);
        const data = await response.json();
        setItem(data.result);
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };

    fetchDetails();
  }, [type, theId]);

  if (!item) {
    return (
      <div className="container text-center mt-5">
        <h2>Loading...</h2>
      </div>
    );
  }

  const imgUrl = `https://starwars-visualguide.com/assets/img/${type}/${theId}.jpg`;

  return (
    <div className="container mt-5 text-dark">   
      <div className="row">

        
        <div className="col-md-6">
          <img
            src={imgUrl}
            alt={item.properties.name}
            className="img-fluid rounded shadow"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
            }}
          />
        </div>

        
        <div className="col-md-6">
          <h1 className="display-4">{item.properties.name}</h1>

          
          <p className="lead text-dark">{item.description}</p>

          <hr className="border-secondary" />

          <div className="row">
            {Object.entries(item.properties).map(([key, value]) => (
              <div className="col-6 mb-2" key={key}>
                <strong className="text-warning">{key.replace("_", " ")}:</strong>
                <div>{value}</div>
              </div>
            ))}
          </div>

          <Link to="/" className="btn btn-warning mt-4">
            Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};