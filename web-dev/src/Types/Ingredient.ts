
export enum IngredientTag {
  vegetable,
  protein,
  starchy
}

export interface Ingredient {
  id: number;
  name: string;
  price: number;
  tag: IngredientTag
}
