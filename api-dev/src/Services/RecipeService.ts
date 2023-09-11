import { getRepository, In } from "typeorm";
import { Ingredient, IngredientTag } from "../Entities/Ingredient";
import { Recipe } from "../Entities/Recipe";

export class RecipeService {
  static async list(): Promise<Recipe[]> {
    const recipes = await getRepository(Recipe).find({
      relations: ["ingredients"],
    });
    return recipes;
  }

  private static async checkIngredientTagRules(recipe: Recipe) {
    const allRecipes = await this.list();
    const proteinTag = recipe.ingredients.find(x => x.tag === IngredientTag.protein)
    if (recipe.ingredients.filter(x => x.tag === IngredientTag.protein).length > 1) {
      throw Error("Too many protein.");
    } else if (proteinTag && allRecipes.find(x => x.ingredients.find(i => i.id === proteinTag.id))) {
      throw Error("Protein already used in an other recipe.");
    } else if (recipe.ingredients.filter(x => x.tag === IngredientTag.starchy).length !== 1) {
      throw Error("One starchy is mandatory.");
    }
  }
  static async create(recipe: Recipe): Promise<Recipe> {
    if (recipe.ingredients) {
      const ingredients = await getRepository(Ingredient).find({
        where: { id: In(recipe.ingredients) },
      });
      recipe.ingredients = ingredients;
    }
    await this.checkIngredientTagRules(recipe)
    const newRecipe = await getRepository(Recipe).save(recipe);
    return newRecipe;
  }

  static async update(recipe: Recipe): Promise<Recipe> {
    const updatedRecipe = await getRepository(Recipe).save(recipe);
    return updatedRecipe;
  }

  static async delete(id: number): Promise<void> {
    await getRepository(Recipe).delete(id);
  }
}
