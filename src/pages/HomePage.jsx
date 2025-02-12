import React, { useState } from "react";
import "../index.css";
import { Link } from "react-router-dom";

function HomePage() {
    return (
        <div className="homePage">
            <div className="homePageContent">
                <h1>Jūrmalciems Camping</h1>
                <h2>Relax by the Baltic Sea in nature's embrace</h2>
                <div className="homePageBtn">
                    <Link to="/pricing">
                        <button>Book Now</button>
                    </Link>
                </div>
            </div>

            <section className="home-page-video-section">
                <h1>Discover Our Campsite through Video</h1>
                <div className="home-page-video">
                    <video
                        src="https://res.cloudinary.com/dq3svbwy6/video/upload/v1739300998/JJvideo_ejulst.mp4"
                        autoPlay
                        loop
                        muted
                        controlsList="nodownload"
                        playsInline
                    />
                </div>
            </section>

            <section className="home-page-image-section">
                <h2>Explore Our Campsite</h2>
                <div className="image-gallery">
                    <div className="gallery-item">
                        <img
                            src="https://res.cloudinary.com/dq3svbwy6/image/upload/v1739300132/image1_htyjgf.jpg"
                            alt="Campsite Image 1"
                        />
                        <div className="overlay">
                            <p>Comfortable Amenities</p>
                        </div>
                    </div>
                    <div className="gallery-item">
                        <img
                            src="https://res.cloudinary.com/dq3svbwy6/image/upload/v1739300132/image2_tsin4r.jpg"
                            alt="Campsite Image 2"
                        />
                        <div className="overlay">
                            <p>Scenic Views</p>
                        </div>
                    </div>
                    <div className="gallery-item">
                        <img
                            src="https://res.cloudinary.com/dq3svbwy6/image/upload/v1739300132/image3_mwn113.jpg"
                            alt="Campsite Image 3"
                        />
                        <div className="overlay">
                            <p>Family Fun</p>
                        </div>
                    </div>
                    <div className="gallery-item">
                        <img
                            src="https://res.cloudinary.com/dq3svbwy6/image/upload/v1739300132/image4_pg8izf.jpg"
                            alt="Campsite Image 4"
                        />
                        <div className="overlay">
                            <p>Eco-Friendly</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="homePageWhy">
                <div className="homePageWhyHeading">
                    <h2>Why Choose Jūrmalciems Camping?</h2>
                </div>
                <div className="homePageWhyContent">
                    <div className="homePageWhyCardWrapper">
                        <div className="homePageWhyCard">
                            <i className="fa-solid fa-umbrella-beach"></i>
                            <br />
                            <h3>Scenic views of the Baltic Sea</h3>
                            <p>
                                Enjoy stunning views of the Baltic Sea, with
                                serene horizons and beautiful sunsets, offering
                                a peaceful escape surrounded by nature.
                            </p>
                        </div>

                        <div className="homePageWhyCard">
                            <i className="fa-solid fa-campground"></i>
                            <br />
                            <h3>Comfortable camping amenities</h3>
                            <p>
                                We offer comfortable amenities, including tents,
                                cabins, and RV spaces, ensuring a relaxing stay
                                for every type of camper.
                            </p>
                        </div>

                        <div className="homePageWhyCard">
                            <i className="fa-solid fa-people-group"></i>
                            <br />
                            <h3>Family-friendly environment</h3>
                            <p>
                                Our campsite provides a family-friendly
                                environment, perfect for creating lasting
                                memories with loved ones.
                            </p>
                        </div>

                        <div className="homePageWhyCard">
                            <i className="fa-solid fa-leaf"></i>
                            <br />
                            <h3>Eco-friendly practices</h3>
                            <p>
                                We prioritize eco-friendly practices, ensuring a
                                sustainable and environmentally-conscious
                                camping experience for all our guests.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="homePageWhere">
                <h2>Where to Find Us?</h2>
                <div className="locationContent">
                    <div className="locationMap">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2212.7483300187732!2d20.98174507620335!3d56.316916548401586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46fab15cb806a1cd%3A0x31848bcf252beba7!2sCamping%20Jurmalciems%20Jekabi!5e0!3m2!1sen!2slv!4v1739277767273!5m2!1sen!2slv"
                            width="100%"
                            height="620"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            title="Jūrmalciems Camping Location"></iframe>
                    </div>
                    <div className="locationDetails">
                        <div className="locationCard">
                            <i className="fa-solid fa-location-dot"></i>
                            <h3>Address</h3>
                            <p>Jūrmalciems, Latvia</p>
                            <p>Near the Baltic Sea Coast</p>
                        </div>
                        <div className="locationCard">
                            <i className="fa-solid fa-phone"></i>
                            <h3>Contact Us</h3>
                            <p>Phone: +371 20 510 502</p>
                            <p>Email: info@jekabi.com</p>
                        </div>
                        <div className="locationCard">
                            <i className="fa-solid fa-clock"></i>
                            <h3>Opening Hours</h3>
                            <p>Open All Year Round</p>
                            <p>24/7 Reception</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default HomePage;
