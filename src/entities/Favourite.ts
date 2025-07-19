import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Store } from "./Store";

@Entity()
export class Favourite {
  @PrimaryGeneratedColumn()
  id!: number;

  // Future: Add userId when auth implemented
  @ManyToOne(() => Store, { eager: true, onDelete: "CASCADE" })
  store!: Store;
}
