import { Router } from "express";
import { searchStores } from "../controllers/storeController";

/**
 * @openapi
 * /api/stores/search:
 *   get:
 *     summary: Search stores by name, type, and location
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *       - in: query
 *         name: serviceType
 *         schema:
 *           type: string
 *       - in: query
 *         name: lat
 *         schema:
 *           type: number
 *       - in: query
 *         name: lng
 *         schema:
 *           type: number
 *       - in: query
 *         name: radiusKm
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: List of stores
 */
const router = Router();
router.get("/search", searchStores);
export default router;
