import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function PricingPage() {
    const [totalPrice, setTotalPrice] = useState(
        localStorage.getItem("totalPrice") || 0
    );
    const [adults, setAdults] = useState(localStorage.getItem("adults") || 0);
    const [children, setChildren] = useState(
        localStorage.getItem("children") || 0
    );
    const [tents, setTents] = useState(localStorage.getItem("tents") || 0);
    const [camperVans, setCamperVans] = useState(
        localStorage.getItem("camperVans") || 0
    );
    const [carsInTeritory, setCarsInTeritory] = useState(
        localStorage.getItem("carsInTeritory") || 0
    );
    const [additionalFirewood, setAdditionalFirewood] = useState(
        localStorage.getItem("additionalFirewood") || 0
    );
    const [carTrailer, setCarTrailer] = useState(
        localStorage.getItem("carTrailer") || 0
    );
    const [isElectricityChecked, setIsElectricityChecked] = useState(
        localStorage.getItem("electricity") === "true"
    );
    const [isOutdoorShowerChecked, setIsOutdoorShowerChecked] = useState(
        localStorage.getItem("outdoorShower") === "true"
    );

    const ADULT_PRICE = 7;
    const CHILD_PRICE = 4;
    const TENT_PRICE = 3;
    const CAMPER_VAN_PRICE = 5;
    const CAR_PRICE = 3;
    const CAR_TRAILER_PRICE = 9;
    const FIREWOOD_PRICE = 5;
    const ELECTRICITY_PRICE = 6;
    const OUTDOOR_SHOWER_PRICE = 2;

    const navigate = useNavigate();

    useEffect(() => {
        const savedPrice = localStorage.getItem("totalPrice");
        if (savedPrice) {
            setTotalPrice(Number(savedPrice));
        }
        const adults = localStorage.getItem("adults");
        if (adults) {
            setAdults(Number(adults));
        }
        const children = localStorage.getItem("children");
        if (children) {
            setChildren(Number(children));
        }
        const tents = localStorage.getItem("tents");
        if (tents) {
            setTents(Number(tents));
        }
        const camperVans = localStorage.getItem("camperVans");
        if (camperVans) {
            setCamperVans(Number(camperVans));
        }
        const carTrailer = localStorage.getItem("carTrailer");
        if (carTrailer) {
            setCarTrailer(Number(carTrailer));
        }
        const carsInTeritory = localStorage.getItem("carsInTeritory");
        if (carsInTeritory) {
            setCarsInTeritory(Number(carsInTeritory));
        }
        const firewood = localStorage.getItem("additionalFirewood");
        if (firewood) {
            setAdditionalFirewood(Number(firewood));
        }
        const electricity = localStorage.getItem("electricity");
        if (electricity) {
            setIsElectricityChecked(electricity === "true");
        }
        const outdoorShower = localStorage.getItem("outdoorShower");
        if (outdoorShower) {
            setIsOutdoorShowerChecked(outdoorShower === "true");
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("totalPrice", totalPrice);
        localStorage.setItem("adults", adults);
        localStorage.setItem("children", children);
        localStorage.setItem("tents", tents);
        localStorage.setItem("camperVans", camperVans);
        localStorage.setItem("carsInTeritory", carsInTeritory);
        localStorage.setItem("additionalFirewood", additionalFirewood);
        localStorage.setItem("carTrailer", carTrailer);
        localStorage.setItem("electricity", isElectricityChecked);
        localStorage.setItem("outdoorShower", isOutdoorShowerChecked);
    }, [
        totalPrice,
        adults,
        children,
        tents,
        camperVans,
        carsInTeritory,
        additionalFirewood,
        carTrailer,
        isElectricityChecked,
        isOutdoorShowerChecked,
    ]);

    const updatePrice = (type, change) => {
        let priceChange = 0;
        switch (type) {
            case "adults":
                setAdults((prev) => prev + change);
                priceChange = change * ADULT_PRICE;
                break;
            case "children":
                setChildren((prev) => prev + change);
                priceChange = change * CHILD_PRICE;
                break;
            case "tents":
                setTents((prev) => prev + change);
                priceChange = change * TENT_PRICE;
                break;
            case "camperVans":
                setCamperVans((prev) => prev + change);
                priceChange = change * CAMPER_VAN_PRICE;
                break;
            case "carTrailer":
                setCarTrailer((prev) => prev + change);
                priceChange = change * CAR_TRAILER_PRICE;
                break;
            case "carsInTeritory":
                setCarsInTeritory((prev) => prev + change);
                priceChange = change * CAR_PRICE;
                break;
            case "additionalFirewood":
                setAdditionalFirewood((prev) => prev + change);
                priceChange = change * FIREWOOD_PRICE;
                break;
            default:
                break;
        }
        setTotalPrice((prev) => prev + priceChange);
    };

    const handleElectricityChange = () => {
        setIsElectricityChecked((prev) => {
            const newCheckedState = !prev;
            setTotalPrice((prevTotal) =>
                newCheckedState
                    ? prevTotal + ELECTRICITY_PRICE
                    : prevTotal - ELECTRICITY_PRICE
            );
            return newCheckedState;
        });
    };

    const handleOutdoorShowerChange = () => {
        setIsOutdoorShowerChecked((prev) => {
            const newCheckedState = !prev;
            setTotalPrice((prevTotal) =>
                newCheckedState
                    ? prevTotal + OUTDOOR_SHOWER_PRICE
                    : prevTotal - OUTDOOR_SHOWER_PRICE
            );
            return newCheckedState;
        });
    };

    const handleSubmit = (e) => {
        if (adults === 0) {
            toast.error("Please select at least 1 adult");
            return;
        }
        e.preventDefault();
        navigate("/booking");
    };

    return (
        <>
            <div className="pricingPage">
                <section className="pricingPageCalc">
                    <div className="pricingPageCardCalc">
                        <div className="pricingCard">
                            <h2>Pricing</h2>
                            <div className="pricingCardHeading"></div>
                            <div className="pricingCardAmount">
                                <div className="amountWrapper">
                                    <h4>
                                        <i class="fa-solid fa-person"></i>
                                        &nbsp;Adults:
                                    </h4>
                                    <div className="amount">
                                        <button
                                            onClick={() =>
                                                adults > 0 &&
                                                updatePrice("adults", -1)
                                            }>
                                            -
                                        </button>
                                        <p>{adults}</p>
                                        <button
                                            onClick={() =>
                                                updatePrice("adults", 1)
                                            }>
                                            +
                                        </button>
                                    </div>
                                </div>
                                <hr />
                                <div className="amountWrapper">
                                    <h4>
                                        <i class="fa-solid fa-child-reaching"></i>
                                        &nbsp;Children:
                                    </h4>
                                    <div className="amount">
                                        <button
                                            onClick={() =>
                                                children > 0 &&
                                                updatePrice("children", -1)
                                            }>
                                            -
                                        </button>
                                        <p>{children}</p>
                                        <button
                                            onClick={() =>
                                                updatePrice("children", 1)
                                            }>
                                            +
                                        </button>
                                    </div>
                                </div>
                                <hr />
                                <div className="amountWrapper">
                                    <h4>
                                        <i class="fa-solid fa-tent"></i>
                                        &nbsp;Tents:
                                    </h4>
                                    <div className="amount">
                                        <button
                                            onClick={() =>
                                                tents > 0 &&
                                                updatePrice("tents", -1)
                                            }>
                                            -
                                        </button>
                                        <p>{tents}</p>
                                        <button
                                            onClick={() =>
                                                updatePrice("tents", 1)
                                            }>
                                            +
                                        </button>
                                    </div>
                                </div>
                                <hr />
                                <div className="amountWrapper">
                                    <h4>
                                        <i class="fa-solid fa-car"></i>&nbsp;Car
                                        in teritory:
                                    </h4>
                                    <div className="amount">
                                        <button
                                            onClick={() =>
                                                carsInTeritory > 0 &&
                                                updatePrice(
                                                    "carsInTeritory",
                                                    -1
                                                )
                                            }>
                                            -
                                        </button>
                                        <p>{carsInTeritory}</p>
                                        <button
                                            onClick={() =>
                                                updatePrice("carsInTeritory", 1)
                                            }>
                                            +
                                        </button>
                                    </div>
                                </div>
                                <hr />
                                <div className="amountWrapper">
                                    <h4>
                                        <i class="fa-solid fa-caravan"></i>
                                        &nbsp;Camper vans:
                                    </h4>
                                    <div className="amount">
                                        <button
                                            onClick={() =>
                                                camperVans > 0 &&
                                                updatePrice("camperVans", -1)
                                            }>
                                            -
                                        </button>
                                        <p>{camperVans}</p>
                                        <button
                                            onClick={() =>
                                                updatePrice("camperVans", 1)
                                            }>
                                            +
                                        </button>
                                    </div>
                                </div>
                                <hr />
                                <div className="amountWrapper">
                                    <h4>
                                        <i class="fa-solid fa-trailer"></i>
                                        &nbsp; Car + Trailer:
                                    </h4>
                                    <div className="amount">
                                        <button
                                            onClick={() =>
                                                carTrailer > 0 &&
                                                updatePrice("carTrailer", -1)
                                            }>
                                            -
                                        </button>
                                        <p>{carTrailer}</p>
                                        <button
                                            onClick={() =>
                                                updatePrice("carTrailer", 1)
                                            }>
                                            +
                                        </button>
                                    </div>
                                </div>
                                <hr />
                                <div className="amountWrapper electric">
                                    <h4>
                                        <i class="fa-solid fa-bolt"></i>
                                        &nbsp;Electricity:
                                    </h4>
                                    <div className="amount">
                                        <input
                                            type="checkbox"
                                            checked={isElectricityChecked}
                                            onChange={handleElectricityChange}
                                        />
                                    </div>
                                </div>
                                <hr />
                                <div className="amountWrapper electric">
                                    <h4>
                                        <i class="fa-solid fa-shower"></i>
                                        &nbsp;Outdoor Shower:
                                    </h4>
                                    <div className="amount">
                                        <input
                                            type="checkbox"
                                            checked={isOutdoorShowerChecked}
                                            onChange={handleOutdoorShowerChange}
                                        />
                                    </div>
                                </div>
                                <hr />

                                <div className="amountWrapper">
                                    <h4>
                                        <i class="fa-solid fa-tree"></i>&nbsp;
                                        Additional firewood:
                                    </h4>
                                    <div className="amount">
                                        <button
                                            onClick={() =>
                                                additionalFirewood > 0 &&
                                                updatePrice(
                                                    "additionalFirewood",
                                                    -1
                                                )
                                            }>
                                            -
                                        </button>
                                        <p>{additionalFirewood}</p>
                                        <button
                                            onClick={() =>
                                                updatePrice(
                                                    "additionalFirewood",
                                                    1
                                                )
                                            }>
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <p className="totalPrice">
                                Total Price Per Night:{" "}
                                <span>{totalPrice} €</span>
                            </p>
                            <div className="pricingPageBtn">
                                <button onClick={handleSubmit}>Book Now</button>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="pricing-table">
                    <div className="pricing-table-wrapper">
                        <h2>{`Pricing Table (per night)`}</h2>
                        <ul>
                            <li>
                                <i class="fa-solid fa-person"></i>&nbsp; Adults:
                                <span>7€</span>
                            </li>
                            <li>
                                <i class="fa-solid fa-child-reaching"></i>&nbsp;
                                Children up to 10 years old: <span>4€</span>
                            </li>
                            <li>
                                <i class="fa-solid fa-tent"></i>&nbsp; Tent
                                place: <span>3€</span>
                            </li>
                            <li>
                                <i class="fa-solid fa-car"></i>&nbsp; Car in
                                territory: <span>3€</span>
                            </li>
                            <li>
                                <i class="fa-solid fa-caravan"></i>&nbsp; Camper
                                Van: <span>5€</span>
                            </li>
                            <li>
                                <i class="fa-solid fa-trailer"></i>&nbsp; Car +
                                Trailer: <span>9€</span>
                            </li>
                            <li>
                                <i class="fa-solid fa-bolt"></i>&nbsp;
                                Electricity: <span>6€</span>
                            </li>
                            <li>
                                <i class="fa-solid fa-shower"></i>&nbsp; Outdoor
                                Shower: <span>2€</span>
                            </li>
                            <li>
                                <i class="fa-solid fa-tree"></i>&nbsp;
                                Additional Firewood: <span>5€</span>
                            </li>
                        </ul>
                        <hr />
                        <div className="please-note">
                            <h3>Please note:</h3>
                            <ul>
                                <li>
                                    Additional firewood is a 30L bag of firewood
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default PricingPage;
