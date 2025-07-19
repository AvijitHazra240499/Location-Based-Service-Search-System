import { Request, Response } from "express";

import { AppDataSource } from "../utils/data-source";
import { Store } from "../entities/Store";

const storeRepo = AppDataSource.getRepository(Store);

export const searchStores = async (req: Request, res: Response) => {
  const { name, serviceType, lat, lng, radiusKm = 5 } = req.query;

  const qb = storeRepo.createQueryBuilder("store");
  if (name) qb.andWhere("store.name LIKE :name", { name: `%${name}%` });
  if (serviceType)
    qb.andWhere("store.serviceType LIKE :serviceType", {
      serviceType: `%${serviceType}%`,
    });

  const stores = await qb.getMany();

  // If coordinates provided calculate distance and filter/sort
  if (lat && lng) {
    const latNum = Number(lat);
    const lngNum = Number(lng);
    const radiusMeters = Number(radiusKm) * 1000;

    // Map each store with distance
    const enriched = stores.map((s: Store) => {
      const distanceMeters = haversine(latNum, lngNum, s.latitude, s.longitude);
      return {
        id: s.id,
        name: s.name,
        latitude: s.latitude,
        longitude: s.longitude,
        serviceType: s.serviceType,
        distanceMeters
      };
    });

    // Filter within radius and sort by distance ascending
    const withinRadius = enriched
      .filter((s) => s.distanceMeters <= radiusMeters)
      .sort((a, b) => a.distanceMeters - b.distanceMeters);

    return res.json(withinRadius);
  }

  // If no coordinates just return stores matching name/serviceType
  res.json(stores);
};

function haversine(lat1: number, lon1: number, lat2: number, lon2: number) {
  const toRad = (v: number) => (v * Math.PI) / 180;
  const R = 6371e3; // metres
  const φ1 = toRad(lat1);
  const φ2 = toRad(lat2);
  const Δφ = toRad(lat2 - lat1);
  const Δλ = toRad(lon2 - lon1);
  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
