import React from "react";
import { SectionTitle } from "../components";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div>
      <SectionTitle title="About Us" path="Home | About" />
      <div className="about-content text-center max-w-2xl mx-auto mt-5">
      <h2 className="text-6xl text-center mb-10 max-sm:text-3xl text-accent-content">Bringing pets and people together with love</h2>
      <p className="text-lg text-center max-sm:text-sm max-sm:px-2 text-accent-content">
      At PetHive, we are dedicated to helping pets find their forever homes. Our mission is to connect loving families with adorable pets in need of adoption. With a passion for animal welfare, we work tirelessly to rescue, rehabilitate, and rehome pets of all shapes and sizes. Whether you're looking for a playful puppy, a cuddly kitten, or a loyal companion, PetHive is here
      </p>
      <Link to="/contact" className="btn btn-wide bg-blue-600 hover:bg-blue-500 text-white mt-5">Contact Us</Link>
      </div>
    </div>
  );
};

export default About;
