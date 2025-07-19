import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

/**
 * @openapi
 * components:
 *   schemas:
 *     Store:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         latitude:
 *           type: number
 *         longitude:
 *           type: number
 *         serviceType:
 *           type: string
 */
@Entity()
export class Store {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column("double")
  latitude!: number;

  @Column("double")
  longitude!: number;

  @Column()
  serviceType!: string;
}
