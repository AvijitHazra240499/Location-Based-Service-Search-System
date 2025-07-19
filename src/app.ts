import "reflect-metadata";
import express from "express";
import routes from "./routes";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
// import dotenv from "dotenv";
import path from "path";

// dotenv.config();

const app = express();
app.use(express.json());

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: { title: "Location Service Search API", version: "1.0.0" },
  },
  apis: ["./src/routes/**/*.ts", "./src/entities/**/*.ts"],
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Serve static frontend
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/api", routes);

export default app;
