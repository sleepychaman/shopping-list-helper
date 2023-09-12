import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import axios from "../../Utils/axios";
import { Requests } from "../QueriesAndMutationList";
import { Ingredient, IngredientTag } from "../../Types/Ingredient";
import { Recipe } from "../../Types/Recipe";

export const useMutationIngredientCreate = (): UseMutationResult<
  any,
  unknown,
  { name: string; price: number, tag: IngredientTag }
> => {
  const clientQuery = useQueryClient();

  return useMutation(
    [Requests.createIngredient],
    async ({ name, price, tag }: { name: string; price: number, tag: IngredientTag }) => {
      return await axios.post(`/ingredient/create`, {
        name,
        price,
        tag,
      });
    },
    {
      onSuccess: () => {
        clientQuery.invalidateQueries(Requests.listIngredient);
      },
    }
  );
};

export const useMutationIngredientUpdate = (): UseMutationResult<
  {ingredient: Ingredient, invalidRecipes: Recipe[]},
  unknown,
  Ingredient
> => {
  const clientQuery = useQueryClient();

  return useMutation(
    [Requests.updateIngredient],
    async ({id, name, price, tag }: Ingredient) => {
      const resp = await axios.put<{ingredient: Ingredient, invalidRecipes: Recipe[]}>(`/ingredient/update`, {
        id,
        name,
        price,
        tag,
      });
      return resp.data
    },
    {
      onSuccess: () => {
        clientQuery.invalidateQueries(Requests.listIngredient);
      },
    }
  );
};

export const useMutationIngredientDelete = (): UseMutationResult<
  any,
  unknown,
  number
> => {
  const clientQuery = useQueryClient();

  return useMutation(
    [Requests.deleteIngredient],
    async (id: number) => {
      return await axios.delete(`/ingredient/delete/${id}`);
    },
    {
      onSuccess: () => {
        clientQuery.invalidateQueries(Requests.listIngredient);
      },
    }
  );
};
