# EatWise - Nutrition Analysis Web Application

A comprehensive web application that helps users make informed food choices by providing detailed nutritional analysis and health evaluations of food products.

## 🌐 Live Demo

**[Visit EatWise](https://nutrition-frontend-xern.onrender.com/)**

## 📋 Features

### 🔍 Product Analysis

-   **Search any food product** and get detailed nutritional information
-   **Health score calculation** based on FDA guidelines
-   **Ingredient analysis** with focus on first 3 ingredients
-   **Calorie evaluation** with context and recommendations
-   **Nutrient breakdown** showing encouraged vs. limited nutrients

### 📊 Comprehensive Health Evaluation

-   **Overall health rating** (Excellent, Very Healthy, Healthy, Moderate, Unhealthy, Very Unhealthy)
-   **Component scoring** for calories, nutrients, and ingredients
-   **Detailed explanations** for each health aspect
-   **FDA-compliant analysis** based on official nutrition guidelines

### 📚 Educational Resources

-   **Nutrition Facts Guide** explaining FDA guidelines
-   **Ingredient database** with refined grains, added sugars, and hydrogenated oils
-   **Daily Value (%DV) explanations** and practical tips
-   **Interactive nutrition tables** with detailed breakdowns

### 👤 User Features

-   User registration and authentication
-   Input a recipe and calculate how healthy it is and recommended portions (coming soon)
-   If you can't find the specific product, input its nutritional data to calculate its health (coming soon)
-   Save favorite recipes (coming soon)

## 🛠️ Technology Stack

### Frontend

-   **React** with Vite for fast development
-   **React Router** for navigation
-   **Axios** for API calls
-   **CSS3** with custom styling
-   **Responsive design** for all devices

### Backend

-   **Django** with Django REST Framework
-   **JWT Authentication** for secure user management
-   **PostgreSQL** database (production) / SQLite (development)
-   **CORS handling** for cross-origin requests

### APIs & Data Sources

-   **USDA Food Data Central API** - Official nutritional data
-   **Google Custom Search API** - Product image search

### Deployment

-   **Frontend**: Render Static Site
-   **Backend**: Render Web Service
-   **Database**: PostgreSQL on Render

## 🏗️ Architecture

### Health Evaluation Algorithm

The health score is calculated using a weighted system:

-   **Nutrients (40%)** - Based on encouraged vs. limited nutrients
-   **Calories (20%)** - Evaluated per 100g serving
-   **Ingredient Count (20%)** - Fewer ingredients = better score
-   **Ingredient Quality (20%)** - Analysis of first 3 ingredients

### API Endpoints

```
GET /api/product_search/          # Search for food products
POST /api/token/                  # User authentication
POST /api/user/register/          # User registration
GET /api/nutrition-info/          # Get nutrition guidelines
```

## 🚀 Getting Started

### Prerequisites

-   Node.js (v18+)
-   Python (3.11+)
-   Git

### Local Development

#### Backend Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/nutrition.git
cd nutrition/backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set environment variables
cp .env.example .env
# Add your API keys to .env file

# Run migrations
python manage.py migrate

# Start development server
python manage.py runserver
```

#### Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Set environment variables
cp .env.example .env
# Configure your API URLs

# Start development server
npm run dev
```

### Environment Variables

#### Backend (.env)

```
SECRET_KEY=your_django_secret_key
FDC_API_KEY=your_fdc_api_key
BASE_FDC_URL=https://api.nal.usda.gov/fdc
DEBUG=True
```

#### Frontend (.env)

```
VITE_API_URL=http://localhost:8000
VITE_GOOGLE_API_KEY=your_google_api_key
VITE_GOOGLE_SEARCH_ENGINE_ID=your_search_engine_id
```

## 📱 Screenshots

### Home Page

<img width="1877" height="854" alt="image" src="https://github.com/user-attachments/assets/893cd6d0-7156-4b11-940d-4e098f9b78ed" />


_Product search interface with educational content_

### Product Analysis

<img width="1248" height="893" alt="image" src="https://github.com/user-attachments/assets/76d3cef5-9036-4883-857f-5d7015b5a5dd" />

_Detailed health evaluation with interactive components_

### Nutrition Guide
<img width="1671" height="888" alt="image" src="https://github.com/user-attachments/assets/b4af63fb-033b-4066-9c44-bca6b7bc22f2" />

_Comprehensive guide to understanding nutrition labels_

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact

**Tomas Pinilla** - [tomaspinilla0508@gmail.com](mailto:tomaspinilla0508@gmail.com)

Project Link: https://github.com/TomasPinila/Nutrition

## 🙏 Acknowledgments

-   **USDA Food Data Central** for providing comprehensive nutritional data
-   **FDA Nutrition Facts Label Guidelines** for health evaluation criteria
-   **Render** for hosting and deployment

---

_Made with ❤️ to help people make healthier food choices_
