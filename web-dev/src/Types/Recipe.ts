import { Ingredient } from "./Ingredient";

export enum RecipeStatus {
  valid,
  error,
}


export interface Recipe {
  id: number;
  name: string;
  numberOfPeople: number;
  timeToCook: number;
  ingredients: Ingredient[];
  status: RecipeStatus;
}
