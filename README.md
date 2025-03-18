# Kyle Schneider's Portfolio

A Flask-based portfolio website showcasing my professional experience and technical skills.

## Features
- Dynamic experience filtering by sector (Government/Private)
- Real-time skill search with highlighting
- Responsive design using Bootstrap
- Animated UI components
- RESTful API endpoints

## Tech Stack
- Python/Flask
- JavaScript
- Bootstrap 5
- HTML/CSS

## Project Structure

```
flask-project
├── app
│   ├── __init__.py
│   ├── routes.py
│   ├── models.py
│   ├── templates
│   │   └── base.html
│   └── static
│       ├── css
│       └── js
├── config.py
├── requirements.txt
├── run.py
└── README.md
```

## Description of Files

- **app/__init__.py**: Initializes the Flask application and sets up the application context. Imports routes and models.
- **app/routes.py**: Defines the routes for the application, handling requests and returning responses.
- **app/models.py**: Contains the data models for the application, defining the structure of the data and any database interactions.
- **app/templates/base.html**: A base HTML template that can be extended by other templates in the application.
- **app/static/css**: Directory for CSS files used for styling the application.
- **app/static/js**: Directory for JavaScript files used for client-side functionality.
- **config.py**: Contains configuration settings for the Flask application, such as database URI and secret keys.
- **requirements.txt**: Lists the dependencies required for the project, which can be installed using pip.
- **run.py**: The entry point for running the Flask application, creating an instance of the app and running the development server.

## Installation
1. Clone the repository
2. Create a virtual environment: `python -m venv venv`
3. Activate the virtual environment: `venv\Scripts\activate`
4. Install dependencies: `pip install -r requirements.txt`
5. Run the application: `python run.py`

## Usage
Visit `http://localhost:5000` in your web browser to view the portfolio.