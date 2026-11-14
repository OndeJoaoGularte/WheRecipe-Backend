import { BaseSeeder } from '@adonisjs/lucid/seeders'
import IngredientCategory from '#models/ingredient_category'
import IngredientFamily from '#models/ingredient_family'
import Ingredient from '#models/ingredient'
import Recipe from '#models/recipe'
import RecipeIngredient from '#models/recipe_ingredient'

const categories = [
  { id: 'laticinios', name: 'Laticínios' },
  { id: 'frios', name: 'Frios' },
  { id: 'carnes', name: 'Carnes e ovos' },
  { id: 'graos', name: 'Grãos e cereais' },
  { id: 'massas', name: 'Massas e pães' },
  { id: 'legumes', name: 'Legumes e verduras' },
  { id: 'frutas', name: 'Frutas' },
  { id: 'temperos', name: 'Temperos' },
  { id: 'oleos', name: 'Óleos e gorduras' },
  { id: 'mercearia', name: 'Mercearia' },
]

const families = [
  { id: 'leite', name: 'Leite' },
  { id: 'queijo', name: 'Queijo' },
  { id: 'tempero', name: 'Tempero' },
  { id: 'oleo', name: 'Óleo' },
]

const ingredients: Array<{
  id: string
  name: string
  categoryId: string
  familyId?: string
  aliases?: string[]
}> = [
  {
    id: 'leite-integral',
    name: 'Leite integral',
    categoryId: 'laticinios',
    familyId: 'leite',
    aliases: ['leite'],
  },
  {
    id: 'leite-semidesnatado',
    name: 'Leite semidesnatado',
    categoryId: 'laticinios',
    familyId: 'leite',
  },
  {
    id: 'leite-desnatado',
    name: 'Leite desnatado',
    categoryId: 'laticinios',
    familyId: 'leite',
  },
  {
    id: 'leite-vegetal',
    name: 'Leite vegetal',
    categoryId: 'laticinios',
    familyId: 'leite',
    aliases: ['leite de amêndoa', 'leite de soja', 'leite de aveia', 'leite de coco'],
  },
  { id: 'requeijao', name: 'Requeijão', categoryId: 'laticinios' },
  {
    id: 'queijo-mussarela',
    name: 'Mussarela',
    categoryId: 'laticinios',
    familyId: 'queijo',
    aliases: ['queijo', 'muçarela'],
  },
  {
    id: 'queijo-parmesao',
    name: 'Parmesão',
    categoryId: 'laticinios',
    familyId: 'queijo',
    aliases: ['queijo'],
  },
  {
    id: 'manteiga',
    name: 'Manteiga',
    categoryId: 'laticinios',
    aliases: ['margarina'],
  },
  { id: 'presunto', name: 'Presunto', categoryId: 'frios' },
  {
    id: 'frango',
    name: 'Frango',
    categoryId: 'carnes',
    aliases: ['peito de frango'],
  },
  { id: 'ovo', name: 'Ovo', categoryId: 'carnes', aliases: ['ovos'] },
  { id: 'arroz', name: 'Arroz', categoryId: 'graos' },
  { id: 'feijao', name: 'Feijão', categoryId: 'graos' },
  { id: 'aveia', name: 'Aveia', categoryId: 'graos' },
  {
    id: 'farinha',
    name: 'Farinha de trigo',
    categoryId: 'graos',
    aliases: ['farinha'],
  },
  {
    id: 'massa',
    name: 'Massa',
    categoryId: 'massas',
    aliases: ['macarrão', 'espaguete', 'penne'],
  },
  { id: 'pao', name: 'Pão', categoryId: 'massas' },
  { id: 'batata', name: 'Batata', categoryId: 'legumes', aliases: ['batatas'] },
  { id: 'cebola', name: 'Cebola', categoryId: 'legumes' },
  { id: 'tomate', name: 'Tomate', categoryId: 'legumes' },
  { id: 'alho', name: 'Alho', categoryId: 'legumes' },
  { id: 'banana', name: 'Banana', categoryId: 'frutas' },
  { id: 'sal', name: 'Sal', categoryId: 'temperos' },
  {
    id: 'pimenta',
    name: 'Pimenta',
    categoryId: 'temperos',
    familyId: 'tempero',
  },
  {
    id: 'manjericao',
    name: 'Manjericão',
    categoryId: 'temperos',
    familyId: 'tempero',
  },
  {
    id: 'tempero-verde',
    name: 'Tempero verde',
    categoryId: 'temperos',
    familyId: 'tempero',
    aliases: ['cheiro-verde', 'salsa', 'salsinha'],
  },
  {
    id: 'cebolinha',
    name: 'Cebolinha',
    categoryId: 'temperos',
    familyId: 'tempero',
  },
  {
    id: 'oregano',
    name: 'Orégano',
    categoryId: 'temperos',
    familyId: 'tempero',
  },
  { id: 'canela', name: 'Canela', categoryId: 'temperos' },
  {
    id: 'oleo-soja',
    name: 'Óleo',
    categoryId: 'oleos',
    familyId: 'oleo',
    aliases: ['óleo de soja', 'óleo de girassol'],
  },
  {
    id: 'azeite',
    name: 'Azeite',
    categoryId: 'oleos',
    familyId: 'oleo',
  },
  {
    id: 'molho-tomate',
    name: 'Molho de tomate',
    categoryId: 'mercearia',
    aliases: ['molho'],
  },
  { id: 'acucar', name: 'Açúcar', categoryId: 'mercearia' },
]

type SeedRecipe = {
  id: string
  title: string
  description: string
  servings: number
  prepTimeMinutes: number
  cookTimeMinutes: number
  ingredients: Array<{ ingredientId: string; quantity: string; optional?: boolean }>
  steps: string[]
  nutrition: Record<string, number>
  tags: string[]
}

const recipes: SeedRecipe[] = [
  {
    id: 'macarrao-requeijao',
    title: 'Macarrão ao molho de requeijão',
    description:
      'Massa cremosa com requeijão e molho de tomate — ideal quando a geladeira está quase vazia.',
    servings: 2,
    prepTimeMinutes: 10,
    cookTimeMinutes: 15,
    ingredients: [
      { ingredientId: 'massa', quantity: '200 g' },
      { ingredientId: 'requeijao', quantity: '150 g' },
      { ingredientId: 'molho-tomate', quantity: '1 xícara' },
      { ingredientId: 'tempero', quantity: 'a gosto' },
      { ingredientId: 'alho', quantity: '2 dentes', optional: true },
      { ingredientId: 'sal', quantity: 'a gosto', optional: true },
    ],
    steps: [
      'Cozinhe a massa em água fervente com sal até ficar al dente.',
      'Em uma frigideira, aqueça o molho de tomate com tempero e alho.',
      'Desligue o fogo, misture o requeijão até ficar cremoso.',
      'Escorra a massa, misture ao molho e sirva.',
    ],
    nutrition: { calories: 480, carbs: 62, protein: 16, fat: 18, sugar: 8 },
    tags: ['rápido', 'almoço', 'massa'],
  },
  {
    id: 'omelete-simples',
    title: 'Omelete de queijo',
    description: 'Clássico rápido para qualquer refeição do dia.',
    servings: 1,
    prepTimeMinutes: 5,
    cookTimeMinutes: 8,
    ingredients: [
      { ingredientId: 'ovo', quantity: '2 unidades' },
      { ingredientId: 'queijo', quantity: '50 g' },
      { ingredientId: 'tempero', quantity: 'a gosto' },
      { ingredientId: 'manteiga', quantity: '1 colher de chá', optional: true },
      { ingredientId: 'sal', quantity: 'a gosto', optional: true },
    ],
    steps: [
      'Bata os ovos com tempero e sal.',
      'Derreta a manteiga em uma frigideira antiaderente.',
      'Despeje os ovos e espalhe o queijo por cima.',
      'Dobre ao meio quando estiver quase firme e sirva.',
    ],
    nutrition: { calories: 320, carbs: 2, protein: 22, fat: 24, sugar: 1 },
    tags: ['rápido', 'café da manhã', 'proteína'],
  },
  {
    id: 'frango-refogado',
    title: 'Frango refogado com arroz',
    description: 'Prato do dia a dia com poucos ingredientes e bastante sabor.',
    servings: 2,
    prepTimeMinutes: 15,
    cookTimeMinutes: 25,
    ingredients: [
      { ingredientId: 'frango', quantity: '300 g' },
      { ingredientId: 'arroz', quantity: '1 xícara' },
      { ingredientId: 'cebola', quantity: '1/2 unidade' },
      { ingredientId: 'alho', quantity: '2 dentes' },
      { ingredientId: 'tempero', quantity: 'a gosto' },
      { ingredientId: 'oleo', quantity: '1 colher de sopa', optional: true },
      { ingredientId: 'sal', quantity: 'a gosto', optional: true },
    ],
    steps: [
      'Tempere o frango e refogue com óleo, cebola e alho.',
      'Cozinhe até dourar e ficar macio.',
      'Prepare o arroz normalmente.',
      'Sirva o frango sobre o arroz.',
    ],
    nutrition: { calories: 520, carbs: 55, protein: 38, fat: 14, sugar: 2 },
    tags: ['almoço', 'jantar', 'proteína'],
  },
  {
    id: 'batata-assada',
    title: 'Batata assada temperada',
    description: 'Acompanhamento crocante por fora e macio por dentro.',
    servings: 2,
    prepTimeMinutes: 10,
    cookTimeMinutes: 35,
    ingredients: [
      { ingredientId: 'batata', quantity: '4 médias' },
      { ingredientId: 'tempero', quantity: 'a gosto' },
      { ingredientId: 'oleo', quantity: '2 colheres de sopa' },
      { ingredientId: 'alho', quantity: '2 dentes', optional: true },
      { ingredientId: 'sal', quantity: 'a gosto', optional: true },
      { ingredientId: 'pimenta', quantity: 'a gosto', optional: true },
    ],
    steps: [
      'Corte as batatas em cubos ou fatias.',
      'Misture com óleo, tempero, alho, sal e pimenta.',
      'Asse a 200°C por cerca de 35 minutos, mexendo na metade do tempo.',
      'Sirva quente.',
    ],
    nutrition: { calories: 280, carbs: 42, protein: 5, fat: 10, sugar: 2 },
    tags: ['acompanhamento', 'vegetariano'],
  },
  {
    id: 'risoto-tomate',
    title: 'Arroz cremoso de tomate',
    description: 'Versão simples inspirada em risoto, sem ingredientes caros.',
    servings: 2,
    prepTimeMinutes: 10,
    cookTimeMinutes: 25,
    ingredients: [
      { ingredientId: 'arroz', quantity: '1 xícara' },
      { ingredientId: 'tomate', quantity: '2 unidades' },
      { ingredientId: 'cebola', quantity: '1/2 unidade' },
      { ingredientId: 'requeijao', quantity: '3 colheres de sopa' },
      { ingredientId: 'tempero', quantity: 'a gosto' },
      { ingredientId: 'manteiga', quantity: '1 colher de sopa', optional: true },
      { ingredientId: 'sal', quantity: 'a gosto', optional: true },
    ],
    steps: [
      'Refogue a cebola na manteiga até murchar.',
      'Adicione o tomate picado e cozinhe até formar um molho.',
      'Acrescente o arroz, cubra com água quente e cozinhe mexendo.',
      'Finalize com requeijão e tempero.',
    ],
    nutrition: { calories: 410, carbs: 58, protein: 10, fat: 14, sugar: 6 },
    tags: ['almoço', 'cremoso'],
  },
  {
    id: 'misto-quente',
    title: 'Misto quente na frigideira',
    description: 'Lanche rápido com pão, queijo e presunto.',
    servings: 1,
    prepTimeMinutes: 3,
    cookTimeMinutes: 6,
    ingredients: [
      { ingredientId: 'pao', quantity: '2 fatias' },
      { ingredientId: 'queijo', quantity: '2 fatias' },
      { ingredientId: 'presunto', quantity: '2 fatias' },
      { ingredientId: 'manteiga', quantity: '1 colher de chá', optional: true },
    ],
    steps: [
      'Monte o sanduíche com queijo e presunto.',
      'Passe manteiga por fora das fatias de pão.',
      'Doure dos dois lados na frigideira até o queijo derreter.',
    ],
    nutrition: { calories: 380, carbs: 28, protein: 20, fat: 20, sugar: 3 },
    tags: ['lanche', 'rápido'],
  },
  {
    id: 'panqueca-simples',
    title: 'Panquecas de leite',
    description: 'Massa leve para café da manhã ou lanche da tarde.',
    servings: 2,
    prepTimeMinutes: 10,
    cookTimeMinutes: 15,
    ingredients: [
      { ingredientId: 'farinha', quantity: '1 xícara' },
      { ingredientId: 'leite', quantity: '1 xícara' },
      { ingredientId: 'ovo', quantity: '1 unidade' },
      { ingredientId: 'acucar', quantity: '1 colher de sopa', optional: true },
      { ingredientId: 'manteiga', quantity: 'para untar', optional: true },
      { ingredientId: 'sal', quantity: 'pitada', optional: true },
    ],
    steps: [
      'Misture farinha, leite, ovo, açúcar e sal até ficar homogêneo.',
      'Aqueça uma frigideira untada.',
      'Despeje porções da massa e doure dos dois lados.',
      'Sirva com o acompanhamento que preferir.',
    ],
    nutrition: { calories: 340, carbs: 48, protein: 12, fat: 10, sugar: 8 },
    tags: ['café da manhã', 'lanche'],
  },
  {
    id: 'banana-aveia',
    title: 'Mingau de banana com aveia',
    description: 'Café da manhã quentinho em poucos minutos.',
    servings: 1,
    prepTimeMinutes: 5,
    cookTimeMinutes: 8,
    ingredients: [
      { ingredientId: 'banana', quantity: '1 unidade' },
      { ingredientId: 'aveia', quantity: '4 colheres de sopa' },
      { ingredientId: 'leite', quantity: '1 xícara' },
      { ingredientId: 'canela', quantity: 'a gosto', optional: true },
      { ingredientId: 'acucar', quantity: 'a gosto', optional: true },
    ],
    steps: [
      'Amasse a banana em uma panela.',
      'Adicione leite e aveia e cozinhe em fogo baixo.',
      'Mexa até engrossar.',
      'Finalize com canela e açúcar se desejar.',
    ],
    nutrition: { calories: 310, carbs: 52, protein: 10, fat: 6, sugar: 18 },
    tags: ['café da manhã', 'doce'],
  },
  {
    id: 'mingau-vegano',
    title: 'Mingau vegano de banana',
    description: 'Mesma ideia do mingau clássico, mas só fecha se você tiver leite vegetal.',
    servings: 1,
    prepTimeMinutes: 5,
    cookTimeMinutes: 8,
    ingredients: [
      { ingredientId: 'banana', quantity: '1 unidade' },
      { ingredientId: 'aveia', quantity: '4 colheres de sopa' },
      { ingredientId: 'leite-vegetal', quantity: '1 xícara' },
      { ingredientId: 'canela', quantity: 'a gosto', optional: true },
    ],
    steps: [
      'Amasse a banana em uma panela.',
      'Adicione o leite vegetal e a aveia e cozinhe em fogo baixo.',
      'Mexa até engrossar e finalize com canela.',
    ],
    nutrition: { calories: 290, carbs: 50, protein: 8, fat: 5, sugar: 16 },
    tags: ['café da manhã', 'vegano'],
  },
  {
    id: 'feijao-tropeiro-simples',
    title: 'Feijão com ovo e cebola',
    description: 'Inspiração mineira simplificada para o dia a dia.',
    servings: 2,
    prepTimeMinutes: 10,
    cookTimeMinutes: 15,
    ingredients: [
      { ingredientId: 'feijao', quantity: '2 xícaras (cozido)' },
      { ingredientId: 'ovo', quantity: '2 unidades' },
      { ingredientId: 'cebola', quantity: '1/2 unidade' },
      { ingredientId: 'alho', quantity: '1 dente' },
      { ingredientId: 'tempero', quantity: 'a gosto' },
      { ingredientId: 'oleo', quantity: '1 colher de sopa', optional: true },
      { ingredientId: 'sal', quantity: 'a gosto', optional: true },
    ],
    steps: [
      'Refogue cebola e alho no óleo.',
      'Adicione o feijão e o tempero, aqueça bem.',
      'Faça os ovos fritos ou mexidos à parte.',
      'Sirva o feijão com o ovo por cima.',
    ],
    nutrition: { calories: 390, carbs: 36, protein: 22, fat: 16, sugar: 3 },
    tags: ['almoço', 'brasileira'],
  },
  {
    id: 'molho-tomate-caseiro',
    title: 'Molho de tomate rápido',
    description: 'Base versátil para massas, arroz ou frango.',
    servings: 4,
    prepTimeMinutes: 8,
    cookTimeMinutes: 20,
    ingredients: [
      { ingredientId: 'tomate', quantity: '4 unidades' },
      { ingredientId: 'cebola', quantity: '1/2 unidade' },
      { ingredientId: 'alho', quantity: '2 dentes' },
      { ingredientId: 'tempero', quantity: 'a gosto' },
      { ingredientId: 'oleo', quantity: '1 colher de sopa', optional: true },
      { ingredientId: 'sal', quantity: 'a gosto', optional: true },
    ],
    steps: [
      'Refogue cebola e alho no óleo.',
      'Adicione os tomates picados e cozinhe até desmanchar.',
      'Tempere e amasse levemente.',
      'Use na hora ou guarde na geladeira.',
    ],
    nutrition: { calories: 70, carbs: 9, protein: 2, fat: 3, sugar: 5 },
    tags: ['base', 'vegetariano'],
  },
]

export default class MainSeeder extends BaseSeeder {
  async run() {
    for (const category of categories) {
      await IngredientCategory.updateOrCreate({ id: category.id }, category)
    }

    for (const family of families) {
      await IngredientFamily.updateOrCreate({ id: family.id }, family)
    }

    for (const ingredient of ingredients) {
      await Ingredient.updateOrCreate(
        { id: ingredient.id },
        {
          id: ingredient.id,
          name: ingredient.name,
          categoryId: ingredient.categoryId,
          familyId: ingredient.familyId ?? null,
          aliases: ingredient.aliases ?? null,
        }
      )
    }

    for (const recipe of recipes) {
      await Recipe.updateOrCreate(
        { id: recipe.id },
        {
          id: recipe.id,
          title: recipe.title,
          description: recipe.description,
          servings: recipe.servings,
          prepTimeMinutes: recipe.prepTimeMinutes,
          cookTimeMinutes: recipe.cookTimeMinutes,
          steps: recipe.steps,
          tags: recipe.tags,
          nutrition: recipe.nutrition,
        }
      )

      await RecipeIngredient.query().where('recipe_id', recipe.id).delete()

      await RecipeIngredient.createMany(
        recipe.ingredients.map((item, index) => ({
          recipeId: recipe.id,
          ingredientRef: item.ingredientId,
          quantity: item.quantity,
          optional: Boolean(item.optional),
          sortOrder: index,
        }))
      )
    }
  }
}
