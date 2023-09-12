import { getRepository } from "typeorm";
import { Ingredient } from "../Entities/Ingredient";
import { Recipe, RecipeStatus } from "../Entities/Recipe";
import { RecipeService } from "./RecipeService";

export class IngredientService {
  static async list(): Promise<Ingredient[]> {
    const ingredient = await getRepository(Ingredient).find();
    return ingredient;
  }

  static async create(ingredient: Ingredient): Promise<Ingredient> {
    const newIngredient = await getRepository(Ingredient).save(ingredient);
    return newIngredient;
  }

  static async update(ingredient: Ingredient): Promise<{ingredient: Ingredient, invalidRecipes: Recipe[]}> {
    const oldIngredient = await getRepository(Ingredient).findOne({id: ingredient.id});
    const updatedIngredient = await getRepository(Ingredient).save(ingredient);
    const invalidRecipes: Recipe[] = []
    if (updatedIngredient.tag !== oldIngredient?.tag) {
      // We need all the recipes to check protein rule
      let recipes = await getRepository(Recipe).find({
        relations: ["ingredients"],
      });
      // Filter recipes to only have those who are concern by updated ingredient
      const concernedRecipes = recipes.filter(r => r.ingredients.find(i => i.id === ingredient.id))
      for (const recipe of concernedRecipes) {
        const isValid = await RecipeService.isRecipeValid(
          recipe, 
          recipes.filter(r => r.id !== recipe.id)
        );
        if (!isValid) {
          recipe.status = RecipeStatus.error;
          invalidRecipes.push(recipe);
        } else {
          recipe.status = RecipeStatus.valid;
        }
        await getRepository(Recipe).save(recipe);
      }
    }
    return {
      ingredient: updatedIngredient,
      invalidRecipes,
    };
  }

  static async delete(id: number): Promise<void> {
    await getRepository(Ingredient).delete(id);
  }
}
