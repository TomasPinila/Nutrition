import React from "react";
import IsHealthy from "./IsHealthy";
import { createSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
    const navigate = useNavigate();

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

    return (
        <div className="product-card" onClick={handleSubmit}>
            {/*TODO: idk get product picture from somewhere
            <img src={""} alt={product.title}></img>{" "}
            */}
            {/*alt is meta attribute for text description for the image, helpful for SEO*/}
            <a>
                <h3>{product.title}</h3>
                <p>{product.brandOwner}</p>
            </a>
            <IsHealthy
                health_evaluation={product.health_evaluation}
                url={"hello"}
            />
        </div>
    );
}

export default ProductCard;
