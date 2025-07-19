# Location-Based Service Search System

This project is a location-based service search system that allows users to find stores and services near a specified geographical location. It is built with a Node.js and Express backend, TypeScript, a MySQL database with TypeORM, and a simple vanilla JavaScript frontend with Leaflet.js for map integration.

## Features

- **Search by Location**: Find stores within a specified radius of a given latitude and longitude.
- **Search by Name/Service**: Filter results by store name or the type of service offered.
- **Interactive Map**: View search results on an interactive map powered by Leaflet.js.
- **RESTful API**: A well-defined API for searching and retrieving store data.
- **API Documentation**: Interactive API documentation powered by Swagger UI.

## Tech Stack

- **Backend**: Node.js, Express, TypeScript
- **Database**: MySQL
- **ORM**: TypeORM
- **Frontend**: HTML, CSS, Vanilla JavaScript, Leaflet.js
- **Testing**: Jest, Supertest
- **API Documentation**: Swagger

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [NPM](https://www.npmjs.com/)
- A running MySQL database instance.

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/AvijitHazra240499/Location-Based-Service-Search-System.git
    cd Location-Based-Service-Search-System
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add your database credentials. You can copy the example file:
    ```bash
    cp .env.example .env
    ```
    Then, edit the `.env` file with your details:
    ```
    DB_HOST=localhost
    DB_PORT=3306
    DB_USER=your_db_user
    DB_PASSWORD=your_db_password
    DB_DATABASE=your_db_name
    ```

4.  **Seed the database:**
    This command will create the necessary tables and populate the database with initial sample data.
    ```bash
    npm run seed
    ```

## Running the Application

-   **Development Mode**
    To run the server in development mode with hot-reloading:
    ```bash
    npm run dev
    ```
    The application will be available at [http://localhost:3000](http://localhost:3000).

-   **Production Mode**
    To build and run the application for production:
    ```bash
    npm run build
    npm run start
    ```

## How to Use and Test the Application

### Using the Web Interface

1.  Start the application using `npm run dev`.
2.  Open your browser and navigate to [http://localhost:3000](http://localhost:3000).
3.  Use the form to search for stores. You can:
    -   Click "Use My Location" to automatically fill in your current coordinates.
    -   Manually enter a latitude and longitude.
    -   Specify a search radius, store name, or service type.
4.  Click "Search" to see the results in a list and as markers on the map.

### API Documentation

The API is documented using Swagger. Once the application is running, you can access the interactive API documentation at:

[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

### Running Tests

To run the automated tests for the API, use the following command:

```bash
npm run test
```
This will execute the test suite using Jest and provide a summary of the results.
