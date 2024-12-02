import React from "react";
import Collage from "./Collage";
import "../styles/timeline.css";

function Timeline({ events }) {
  return (
    <div className="timeline-container">
      <div className="timeline-line"></div> {/* Vertical line */}
      {events.map((event, index) => (
        <div
          key={index}
          className={`timeline-event ${index % 2 === 0 ? "left" : "right"}`}
        >
          <div className="event-content">
            <h3>{event.story}</h3>
            <p>
              {new Date(event.dateFrom).toLocaleDateString()} -{" "}
              {new Date(event.dateTo).toLocaleDateString()}
            </p>
            <Collage images={event.images} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Timeline;
