// For non-registered users too, Home is where the search functionality for products will be located
import React from "react";
import Search from "../components/Search";
import "../css/Home.css";

import products1 from "../assets/products-vertical.jpg";
import products2 from "../assets/products-horizontal.jpg";
import nutritionlabel from "../assets/nutrition-label.jpg";

function Home() {
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
                <div className="info-grid">
                    <div className="a">
                        <img src={nutritionlabel} alt="Food Products Store" />
                    </div>
                    <div className="b">
                        <h4 className="info-h4">
                            All nutritional information from a reliable source
                        </h4>
                        <p>
                            All nutritional information is taken from the USDA
                            Food Data Cental, from the U.S. Department of
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
                        {/* TODO: Create Page specifying evaluation */}
                        <button href="#" className="info-button">
                            Learn More
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;
