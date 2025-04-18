import React from "react";

function IsHealthy({ health_evaluation }) {
    /* Mapping object for is_healthy values to class names
    const healthClassMap = {
        Very: "very-healthy",
        Yes: "healthy",
        Intermediate: "intermediate",
        Avoid: "avoid",
    };

    // Get the class name based on the is_healthy value
    const healthClass = healthClassMap[is_healthy] || "default-healthy"; */

    // Use the is_healthy prop as the text to display
    const displayText = health_evaluation.rating || "Not Disclosed";

    return (
        <div className="is-healthy">
            <span className="healthClass">
                <h4 className="health-name">{displayText}</h4>
                <a>Click to know why</a>
            </span>
        </div>
    );
}

export default IsHealthy;
