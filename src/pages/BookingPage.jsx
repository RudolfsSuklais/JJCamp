import React, { useEffect, useState } from "react";
import "./BookingPage.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";

function BookingPage() {
    const [totalPrice, setTotalPrice] = useState(0);
    const [adults, setAdults] = useState(0);
    const [children, setChildren] = useState(0);
    const [tents, setTents] = useState(0);
    const [camperVans, setCamperVans] = useState(0);
    const [carsInTeritory, setCarsInTeritory] = useState(0);
    const [additionalFirewood, setAdditionalFirewood] = useState(0);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [defaultPrice, setDefaultPrice] = useState(totalPrice);
    const [electricity, setElectricity] = useState(false);
    const [outdoorShower, setOutdoorShower] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        lastName: "",
        phone: "",
        email: "",
        message: "",
    });
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [counter, setCounter] = useState(10);

    const navigate = useNavigate();

    const calculateTotalPrice = () => {
        if (!startDate || !endDate) return 0;

        const start = new Date(startDate);
        const end = new Date(endDate);
        const durationInDays = (end - start) / (1000 * 60 * 60 * 24);

        if (durationInDays < 1) return 0;

        const total = totalPrice * durationInDays;

        return total;
    };

    useEffect(() => {
        const savedPrice = localStorage.getItem("totalPrice");
        if (savedPrice) setTotalPrice(Number(savedPrice));
        setAdults(Number(localStorage.getItem("adults")) || 0);
        setChildren(Number(localStorage.getItem("children")) || 0);
        setTents(Number(localStorage.getItem("tents")) || 0);
        setCamperVans(Number(localStorage.getItem("camperVans")) || 0);
        setCarsInTeritory(Number(localStorage.getItem("carsInTeritory")) || 0);
        setAdditionalFirewood(
            Number(localStorage.getItem("additionalFirewood")) || 0
        );
        setElectricity(localStorage.getItem("electricity") === "true");
        setOutdoorShower(localStorage.getItem("outdoorShower") === "true");
    }, []);

    useEffect(() => {
        if (startDate && endDate) {
            const price = calculateTotalPrice();
            setDefaultPrice(price);
        }
    }, [
        startDate,
        endDate,
        adults,
        children,
        tents,
        camperVans,
        carsInTeritory,
        additionalFirewood,
        electricity,
        outdoorShower,
    ]);

    useEffect(() => {
        let timer;
        if (isFormSubmitted && counter > 0) {
            timer = setInterval(() => setCounter((prev) => prev - 1), 1000);
        } else if (counter === 0) {
            navigate("/"); // Redirect to home after 5 seconds
        }

        return () => clearInterval(timer); // Cleanup the timer
    }, [isFormSubmitted, counter, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if all required fields are filled
        if (adults === 0) {
            toast.error(
                "Please go to the pricing page and select at least 1 adult"
            );
            return;
        }

        if (
            !formData.name ||
            !formData.lastName ||
            !formData.phone ||
            !formData.email ||
            !formData.message ||
            !startDate ||
            !endDate
        ) {
            toast.error("Please fill in all required fields.");
            return;
        }

        setLoading(true);

        const finalTotalPrice = calculateTotalPrice();

        const finalFormData = {
            ...formData,
            startDate,
            endDate,
            adults,
            children,
            tents,
            camperVans,
            carsInTeritory,
            electricity,
            outdoorShower,
            additionalFirewood,
            totalPrice: finalTotalPrice,
        };

        try {
            const response = await fetch("http://localhost:5000/send-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(finalFormData),
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(
                    responseData.message || "Error submitting form."
                );
            }

            toast.success("Your form was submitted successfully!");

            // Clear form and reset state
            localStorage.clear();
            setStartDate("");
            setEndDate("");
            setAdults(0);
            setChildren(0);
            setTents(0);
            setCamperVans(0);
            setCarsInTeritory(0);
            setElectricity(false);
            setOutdoorShower(false);
            setAdditionalFirewood(0);
            setTotalPrice(0); // Reset totalPrice state here
            setDefaultPrice(0); // Reset defaultPrice state here
            setFormData({
                name: "",
                lastName: "",
                phone: "",
                email: "",
                message: "",
            });

            setIsFormSubmitted(true);
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleChangeButton = () => {
        navigate("/pricing");
    };
    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    return (
        <div className="contact-page">
            {!isFormSubmitted ? (
                <form onSubmit={handleSubmit}>
                    <div className="contact-form-wrapper">
                        {loading ? (
                            <div className="loading-overlay">
                                <Spin size="large" />
                            </div>
                        ) : (
                            <>
                                <h1>Contact</h1>
                                <div className="contact-form-left-right-wrapper">
                                    <div className="contact-form-left">
                                        <label htmlFor="startDate">
                                            <span>*</span>Start Date:
                                        </label>
                                        <input
                                            type="date"
                                            id="startDate"
                                            name="startDate"
                                            value={startDate}
                                            min={
                                                new Date()
                                                    .toISOString()
                                                    .split("T")[0]
                                            }
                                            required
                                            onChange={handleStartDateChange}
                                            max={endDate}
                                        />
                                        <label htmlFor="endDate">
                                            <span>*</span>End Date:
                                        </label>
                                        <input
                                            type="date"
                                            id="endDate"
                                            name="endDate"
                                            value={endDate}
                                            min={
                                                startDate ||
                                                new Date()
                                                    .toISOString()
                                                    .split("T")[0]
                                            }
                                            required
                                            onChange={handleEndDateChange}
                                        />
                                        <label htmlFor="name">
                                            <span>*</span>Name:
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            placeholder="First Name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            maxLength={30}
                                        />
                                        <label htmlFor="lastName">
                                            <span>*</span>Last Name:
                                        </label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            required
                                            placeholder="Last Name"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            maxLength={30}
                                        />
                                        <label htmlFor="phone">
                                            <span>*</span>Phone:
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            required
                                            placeholder="+371 20000000"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            maxLength={12}
                                        />
                                        <label htmlFor="email">
                                            <span>*</span>Email:
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            placeholder="Email Address"
                                            value={formData.email}
                                            onChange={handleChange}
                                            maxLength={50}
                                        />
                                        <label htmlFor="message">
                                            <span>*</span>Message:
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            required
                                            placeholder="Write your questions here..."
                                            value={formData.message}
                                            onChange={handleChange}
                                            maxLength={500}></textarea>
                                    </div>
                                    <div className="contact-form-right">
                                        <label htmlFor="adults">Adults:</label>
                                        <input
                                            type="number"
                                            id="adults"
                                            name="adults"
                                            value={adults}
                                            readOnly
                                        />
                                        <label htmlFor="children">
                                            Children:
                                        </label>
                                        <input
                                            type="number"
                                            id="children"
                                            name="children"
                                            value={children}
                                            readOnly
                                        />
                                        <label htmlFor="tents">Tents:</label>
                                        <input
                                            type="number"
                                            id="tents"
                                            name="tents"
                                            value={tents}
                                            readOnly
                                        />
                                        <label htmlFor="camperVans">
                                            Camper Vans:
                                        </label>
                                        <input
                                            type="number"
                                            id="camperVans"
                                            name="camperVans"
                                            value={camperVans}
                                            readOnly
                                        />
                                        <label htmlFor="carsInTeritory">
                                            Cars in Teritory:
                                        </label>
                                        <input
                                            type="number"
                                            id="carsInTeritory"
                                            name="carsInTeritory"
                                            value={carsInTeritory}
                                            readOnly
                                        />
                                        <label htmlFor="electricity">
                                            Electricity:
                                        </label>
                                        <input
                                            type="text"
                                            id="electricity"
                                            name="electricity"
                                            value={electricity ? "Yes" : "No"}
                                            readOnly
                                        />
                                        <label htmlFor="outdoorShower">
                                            Outdoor Shower:
                                        </label>
                                        <input
                                            type="text"
                                            id="outdoorShower"
                                            name="outdoorShower"
                                            value={outdoorShower ? "Yes" : "No"}
                                            readOnly
                                        />
                                        <label htmlFor="additionalFirewood">
                                            Additional Firewood:
                                        </label>
                                        <input
                                            type="number"
                                            id="additionalFirewood"
                                            name="additionalFirewood"
                                            value={additionalFirewood}
                                            readOnly
                                        />
                                        <label htmlFor="totalPrice">
                                            Total Price:
                                        </label>
                                        <input
                                            type="text"
                                            id="totalPrice"
                                            name="totalPrice"
                                            value={`${
                                                defaultPrice || totalPrice
                                            }.00 €`}
                                            readOnly
                                        />
                                        <button
                                            className="change-button"
                                            onClick={handleChangeButton}>
                                            Change
                                        </button>
                                    </div>
                                </div>

                                <div className="contact-form-btn">
                                    <button type="submit" disabled={loading}>
                                        {loading ? "Submitting..." : "Submit"}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </form>
            ) : (
                <div className="success-message">
                    <h1>Success!</h1>
                    <p>
                        Your form has been successfully submitted.
                        Redirecting...
                    </p>
                    <p>Redirecting to home in {counter} seconds...</p>
                </div>
            )}
        </div>
    );
}

export default BookingPage;
