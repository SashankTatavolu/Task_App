import React from "react";
import "../styles/HomePage.css";
import image1 from "../images/image1.png"; // Import the image

function HomePage() {
  return (
    <div className="home-container">

      <div className="content">
        <h1>Welcome to Our Application</h1>
        <p>
          Here is a brief description of the interface. Explore the features and
          see how it can help you manage tasks efficiently.
        </p>
        <img src={image1} alt="App Preview" />
        <p>Enjoy managing tasks in an easy and organized way!</p>
      </div>
    </div>
  );
}

export default HomePage;
