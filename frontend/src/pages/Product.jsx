// Page for showing specific product
import React from "react";
import { useLocation } from "react-router-dom"; // Hook to get product data sent as state in "Navigate"

function Product() {
    const location = useLocation();
    const { product } = location.state || {}; // Get product info

    if (!product) {
        // case where product data is not available
        return <div>Product data not available.</div>;
    }

    return (
        <main>
            <h2>{product.title}</h2>
            <h3>{product.brandOwner}</h3>
            <h4>{product.brandName}</h4>
            <section>
                <p>{product.ingredients}</p>
                <p>{product.marketCountry}</p>
                <p>{product.category}</p>
            </section>
            <section>
                <h5>Health evaluation</h5>
                <ul>
                    <li>{product.health_evaluation.rating}</li>
                    <li>
                        This product has {product.calories} calories, that is{" "}
                        {product.health_evaluation.component_scores.calories}.
                    </li>
                    <li>
                        {
                            product.health_evaluation.details.ingredients
                                .health_advice
                        }
                    </li>
                    <li>
                        {
                            product.health_evaluation.details.ingredients
                                .ingredient_number_recommendation
                        }
                    </li>
                    <li>
                        Nutrient result:{" "}
                        {
                            product.health_evaluation.details.nutrients
                                .health_result
                        }
                    </li>
                </ul>
            </section>
        </main>
    );
}

export default Product;
