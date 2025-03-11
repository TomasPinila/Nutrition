import requests
import os

def fetch_api_data(path, params=None):
    """
    Fetch data from the API using the base URL and API key stored in environment variables.
    
    Args:
        path (str): The API endpoint path.
        params (dict, optional): Query parameters to include in the request.
    
    Returns:
        dict: The JSON response from the API or an error message.
    """
    base = os.environ.get('BASE_URL')
    key = os.environ.get('API_KEY')
    
    if not base or not key:
        return {"error": "BASE_URL or API_KEY is not set in environment variables."}
    
    url = f"{base}{path}"
    headers = {'x-api-key': key}
    
    try:
        response = requests.get(url, headers=headers, params=params) # requests.get() can handle params=None gracefully, so a conditional isn’t necessary.
        response.raise_for_status()  # Raises an HTTPError for bad responses
        return response.json()
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}   