import React from "react";
import IsHealthy from "./IsHealthy";

function ProductCard({ product }) {
    return (
        <div className="product-card">
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
