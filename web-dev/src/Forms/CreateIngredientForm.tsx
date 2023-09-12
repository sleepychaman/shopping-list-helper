import { Autocomplete, Box, Button, FormControl, TextField } from "@mui/material";
import { useState } from "react";
import { CardCustom } from "../Components/CardCustom";
import { useMutationIngredientCreate } from "../Hooks/Mutation/IngredientsMutation";
import { IngredientTag } from "../Types/Ingredient";
import { getTagValues, translateTag } from "../Utils/TagHelper";



export function CreateIngredientForm(): JSX.Element {
  const { mutateAsync: createIngredient } = useMutationIngredientCreate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [tag, setTag] = useState<IngredientTag>();

  const resetFields = () => {
    setName("");
    setPrice(0);
  };

  const handlerSubmitNewIngredient = async () => {
    if (name === undefined || name === "" || price === undefined || tag === undefined) {
      alert("Please fill all the fields");
      return;
    }
    await createIngredient({
      name,
      price,
      tag
    });
    resetFields();
  };

  return (
    <div id="create-recipes-form">
      <Box
        display="flex"
        justifyContent="space-between"
        className="MarginTop16Px"
      >
        <CardCustom isSmall>
          <h2>New ingredient</h2>
          <FormControl fullWidth margin="normal">
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name-recipe"
              label="Name of the ingredient"
              variant="outlined"
              fullWidth
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              value={price}
              onChange={(e) =>
                e.target.value ? setPrice(Number(e.target.value)) : setPrice(0)
              }
              id="name-recipe"
              label="price"
              variant="outlined"
              type="number"
              fullWidth
            />
            <span className="SmallTextExplanation">
              *Keep in mind that the price is for one person. Prices are
              multiplied by the number of people in the recipe.
            </span>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <Autocomplete
              id="tag-ingredient"
              fullWidth
              isOptionEqualToValue={(o, v) => o.id === v.id}
              options={getTagValues().map((e) => ({ label: translateTag(e as IngredientTag), id: e as IngredientTag }))}
              value={tag ? {label: translateTag(tag), id: tag} : null}
              onChange={(_e, value: {label: string, id: IngredientTag}  | null) => {
                setTag((value!.id)!);
              }}
              renderInput={(params) => <TextField {...params} label="Tag" />}
            />
          </FormControl>
          <FormControl margin="normal">
            <Button onClick={handlerSubmitNewIngredient} variant="contained">
              Submit
            </Button>
          </FormControl>
        </CardCustom>
      </Box>
    </div>
  );
}
