import React, { useState } from "react";
import PointsAndPolygonComponent from "./PointsAndPolygon/PointsAndPolygonComponent.jsx";
import UsStatesComponents from './usStates/UsStatesComponents.jsx'
import './App.css';

const App = () => {
  const [flag, setFlag] = useState(1);

  return (
    <div className="main-div">
      <div className="btn-div">
        <button onClick={() => setFlag(1)}>Points Map</button>
        <button onClick={() => setFlag(2)}>Us States Map</button>
      </div>
      {flag == 1 ? <UsStatesComponents />: <PointsAndPolygonComponent /> }
    </div>
  );
};

export default App;
