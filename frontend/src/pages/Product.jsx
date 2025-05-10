// Page for showing specific product
import React from "react";
import { useLocation } from "react-router-dom"; // Hook to get product data sent as state in "Navigate"
import sample from "../assets/sample.jpg";
import NutrientTable from "../components/NutritionTable";

function Product() {
    const location = useLocation(); // Returns the current navigation action which describes how the router came to
    const { product } = location.state || {}; // Get product info

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
                    <h3> General Product Health Score</h3>
                    <h4>{product.health_evaluation.rating}</h4>
                </div>
                <div className="product-image">
                    <img src={sample} alt="product image" />
                </div>
            </section>
            <section>
                <div className="health">
                    <h3>Evaluation Analysis</h3>
                    <p>
                        All nutritional values are calculated per serving, USDA
                        calculates serving values per 100g. Values calculated
                        from %DV use current daily values for an adult 2,000
                        calorie diet
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
                                Health Services &#40;<a href="#">DSHS</a>&#41;
                                states that generally, for the amount of
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
                                health score, <a href="#">click here</a>.
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
                                    </span>
                                    Moderately processed
                                </li>
                                <li>
                                    <span className="bold-text">
                                        10+ ingredients:
                                    </span>
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
                                <a href="#">click here</a>
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
                                    </span>
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
                                        10+ ingredients: Likely ultra-processed
                                    </span>
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
