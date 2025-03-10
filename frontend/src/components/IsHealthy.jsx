import React from "react";
import { Link } from "react-router-dom";

function IsHealthy({ is_healthy, url }) {
    // Mapping object for is_healthy values to class names
    const healthClassMap = {
        Very: "very-healthy",
        Yes: "healthy",
        Intermediate: "intermediate",
        Avoid: "avoid",
    };

    // Get the class name based on the is_healthy value
    const healthClass = healthClassMap[is_healthy] || "default-healthy";

    // Use the is_healthy prop as the text to display
    const displayText = is_healthy || "Not Disclosed";

    return (
        <div className="is-healthy">
            <a className={healthClass}>
                <h4 className="health-name">{displayText}</h4>
                {/*TODO: link to specific page*/}
                <Link to={`${url}`} className="product-link">
                    Wanna know why?
                </Link>
            </a>
        </div>
    );
}

export default IsHealthy;
