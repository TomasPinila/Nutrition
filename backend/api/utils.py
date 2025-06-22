#   --------------
#   WERE IMPLEMENTING IN FRONTEND INSTEAD... Too many requests to google api


# from .api import fetch_api_data
# from duckduckgo_search import DDGS
# from duckduckgo_search.exceptions import RatelimitException
# import os
# import time
# '''
# Get image from duckduckgo api
# '''
# def fetch_product_image(product_name):
#     time.sleep(1.5)  # 2 seconds delay per request, to avoid ratelimit exception

#     try:
#         with DDGS() as ddgs:
#             results = ddgs.images(keywords=product_name)
#             if results:
#                 return results[0].get("image")
#     except RatelimitException:
#         print("Rate limit hit, skipping image fetch.")
#         return None

# '''
# Get image from google api
# '''
# def fetch_product_image(product_name):
#     print(product_name)
#     api_key = os.environ.get('GOOGLE_API_KEY')
#     search_engine_id = os.environ.get('GOOGLE_SEARCH_ENGINE_ID')
#     query = product_name

#     url = f'https://www.googleapis.com/customsearch/v1?q={query}&cx={search_engine_id}&key={api_key}&searchType=image&num=2&cr=countryUS&searchType=image'
#     # print(url)

#     # API Call
#     response_data = fetch_api_data(url, 'google_img')
#     if "error" in response_data:
#         return None
    
#     items = response_data.get("items")
#     if not items:
#         return None
#     item = items[1]
#     product_image = {
#         "image_link": item.get("link"),
#         "source_link": item.get("displayLink")
#     }

#     return product_image