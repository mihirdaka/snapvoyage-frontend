// frontend/src/components/Timeline.js
import React from "react";
import Collage from "./Collage";
import "../styles/timeline.css";
function Timeline() {
  // Placeholder timeline data
  const timelineData = [
    { title: "Paris Trip", timeRange: "June 10 - June 12, 2023", location: "Paris, France" },
    { title: "Beach Day", timeRange: "July 4, 2023", location: "Malibu, CA" },
  ];

  return (
    <div className="timeline-container">
      {timelineData.map((event, index) => (
        <div key={index} className={`timeline-event ${index % 2 === 0 ? "left" : "right"}`}>
          <h3>{event.title}</h3>
          <p>{event.timeRange}</p>
          <p>{event.location}</p>
          <Collage />
        </div>
      ))}
    </div>
  );
}

export default Timeline;
