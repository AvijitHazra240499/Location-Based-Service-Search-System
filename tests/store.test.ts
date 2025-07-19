import request from "supertest";
import { AppDataSource } from "../src/utils/data-source";
import app from "../src/app";

beforeAll(async () => {
  await AppDataSource.initialize();
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe("Store API", () => {
  it("should return a 200 OK status for a basic search", async () => {
    const response = await request(app).get("/api/stores/search?lat=23.33&lng=87.68&radiusKm=100");
    expect(response.status).toBe(200);
  });
});
