import Ingredient from '#models/ingredient'
import Recipe from '#models/recipe'
import { matchRecipes, toRecipeDto } from '#services/recipe_matcher'
import { matchRecipesValidator } from '#validators/pantry'
import type { HttpContext } from '@adonisjs/core/http'

export default class RecipesController {
  async index() {
    const recipes = await Recipe.query().preload('recipeIngredients').orderBy('title', 'asc')

    return { data: recipes.map(toRecipeDto) }
  }

  async show({ params, response }: HttpContext) {
    const recipe = await Recipe.query().where('id', params.id).preload('recipeIngredients').first()

    if (!recipe) {
      return response.notFound({ message: 'Receita não encontrada.' })
    }

    return { data: toRecipeDto(recipe) }
  }

  async match({ request }: HttpContext) {
    const { ingredientIds } = await request.validateUsing(matchRecipesValidator)

    const [recipes, ingredients] = await Promise.all([
      Recipe.query().preload('recipeIngredients'),
      Ingredient.all(),
    ])

    return {
      data: matchRecipes(recipes, ingredientIds, ingredients),
    }
  }
}
