import { IngredientTag } from "../Types/Ingredient"

export const translateTag = (tag: IngredientTag) => {
    switch (tag) {
      case IngredientTag.protein:
        return 'Protein'
      case IngredientTag.vegetable:
        return 'Vegetable'
      case IngredientTag.starchy:
        return 'Starchy'
      default:
        return ''
    }
}

export const getTagValues = () => Object.values(IngredientTag).filter((v) => !isNaN(Number(v)))

