import { Router } from "express";
import {
  addFavourite,
  removeFavourite,
  listFavourites,
} from "../controllers/favouriteController";

/**
 * @openapi
 * /api/favourites:
 *   get:
 *     summary: List favourites
 *     responses:
 *       200:
 *         description: List of favourite stores
 *   post:
 *     summary: Add favourite
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               storeId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Created
 * /api/favourites/{id}:
 *   delete:
 *     summary: Remove favourite by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Removed
 */
const router = Router();
router.get("/", listFavourites);
router.post("/", addFavourite);
router.delete("/:id", removeFavourite);
export default router;
