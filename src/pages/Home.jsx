import React from "react";
import People from "../components/People";
import Planets from "../components/Planets";
import Vehicles from "../components/Vehicles";
const Home = () => {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <People />
        </div>

        <div className="col-12 mt-4">
          <Planets />
        </div>
      </div>
	  <div className="col-12 mt-4">
  <Vehicles />
</div>
    </div>
  );
};

export default Home;