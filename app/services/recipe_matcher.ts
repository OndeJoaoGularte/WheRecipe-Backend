import type Ingredient from '#models/ingredient'
import type Recipe from '#models/recipe'

export type RecipeDto = {
  id: string
  title: string
  description: string
  servings: number
  prepTimeMinutes: number
  cookTimeMinutes: number
  ingredients: Array<{
    ingredientId: string
    quantity: string
    optional?: boolean
  }>
  steps: string[]
  nutrition: Record<string, number> | null
  tags: string[]
}

export type RecipeMatchDto = {
  recipe: RecipeDto
  matchedIngredientIds: string[]
  missingIngredientIds: string[]
  matchRatio: number
  isComplete: boolean
}

export function toRecipeDto(recipe: Recipe): RecipeDto {
  const ingredients = [...(recipe.recipeIngredients ?? [])]
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((item) => ({
      ingredientId: item.ingredientRef,
      quantity: item.quantity,
      ...(item.optional ? { optional: true } : {}),
    }))

  return {
    id: recipe.id,
    title: recipe.title,
    description: recipe.description,
    servings: recipe.servings,
    prepTimeMinutes: recipe.prepTimeMinutes,
    cookTimeMinutes: recipe.cookTimeMinutes,
    ingredients,
    steps: Array.isArray(recipe.steps) ? recipe.steps : [],
    nutrition: recipe.nutrition ?? null,
    tags: Array.isArray(recipe.tags) ? recipe.tags : [],
  }
}

function selectionCoversRequirement(
  requiredId: string,
  selectedIds: Set<string>,
  ingredients: Ingredient[]
): boolean {
  if (selectedIds.has(requiredId)) return true

  for (const selectedId of selectedIds) {
    const selected = ingredients.find((item) => item.id === selectedId)
    if (selected?.familyId === requiredId) return true
  }

  return false
}

function buildMatch(
  recipe: Recipe,
  selectedIds: Set<string>,
  ingredients: Ingredient[]
): RecipeMatchDto | null {
  const dto = toRecipeDto(recipe)
  const required = dto.ingredients.filter((item) => !item.optional)
  const matchedIngredientIds: string[] = []
  const missingIngredientIds: string[] = []

  for (const item of required) {
    if (selectionCoversRequirement(item.ingredientId, selectedIds, ingredients)) {
      matchedIngredientIds.push(item.ingredientId)
    } else {
      missingIngredientIds.push(item.ingredientId)
    }
  }

  if (matchedIngredientIds.length === 0) {
    return null
  }

  return {
    recipe: dto,
    matchedIngredientIds,
    missingIngredientIds,
    matchRatio: matchedIngredientIds.length / required.length,
    isComplete: missingIngredientIds.length === 0,
  }
}

export function matchRecipes(
  recipes: Recipe[],
  ingredientIds: string[],
  ingredients: Ingredient[]
): RecipeMatchDto[] {
  if (ingredientIds.length === 0) {
    return []
  }

  const selected = new Set(ingredientIds)

  return recipes
    .map((recipe) => buildMatch(recipe, selected, ingredients))
    .filter((match): match is RecipeMatchDto => match !== null)
    .sort((a, b) => {
      if (a.isComplete !== b.isComplete) {
        return a.isComplete ? -1 : 1
      }
      if (b.matchRatio !== a.matchRatio) {
        return b.matchRatio - a.matchRatio
      }
      if (a.missingIngredientIds.length !== b.missingIngredientIds.length) {
        return a.missingIngredientIds.length - b.missingIngredientIds.length
      }
      return b.matchedIngredientIds.length - a.matchedIngredientIds.length
    })
}
