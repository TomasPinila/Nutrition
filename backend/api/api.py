import requests
import os

def fetch_api_data(path, api_name, params=None):
    """
    Fetch data from the API using the base URL and API key stored in environment variables.
    
    Args:
        path (str): The API endpoint path.
        params (dict, optional): Query parameters to include in the request.
        api_name (str): The name of the API to use ('spoonacular', 'fdc', or 'google_img').
    
    Returns:
        dict: The JSON response from the API or an error message.
    """

    # Set up base URL, headers, and keys accordingly
    if api_name == "google_img":
        url = path
        headers = None
    else:
        if api_name == "spoonacular":
            base = os.environ.get('BASE_SPOONACULAR_URL')
            key = os.environ.get('SPOONACULAR_API_KEY')
            headers = {'x-api-key': key}
        elif api_name == "fdc":
            base = os.environ.get('BASE_FDC_URL')
            key = os.environ.get('FDC_API_KEY')
            headers = {'X-Api-Key': key}
        else:
            return {"error": "api name has to be either 'spoonacular' or 'fdc'"}
        
        if not base or not key:
            return {"error": "BASE_URL or API_KEY is not set in environment variables."}
    
        url = f"{base}{path}"

    
    try:
        response = requests.get(url, headers=headers, params=params) # requests.get() can handle params=None gracefully, so a conditional isn’t necessary.
        response.raise_for_status()  # Raises an HTTPError for bad responses
        return response.json()
    
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}   