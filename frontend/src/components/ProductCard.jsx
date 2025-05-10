import React from "react";
import { createSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../css/ProductCard.css";

function ProductCard({ product }) {
    const navigate = useNavigate();
    console.log(product);

    const handleSubmit = (e) => {
        e.preventDefault();

        navigate(
            {
                pathname: "/product",
                search: `?${createSearchParams({ id: product.id })}`,
            },
            {
                state: { product }, // Use state prop from react-router-dom to pass product data as a state
            }
        );
    };
    const score = product.health_evaluation.rating;
    let healthClassName;
    switch (true) {
        case score === "Excellent":
            healthClassName = "excellent-score";
            break;
        case score === "Very Healthy":
            healthClassName = "very-healthy-score";
            break;
        case score === "Healthy":
            healthClassName = "healthy-score";
            break;
        case score === "Moderate":
            healthClassName = "moderate-score";
            break;
        case score === "Unhealthy":
            healthClassName = "unhealthy-score";
            break;
        case score === "Very Unhealthy":
            healthClassName = "very-unhealthy-score";
            break;
    }

    return (
        <div className="card" onClick={handleSubmit}>
            {/* {product.product_image.image_link && (
                <img
                    src={product.product_image.image_link}
                    alt={product.title}
                ></img>
            )} */}
            {/*alt is meta attribute for text description for the image, helpful for SEO*/}
            <div className="card-title">
                <div className="card-title-name">
                    <h3>{product.title.toLowerCase()}</h3>
                </div>
                <div className="card-title-brand">
                    <p>{product.brandOwner}</p>
                </div>
            </div>
            <div className="is-healthy">
                <h4 className={healthClassName}>
                    {product.health_evaluation.rating}
                </h4>
                <p>Click to know why</p>
            </div>
        </div>
    );
}

export default ProductCard;
