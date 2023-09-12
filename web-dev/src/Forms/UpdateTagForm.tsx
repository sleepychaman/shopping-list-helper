import { Autocomplete, FormControl, TextField } from "@mui/material";
import { useMutationIngredientUpdate } from "../Hooks/Mutation/IngredientsMutation";
import { Ingredient, IngredientTag } from "../Types/Ingredient";
import { getTagValues, translateTag } from "../Utils/TagHelper";


export interface UpdateTagFormProps {
  ingredient: Ingredient
}

export function UpdateTagForm({ingredient} : UpdateTagFormProps): JSX.Element {
  const { mutateAsync: updateIngredient } = useMutationIngredientUpdate();

  const handlerSubmitUpdatedTag = async (tag: IngredientTag) => {
    if (tag === undefined) {
      alert("Please add a tag");
      return;
    }
    const resp = await updateIngredient(
      {...ingredient, tag}
    );
    if (resp.invalidRecipes.length > 0) {
      const recipesNames = resp.invalidRecipes.map(x => x.name);
       alert(`Some recipes are now not valid:\n${recipesNames}`)
    }
  };

  return (
      <FormControl fullWidth margin="normal">
      <Autocomplete
        id="tag-ingredient"
        options={getTagValues().map((e) => ({ label: translateTag(e as IngredientTag), id: e as IngredientTag }))}
        value={{label: translateTag(ingredient.tag), id: ingredient.tag} }
        isOptionEqualToValue={(o, v) => o.id === v.id}
        onChange={(_e, value: {label: string, id: IngredientTag}  | null) => {
            if (value)
              handlerSubmitUpdatedTag(value.id)
        }}
        renderInput={(params) => <TextField {...params} label="Tag" />}
    />
    </FormControl>
  );
}
