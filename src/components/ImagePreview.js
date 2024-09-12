import React from "react";

const ImagePreview = ({ image }) => {
  return (
    image && typeof image === "string" && (
      <div>
        <img src={image} alt="Current" style={{ width: "100px", marginTop: "10px" }} />
        <p>Current image will be used if no new image is selected.</p>
      </div>
    )
  );
};

export default ImagePreview;
