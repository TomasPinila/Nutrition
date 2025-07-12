import React from "react";
import "../css/NutritionTable.css";

function NutrientTable({
    data,
    title,
    column_text,
    showDV = true,
    splitColumns = false,
}) {
    // Normalize both object- and array-form into a flat array
    const rows = Array.isArray(data)
        ? data
        : Object.entries(data).map(
              ([name, { percentDailyValue, evaluation }]) => ({
                  name,
                  percentDailyValue,
                  evaluation,
              })
          );

    return (
        <table className="nutrient-table">
            <thead>
                <tr>
                    <th>{title}</th>
                    {showDV && <th>DV</th>}
                    {splitColumns ? (
                        <>
                            <th>Goal</th>
                            <th>Health Benefit</th>
                        </>
                    ) : (
                        <th>{column_text}</th>
                    )}
                </tr>
            </thead>
            <tbody>
                {rows.map((nutrient, idx) => {
                    // Split evaluation for nutrients if needed
                    let goal = "";
                    let healthBenefit = "";

                    if (splitColumns && nutrient.evaluation) {
                        const parts = nutrient.evaluation.split(" | ");
                        goal = parts[0] || "";
                        healthBenefit = parts[1] || "";
                    }

                    return (
                        <tr key={nutrient.name ?? idx}>
                            <td>{nutrient.name}</td>
                            {showDV && <td>{nutrient.percentDailyValue}</td>}
                            {splitColumns ? (
                                <>
                                    <td>{goal}</td>
                                    <td>{healthBenefit}</td>
                                </>
                            ) : (
                                <td>{nutrient.evaluation}</td>
                            )}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default NutrientTable;
