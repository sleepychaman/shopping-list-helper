import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { CardCustom } from "../Components/CardCustom";
import { Loader } from "../Components/Loader";
import { useMutationRecipeCreate } from "../Hooks/Mutation/RecipeMutation";
import { useQueryIngredientList } from "../Hooks/Query/IngredientQuery";
import { ErrorPage } from "../Pages/ErrorPage";
import { Ingredient, IngredientTag } from "../Types/Ingredient";
import { OptionsMultiSelectType } from "../Types/OptionsMultiSelect";
import { Recipe } from "../Types/Recipe";

export interface CreateRecipesFormProps {
  recipes: Recipe[]
}

export function CreateRecipesForm({recipes}: CreateRecipesFormProps): JSX.Element {
  const [name, setName] = useState("");
  const [timeToCook, setTimeToCook] = useState<number>(0);
  const [numberOfPeople, setNumberOfPeople] = useState<number>(0);
  const [selectedIngredients, setSelectedIngredients] = useState<
    OptionsMultiSelectType[]
  >([]);
  const { mutateAsync: createRecipe } = useMutationRecipeCreate();
  const { data: ingredients, status, isLoading } = useQueryIngredientList();

  const resetFields = () => {
    setName("");
    setTimeToCook(0);
    setNumberOfPeople(0);
    setSelectedIngredients([]);
  };

  const handlerSubmitNewRecipe = async () => {
    if (!name || !timeToCook || !numberOfPeople || !selectedIngredients) {
      alert("Please fill all the fields");
      return;
    }
    if (!selectedIngredients.find(x => x.tag === IngredientTag.starchy)) {
      alert("Please add one starchy");
      return;

    }
    await createRecipe({
      name,
      timeToCook,
      numberOfPeople,
      ingredients: selectedIngredients.map((e) => e.id),
    });

    resetFields();
  };

  const getTagRules = (option: OptionsMultiSelectType) => {
    if (
      (selectedIngredients.find(x => x.tag === IngredientTag.protein) || 
      recipes.find(x => x.ingredients.find(i => i.id === option.id))) && 
      option.tag === IngredientTag.protein) {
      return true;
    } else if (
      selectedIngredients.find(x => x.tag === IngredientTag.starchy) && 
      option.tag === IngredientTag.starchy) {
      return true;
    }
    return false;
  }

  if (status === "error") {
    return <ErrorPage />;
  }
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div id="create-recipes-form">
      <Box
        display="flex"
        justifyContent="space-between"
        className="MarginTop16Px"
      >
        <CardCustom isSmall>
          <h2>New recipe</h2>
          <FormControl fullWidth margin="normal">
            <TextField
              id="name-recipe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Name of the recipe"
              variant="outlined"
              fullWidth
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            {/* on peut mettre plusieurs fois le même ingrédient dans le formulaire mais après ça l'enregistre qu'une fois*/}
            <Autocomplete
              onChange={(_e, value: OptionsMultiSelectType[]) => {
                setSelectedIngredients(value);
              }}
              value={selectedIngredients}
              multiple
              id="combo-box-demo"
              isOptionEqualToValue={(o, v) => o.id === v.id}
              options={ingredients.map((e: Ingredient) => {
                return {id: e.id, label: e.name, tag: e.tag };
              })}
              getOptionDisabled={getTagRules}
              renderInput={(params) => (
                <TextField {...params} label="Ingredients" />
              )}
            />
            <span className="SmallTextExplanation">
              *Max one protein, Starchy is Mandatory.
            </span>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              value={timeToCook}
              onChange={(e) =>
                e.target.value
                  ? setTimeToCook(Number(e.target.value))
                  : setTimeToCook(0)
              }
              id="name-recipe"
              label="Time to cook"
              variant="outlined"
              type="number"
              fullWidth
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              value={numberOfPeople}
              onChange={(e) =>
                e.target.value
                  ? setNumberOfPeople(Number(e.target.value))
                  : setNumberOfPeople(0)
              }
              id="name-recipe"
              label="Number of people"
              variant="outlined"
              type="number"
              fullWidth
            />
          </FormControl>
          <FormControl margin="normal">
            <Button onClick={handlerSubmitNewRecipe} variant="contained">
              Submit
            </Button>
          </FormControl>
        </CardCustom>
      </Box>
    </div>
  );
}
