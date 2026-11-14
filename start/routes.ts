/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'

router.get('/', () => {
  return { hello: 'world', service: 'wherecipe-api' }
})

router
  .group(() => {
    router
      .group(() => {
        router.post('signup', [controllers.NewAccount, 'store'])
        router.post('login', [controllers.AccessTokens, 'store'])
      })
      .prefix('auth')
      .as('auth')

    router
      .group(() => {
        router.get('profile', [controllers.Profile, 'show'])
        router.post('logout', [controllers.AccessTokens, 'destroy'])
      })
      .prefix('account')
      .as('profile')
      .use(middleware.auth())

    router.get('ingredients', [controllers.Ingredients, 'index'])
    router.get('ingredients/meta', [controllers.Ingredients, 'categories'])
    router.get('ingredients/:id', [controllers.Ingredients, 'show'])

    router.get('recipes', [controllers.Recipes, 'index'])
    router.post('recipes/match', [controllers.Recipes, 'match'])
    router.get('recipes/:id', [controllers.Recipes, 'show'])

    router
      .group(() => {
        router.get('/', [controllers.Pantry, 'index'])
        router.put('/items', [controllers.Pantry, 'upsert'])
        router.delete('/items/:ingredientId', [controllers.Pantry, 'destroy'])
        router.post('/apply', [controllers.Pantry, 'applyUpdates'])
      })
      .prefix('pantry')
      .as('pantry')
      .use(middleware.auth())
  })
  .prefix('/api/v1')
