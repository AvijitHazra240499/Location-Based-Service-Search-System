import { Request, Response } from "express";
import { AppDataSource } from "../utils/data-source";
import { Favourite } from "../entities/Favourite";
import { Store } from "../entities/Store";

const favRepo = AppDataSource.getRepository(Favourite);
const storeRepo = AppDataSource.getRepository(Store);

export const addFavourite = async (req: Request, res: Response) => {
  const { storeId } = req.body;
  const store = await storeRepo.findOneBy({ id: storeId });
  if (!store) return res.status(404).json({ message: "Store not found" });

  const fav = favRepo.create({ store });
  await favRepo.save(fav);
  res.status(201).json(fav);
};

export const removeFavourite = async (req: Request, res: Response) => {
  const { id } = req.params;
  const fav = await favRepo.findOneBy({ id: Number(id) });
  if (!fav) return res.status(404).json({ message: "Favourite not found" });
  await favRepo.remove(fav);
  res.json({ message: "Removed" });
};

export const listFavourites = async (_req: Request, res: Response) => {
  const favs = await favRepo.find();
  res.json(favs);
};
