import Ingredient from '#models/ingredient'
import IngredientCategory from '#models/ingredient_category'
import IngredientFamily from '#models/ingredient_family'
import type { HttpContext } from '@adonisjs/core/http'

function serializeIngredient(ingredient: Ingredient) {
  return {
    id: ingredient.id,
    name: ingredient.name,
    category: ingredient.categoryId,
    family: ingredient.familyId ?? undefined,
    aliases: Array.isArray(ingredient.aliases) ? ingredient.aliases : undefined,
  }
}

export default class IngredientsController {
  async index() {
    const ingredients = await Ingredient.query().orderBy('name', 'asc')
    return { data: ingredients.map(serializeIngredient) }
  }

  async show({ params, response }: HttpContext) {
    const ingredient = await Ingredient.find(params.id)
    if (!ingredient) {
      return response.notFound({ message: 'Ingrediente não encontrado.' })
    }
    return { data: serializeIngredient(ingredient) }
  }

  async categories() {
    const [categories, families] = await Promise.all([
      IngredientCategory.query().orderBy('name', 'asc'),
      IngredientFamily.query().orderBy('name', 'asc'),
    ])

    return {
      data: {
        categories: categories.map((item) => ({ id: item.id, name: item.name })),
        families: families.map((item) => ({ id: item.id, name: item.name })),
      },
    }
  }
}
