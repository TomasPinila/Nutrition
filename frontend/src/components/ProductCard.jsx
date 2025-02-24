import React from "react";
import IsHealthy from "./IsHealthy";

function ProductCard({ product }) {
    return (
        <div className="product-card">
            <img scr={""} alt={product.title}></img>{" "}
            {/*alt is meta attribute for text description for the image, helpful for SEO*/}
            <a>
                <h3>{product.title}</h3>
                <p>{product.description}</p>
            </a>
            <IsHealthy is_healthy={product.health} url={product.url} />
        </div>
    );
}

export default ProductCard;
