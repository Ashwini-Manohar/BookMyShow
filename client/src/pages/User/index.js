
// src/pages/User/index.js
import React from "react";
import Bookings from "./Bookings"; // matches the file name exactly

function UserDashboard() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Welcome to Your Dashboard</h1>
      <Bookings />
    </div>
  );
}

export default UserDashboard;
