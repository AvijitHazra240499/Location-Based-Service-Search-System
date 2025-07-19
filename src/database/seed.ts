import "reflect-metadata";
import { AppDataSource } from "../utils/data-source";
import { Store } from "../entities/Store";
import { Favourite } from "../entities/Favourite";

const seedStores: Partial<Store>[] = [
  // Stores near Latitude: 23.3340928, Longitude: 87.687168
  {
    name: "City Mart (5km)",
    latitude: 23.3789928, // Approx. 5km North
    longitude: 87.687168,
    serviceType: "supermarket",
  },
  {
    name: "Highway Eats (10km)",
    latitude: 23.4238928, // Approx. 10km North
    longitude: 87.687168,
    serviceType: "eatery",
  },
  {
    name: "Fuel Stop (15km)",
    latitude: 23.3340928,
    longitude: 87.833868, // Approx. 15km East
    serviceType: "gas_station",
  },
  {
    name: "Quick Meds (20km)",
    latitude: 23.1544928, // Approx. 20km South
    longitude: 87.687168,
    serviceType: "pharmacy",
  },
  {
    name: "Mega Mall (80km)",
    latitude: 24.0524928, // Approx. 80km North
    longitude: 87.687168,
    serviceType: "shopping_mall",
  },
  {
    name: "Far Away Cafe (100km)",
    latitude: 23.3340928,
    longitude: 86.709168, // Approx. 100km West
    serviceType: "eatery",
  },
];

(async () => {
  await AppDataSource.initialize();

  // disable FK checks temporarily for truncation
  await AppDataSource.manager.query("SET FOREIGN_KEY_CHECKS=0");

  const favRepo = AppDataSource.getRepository(Favourite);
  await favRepo.clear();

  const storeRepo = AppDataSource.getRepository(Store);
  await storeRepo.clear();

  await AppDataSource.manager.query("SET FOREIGN_KEY_CHECKS=1");
  await storeRepo.save(seedStores);
  console.log("Seed complete");
  process.exit(0);
})();
