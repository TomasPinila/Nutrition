"""
    Determines how healthy a product is

        - Nutrients to Encourage (9): Protein, fiber, vitamins A, C, and E, calcium, iron, potassium, and magnesium.

        - Nutrients to Limit (3): Saturated fat, added sugars, and sodium.
"""

# Combined list of all types of sugar, syrup, and other most common added sugars
all_sugars = [
    "sugar", "refinedsugar", "beetsugar", "brownsugar", "butteredsugar", "canesugar", "castersugar", 
    "coconutsugar", "datesugar", "goldensugar", "invertsugar", "muscovadosugar", 
    "organicrawsugar", "raspadurasugar", "evaporatedcanejuice", "confectionerssugar", 
    "carobsyrup", "goldensyrup", "highfructosecornsyrup", "honey", "agavenectar", 
    "maltsyrup", "maplesyrup", "oatsyrup", "ricebransyrup", "ricesyrup", 
    "barleymalt", "molasses", "canejuicecrystals", "lactose", "cornsweetener", 
    "crystallinefructose", "dextran", "maltpowder", "ethylmaltol", "fructose", 
    "fruitjuiceconcentrate", "galactose", "glucose", "disaccharides", "maltodextrin", 
    "maltose"
]

refined_grains = [
    "enriched flour", "white flour", "wheat flour", "all-purpose flour",
    "corn flour", "rice flour", "degerminated cornmeal", "bread flour",
    "pastry flour", "cake flour", "self-rising flour", "semolina",
    "durum flour", "unbleached flour", "bleached flour", "white rice", "corn grits"
]

hydrogenated_oils = [
    "hydrogenated oil", "partially hydrogenated oil",
    "hydrogenated vegetable oil", "hydrogenated palm oil",
    "hydrogenated soybean oil"
]

whole_food_keywords = [  # Partial match allowed (e.g. "whole wheat" in "whole wheat flour")
    "whole wheat", "whole grain", "whole oat", "whole barley",
    "brown rice", "quinoa", "oats", "almonds", "walnuts", "peanuts",
    "chia seeds", "flaxseeds", "olive oil", "organic", "natural", "unsweetened"
]

# USDA-SPECIFIC NUTRIENT MAPPING
ENCOURAGE_NUTRIENTS = {
    1079: "Fiber",
    1087: "Calcium",
    1089: "Iron",
    1092: "Potassium",
    1110: "Vitamin D"
}

LIMIT_NUTRIENTS = {
    1258: "Saturated Fat",
    1093: "Sodium",
    2000: "Added Sugars"
}

# Daily Value Conversion (if nutrient has no DV we calculate it), values represent the 100% of DV of each nutrient, did this according to FDA image
DAILY_VALUES_G = {
    1079: 28,       # Fiber - g
    1093: 2.3,      # Sodium - g (Converted from 2300mg to 2.3g)
    1258: 20,       # Saturated Fat - g
    2000: 50,       # Added Sugars - g
    1110: 0.00002,  # Vitamin D - g (Converted from 20mcg to 0.00002g)
    1087: 1.3,      # Calcium - g (Converted from 1300mg to 1.3g)
    1089: 0.018,    # Iron - g (Converted from 18mg to 0.018g)
    1092: 4.7       # Potassium - g (Converted from 4700mg to 4.7g)
}

# Updated scoring for ingredient count
def get_ingredient_length_score(count):
    """Negative scores for long lists"""
    if count <= 5:
        return 1   # Good (+0.2 points)
    elif count <= 10:
        return 0   # Neutral (0 points)
    else:
        return -1  # Bad (-0.2 points)
        
def get_ingredient_length_advice(count):
        """Generates recommendations based on ingredient count"""
        base = f"This product has {count} ingredients. "
        
        if count <= 5:
            return base + "Great! Short ingredient lists typically indicate less processing."
        elif count <= 10:
            return base + "Consider products with fewer than 5 ingredients for minimal processing."
        else:
            return base + "Long ingredient lists often signal highly processed foods. Look for simpler alternatives."
        

def split_ingredients(ingredients):
    """
    Given a comma-separated string of ingredients, this function returns a list of ingredients.
    If an ingredient contains parenthesis, the function ignores the part outside and extracts
    and splits the text inside the parentheses.
    
    Example:
      Input: "milk chocolate (sugar, cocoa butter), peanuts, corn syrup"
      Output: ["sugar", "cocoa butter", "peanuts", "corn syrup"]
    """
    result = []
    # Split the entire string by commas
    for ing in ingredients.split(","):
        ing = ing.strip()
        if "(" in ing:
            start = ing.find("(")
            end = ing.find(")", start)
            # If closing parenthesis not found, take rest of string
            if end == -1:
                inside = ing[start+1:].strip()
            else:
                inside = ing[start+1:end].strip()
            # Split the inner content by commas and strip punctuation
            inner_ings = [i.strip(" ,;") for i in inside.split(",") if i.strip()]
            result.extend(inner_ings)
        else:
            # Even if no parentheses, strip any trailing or leading unwanted characters
            result.append(ing.strip("() ").strip())
    return result

    
def analyzeIngredients(ingredients):
    """
        Analyzes food ingredients for health indicators including ingredient count
        Args:
            ingredients (str): Comma-separated ingredient list
        Returns:
            dict: Analysis containing alerts, counts, and recommendations
    """
    ingredients = ingredients.lower()
    # Clean and split ingredients
    cleaned = split_ingredients(ingredients)
    first_three = cleaned[:3]
    # print(cleaned)

    evaluation = {
        "total_ingredients": len(cleaned),  # Total ingredient count
        "sugar_types": [],
        "first_ingredient_alerts": [],
        "whole_foods_count": 0,
        "health_status": "neutral",
        "health_advice": "",
        "ingredient_number_recommendation": ""
    }

     # Sugar Check
    found_sugars = set() # Using set to avoid duplicates
    for ing in cleaned:
        for sugar in all_sugars:
            if sugar in ing:
                found_sugars.add(sugar)

    evaluation["sugar_types"] = list(found_sugars)  

    # ---   First 3 Ingredients Check   ---
    unhealthy_flags = set()
    for i, ing in enumerate(first_three, 1): # The enumerate() function in Python is used to iterate over a sequence (such as a list, tuple, or string) and retrieve both the index and the value of each element during the iteration.
        '''
        - i: This will store the index of the current element (starting from 1 because of the 1 in enumerate(first_three, 1)).
        - ing: This will store the current element (the actual value at index i) of the list as you iterate over first_three.
        - 1 in enumerate means start at 1
        '''
        # Check for red flags
        if any(grain in ing for grain in refined_grains):
            '''
            - any(): The any() function is used here to check if any element in the refined_grains list is found in the current ingredient (ing).
            - grain in ing for grain in refined_grains: This checks if any item in the refined_grains list is a substring in the ingredient ing.
            '''
            unhealthy_flags.add(f"Ingredient {i}: {ing} (refined grain)")
        if any(oil in ing for oil in hydrogenated_oils):
            unhealthy_flags.add(f"Ingredient {i}: {ing} (hydrogenated oil)")
        if any(sugar in ing for sugar in all_sugars):
            unhealthy_flags.add(f"Ingredient {i}: {ing} (specific sugar)")

        # Check for whole foods
        if any(keyword in ing for keyword in whole_food_keywords):
            evaluation["whole_foods_count"] += 1

    evaluation["first_ingredient_alerts"] = list(unhealthy_flags)
    # Evaluate depending on ingredient health:
    get_ingredient_length_advice(evaluation["total_ingredients"])
    
    # Final Health Determination
    evaluation["health_status"] = "unhealthy" if unhealthy_flags else "healthy"
    evaluation["health_advice"] = (
        "First ingredients contain problematic components. Try choosing products with "
        f"whole foods listed as the first three ingredients"
        if unhealthy_flags else
        f"Great! Healthy ingredients. {evaluation['whole_foods_count']}/3 first ingredients are whole foods."
    )
    evaluation["ingredient_number_score"] = get_ingredient_length_score(evaluation["total_ingredients"])
    evaluation["ingredient_number_recommendation"] = get_ingredient_length_advice(evaluation["total_ingredients"])

    return evaluation


def analyzeCalories(calories):
    """Returns tuple with both category and numerical score"""
    if calories <= 40:
        return 4
    elif calories <= 100:
        return 3
    elif calories < 400:
        return 2
    else:
        return 1


def analyzeNutrients(nutrients):
    '''
        General Guide to %DV
        -  5% DV or less of a nutrient per serving is considered low
        -  20% DV or more of a nutrient per serving is considered high
        
        More often, choose foods that are:
        
        - Higher in %DV for Dietary Fiber, Vitamin D, Calcium, Iron, and Potassium, You want to get more than the 100% of DV
        - Lower in %DV for Saturated Fat, Sodium, and Added Sugars, You want to get less than the 100% of DV
    '''
    # Dictionaries that assign nutrients to their corresponding Percentage of Daily Value, initialized in 0
    evaluated_nutrients = {}
    nutrients_to_encourage = {}
    nutrients_to_limit = {}
    score = 0

    # Assign Percentage of DV to each nutrient accordingly
    for nutrient in nutrients:
        nutrient_id = nutrient["nutrientId"]
        if nutrient["grams_amount"] != 'NA':

            evaluate = True
            # Calculate DV of Important nutrients (to encourage and not encourage) if nutrient doesn't have one, sometimes nutrients don't have them
            if "percentDailyValue" not in nutrient: #sometimes nutrients don't have them
                if nutrient_id in DAILY_VALUES_G:
                    nutrient["percentDailyValue"] = (nutrient["grams_amount"]/DAILY_VALUES_G[nutrient_id])*100
                else:
                    evaluate = False

            # Start calculating score if evaluate is true
            if evaluate == True:
                if nutrient_id in ENCOURAGE_NUTRIENTS :
                    if nutrient["percentDailyValue"] <= 5:
                        evaluation = "low"
                    elif nutrient["percentDailyValue"] < 20:
                        evaluation = "normal"
                        score += 1
                    else:
                        evaluation = "great"
                        score += 2.5 # Give a bit more weight into good nutrients with good amount
                    nutr = {
                        "percentDailyValue": nutrient["percentDailyValue"],
                        "evaluation": evaluation
                    }
                    nutrients_to_encourage[nutrient["nutrientName"]] = nutr

                elif nutrient_id in LIMIT_NUTRIENTS:
                    if nutrient["percentDailyValue"] <= 5:
                        evaluation = "good"
                    elif nutrient["percentDailyValue"] < 20:
                        evaluation = "normal"
                        score -= 1
                    elif nutrient["percentDailyValue"] < 40:
                        evaluation = "bad"
                        score -= 2
                    else:
                        evaluation = "very bad"
                        score -= 2.5 # Give a bit more weight into bad nutrients with really bad amount
                    nutr = {
                        "percentDailyValue": nutrient["percentDailyValue"],
                        "evaluation": evaluation
                    }
                    nutrients_to_limit[nutrient["nutrientName"]] = nutr



    evaluated_nutrients["nutrients_to_encourage"] = nutrients_to_encourage
    evaluated_nutrients["nutrients_to_limit"] = nutrients_to_limit

    # Final score of 10 is amazing
    if score >= 8:
        result = "Excellent"
    elif score >= 4:
        result = "Good"
    elif score >= 0:
        result = "Fair"
    else:
        result = "Poor"

    evaluated_nutrients["health_result"] = result
    evaluated_nutrients["score"] = score
    return evaluated_nutrients


'''
    Evaluate health and calculate score:
    - Score out of 10
    - Different evaluations have different weights:
        - nutrient_score has 4/10, greatest weight
        - calorie_score has 2/10
        - ingredient_count_score has 2/10
        - ingretient_health_score has 2/10
    So every value on the score has a different weight overall, which is the first thing that we map.

    We then add all the scores, and determine the rank
'''
def healthEvaluation(calories, nutrients, ingredients):
    # Get individual analyses
    ingredients_analysis = analyzeIngredients(ingredients)
    calories_analysis_score = analyzeCalories(calories)
    nutrients_analysis = analyzeNutrients(nutrients)
    # print(ingredients_analysis)
    
    # Calculate component scores with weights
    nutrient_weight = 0.4  # 40%
    calorie_weight = 0.2   # 20%
    ingredient_count_weight = 0.2  # 20%
    ingredient_quality_weight = 0.2  # 20%

    # Convert analyses to numerical scores
    # Nutrient Score (0-10 scale)
    nutrient_score = nutrients_analysis.get("score", 0) * nutrient_weight
    
    # Calorie Score (0-4 scale converted to 0-2)
    calorie_score_map = { 4: "low", 3: "moderate", 2: "moderately high", 1: "high"}

    # Get calorie score analyis 
    calories_analysis = calorie_score_map[calories_analysis_score]


    calorie_value = calories_analysis_score / 2  # Convert 4-point scale to 0-2
    calorie_score = calorie_value * calorie_weight
    
    # Ingredient Scores (0-4 points)
    # Count scoring: 1=good (short), 0=neutral, -1=bad (long)
    ingredient_count_score = (
        get_ingredient_length_score(ingredients_analysis["total_ingredients"]) 
        * ingredient_count_weight
    )

    # Quality scoring: 2=healthy, 1=unhealthy
    ingredient_quality_score = (
        2 if ingredients_analysis["health_status"] == "healthy" else 1
    ) * ingredient_quality_weight
    
    total_score = (
        nutrient_score + 
        calorie_score + 
        ingredient_count_score + 
        ingredient_quality_score
    ) * 10  # Scale to 0-10

    # Force unhealthy rating for critical issues
    
    # Determine rating based on score
    if total_score >= 8.5:
        rating = "Excellent"
    elif total_score >= 7.0:
        rating = "Very Healthy"
    elif total_score >= 5.0:
        rating = "Healthy"
    elif total_score >= 3.0:
        rating = "Moderate"
    elif total_score >= 1:
        rating = "Unhealthy"
    else:
        rating = "Very Unhealthy"
        
    
    return {
        "total_score": round(total_score, 1),
        "rating": rating,
        "component_scores": {
            "nutrients": nutrients_analysis.get("score", 0),
            "calories": calories_analysis,
            "ingredient_count": ingredient_count_score,
            "ingredient_quality": ingredient_quality_score
        },
        "details": {
            "ingredients": ingredients_analysis,
            "nutrients": nutrients_analysis
        }
    }