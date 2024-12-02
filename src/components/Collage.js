import React from "react";
import "../styles/collage.css";

function Collage({ images }) {
  const imageCount = images.length;

  // Determine the class based on the number of images
  let collageClass = "collage-container";
  if (imageCount === 1) {
    collageClass += " single-image"; // Only one image
  } else if (imageCount >= 2 && imageCount <= 5) {
    collageClass += " multiple-images"; // 2 to 5 images
  } else {
    collageClass += " large-collage"; // More than 5 images
  }

  return (
    <div className={collageClass}>
      {images.map((url, index) => (
        <img
          key={index}
          src={url}
          alt={`Event Collage ${index}`}
          className="collage-image"
        />
      ))}
    </div>
  );
}

export default Collage;
