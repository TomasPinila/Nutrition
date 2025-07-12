// Page for showing specific product
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Hook to get product data sent as state in "Navigate"
import sample from "../assets/product_placeholder.png";
import NutrientTable from "../components/NutritionTable";
import "../css/Product.css";
import api from "../api";

function Product() {
    const location = useLocation(); // Returns the current navigation action which describes how the router came to
    const { product } = location.state || {}; // Get product info

    const [imageLink, setImageLink] = useState(null);
    const google_key = import.meta.env.VITE_GOOGLE_API_KEY;
    const search_engine_id = import.meta.env.VITE_GOOGLE_SEARCH_ENGINE_ID;

    // Get product image

    useEffect(() => {
        const loadImage = async (url) => {
            try {
                const product_name = product.title.toLowerCase();
                // Build array of search terms

                const terms = [
                    product.brandName || product.brandOwner,
                    product_name,
                    product.category,
                    "official",
                    "product image",
                ];

                // Join + encode
                const q = terms.join(" ");

                // 4) Build the URL with URLSearchParams
                const params = new URLSearchParams({
                    q,
                    cx: import.meta.env.VITE_GOOGLE_SEARCH_ENGINE_ID,
                    key: import.meta.env.VITE_GOOGLE_API_KEY,
                    searchType: "image",
                    num: "1",
                    imgType: "photo", // bias toward real-world photos
                    fileType: "jpg", // optional: only JPG
                    // siteSearch: "example.com", // optional: lock to a domain
                });

                const url = `https://www.googleapis.com/customsearch/v1?${params}`;
                console.log("Google Image Query:", url);
                const response = await api.get(url, { baseURL: "" });
                // baseURL: "" prevents Axios from prepending your API baseURL

                if (response.data.items && response.data.items.length > 0) {
                    setImageLink(response.data.items[0].link); // first image link
                }
            } catch (error) {
                console.error("Error fetching image:", error);
            }
        };
        if (product) loadImage();
    }, [product]);

    //Health evaluation color
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

    if (!product) {
        // case where product data is not available
        return <div>Product data not available.</div>;
    }

    return (
        <main>
            <section className="product">
                <div className="product-info">
                    <h2>{product.title.toLowerCase()}</h2>
                    <h3>{product.brandOwner}</h3>
                    <h4>{product.brandName}</h4>
                    <p>{product.marketCountry}</p>
                    <p>{product.category}</p>
                    <table className="score-table">
                        <thead>
                            <tr>
                                <th>General Health Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={healthClassName}>
                                    <h4>{product.health_evaluation.rating}</h4>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="product-image">
                    {imageLink ? (
                        <img src={imageLink} alt={product.title} />
                    ) : (
                        <img src={sample} alt="sample product image" />
                    )}
                    <p>
                        Disclaimer: Product images might not correctly reflect
                        the actual product, rely on the product information
                        instead.
                    </p>
                </div>
            </section>
            <section className="health-info">
                <div className="health">
                    <h3>Evaluation Analysis</h3>
                    <p>
                        All nutritional values are calculated per serving, USDA
                        calculates serving values per 100g. Values calculated
                        from %DV use current daily values for an adult 2,000
                        calorie diet.
                    </p>
                </div>

                <div className="health-list">
                    <div className="health-card">
                        <h2 className="health-title">Calories</h2>
                        <p className="health-content">
                            This product has {product.calories} calories, that's{" "}
                            {
                                product.health_evaluation.component_scores
                                    .calories
                            }
                            .
                        </p>
                        {/* <details> and <summary> elements for native toggle functionality.  */}
                        <details className="health-context">
                            <summary>Explanation</summary>
                            <p>
                                {/* &#40; is the HTML entity for (. &#41; is the HTML entity for ) */}
                                The Washington State Department of Social and
                                Health Services &#40;
                                <a
                                    className="anchor"
                                    target="_blank"
                                    href="https://www.dshs.wa.gov/sites/default/files/ALTSA/stakeholders/documents/duals/toolkit/Reading%20Food%20Nutrition%20Labels.pdf"
                                >
                                    DSHS
                                </a>
                                &#41; states that generally, for the amount of
                                calories in a food per 100g of serving:
                            </p>
                            <ul className="health-ul">
                                <li>
                                    40 calories per serving is considered low
                                </li>
                                <li>
                                    100 calories per serving is considered
                                    moderate
                                </li>
                                <li>
                                    400 calories or more per serving is
                                    considered high.
                                </li>
                            </ul>
                        </details>
                    </div>
                    <div className="health-card">
                        <h2 className="health-title">Ingredients</h2>
                        <p className="health-content">
                            {
                                product.health_evaluation.details.ingredients
                                    .health_advice
                            }{" "}
                        </p>
                        <p>
                            {
                                product.health_evaluation.details.ingredients
                                    .ingredient_number_recommendation
                            }
                        </p>
                        <details className="health-context">
                            <summary>Explanation</summary>
                            <p>
                                Scan first 3 ingredients, as they make up the
                                largest part of what you’re eating. If the first
                                ingredients include refined grains, a type of
                                sugar, or hydrogenated oils, you can assume that
                                the product is unhealthy. Instead, try choosing
                                items that have whole foods listed as the first
                                three ingredients.
                            </p>
                            <p>
                                If you want to check the list of refined grains,
                                sugar types, and hydrogenated oils to look out
                                for, and also the ones we use to evaluate the
                                health score,{" "}
                                <a className="anchor" href="/nutrition-info">
                                    click here
                                </a>
                                .
                            </p>
                            {/* TODO: Create Page specifying evaluation */}
                            <p>
                                Another thing to take into account is how many
                                ingredients the product has, a
                                nutritionist-approved thresholds is:
                            </p>
                            <ul className="health-ul">
                                <li>
                                    <span className="bold-text">
                                        1-5 ingredients:
                                    </span>{" "}
                                    Ideal
                                </li>
                                <li>
                                    <span className="bold-text">
                                        6-10 ingredients:
                                    </span>{" "}
                                    Moderately processed
                                </li>
                                <li>
                                    <span className="bold-text">
                                        10+ ingredients:
                                    </span>{" "}
                                    Likely ultra-processed
                                </li>
                            </ul>
                        </details>
                        <details className="health-context">
                            <summary>Product Ingredients</summary>
                            <p>{product.ingredients}</p>
                        </details>
                    </div>
                    <div className="health-card">
                        <h2 className="health-title">Nutrients</h2>
                        <p className="health-content">
                            Nutrient evaluation result:{" "}
                            <span>
                                {
                                    product.health_evaluation.details.nutrients
                                        .health_result
                                }
                            </span>
                        </p>
                        <details className="health-context">
                            <summary>Nutrient Analysis</summary>
                            <NutrientTable
                                data={
                                    product.health_evaluation.details.nutrients
                                        .nutrients_to_encourage
                                }
                                title={"Nutrients to Encourage"}
                                column_text={"Evaluation"}
                            />
                            <NutrientTable
                                data={
                                    product.health_evaluation.details.nutrients
                                        .nutrients_to_limit
                                }
                                title={"Nutrients to Limit"}
                                column_text={"Evaluation"}
                            />
                        </details>
                        <details className="health-context">
                            <summary>Explanation</summary>
                            <p>
                                We evaluate the nutrient score based on the
                                presence and amount of 'encouraged' and
                                'to-limit' nutrients in the product, as in
                                accordance with the FDA's recommendation. If you
                                want to check out the list of nutrients we take
                                into account, along with their percentage of DV,{" "}
                                <a className="anchor" href="/nutrition-info">
                                    click here
                                </a>
                                .
                            </p>
                            <p>But in a nutshell:</p>
                            <ul className="health-ul">
                                <li>
                                    <span className="bold-text">
                                        Nutrients to get less of:
                                    </span>{" "}
                                    Saturated Fat, Sodium, and Added Sugars.
                                    Eating too much saturated fat and sodium,
                                    for example, is associated with an increased
                                    risk of developing some health conditions,
                                    like cardiovascular disease and high blood
                                    pressure. Consuming too much added sugars
                                    can make it hard to meet important nutrient
                                    needs while staying within calorie limits.
                                </li>
                                <li>
                                    <span className="bold-text">
                                        Nutrients to get more of:
                                    </span>{" "}
                                    Dietary Fiber, Vitamin D, Calcium, Iron, and
                                    Potassium. Eating a diet high in dietary
                                    fiber can increase the frequency of bowel
                                    movements, lower blood glucose and
                                    cholesterol levels, and reduce calorie
                                    intake. Diets higher in vitamin D, calcium,
                                    iron, and potassium can reduce the risk of
                                    developing osteoporosis, anemia, and high
                                    blood pressure.
                                </li>
                                <li>
                                    <span className="bold-text">
                                        10+ ingredients:
                                    </span>{" "}
                                    Likely ultra-processed
                                </li>
                            </ul>
                            <p>A general guide to %DV:</p>
                            <ul className="health-ul">
                                <li>
                                    <span className="bold-text">5% DV</span> or
                                    less of a nutrient per serving is considered
                                    low
                                </li>
                                <li>
                                    <span className="bold-text">20% DV</span> or
                                    more of a nutrient per serving is considered
                                    high
                                </li>
                            </ul>
                            <p>More often than not choose foods that are</p>
                            <ul className="health-ul">
                                <li>
                                    Higher in %DV for Dietary Fiber, Vitamin D,
                                    Calcium, Iron, and Potassium, You want to
                                    get more than the 100% of DV
                                </li>
                                <li>
                                    Lower in %DV for Saturated Fat, Sodium, and
                                    Added Sugars, You want to get less than the
                                    100% of DV
                                </li>
                            </ul>
                        </details>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Product;
