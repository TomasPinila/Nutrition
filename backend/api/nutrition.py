"""
    Applies NRF9.3 algorithm for how healthy (nutritious) the product is according to its nutrients.
    The NRF9.3 is a scoring system that evaluates foods based on:

        - Nutrients to Encourage (9): Protein, fiber, vitamins A, C, and E, calcium, iron, potassium, and magnesium.

        - Nutrients to Limit (3): Saturated fat, added sugars, and sodium.
"""

def nutritionevaluation(nutrients):
    encourage_keys = ["Protein", "Fiber", "Vitamin A", "Vitamin C", "Vitamin E", "Vitamin D",  "Calcium", "Iron", "Potassium", "Magnesium"]
    limit_keys = ["Saturated Fat", "Sugar", "Sodium"]

    # Dictionaries that assign nutrients to their corresponding Percentage of Daily Value, initialized in 0
    nutrients_to_encourage = {key: 0 for key in encourage_keys}
    nutrients_to_limit = {key: 0 for key in limit_keys}

    # Assign Percentage of DV to each nutrient accordingly
    for nutrient in nutrients:
        nutrient_name = nutrient["name"]
        if nutrient_name in nutrients_to_encourage:
            nutrients_to_encourage[nutrient_name] = nutrient["percentOfDailyNeeds"]
            #print(f"{nutrient_name}, {nutrients_to_encourage[nutrient_name]}")
        elif nutrient_name in nutrients_to_limit:
            nutrients_to_limit[nutrient_name] = nutrient["percentOfDailyNeeds"]
            #print(f"{nutrient_name}, {nutrients_to_limit[nutrient_name]}")

    # Apply NRF9.3 formula
    sum_nutrients_encourage = sum(nutrients_to_encourage.values())
    #print(sum_nutrients_encourage)
    sum_nutrients_limit = sum(nutrients_to_limit.values())
    #print(sum_nutrients_limit)
    final_score = sum_nutrients_encourage - sum_nutrients_limit
    #print(final_score)

    return round(final_score)
