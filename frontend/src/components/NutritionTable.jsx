import React from "react";
import "../css/NutritionTable.css";

function NutrientTable({ data, title, column_text }) {
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
                    <th>%DV</th>
                    <th>{column_text}</th>
                </tr>
            </thead>
            <tbody>
                {rows.map((nutrient, idx) => (
                    // set name as key prop to help React identify which items have changed, been added, or removed.
                    <tr key={nutrient.name ?? idx}>
                        <td>{nutrient.name}</td>
                        <td>{nutrient.percentDailyValue}%</td>
                        <td>{nutrient.evaluation}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default NutrientTable;
