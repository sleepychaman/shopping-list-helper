import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum IngredientTag {
  vegetable,
  protein,
  starchy
}

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  tag: IngredientTag;
}
