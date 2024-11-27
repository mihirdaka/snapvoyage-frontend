// frontend/src/components/Dashboard.js
// import React from "react";
import Timeline from "./Timeline";
import '../styles/dashboard.css';

// function Dashboard() {
//   return (
//     <div className="dashboard-container">
//       <h1>Snapvoyage!</h1>
//       <Timeline />
//     </div>
//   );
// }

// export default Dashboard;


import React, { useEffect, useState } from 'react';

const Dashboard = () => {
    const [boards, setBoards] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBoards = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/pinterest/fetchAllPins', {
                    credentials: 'include', // Send cookies with the request
                    
                });
                // console.log(response);
                if (!response.ok) throw new Error('Failed to fetch boards');
                const data = await response.json();
                setBoards(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchBoards();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Your Pinterest Boards</h1>
            <ul>
                {boards.map((board) => (
                    <li key={board.id}>{board.name}</li>
                ))}
            </ul>
      <Timeline />

        </div>
    );
};

export default Dashboard;
