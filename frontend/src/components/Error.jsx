import React from "react";
import "../css/Error.css";

function Error({ error }) {
    return <div className="error-message">{error}</div>;
}

export default Error;
