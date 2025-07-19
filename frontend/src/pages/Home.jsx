import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import { useNavigate } from "react-router-dom";
import "../css/Home.css";

import products1 from "../assets/products-vertical.jpg";
import products2 from "../assets/products-horizontal.jpg";
import nutritionlabel from "../assets/nutrition-label.jpg";

function Home() {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            image: nutritionlabel,
            title: "FDA Nutrition Facts",
            description:
                "All nutritional information from USDA Food Data Central",
        },
        {
            image: products1,
            title: "Product Analysis",
            description: "Comprehensive health evaluation of food products",
        },
        {
            image: products2,
            title: "Smart Health Scoring",
            description:
                "FDA-compliant analysis based on ingredients and nutrients",
        },
    ];

    // Auto-rotate carousel
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 4000);

        return () => clearInterval(timer);
    }, [slides.length]);

    const handleLearnMoreClick = () => {
        navigate("/nutrition-info");
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <>
            <header className="hero-section">
                <h1 className="hero-title">
                    Search Any Product and Check its Health
                </h1>
                <Search variant="home" />
            </header>

            <section className="container features">
                <div className="features-title">
                    <h2 className="features-title-1">
                        Get Well-Informed On a Product's Health
                    </h2>
                    <h4 className="features-title-2">
                        and See if it Aligns with
                    </h4>
                    <h3 className="features-title-3">Your Health Goals</h3>
                </div>
            </section>

            <section className="container info">
                {/* Desktop Grid Layout */}
                <div className="info-grid">
                    <div className="a">
                        <img src={nutritionlabel} alt="Nutrition Facts Label" />
                    </div>
                    <div className="b">
                        <h4 className="info-h4">
                            All nutritional information from a reliable source
                        </h4>
                        <p>
                            All nutritional information is taken from the USDA
                            Food Data Central, from the U.S. Department of
                            Agriculture.
                        </p>
                    </div>
                    <div className="c">
                        <img src={products1} alt="Food Products Store" />
                    </div>
                    <div className="d">
                        <img src={products2} alt="Food Products Store" />
                    </div>
                    <div className="e">
                        <h4 className="info-h4">
                            How our health score is calculated
                        </h4>
                        <p className="info-p">
                            Our evaluation is based on the U.S. FDA's
                            recommendation on how to understand, use, and
                            evaluate a food product based on its nutrition facts
                            label. Here's some of the criteria we take into
                            account to determine a product's health:
                        </p>
                        <ul className="info-list">
                            <li className="info-list-item">Calories</li>
                            <li className="info-list-item">Ingredients</li>
                            <li className="info-list-item">
                                Nutrients and their Percentage of Daily Value
                            </li>
                        </ul>
                        <button
                            onClick={handleLearnMoreClick}
                            className="info-button"
                        >
                            Learn More
                        </button>
                    </div>
                </div>

                {/* Mobile Carousel Layout */}
                <div className="mobile-image-carousel">
                    <div className="carousel-container">
                        <div
                            className="carousel-track"
                            style={{
                                transform: `translateX(-${
                                    currentSlide * 100
                                }%)`,
                            }}
                        >
                            {slides.map((slide, index) => (
                                <div key={index} className="carousel-slide">
                                    <img src={slide.image} alt={slide.title} />
                                    <div className="carousel-overlay">
                                        <h4>{slide.title}</h4>
                                        <p>{slide.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="carousel-indicators">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                className={`carousel-dot ${
                                    index === currentSlide ? "active" : ""
                                }`}
                                onClick={() => goToSlide(index)}
                            />
                        ))}
                    </div>
                </div>

                {/* Mobile Text Content */}
                <div className="mobile-text-content">
                    <div className="mobile-info-section">
                        <h4>Reliable Nutritional Data</h4>
                        <p>
                            All nutritional information comes from the USDA Food
                            Data Central, the official source from the U.S.
                            Department of Agriculture.
                        </p>
                    </div>

                    <div className="mobile-info-section">
                        <h4>FDA-Compliant Health Analysis</h4>
                        <p>
                            Our evaluation follows U.S. FDA recommendations for
                            understanding and evaluating food products. We
                            analyze:
                        </p>
                        <ul>
                            <li>Calorie content per serving</li>
                            <li>First 3 ingredient quality</li>
                            <li>Essential nutrient percentages</li>
                            <li>Nutrients to limit vs. encourage</li>
                        </ul>
                        <button
                            onClick={handleLearnMoreClick}
                            className="info-button"
                        >
                            Learn More About Our Process
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;
