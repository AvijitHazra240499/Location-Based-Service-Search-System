import { Router } from "express";
import storeRoutes from "./storeRoutes";
import favouriteRoutes from "./favouriteRoutes";

const router = Router();
router.use("/stores", storeRoutes);
router.use("/favourites", favouriteRoutes);
export default router;
