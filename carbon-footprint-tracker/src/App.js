import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "tailwindcss/tailwind.css";

const App = () => {
  const [activities, setActivities] = useState([]);
  const [activity, setActivity] = useState("");
  const [carbonValue, setCarbonValue] = useState("");

  useEffect(() => {
    console.log("Activity list updated", activities);
  }, [activities]);

  const addActivity = () => {
    if (activity && carbonValue) {
      setActivities([...activities, { activity, carbonValue: Number(carbonValue) }]);
      setActivity("");
      setCarbonValue("");
    }
  };

  const totalCarbon = activities.reduce((sum, act) => sum + act.carbonValue, 0);

  const data = {
    labels: activities.map((act) => act.activity),
    datasets: [
      {
        label: "Carbon Footprint (kg CO2)",
        data: activities.map((act) => act.carbonValue),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Carbon Footprint Tracker</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Activity"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          className="p-2 border rounded mr-2"
        />
        <input
          type="number"
          placeholder="Carbon Value (kg CO2)"
          value={carbonValue}
          onChange={(e) => setCarbonValue(e.target.value)}
          className="p-2 border rounded mr-2"
        />
        <button
          onClick={addActivity}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Activity
        </button>
      </div>
      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-lg font-semibold">Total Carbon Footprint: {totalCarbon} kg CO2</h2>
        <Bar data={data} />
      </div>
    </div>
  );
};

export default App;
