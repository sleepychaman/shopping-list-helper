import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Ingredient } from "./Ingredient";

export enum RecipeStatus {
  valid,
  error,
}

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  timeToCook: number;

  @Column()
  numberOfPeople: number;

  @ManyToMany(() => Ingredient)
  @JoinTable()
  ingredients: Ingredient[];

  @Column({default: RecipeStatus.valid})
  status: RecipeStatus;
}
