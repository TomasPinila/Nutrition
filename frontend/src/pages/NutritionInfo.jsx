import React from "react";
import NutrientTable from "../components/NutritionTable";
import "../css/NutritionInfo.css";

function NutritionInfo() {
    // Ingredients data (no DV values needed)
    const refinedGrainsData = [
        {
            name: "Enriched Flour",
            evaluation: "Processed flour with nutrients added back",
        },
        { name: "White Flour", evaluation: "Refined wheat flour" },
        {
            name: "Wheat Flour",
            evaluation: "General wheat flour (often refined)",
        },
        {
            name: "All-Purpose Flour",
            evaluation: "Refined flour for general use",
        },
        { name: "Corn Flour", evaluation: "Processed corn flour" },
        { name: "Rice Flour", evaluation: "Processed rice flour" },
        {
            name: "Degerminated Cornmeal",
            evaluation: "Cornmeal with germ removed",
        },
        { name: "Bread Flour", evaluation: "High-protein refined flour" },
        { name: "Pastry Flour", evaluation: "Low-protein refined flour" },
        { name: "Cake Flour", evaluation: "Very fine refined flour" },
        {
            name: "Self-Rising Flour",
            evaluation: "Refined flour with leavening agents",
        },
        { name: "Semolina", evaluation: "Refined durum wheat flour" },
        { name: "Durum Flour", evaluation: "Refined durum wheat flour" },
        {
            name: "Unbleached Flour",
            evaluation: "Refined but not chemically bleached",
        },
        {
            name: "Bleached Flour",
            evaluation: "Chemically whitened refined flour",
        },
        { name: "White Rice", evaluation: "Polished rice with bran removed" },
        { name: "Corn Grits", evaluation: "Coarsely ground corn" },
    ];

    const sugarTypesData = [
        { name: "Sugar", evaluation: "Common table sugar" },
        { name: "Refined Sugar", evaluation: "Processed white sugar" },
        {
            name: "High Fructose Corn Syrup",
            evaluation: "Processed corn sweetener, widely used",
        },
        { name: "Brown Sugar", evaluation: "Sugar with molasses added" },
        { name: "Cane Sugar", evaluation: "Sugar extracted from sugar cane" },
        {
            name: "Honey",
            evaluation: "Natural sweetener, still counts as added sugar",
        },
        {
            name: "Agave Nectar",
            evaluation: "High fructose plant-based sweetener",
        },
        { name: "Maple Syrup", evaluation: "Natural tree sap sweetener" },
        { name: "Molasses", evaluation: "Byproduct of sugar refining" },
        { name: "Corn Syrup", evaluation: "Liquid sweetener from corn" },
        { name: "Fructose", evaluation: "Fruit sugar, often processed" },
        { name: "Glucose", evaluation: "Simple sugar" },
        { name: "Maltose", evaluation: "Malt sugar" },
        { name: "Dextrose", evaluation: "Another name for glucose" },
        { name: "Coconut Sugar", evaluation: "Sugar from coconut palm sap" },
        { name: "Date Sugar", evaluation: "Ground dried dates" },
        { name: "Evaporated Cane Juice", evaluation: "Processed cane sugar" },
    ];

    const hydrogenatedOilsData = [
        {
            name: "Hydrogenated Oil",
            evaluation: "Oil processed to be solid, contains trans fats",
        },
        {
            name: "Partially Hydrogenated Oil",
            evaluation: "Major source of artificial trans fats",
        },
        {
            name: "Hydrogenated Vegetable Oil",
            evaluation: "Processed vegetable oil with trans fats",
        },
        { name: "Hydrogenated Palm Oil", evaluation: "Processed palm oil" },
        {
            name: "Hydrogenated Soybean Oil",
            evaluation: "Processed soybean oil with trans fats",
        },
    ];

    // Nutrients data with DV amounts and split goal/benefit (from DAILY_VALUES_G in nutrition.py)
    const nutrientsToEncourageData = [
        {
            name: "Dietary Fiber",
            percentDailyValue: "28g",
            evaluation:
                "At least | Supports digestive health, controls blood sugar",
        },
        {
            name: "Calcium",
            percentDailyValue: "1.3g",
            evaluation: "At least | Essential for bone and teeth health",
        },
        {
            name: "Iron",
            percentDailyValue: "0.018g",
            evaluation: "At least | Prevents anemia, supports oxygen transport",
        },
        {
            name: "Potassium",
            percentDailyValue: "4.7g",
            evaluation:
                "At least | Regulates blood pressure, supports heart health",
        },
        {
            name: "Vitamin D",
            percentDailyValue: "0.00002g",
            evaluation: "At least | Supports bone health and immune function",
        },
        {
            name: "Vitamin A",
            percentDailyValue: "N/A",
            evaluation: "At least | Supports vision and immune system",
        },
    ];

    const nutrientsToLimitData = [
        {
            name: "Saturated Fat",
            percentDailyValue: "20g",
            evaluation: "Less than | Linked to cardiovascular disease",
        },
        {
            name: "Trans Fat",
            percentDailyValue: "2g",
            evaluation:
                "Less than | Raises LDL (bad) cholesterol, increases heart disease risk",
        },
        {
            name: "Sodium",
            percentDailyValue: "2.3g",
            evaluation: "Less than | Linked to high blood pressure",
        },
        {
            name: "Added Sugars",
            percentDailyValue: "50g",
            evaluation: "Less than | Contributes to tooth decay, weight gain",
        },
        {
            name: "Cholesterol",
            percentDailyValue: "0.3g",
            evaluation: "Less than | May contribute to heart disease",
        },
    ];

    return (
        <main className="nutrition-info-container">
            <section className="nutrition-hero">
                <h1 className="nutrition-title">Nutrition Facts Guide</h1>
                <p className="nutrition-subtitle">
                    Understanding the ingredients and nutrients we analyze based
                    on FDA Nutrition Facts Label guidelines
                </p>
            </section>

            <section className="nutrition-content">
                <div className="nutrition-section">
                    <h2 className="section-title">
                        Ingredients to Watch in First 3 Positions
                    </h2>
                    <p className="section-description">
                        According to FDA guidelines, ingredients are listed by
                        weight from most to least. The first three ingredients
                        make up the largest part of what you're eating. If these
                        include refined grains, added sugars, or hydrogenated
                        oils, the product may be highly processed.
                    </p>

                    <div className="ingredients-grid">
                        <div className="ingredient-category">
                            <h3 className="category-title">Refined Grains</h3>
                            <p className="category-description">
                                Grains processed to remove bran and germ,
                                reducing fiber, iron, and B vitamins. Look for
                                "whole grain" alternatives instead.
                            </p>
                            <NutrientTable
                                data={refinedGrainsData}
                                title="Refined Grains to Watch For"
                                column_text="Description"
                                showDV={false}
                                splitColumns={false}
                            />
                        </div>

                        <div className="ingredient-category">
                            <h3 className="category-title">Added Sugars</h3>
                            <p className="category-description">
                                Sugars and syrups added during processing. The
                                FDA recommends limiting added sugars to less
                                than 10% of daily calories (50g on a
                                2,000-calorie diet).
                            </p>
                            <NutrientTable
                                data={sugarTypesData}
                                title="Common Added Sugar Types"
                                column_text="Description"
                                showDV={false}
                                splitColumns={false}
                            />
                        </div>

                        <div className="ingredient-category">
                            <h3 className="category-title">
                                Hydrogenated Oils
                            </h3>
                            <p className="category-description">
                                Oils processed to be solid at room temperature.
                                Partially hydrogenated oils are the primary
                                source of artificial trans fats, which the FDA
                                has determined are not safe.
                            </p>
                            <NutrientTable
                                data={hydrogenatedOilsData}
                                title="Hydrogenated Oils to Avoid"
                                column_text="Health Impact"
                                showDV={false}
                                splitColumns={false}
                            />
                        </div>
                    </div>
                </div>

                <div className="nutrition-section">
                    <h2 className="section-title">
                        Understanding Nutrients on Nutrition Facts Labels
                    </h2>
                    <p className="section-description">
                        The FDA identifies key nutrients to focus on. Use the
                        %Daily Value (%DV) to determine if a serving is high or
                        low in a nutrient and to compare similar foods.
                    </p>

                    <div className="nutrients-grid">
                        <div className="nutrient-category encourage">
                            <h3 className="category-title">
                                Nutrients to Get More Of
                            </h3>
                            <p className="category-description">
                                Americans generally don't get enough of these
                                nutrients. Choose foods higher in these
                                nutrients.
                            </p>
                            <NutrientTable
                                data={nutrientsToEncourageData}
                                title="Nutrients to Encourage"
                                showDV={true}
                                splitColumns={true}
                            />
                        </div>

                        <div className="nutrient-category limit">
                            <h3 className="category-title">
                                Nutrients to Get Less Of
                            </h3>
                            <p className="category-description">
                                Americans generally consume too much of these
                                nutrients. Choose foods lower in these
                                nutrients.
                            </p>
                            <NutrientTable
                                data={nutrientsToLimitData}
                                title="Nutrients to Limit"
                                showDV={true}
                                splitColumns={true}
                            />
                        </div>
                    </div>
                </div>

                <div className="nutrition-section">
                    <h2 className="section-title">
                        How to Use %Daily Value (%DV)
                    </h2>
                    <div className="dv-explanation">
                        <p className="section-description">
                            The %DV shows how much a nutrient in a serving
                            contributes to a total daily diet. %DVs are based on
                            a 2,000-calorie diet for healthy adults.
                        </p>
                    </div>

                    <div className="dv-guidelines">
                        <div className="guideline-card">
                            <h4 className="guideline-title">Low (%DV)</h4>
                            <p className="guideline-value">5% or less</p>
                            <p className="guideline-description">
                                Choose foods{" "}
                                <span className="encourage-text">higher</span>{" "}
                                in nutrients to encourage and{" "}
                                <span className="limit-text">lower</span> in
                                nutrients to limit.
                            </p>
                        </div>
                        <div className="guideline-card">
                            <h4 className="guideline-title">High (%DV)</h4>
                            <p className="guideline-value">20% or more</p>
                            <p className="guideline-description">
                                Aim for{" "}
                                <span className="encourage-text">high %DV</span>{" "}
                                in fiber, vitamins, and minerals, but{" "}
                                <span className="limit-text">low %DV</span> in
                                saturated fat, sodium, and added sugars.
                            </p>
                        </div>
                    </div>

                    <div className="practical-tips">
                        <h3 className="tips-title">
                            Practical Tips for Using Nutrition Labels
                        </h3>
                        <div className="tips-grid">
                            <div className="tip-card">
                                <h4>Compare Foods</h4>
                                <p>
                                    Use %DV to compare similar products and
                                    choose those higher in nutrients you want
                                    more of.
                                </p>
                            </div>
                            <div className="tip-card">
                                <h4>Check Serving Size</h4>
                                <p>
                                    All nutrient amounts refer to the serving
                                    size listed. If you eat more, multiply
                                    accordingly.
                                </p>
                            </div>
                            <div className="tip-card">
                                <h4>Make Trade-offs</h4>
                                <p>
                                    Balance foods high in nutrients to limit
                                    with foods low in those nutrients throughout
                                    the day.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default NutritionInfo;
