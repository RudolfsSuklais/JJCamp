import React from "react";
import "./About.css";
import { useNavigate } from "react-router-dom";

function AboutPage() {
    const navigate = useNavigate();

    const handleBookNow = () => {
        navigate("/booking");
    };

    return (
        <div className="aboutPage">
            {/* Hero Section */}
            <section className="aboutHero">
                <div className="heroContent">
                    <h1>About Jūrmalciems Camping</h1>
                    <p>
                        Discover the story behind our passion for nature and
                        hospitality.
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="aboutMission">
                <div className="missionContent">
                    <h2>Our Mission</h2>
                    <p>
                        At Jūrmalciems Camping, we strive to provide a serene
                        and eco-friendly retreat where guests can reconnect with
                        nature. Our mission is to create unforgettable
                        experiences while preserving the beauty of the Baltic
                        Sea coastline.
                    </p>
                </div>
            </section>

            {/* Team Section */}
            <section className="aboutTeam">
                <h2>Meet Our Team</h2>
                <div className="teamMembers">
                    <div className="teamCard">
                        <div className="teamImage"></div>
                        <h3>John Doe</h3>
                        <p>Founder & CEO</p>
                    </div>
                    <div className="teamCard">
                        <div className="teamImage"></div>
                        <h3>Jane Smith</h3>
                        <p>Operations Manager</p>
                    </div>
                    <div className="teamCard">
                        <div className="teamImage"></div>
                        <h3>Emily Brown</h3>
                        <p>Guest Relations</p>
                    </div>
                </div>
            </section>

            {/* Call-to-Action Section */}
            <section className="aboutCTA">
                <h2>Join Us for an Unforgettable Experience</h2>
                <p>
                    Book your stay today and immerse yourself in the beauty of
                    nature.
                </p>
                <button onClick={handleBookNow}>Book Now</button>
            </section>
        </div>
    );
}

export default AboutPage;
